import { Component, OnInit } from "@angular/core";
import { CategorySortPipe } from "../shared/pipe/category-sort.pipe";
import { MainService } from "../shared/services/main.service";
import {FormsModule} from '@angular/forms'

@Component({
  selector: "app-petition-list",
  templateUrl: "./petition-list.component.html",
  styleUrls: ["./petition-list.component.css"],
})
export class PetitionListComponent implements OnInit {
  results: any;
  petitions: any;
  constructor(private api: MainService) {}

  async ngOnInit() {
    try {
      this.results = await this.api.get("/petitions");
      this.petitions = this.results.petition;
      console.log(this.petitions);
    } catch (error) {
      console.log(error);
    }
  }
}
