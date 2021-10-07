import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  
  result: any[] = [];
  especialidades: any[] = [];
  fechaInicial: string = "";
  FechaFinal: string = "";
  specialityId: number = 0;
  name: string = "";
  especialidad: number = 0;
  data: any = {};

  filter: any = {
    nombre:null
  };

  constructor(private apiService: ApiService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {

    var dinicial = new Date();
    dinicial.setDate(dinicial.getDate() - 10);

    this.fechaInicial = dinicial.toISOString().substr(0, 10);
    this.FechaFinal = new Date().toISOString().substr(0, 10);


    this.getUsuarios();
    this.getEspecialidades();
  }

  enviaUpdate(id) {
    this.router.navigate(['updateUsuarios', id]);

  }



  getUsuarios() {

    this.apiService.loader = true;

    console.log(this.fechaInicial);
    console.log(this.FechaFinal);

    this.apiService.get(`/User/GetCuentasMedicos?fechaInicial=${this.fechaInicial}&FechaFinal=${this.FechaFinal}&specialityId=${this.especialidad}&name=${this.name}`).subscribe((r) => {
      this.apiService.loader = false;
      if (r.success) {
        this.result = r.result;
        console.log(this.result);

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
        this.especialidades = r.result;
        

      }
    }, (r) => {
      console.log(r);
      this.apiService.loader = false;
    })

  }



  eliminarUsuario(id) {
    if (confirm("¿Esta seguro de querer eliminar al usuario?")) {
      this.apiService.loader = true;




      this.apiService.post(`/User/deleteUsuario?idUsuario=${id}`, this.data).subscribe((r) => {
        this.apiService.loader = false;
        console.log("resultado:", r);
        if (r.result) {

          this.toastr.success("El usuario se elimino con exito");
          this.getUsuarios();
          this.apiService.loader = false;
        }
        else {
          this.toastr.error(r.message);
          this.apiService.loader = false;
        }
      }, (r) => {
        console.log(r);
        this.apiService.loader = false;
      })
    }

  }
}
