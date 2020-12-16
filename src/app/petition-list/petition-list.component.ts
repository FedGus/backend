import { Component, OnInit } from '@angular/core';
import { MainService } from "../shared/services/main.service";

@Component({
  selector: 'app-petition-list',
  templateUrl: './petition-list.component.html',
  styleUrls: ['./petition-list.component.css']
})
export class PetitionListComponent implements OnInit {
  petitions: any;
  constructor(private api: MainService) { }

  async ngOnInit() {
    try {
      this.petitions = await this.api.get(
        "/petitions"
      );
      console.log(this.petitions)
    }
    catch (error) {
      console.log(error)
    }

  }
}
