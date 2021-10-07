import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-postular-paciente',
  templateUrl: './postular-paciente.component.html',
  styleUrls: ['./postular-paciente.component.css']
})
export class PostularPacienteComponent implements OnInit {
  data: any = { Id: 0, PatientCode: "", Name: "", Suffering: "", RelevantDate: "", Email: "", Phone: "", UserId: 0, Active: true, StudiesCliniciansId: 0 };
  result: any = {};
  userData: any = {};
  categoriaId: number = 0;
  estudioId: number = 0;
  categorias: any[] = [];
  estudios: any[] = [];


  constructor(private toastr: ToastrService, private apiService: ApiService, private router: Router) { }

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

  getEstudios() {

    this.apiService.loader = true;



    this.apiService.get(`/Patient/GetStudiesCliniciansByCategoryId?CategoryId=${this.categoriaId}`).subscribe((r) => {
      this.apiService.loader = false;
      if (r.success) {
        this.estudios = r.result;
        console.log(this.estudios);

      }
    }, (r) => {
      console.log(r);
      this.apiService.loader = false;
    })



  }

  guardarPostulante() {

    if (this.estudioId == null || this.estudioId == 0) {
      this.toastr.error("Mensaje", "Seleccione el estudio médico");
    }
    else if (this.data.Suffering == null || this.data.Suffering == "") {
      this.toastr.error("Mensaje", "Escribe el padecimiento");
    }
    else if (this.data.RelevantDate == null || this.data.RelevantDate == "") {
      this.toastr.error("Mensaje", "Escribe los datos relevantes");
    }
    else if (this.data.Phone == null || this.data.Phone == "") {
      this.toastr.error("Mensaje", "Escribe el número de teléfono");
    }
    else if (this.data.Email == null || this.data.Email == "") {
      this.toastr.error("Mensaje", "Escribe el correo eléctronico");
    }
    else {



      this.apiService.loader = true;



      this.data.UserId = Number(localStorage.getItem('user'));;
      this.data.StudiesCliniciansId = Number(this.estudioId);


      

      console.log('envio de datos', JSON.stringify(this.data));

      this.apiService.post(`/Doctor/AddNewPostulation`, this.data).subscribe(
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
