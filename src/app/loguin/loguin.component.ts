import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { faCoffee, faMailBulk } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-loguin',
  templateUrl: './loguin.component.html',
  styleUrls: ['./loguin.component.css']
})
export class LoguinComponent implements OnInit {
   
  faEmail = faMailBulk;
  
  public email: string = "";
  public password: string = "";
  public isError = false;

  new: any;
  newDos: any;
  ingresaPs: boolean = false;
  result: any = {};
  islogued: boolean = true;
  mensajeService: string="";
  type: any = {
    uno: 'password'
  }

  constructor(public formBuilder: FormBuilder, public app: AppComponent, private router: Router, private toastr: ToastrService, private apiService: ApiService) { }

  

  ngOnInit(){


    this.new = this.formBuilder.group({
      email: ['', [Validators.compose([Validators.required, Validators.email])]],
      password: ['', [Validators.compose([Validators.required])]]
    });

  }


  getError() {
    if (this.new.get('email').hasError('email')) {
      return 'Formato de email no valido.';
    }

    if (this.new.get('email').hasError('required')) {
      return 'Ingrese su email.';
    }

    return '';
  }


  ingresar() {


    if (this.email == "") {
      this.toastr.error('Mensaje','Capture el email');
    }
    else if (this.password == "") {
      this.toastr.error('Mensaje', 'Capture la contraseña');
    }
    else {
      
      this.apiService.loader = true;



      const options = {
        headers: {
          'Content-Type': 'application/json'
        }
      };


      const postData = {
        "UsuarioEmail": this.email,
        "Password": this.password
      }


      console.log(this.email, this.password);
      this.apiService.post(`/User/Login?email=${this.email}&password=${this.password}`,postData).subscribe(
        (response) => {
          this.result = response
          //console.log(response);
          if (this.result.result != null) {
            console.log('logueado', this.result.result);
            console.log('user', this.result.result.id);
            localStorage.setItem("user", this.result.result.id);
            localStorage.setItem("username", this.result.result.name);

            console.log(this.result.result);
            console.log("este es el verificado", this.result.result.verified);

            this.router.navigate(['dashboard']);
            this.apiService.loader = false;


          }
          else {
            this.toastr.error("Mensaje","Usuario y/o contraseña incorrectos");
            console.log('no logueado', response);
            this.apiService.loader = false;
          }
        },
        (error) => {
          if (error.status === 500) {
            this.toastr.error("Mensaje", "Error de autenticación");
            this.apiService.loader = false;
          }

        }

      );

      
      

    }
  }

  recuperapassword() {
    
    this.router.navigateByUrl('recuperapassw/' + this.email);
  }

}
