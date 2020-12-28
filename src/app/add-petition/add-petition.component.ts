import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { MainService } from "../shared/services/main.service";

@Component({
  selector: 'app-add-petition',
  templateUrl: './add-petition.component.html',
  styleUrls: ['./add-petition.component.css']
})
export class AddPetitionComponent implements OnInit {
  form: FormGroup;
  disabled = false;

  constructor(private router:Router, private api: MainService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      id_user: new FormControl({value: localStorage.getItem("id"), disabled: this.disabled }),
      title: new FormControl( { value: '', disabled: this.disabled } , [Validators.required]),
      image: new FormControl( { value: '', disabled: this.disabled }),
      content: new FormControl({ value: '', disabled: this.disabled }, [Validators.required]),
      id_category: new FormControl({ value: 1, disabled: this.disabled }, [Validators.required]),
      id_object: new FormControl({ value: 1, disabled: this.disabled }, [Validators.required]),
      address: new FormControl({ value: '', disabled: this.disabled }, [Validators.required]),
  });
  }

  async onSubmit() {
    console.log(this.form.value);
    try {
        await this.api.post(
          JSON.stringify(this.form.value),
          "/add-petition"
        );
      this.router.navigate(['']);
      alert("Ваша петицию успешно создана!");
      } catch (err) {
        console.log(err);
      }
  }

}
