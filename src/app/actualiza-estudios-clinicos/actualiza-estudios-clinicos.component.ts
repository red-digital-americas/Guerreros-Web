import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actualiza-estudios-clinicos',
  templateUrl: './actualiza-estudios-clinicos.component.html',
  styleUrls: ['./actualiza-estudios-clinicos.component.css'],
})
export class ActualizaEstudiosClinicosComponent implements OnInit {
  data: any = {
    id: 0,
    studyCategoryId: 0,
    satatusId: 0,
    name: '',
    title: '',
    studyContent: '',
    mainIntervention: '',
    protocolNumber: '',
    ageRangeId: 0,
    studyTypeId: 0,
    description: '',
    approved: Boolean,
    publicationDate: '',
  };
  categorias: any[] = [];
  estatus: any[] = [];
  edades: any[] = [];
  tipoEstudios: any[] = [];
  result: any = {};

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private _Activatedroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getEstudioClinicoById(
      this._Activatedroute.snapshot.paramMap.get('id')
    );

    console.log('esta es la fecha', this.data.publicationDate);

    this.getCategorias();
    this.getEstatus();
    this.getRangoEdad();
    this.getTipoEstudio();
  }

  getEstudioClinicoById(id) {
    this.apiService.loader = true;

    this.apiService
      .get(`/BackOffice/GetEstudioClinicoById?clinicianStudyId=${id}`)
      .subscribe(
        (r) => {
          this.apiService.loader = false;
          if (r.success) {
            this.data = r.result;
            console.log('datos devueltos', this.data);
            this.data.publicationDate = this.data.publicationDate
              .toString()
              .substr(0, 10);
          }
        },
        (r) => {
          console.log(r);
          this.apiService.loader = false;
        }
      );
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
    if (this.data.studyCategoryId == null || this.data.studyCategoryId == 0) {
      this.toastr.error('Mensaje', 'Selecciona una categoria');
    } else if (this.data.satatusId == null || this.data.satatusId == 0) {
      this.toastr.error('Mensaje', 'Selecciona un estatus');
    } else if (this.data.title == null || this.data.title == '') {
      this.toastr.error('Mensaje', 'Captura el titulo del estudio');
    } else if (this.data.studyContent == null || this.data.studyContent == '') {
      this.toastr.error('Mensaje', 'Captura el contenido del estudio');
    } else if (
      this.data.mainIntervention == null ||
      this.data.mainIntervention == ''
    ) {
      this.toastr.error(
        'Mensaje',
        'Captura la intervensión principal del estudio'
      );
    } else if (
      this.data.protocolNumber == null ||
      this.data.protocolNumber == ''
    ) {
      this.toastr.error('Mensaje', 'Captura el número de protocolo');
    } else if (this.data.ageRangeId == null || this.data.ageRangeId == 0) {
      this.toastr.error('Mensaje', 'Selecciona un rango de edad');
    } else if (this.data.studyTypeId == null || this.data.studyTypeId == 0) {
      this.toastr.error('Mensaje', 'Selecciona el tipo de estudio');
    } else if (this.data.description == null || this.data.description == '') {
      this.toastr.error('Mensaje', 'Captura la descripción del estudio');
    } else {
      this.data.studyCategoryId = Number(this.data.studyCategoryId);
      this.data.satatusId = Number(this.data.satatusId);
      this.data.ageRangeId = Number(this.data.ageRangeId);
      this.data.studyTypeId = Number(this.data.studyTypeId);

      this.apiService.loader = true;

      console.log('envio de datos', JSON.stringify(this.data));

      this.apiService
        .post(`/BackOffice/UpdateEstudiosClinicos`, this.data)
        .subscribe(
          (response) => {
            this.result = response;
            if (this.result.result != null) {
              this.apiService.loader = false;
              this.toastr.success(
                'Mensaje',
                'El estudio clinico se actualizo con exito'
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
