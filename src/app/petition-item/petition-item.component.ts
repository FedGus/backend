import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from "../shared/services/main.service";
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-petition-item',
  templateUrl: './petition-item.component.html',
  styleUrls: ['./petition-item.component.css']
})
export class PetitionItemComponent implements OnInit {
  petition: any;
  result: any;
  id: number;
  srcPhoto = environment.baseUrl + '/api/photo/';

  constructor(private activeRoute: ActivatedRoute, private api: MainService) {
    this.activeRoute.params.subscribe(param => {
      this.id = param.id;
    });
}

  async ngOnInit() {
    try {
      this.result = await this.api.get(
        "/petitions/" + this.id
      );
      this.petition = this.result.petition;
      console.log(this.petition)
    }
    catch (error) {
      console.log(error)
    }
  }
}
