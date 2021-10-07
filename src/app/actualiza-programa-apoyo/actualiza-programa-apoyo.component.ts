import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actualiza-programa-apoyo',
  templateUrl: './actualiza-programa-apoyo.component.html',
  styleUrls: ['./actualiza-programa-apoyo.component.css']
})
export class ActualizaProgramaApoyoComponent implements OnInit {
  data: any = { id: 0, studyCategoryId: 0, programTitle: "", programContent: "", publicationDate: "", active: 0, summary: "", approved: 0, mainIntervention: "", description: "", studyTypeId: 0, ageRange: "" };
  categorias: any[] = [];
  result: any = {};



  constructor(private apiService: ApiService, private toastr: ToastrService, private router: Router, private _Activatedroute: ActivatedRoute) { }

  ngOnInit(): void {



    this.getProgramaApoyoById(this._Activatedroute.snapshot.paramMap.get("id"));

    


    this.getCategorias();
  }

  getProgramaApoyoById(id) {


    

    this.apiService.loader = true;

    
    this.apiService.get(`/BackOffice/BackOfficeGetSupportProgramsDetail?supportProgramId=${id}`).subscribe((r) => {
      this.apiService.loader = false;
      if (r.success) {
        this.data = r.result;
        this.data.publicationDate = this.data.publicationDate.toString().substr(0, 10);
        console.log(this.data);


      }
    }, (r) => {
      console.log(r);
      this.apiService.loader = false;
    })
       


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


  actualiarApoyo() {
    if (this.data.studyCategoryId == null || this.data.studyCategoryId == 0) {
      this.toastr.error("Mensaje", "Selecciona una categoria");
    }
    else if (this.data.programTitle == null || this.data.programTitle == "") {
      this.toastr.error("Mensaje", "Captura el titulo del programa de apoyo");
    }
    else if (this.data.programContent == null || this.data.programContent == "") {
      this.toastr.error("Mensaje", "Captura el contenido del programa de apoyo");
    }
    else if (this.data.mainIntervention == null || this.data.mainIntervention == "") {
      this.toastr.error("Mensaje", "Captura el contenido del la intervensión principal");
    }
    else if (this.data.description == null || this.data.description == "") {
      this.toastr.error("Mensaje", "Captura la descripción del programa de apoyo");
    }
    else if (this.data.summary == null || this.data.summary == "") {
      this.toastr.error("Mensaje", "Captura resumen del programa de apoyo");
    }
    else {

      this.data.studyCategoryId = Number(this.data.studyCategoryId);
      this.data.studyTypeId = Number(this.data.studyTypeId);
      this.data.approved = Number(this.data.approved);
      this.data.active = Number(this.data.active);
      this.data.id = this._Activatedroute.snapshot.paramMap.get("id");


      this.apiService.loader = true;





      console.log('envio de datos', JSON.stringify(this.data));

      this.apiService.post(`/BackOffice/UpdateProgramasApoyo`, this.data).subscribe(
        (response) => {
          this.result = response
          if (this.result.result != null) {


            this.apiService.loader = false;
            this.toastr.success("Mensaje", "El programa de apoyo se actualizo con exito");
            this.router.navigate(['enlistaApoyos']);


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
