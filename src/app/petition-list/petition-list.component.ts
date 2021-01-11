import { Component, OnInit } from "@angular/core";
import { CategorySortPipe } from "../shared/pipe/category-sort.pipe";
import { MainService } from "../shared/services/main.service";
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: "app-petition-list",
  templateUrl: "./petition-list.component.html",
  styleUrls: ["./petition-list.component.css"],
})
export class PetitionListComponent implements OnInit {
  results: any;
  petitions: any;
  every: any;
  remont: any;
  blago: any;
  ozelenenie: any;
  osvet: any;
  category: any;
  object: any;
  dvor: any;
  houses: any;
  rode: any;
  policlinik: any;
  park: any;
  cafe: any;
  schools: any;
  torg: any;
  status: any;
  active: any;
  progress: any;
  stop: any;
  end: any;
  passive: any;
  srcPhoto = environment.baseUrl + '/api/photo/';
  
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
