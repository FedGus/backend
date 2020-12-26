import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MainService } from "../shared/services/main.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-authorization",
  templateUrl: "./authorization.component.html",
  styleUrls: ["./authorization.component.css"],
})
export class AuthorizationComponent implements OnInit {
  // Логическая переменная, определяющая наличие или отсутсвие сообщения о неправильном логине или пароле
  notExistLoginOrPassword = true;
  // Логическая переменная, определяющая наличие или отсутсвие сообщения о незаполненных обязательных полях
  isEmpty = true;
  form: FormGroup;
  user = {
    id: "",
    login: "",
    password: "",
    name: "",
    surname: "",
    role: "",
  };

  constructor(private api: MainService, private router: Router) {}

  ngOnInit() {
    // Инициализация FormGroup, создание FormControl, и назанчение Validators
    this.form = new FormGroup({
      login: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
  }

  // Функция входа, отправляющая данные, полученные с формы на сервер, и реагирующая на ответ с сервера
  async onLogin() {
    localStorage.clear();
    if (this.form.value.login == "" || this.form.value.password == "") {
      this.isEmpty = false;
    } else {
      this.isEmpty = true;
      let infoAboutUser;
      infoAboutUser = {
        login: this.form.value.login,
        password: this.form.value.password,
      };
      // console.log(infoAboutUser);
      try {
        let ExistOrNot: any;
        ExistOrNot = await this.api.post(
          JSON.stringify(infoAboutUser),
          "/login"
        );
        console.log(ExistOrNot);
        this.form.reset();

        if (ExistOrNot != "not exist") {
          this.user.id = ExistOrNot.id_user;
          this.user.login = ExistOrNot.login;
          this.user.password = ExistOrNot.password;
          this.user.name = ExistOrNot.name;
          this.user.surname = ExistOrNot.surname;
          this.user.role = ExistOrNot.role;

          this.notExistLoginOrPassword = true;
          localStorage.setItem("role", this.user.role);
          localStorage.setItem("id", this.user.id);
          localStorage.setItem("name", this.user.name);
          localStorage.setItem("surname", this.user.surname);
          this.router.navigate(["/"]);
        } else {
          this.notExistLoginOrPassword = false;
          console.log("Неверный логин или пароль");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  // Функция, убирает сообщения о неправильном логине или пароле и о незаполненных полях
  onFlag() {
    this.notExistLoginOrPassword = true;
    this.isEmpty = true;
  }
}
