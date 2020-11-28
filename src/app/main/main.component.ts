import { Component, OnInit } from "@angular/core";
import { MainService } from "../shared/services/main.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"],
})
export class MainComponent implements OnInit {
  // Логическая переменная, определяющая наличие или отсутсвие ссылки на страницу добавления новой заметки
  hide1 = true;

  user: any = {
    id_user: localStorage.getItem("id"),
    name: localStorage.getItem("name"),
  };
  constructor(private mainService: MainService) {}

  async ngOnInit() {}

  // Проверяет наличие в LocalStorage элемента роли, чтобы понять авторизирован пользователь или нет
  ngDoCheck() {
    this.hide1 = true;
    if (localStorage.getItem("role") == "1") {
      this.hide1 = false;
    }
  }
}
