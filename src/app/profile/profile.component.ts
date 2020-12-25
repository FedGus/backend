import { Component, OnInit } from "@angular/core";
import { MainService } from "../shared/services/main.service";
import { Petition } from "../shared/models/petition.model";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  petitions: Petition[] = [];
  id_user = localStorage.getItem("id");
  constructor(private mainService: MainService) {}
  loading = false;

  notfound = true;

  ngOnInit() {
    // Получение списка всех записей,  имеющихся в БД
    this.loading = true;

    // try {
    //   let result = await this.mainService.get(`/records/${this.id_user}`);
    //   if (Object.keys(result).length == 0) {
    //     console.log("пусто");
    //     result = undefined;
    //   }
    //   if (typeof result !== "undefined") {
    //     this.notfound = false;
    //     console.log(result);
    //     for (const one in result) {
    //       this.petitions.push(
    //         new Petition(
    //           result[one].title,
    //           result[one].image,
    //           result[one].content,
    //           result[one].latitude,
    //           result[one].longitude,
    //           result[one].address,
    //           result[one].timestamp,
    //           result[one].id_category,
    //           result[one].id_object,
    //           result[one].id_status
    //           result[one].id_user
    //         )
    //       );
    //     }
    //   } else {
    //     this.notfound = true;
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    this.loading = false;
  }
}
