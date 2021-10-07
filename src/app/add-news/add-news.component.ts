import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit {
  data: any = { id: 0, studyCategoryId: 0, title: "", contentNews: "", pathImage: "" };
  categorias: any[] = [];
  result: any = {};
  imgCrop: string = "";
  isImagen: boolean = false;
  imageChangedEvent: any = '';
  logo: string = "";

  constructor(private modalService: NgbModal, private apiService: ApiService, private toastr: ToastrService, private router: Router, private _Activatedroute: ActivatedRoute) { }

  ngOnInit(): void {

    this.getCategorias();
  }



  getCategorias() {

    this.apiService.loader = true;



    this.apiService.get(`/Patient/GetServiceStudyCategory`).subscribe((r) => {
      this.apiService.loader = false;
      if (r.success) {
        this.categorias = r.result;
        console.log(this.categorias);


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


  guardarNews() {


    if (this.data.studyCategoryId == null || this.data.studyCategoryId == 0) {
      this.toastr.error("Mensaje", "Seleccione una categoria");
    }
    else if (this.data.title == null || this.data.title == "") {
      this.toastr.error("Mensaje", "Capture el titulo de la noticia");

    }
    else if (this.data.contentNews == null || this.data.contentNews == "") {
      this.toastr.error("Mensaje", "Capture el contenido de la noticia");
    }
    else {

      this.apiService.loader = true;



      this.data.studyCategoryId = Number(this.data.studyCategoryId);



      if (this.isImagen) {
        this.data.pathImage = this.imgCrop;
      }
      else {
        this.data.pathImage = "";
      }

      console.log('envio de datos', JSON.stringify(this.data));

      this.apiService.post(`/BackOffice/addNews`, this.data).subscribe(
        (response) => {
          this.result = response
          if (this.result.result != null) {

            this.toastr.success("Mensaje", "La noticia se registro con exito");
            this.router.navigate(['news']);
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
