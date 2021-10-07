import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ApiService } from 'src/app/services/api.service';
import { faCoffee, faMailBulk } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent implements OnInit {
  imageChangedEvent: any = '';
  imgCrop: string = "";
  isImagen: boolean = false;
  logo: string = "";
  fechacumple: string = "";
  data: any = { Id: 0, SpecialtyId:0, Name: "", Avatar: "", BirthDate: "", GenderId: 0, ProfessionalLicense: "", Email: "", Password: "", imageAvatar: "" };
  arrayespecialidades: any[] = [];
  ConfirmaPassword: string = "";
  result: any = {};


  constructor(private modalService: NgbModal, private apiService: ApiService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {

    this.getEspecialidades();
  }


  getEspecialidades() {
    this.apiService.get(`/Doctor/GetAllSpecialty`).subscribe((r) => {
      this.apiService.loader = false;
      if (r.success) {
        this.arrayespecialidades = r.result;


      }
    }, (r) => {
      console.log(r);
      this.apiService.loader = false;
    })

  }



  imageCropped(event: ImageCroppedEvent) {
    let encoded = event.base64.toString().replace(/^data:(.*;base64,)?/, '');
    document.getElementById('lead_client_avatar').setAttribute('src', '' + event.base64);
    this.imgCrop = encoded;
    this.isImagen = true;

  }



  imageLoaded(image?: HTMLImageElement) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
    console.log('ready');
  }
  loadImageFailed() {
    // show message
  }

  cambioSelect($event) {
    console.log($event);
  }


  img(event) {
    const file = event.target.files[0];
    const ext = event.target.files[0].type.split('/');
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader);
      let encoded = reader.result.toString().replace(/^data:(.*;base64,)?/, '');
      if ((encoded.length % 4) > 0) {
        encoded += '='.repeat(4 - (encoded.length % 4));
      }
      this.logo = encoded;
      console.log(this.logo);
      document.getElementById('lead_client_avatar').setAttribute('src', '' + reader.result);

    };
  }




  @ViewChild('content', { static: true }) content: NgbModal;
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.modalService.open(this.content, { scrollable: true, size: 'lg' });
  }



  guardarUsuario() {


    if (this.data.GenderId == null || this.data.GenderId == 0) {
      this.toastr.error("Mensaje", "Selecciona tu genero");
    }
    else if (this.data.ProfessionalLicense == null || this.data.ProfessionalLicense == "") {
      this.toastr.error("Mensaje", "Captura tu cédula profesional");

    }
    else if (this.data.SpecialtyId == null || this.data.SpecialtyId == 0) {
      this.toastr.error("Mensaje", "Selecciona tu especialidad");
    }
    else if (this.data.Email == null || this.data.Email == "") {
      this.toastr.error("Mensaje", "Captura tu email");
    }
    else if (this.data.Password == null || this.data.Password == "") {
      this.toastr.error("Mensaje", "Captura tu contraseña");
    }
    else if (this.ConfirmaPassword == null || this.ConfirmaPassword == "") {
      this.toastr.error("Mensaje", "Confirma tu contraseña");
    }
    else if (this.data.Password != this.ConfirmaPassword) {
      this.toastr.error("Mensaje", "Tus contraseñas no coinciden. Veirfica");
    }
    else {

      this.apiService.loader = true;

      

      this.data.SpecialtyId =Number(this.data.SpecialtyId);
      this.data.GenderId = Number(this.data.GenderId);


      if (this.isImagen) {
        this.data.imageAvatar = this.imgCrop;
      }
      else {
        this.data.imageAvatar = "";
      }

      console.log('envio de datos',JSON.stringify(this.data));

      this.apiService.post(`/User/AddNewUserBackOffice`, this.data).subscribe(
        (response) => {
          this.result = response
          if (this.result.result != null) {

            this.router.navigate(['exitoaddusuario',this.result.result.name]);
            this.apiService.loader = false;


          }
          else {
            this.toastr.error("Mensaje", "Error al registrar");
            this.apiService.loader = false;
          }
        },
        (error) => {
          if (error.status === 500) {
            this.toastr.error("Mensaje", "Error al registrar");
            this.apiService.loader = false;
          }

        }

      );


    }


  }

}
