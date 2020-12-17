import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from "../shared/services/main.service";

@Component({
  selector: 'app-petition-item',
  templateUrl: './petition-item.component.html',
  styleUrls: ['./petition-item.component.css']
})
export class PetitionItemComponent implements OnInit {
  petition: any;
  id: number;

  constructor(private activeRoute: ActivatedRoute, private api: MainService) {
    this.activeRoute.params.subscribe(param => {
      this.id = param.id;
    });
}

  async ngOnInit() {
    try {
      this.petition = await this.api.get(
        "/petitions/" + this.id
      );
      console.log(this.petition)
    }
    catch (error) {
      console.log(error)
    }
  }
}
