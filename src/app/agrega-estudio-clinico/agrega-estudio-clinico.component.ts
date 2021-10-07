import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-agrega-estudio-clinico',
  templateUrl: './agrega-estudio-clinico.component.html',
  styleUrls: ['./agrega-estudio-clinico.component.css'],
})
export class AgregaEstudioClinicoComponent implements OnInit {
  data: any = {
    Id: 0,
    StudyCategoryId: 0,
    SatatusId: 0,
    name: '',
    Title: '',
    StudyContent: '',
    MainIntervention: '',
    ProtocolNumber: '',
    ageRangeId: 0,
    StudyTypeId: 0,
    Description: '',
    approved: Boolean,
    PublicationDate: '',
  };
  categorias: any[] = [];
  estatus: any[] = [];
  edades: any[] = [];
  tipoEstudios: any[] = [];
  result: any = {};

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.data.PublicationDate = new Date().toISOString().substr(0, 10);

    this.getCategorias();
    this.getEstatus();
    this.getRangoEdad();
    this.getTipoEstudio();
  }

  getTipoEstudio() {
    this.apiService.loader = true;

    this.apiService.get(`/Patient/GetAllStudyType`).subscribe(
      (r) => {
        this.apiService.loader = false;
        if (r.success) {
          this.tipoEstudios = r.result;
          console.log(this.tipoEstudios);
        }
      },
      (r) => {
        console.log(r);
        this.apiService.loader = false;
      }
    );
  }

  getRangoEdad() {
    this.apiService.loader = true;

    this.apiService.get(`/Patient/GetAllAgeRange`).subscribe(
      (r) => {
        this.apiService.loader = false;
        if (r.success) {
          this.edades = r.result;
          console.log('estas son las edades', this.edades);
        }
      },
      (r) => {
        console.log(r);
        this.apiService.loader = false;
      }
    );
  }

  getCategorias() {
    this.apiService.loader = true;

    this.apiService.get(`/Patient/GetServiceStudyCategory`).subscribe(
      (r) => {
        this.apiService.loader = false;
        if (r.success) {
          this.categorias = r.result;
          console.log(this.categorias);
        }
      },
      (r) => {
        console.log(r);
        this.apiService.loader = false;
      }
    );
  }

  getEstatus() {
    this.apiService.loader = true;

    this.apiService.get(`/BackOffice/GetEstatusEstudiosClinicos`).subscribe(
      (r) => {
        this.apiService.loader = false;
        if (r.success) {
          this.estatus = r.result;
          console.log(this.estatus);
        }
      },
      (r) => {
        console.log(r);
        this.apiService.loader = false;
      }
    );
  }

  guardarEstudios() {
    if (this.data.StudyCategoryId == null || this.data.StudyCategoryId == 0) {
      this.toastr.error('Mensaje', 'Selecciona una categoria');
    } else if (this.data.SatatusId == null || this.data.SatatusId == 0) {
      this.toastr.error('Mensaje', 'Selecciona un estatus');
    } else if (this.data.name == null || this.data.name == '') {
      this.toastr.error('Mensaje', 'Captura el nombre de la enfermedad');
    } else if (this.data.Title == null || this.data.Title == '') {
      this.toastr.error('Mensaje', 'Captura el titulo del estudio');
    } else if (this.data.StudyContent == null || this.data.StudyContent == '') {
      this.toastr.error('Mensaje', 'Captura el contenido del estudio');
    } else if (
      this.data.MainIntervention == null ||
      this.data.MainIntervention == ''
    ) {
      this.toastr.error(
        'Mensaje',
        'Captura la intervensión principal del estudio'
      );
    } else if (
      this.data.ProtocolNumber == null ||
      this.data.ProtocolNumber == ''
    ) {
      this.toastr.error('Mensaje', 'Captura el número de protocolo');
    } else if (this.data.ageRangeId == null || this.data.ageRangeId == 0) {
      this.toastr.error('Mensaje', 'Selecciona un rango de edad');
    } else if (this.data.StudyTypeId == null || this.data.StudyTypeId == 0) {
      this.toastr.error('Mensaje', 'Selecciona el tipo de estudio');
    } else if (this.data.Description == null || this.data.Description == '') {
      this.toastr.error('Mensaje', 'Captura la descripción del estudio');
    } else {
      this.data.StudyCategoryId = Number(this.data.StudyCategoryId);
      this.data.SatatusId = Number(this.data.SatatusId);
      this.data.ageRangeId = Number(this.data.ageRangeId);
      this.data.StudyTypeId = Number(this.data.StudyTypeId);
      this.data.approved = Boolean(this.data.approved);

      this.apiService.loader = true;

      console.log('envio de datos', JSON.stringify(this.data));

      this.apiService
        .post(`/BackOffice/AddEstudiosClinicos`, this.data)
        .subscribe(
          (response) => {
            this.result = response;
            if (this.result.result != null) {
              this.apiService.loader = false;
              this.toastr.success(
                'Mensaje',
                'El estudio clinico se registro con exito'
              );
              this.router.navigate(['enlistaestudios']);
            } else {
              this.toastr.error('Mensaje', 'Error al registrar');
              this.apiService.loader = false;
            }
          },
          (error) => {
            if (error.status === 500) {
              this.toastr.error('Mensaje', 'Error al registrar');
              this.apiService.loader = false;
            }
          }
        );
    }
  }
}
