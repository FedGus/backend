import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MainService } from "../shared/services/main.service";

@Component({
  selector: 'app-add-petition',
  templateUrl: './add-petition.component.html',
  styleUrls: ['./add-petition.component.css']
})
export class AddPetitionComponent implements OnInit {
  form: FormGroup;
  disabled = false;
  filename="";
  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png",
    uploadAPI:  {
      url: environment.baseUrl + "/upload-photo",
    },
    replaceTexts: {
      selectFileBtn: 'Выберите файл',
      resetBtn: 'Удалить',
      uploadBtn: 'Загрузить',
      attachPinBtn: 'Прикрепите файл',
      afterUploadMsg_success: 'Успешно загружено!',
      afterUploadMsg_error: 'Загрузка прервана!'
    }
  }

  constructor(private router: Router, private api: MainService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      id_user: new FormControl({value: localStorage.getItem("id"), disabled: this.disabled }),
      title: new FormControl( { value: '', disabled: this.disabled } , [Validators.required]),
      filename: new FormControl( { value: this.filename, disabled: this.disabled }),
      content: new FormControl({ value: '', disabled: this.disabled }, [Validators.required]),
      id_category: new FormControl({ value: 1, disabled: this.disabled }, [Validators.required]),
      id_object: new FormControl({ value: 1, disabled: this.disabled }, [Validators.required]),
      address: new FormControl({ value: '', disabled: this.disabled }, [Validators.required]),
      longitude: new FormControl({ value: '', disabled: this.disabled }),
      latitude: new FormControl({ value: '', disabled: this.disabled })
  });
  }

  async onSubmit() {
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

    // Функция, возвращение имени загруженного файла
  fileUpload(event){
    console.log(JSON.parse(event.response).filename);
    this.filename = JSON.parse(event.response).filename;
    this.form.controls['filename'].setValue(this.filename);
  }
}
