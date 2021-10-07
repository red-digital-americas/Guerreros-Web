import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-enlista-programas-apoyo',
  templateUrl: './enlista-programas-apoyo.component.html',
  styleUrls: ['./enlista-programas-apoyo.component.css']
})
export class EnlistaProgramasApoyoComponent implements OnInit {
  fechaInicial: string = "";
  FechaFinal: string = "";
  categoriaId: number = 0;
  categorias: any[] = [];
  result: any[] = [];
  resultdetalle: any = {};
  data: any = {};

  @ViewChild('pdetalleModal', { static: true }) pdetalleModal: NgbModal;
  constructor(private apiService: ApiService, private router: Router, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {

    var dinicial = new Date();
    dinicial.setDate(dinicial.getDate() - 10);

    this.fechaInicial = dinicial.toISOString().substr(0, 10);
    this.FechaFinal = new Date().toISOString().substr(0, 10);


    this.getProgramasApoyo();
    this.getCategorias();
    


  }




  modalDetallePrograma(id) {



    this.apiService.loader = true;

    this.apiService.get(`/Patient/GetSupportProgramsDetail?supportProgramId=${id}`).subscribe((r) => {
      this.apiService.loader = false;
      if (r.success) {
        this.resultdetalle = r.result;


      }
    }, (r) => {
      console.log(r);
      this.apiService.loader = false;
    })



    this.modalService.open(this.pdetalleModal, { scrollable: true, size: 'lg' });
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


  eliminarProgramaApoyo(id) {

    if (confirm("¿Esta seguro de querer eliminar el programa?")) {
      this.apiService.loader = true;



      this.apiService.post(`/BackOffice/deleteProgramasApoyo?progrmaApoyoId=${id}`, this.data).subscribe((r) => {
        this.apiService.loader = false;
        console.log("resultado:", r);
        if (r.result) {

          this.toastr.success("El programa de apoyo se elimino con exito");
          this.getProgramasApoyo();
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



  enviaUpdate(id) {
    this.router.navigate(['updateProgramasApoyo', id]);

  }

  getProgramasApoyo() {

    this.apiService.loader = true;

    console.log(this.fechaInicial);
    console.log(this.FechaFinal);
    
    console.log(this.categoriaId);


    this.apiService.get(`/BackOffice/GetSupportProgramsFiltros?fechaInicial=${this.fechaInicial}&FechaFinal=${this.FechaFinal}&categoriaId=${this.categoriaId}`).subscribe((r) => {
      this.apiService.loader = false;
      if (r.success) {
        this.result = r.result;
        console.log('resultado de busqueda', this.result);

      }
    }, (r) => {
      console.log(r);
      this.apiService.loader = false;
    })
  }





}
