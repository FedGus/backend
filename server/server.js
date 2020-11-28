const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const dbConfig = require("./db.config.js");
const history = require("connect-history-api-fallback");
const app = express();
const port = 8085;

// Парсинг json
app.use(bodyParser.json());

app.use(history());

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
connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  port: dbConfig.PORT,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  charset: "utf8_general_ci",
  connectionLimit: 10,
});

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
          res.json(results);
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
          "INSERT INTO `users` (`id`, `login`, `password`, `name`, `role`) VALUES (NULL, ?, ?, ?, ?)",
          [req.body.login, req.body.password, req.body.name, req.body.role],
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
                  console.log(result);
                  res.json(result);
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

// Информирование о запуске сервера и его порте
app.listen(port, () => {
  console.log("Сервер запущен на http://localhost:" + port);
});
