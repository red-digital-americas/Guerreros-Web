import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ApiService } from 'src/app/services/api.service';
import { faCoffee, faMailBulk } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-actualiza-usuario',
  templateUrl: './actualiza-usuario.component.html',
  styleUrls: ['./actualiza-usuario.component.css']
})
export class ActualizaUsuarioComponent implements OnInit {
  imageChangedEvent: any = '';
  imgCrop: string = "";
  isImagen: boolean = false;
  logo: string = "";
  fechacumple: string = "";
  data: any = { id: 0, specialtyId: 0, name: "", avatar: "", birthDate: "", genderId: 0, professionalLicense: "", email: "", password: "", imageAvatar: "" };
  arrayespecialidades: any[] = [];
  ConfirmaPassword: string = "";
  result: any = {};
  


  constructor(private modalService: NgbModal, private apiService: ApiService, private toastr: ToastrService, private router: Router, private _Activatedroute: ActivatedRoute) { }

  ngOnInit(): void {

    this.getUserById(this._Activatedroute.snapshot.paramMap.get("id"));



    this.getEspecialidades();


  }



  getUserById(id) {
    this.apiService.get(`/User/GetUsuarioById?id=${id}`).subscribe((r) => {
      this.apiService.loader = false;
      if (r.success) {
        this.data = r.result;
        console.log('datos usuario', this.data);
        document.getElementById('lead_client_avatar').setAttribute('src', '' + this.data.avatar);
        this.data.birthDate = this.data.birthDate.toString().substr(0, 10);


      }
    }, (r) => {
      console.log(r);
      this.apiService.loader = false;
    })
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


    if (this.data.genderId == null || this.data.genderId == 0) {
      this.toastr.error("Mensaje", "Selecciona tu genero");
    }
    else if (this.data.professionalLicense == null || this.data.professionalLicense == "") {
      this.toastr.error("Mensaje", "Captura tu cédula profesional");

    }
    else if (this.data.specialtyId == null || this.data.specialtyId == 0) {
      this.toastr.error("Mensaje", "Selecciona tu especialidad");
    }
    else if (this.data.email == null || this.data.email == "") {
      this.toastr.error("Mensaje", "Captura tu email");
    }  
    else {

      this.apiService.loader = true;



      this.data.SpecialtyId = Number(this.data.specialtyId);
      this.data.GenderId = Number(this.data.genderId);


      if (this.isImagen) {
        this.data.imageAvatar = this.imgCrop;
      }
      else {
        this.data.imageAvatar = "";
      }

      console.log('envio de datos', JSON.stringify(this.data));

      this.apiService.post(`/User/UpdateUser`, this.data).subscribe(
        (response) => {
          this.result = response
          if (this.result.result != null) {

            this.router.navigate(['exitoaddusuario', this.result.result.name]);
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
