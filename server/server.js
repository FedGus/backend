const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const dbConfig = require("./db.config.js");
const history = require("connect-history-api-fallback");
const app = express();
const port = process.env.PORT || 8086;
const serveStatic = require("serve-static");
const path = require("path");

// Парсинг json
app.use(bodyParser.json());

// Парсинг запросов по типу: application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Настройка CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PATCH, PUT, POST, DELETE, OPTIONS"
  );
  next();
});

// Создание соединения с базой данных
let connection;
if (process.env.NODE_ENV === "production") {
  connection = mysql.createPool({
    host: dbConfig.PROD.HOST,
    user: dbConfig.PROD.USER,
    port: dbConfig.PROD.PORT,
    password: dbConfig.PROD.PASSWORD,
    database: dbConfig.PROD.DB,
    charset: "utf8_general_ci",
    connectionLimit: 10,
  });
} else {
  connection = mysql.createPool({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    port: dbConfig.PORT,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    charset: "utf8_general_ci",
    connectionLimit: 10,
  });
}

connection.getConnection((err, connect) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has too many connections.");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused.");
    }
  } else {
    connect.query('SET NAMES "utf8"');
    connect.query('SET CHARACTER SET "utf8"');
    connect.query('SET SESSION collation_connection = "utf8_general_ci"');
    console.log("Успешно соединено с БД");
  }
  if (connect) connect.release();
});

// Авторизация пользователя
app.post("/api/login", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  console.log("Пришёл POST запрос для входа:");
  console.log(req.body);
  connection.query(
    `SELECT * FROM users WHERE (login="${req.body.login}") AND (password="${req.body.password}")`,
    function (err, results) {
      if (err) {
        res
          .status(500)
          .send("Ошибка сервера при получении пользователя по логину");
        console.log(err);
      }
      console.log("Результаты проверки существования пользователя:");
      if (results !== undefined) {
        if (results[0] === undefined) {
          res.json("not exist");
        } else {
          console.log(results[0]);
          res.json(results[0]);
        }
      }
    }
  );
});

// Регистрация пользователя
app.post("/api/registration", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  console.log("Пришёл POST запрос для пользователей:");
  console.log(req.body);
  connection.query(
    `SELECT * FROM users WHERE login='${req.body.login}'`,
    function (error, results) {
      if (error) {
        res
          .status(500)
          .send(
            "Ошибка сервера при получении пользователей с таким же логином"
          );
        console.log(error);
      }
      console.log("Результаты проверки существования логина:");
      console.log(results[0]);
      if (results[0] === undefined) {
        connection.query(
          "INSERT INTO `users` (`id_user`, `login`, `password`, `name`, `surname`, `role`) VALUES ( NULL,?, ?, ?, ?, ?)",
          [
            req.body.login,
            req.body.password,
            req.body.name,
            req.body.surname,
            req.body.role,
          ],
          function () {
            console.log(
              "Запрос на проверку существования созданной записи в БД"
            );
            connection.query(
              `SELECT * FROM users WHERE login="${req.body.login}"`,
              function (err, result) {
                if (err) {
                  res
                    .status(500)
                    .send(
                      "Ошибка сервера при получении пользователя по логину"
                    );
                  console.log(err);
                } else {
                  console.log(result[0]);
                  res.json(result[0]);
                }
              }
            );
          }
        );
      } else {
        res.json("exist");
      }
    }
  );
});

// Получение списка петиций
app.get("/api/petitions", function (req, res) {
  try {
    connection.query(
      "SELECT * FROM `Petition` ORDER BY id_petition DESC",
      function (error, results) {
        if (error) {
          res.status(500).send("Ошибка сервера при получении списка петиций");
          console.log(error);
        }
        console.log("Результаты получения списка петиций");
        console.log(results);
        res.json({ petition: results });
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// Получение одной петиции по id
app.get("/api/petitions/:id", function (req, res) {
  try {
    connection.query(
      `SELECT * FROM Petition WHERE id_petition="${req.params.id}"`,
      function (error, results) {
        if (error) {
          res.status(500).send("Ошибка сервера при получении петиции");
          console.log(error);
        }
        console.log("Результаты получения петиции");
        console.log(results);
        res.json({ petition: results });
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// Добавление петиции
app.post("/api/add-petition", (req, res) => {
  connection.query(
    `INSERT INTO Petition (title, image, content, id_category, id_object, id_status, id_user, latitude, longitude, address) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
    [
      req.body.title,
      req.body.image,
      req.body.content,
      req.body.id_category,
      req.body.id_object,
      1,
      1,
      "",
      "",
      req.body.address,
    ],
    function (err) {
      if (err) {
        res.status(500).send("Ошибка сервера при добавлении петиции");
        console.log(err);
      } else console.log("Добавление прошло успешно");
      res.json("create");
    }
  );
});

// Добавление комментария к петиции
app.post("/api/addComment", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  console.log("Пришёл POST запрос для создания комментария:");
  console.log(req.body);
  connection.query(
    `INSERT INTO Comment (content, id_petition, id_user) VALUES (?, ?, ?);`,
    [req.body.content, req.body.id_petition, req.body.id_user],
    function (err) {
      if (err) {
        res.status(500).send("Ошибка сервера при cоздании комментария");
        console.log(err);
      }
      console.log("Создание прошло успешно");
      res.json("create");
    }
  );
});

// Обработка удаления комментария
app.delete("/api/deleteComment/:id_comment", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  console.log("Пришёл DELETE запрос для удаления комментария:");
  console.log(req.body);
  connection.query(
    `DELETE FROM Comment WHERE id_comment=${req.params.id_comment}`,
    function (err) {
      if (err) {
        res.status(500).send("Ошибка сервера при удалении комментария по id");
        console.log(err);
      }
      console.log("Удаление прошло успешно");
      res.json("delete");
    }
  );
});

// Получение комментариев к петиции
app.post("/api/getPetitionComment", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  console.log("Пришёл POST запрос для загрузки комментариев к петиции:");
  console.log(req.body);
  try {
    connection.query(
      "SELECT * FROM Comment WHERE id_petition=?;",
      [req.body.id_petition],
      function (err, results) {
        if (err) {
          res
            .status(500)
            .send("Ошибка сервера при поиске комментариев к петиции по id ");
          console.log(err);
        }
        console.log("Мастер найден успешно");
        console.log("Результаты:");
        console.log(results);
        res.json({ comment: results });
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// Обработка изменения информации в личном кабинете
app.put("/api/updateUser", function (req, res) {
  console.log("PUT /");
  console.log(req.body);
  try {
    connection.query(
      "UPDATE `users` SET `name` = ?, `surname` = ?, `login` = ?, `password` = ? WHERE id_user  = ?",
      [
        req.body.name,
        req.body.surname,
        req.body.login,
        req.body.password,
        req.body.id_user,
      ],
      function (error) {
        if (error) {
          res
            .status(500)
            .send("Ошибка сервера при обновлении личного кабинета");
          console.log(error);
        }
        res.json("change");
      }
    );
  } catch (error) {
    console.log(error);
  }
});

app.use(history());

if (process.env.NODE_ENV === "production") {
  // Информирование о запуске сервера и его порте
  app
    .use("/", serveStatic(path.join(__dirname, "../dist/project")))
    .listen(port, () => {
      console.log("Сервер запущен на http://localhost:" + port);
    });
} else {
  // Информирование о запуске сервера и его порте
  app.listen(port, () => {
    console.log("Сервер запущен на http://localhost:" + port);
  });
}
