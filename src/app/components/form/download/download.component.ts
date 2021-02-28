import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiUserService } from '../../../services/api-user.service';
@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent {
  name: string;
  fileToUpload: File = null;
  formModel: FormGroup;
  constructor(private apiUserService: ApiUserService) {
    const fb = new FormBuilder();
    this.formModel = fb.group({
      file: [null, Validators.required],
    })

  }


  // Image Preview сохранеям файл
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.name = this.fileToUpload.name;//сохраняем его имя
    console.log(this.fileToUpload.name);
  }

  createOrUpdatePolicy() {
    //отправляем файл
    if (this.fileToUpload) {
      this.apiUserService.postFile(this.fileToUpload).subscribe(data => {
        console.log(this.fileToUpload);
        // do something, if upload success
        console.log(data);
      }, error => {
        console.log(error);
      });
    }
  }
  formModelReset() {
    this.formModel.reset();
  }

}
