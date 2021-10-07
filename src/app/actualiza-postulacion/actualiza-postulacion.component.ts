import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actualiza-postulacion',
  templateUrl: './actualiza-postulacion.component.html',
  styleUrls: ['./actualiza-postulacion.component.css']
})
export class ActualizaPostulacionComponent implements OnInit {
  data: any = { Id: 0, PatientCode: "", Name: "", Suffering: "", RelevantDate: "", Email: "", Phone: "", UserId: 0, Active: true, StudiesCliniciansId: 0 };
  result: any = {};
  userData: any = {};
  categoriaId: number = 0;
  estudioId: number = 0;
  categorias: any[] = [];
  estudios: any[] = [];
  postulacionDetalle: any = {};

  constructor(private toastr: ToastrService, private apiService: ApiService, private router: Router, private _Activatedroute: ActivatedRoute) { }

  ngOnInit(): void {

    this.getPostulacionDetalle(this._Activatedroute.snapshot.paramMap.get("id"));
    
    

    
  }


  getPostulacionDetalle(id) {
    this.apiService.loader = true;



    this.apiService.get(`/BackOffice/GetDetallePostulacionBackOffice?postulacionId=${id}`).subscribe((r) => {
      this.apiService.loader = false;
      if (r.success) {
        this.postulacionDetalle = r.result;
        console.log('consulta de postulacion', this.postulacionDetalle);
        this.getCategorias();

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
        this.getEstudios();

      }
    }, (r) => {
      console.log(r);
      this.apiService.loader = false;
    })



  }

  getEstudios() {

    this.apiService.loader = true;


    
    this.apiService.get(`/Patient/GetStudiesCliniciansByCategoryId?CategoryId=${this.postulacionDetalle.categoriaId}`).subscribe((r) => {
      this.apiService.loader = false;
      if (r.success) {
        this.estudios = r.result;
        console.log('son los estudios',this.estudios);

      }
    }, (r) => {
      console.log(r);
      this.apiService.loader = false;
    })



  }

  

  guardarPostulante() {

    if (this.postulacionDetalle.estudioMedicoId == null || this.postulacionDetalle.estudioMedicoId == 0) {
      this.toastr.error("Mensaje", "Seleccione el estudio médico");
    }
    else if (this.postulacionDetalle.padecimiento == null || this.postulacionDetalle.padecimiento == "") {
      this.toastr.error("Mensaje", "Escribe el padecimiento");
    }
    else if (this.postulacionDetalle.informacionRelevante == null || this.postulacionDetalle.informacionRelevante == "") {
      this.toastr.error("Mensaje", "Escribe los datos relevantes");
    }
    else if (this.postulacionDetalle.telefono == null || this.postulacionDetalle.telefono == "") {
      this.toastr.error("Mensaje", "Escribe el número de teléfono");
    }
    else if (this.postulacionDetalle.email == null || this.postulacionDetalle.email == "") {
      this.toastr.error("Mensaje", "Escribe el correo eléctronico");
    }
    else {



      this.apiService.loader = true;



      
      

      this.data.Id = this.postulacionDetalle.id;
      this.data.PatientCode = this.postulacionDetalle.pacienteId;
      this.data.Name = "";
      this.data.Suffering = this.postulacionDetalle.padecimiento;
      this.data.RelevantDate = this.postulacionDetalle.informacionRelevante;
      this.data.Email = this.postulacionDetalle.email;
      this.data.Phone = this.postulacionDetalle.telefono;
      this.data.Active = true;
      this.data.StudiesCliniciansId = this.postulacionDetalle.estudioMedicoId;
      this.data.UserId = Number(localStorage.getItem('user'));;



      console.log('envio de datos', JSON.stringify(this.data));

      this.apiService.post(`/Doctor/UpdatePostulation`, this.data).subscribe(
        (response) => {
          this.result = response
          if (this.result.result != null) {

            this.router.navigate(['enlistapostulantes']);
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
