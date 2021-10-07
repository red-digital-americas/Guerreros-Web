import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recupera-password',
  templateUrl: './recupera-password.component.html',
  styleUrls: ['./recupera-password.component.css']
})
export class RecuperaPasswordComponent implements OnInit {
  public isError: boolean = false;
  public email: string = "";
  result: any = [];
  public mensajeService: string = "";
  public islogued = true;

  constructor(public formBuilder: FormBuilder, private apiService: ApiService, private toastr: ToastrService) { }
  new: any;

  ngOnInit(){
    this.new = this.formBuilder.group({
      email: ['', [Validators.compose([Validators.required, Validators.email])]]
    });
  }


  getError() {
    if (this.new.get('email').hasError('email')) {
      return 'Formato de email no valido.';
    }

    if (this.new.get('email').hasError('required')) {
      return 'Ingrese su email.';
    }

    return "";
  }



  enviapassword() {


    //if (this.new.invalid) {
    //  this.isError = true;
    //  return;
    //}

    if (this.email == "") {

      this.toastr.error('Mensaje', 'Capture el email')
      return;
    }

    const options = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    this.apiService.loader = true;


    this.apiService.post('/User/RecoverPassword?email=' + this.email, '').subscribe(
      (response) => {
        this.result = response
        console.log(response);
        if (this.result.result != null) {
            this.apiService.loader = false;
        }
        else {
          console.log(this.result.message);
          //this.mensajeService = this.result.message;
          this.islogued = false;
          this.isError = true;
          this.apiService.loader = false;
        }
      },
      (error) => {
        console.log(error);
        this.apiService.loader = false;
      }


    );


    
  }

}
