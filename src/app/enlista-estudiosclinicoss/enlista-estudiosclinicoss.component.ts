import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-enlista-estudiosclinicoss',
  templateUrl: './enlista-estudiosclinicoss.component.html',
  styleUrls: ['./enlista-estudiosclinicoss.component.css']
})
export class EnlistaEstudiosclinicossComponent implements OnInit {
  fechaInicial: string = "";
  FechaFinal: string = "";
  estatusId: number = 0;
  categoriaId: number = 0;
  categorias: any[] = [];
  estatus: any[] = [];
  result: any[] = [];
  resultdetalle: any = {};
  data: any={};




  @ViewChild('pdetalleModal', { static: true }) pdetalleModal: NgbModal;
  constructor(private apiService: ApiService, private router: Router, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {

    var dinicial = new Date();
    dinicial.setDate(dinicial.getDate() - 10);

    this.fechaInicial = dinicial.toISOString().substr(0, 10);
    this.FechaFinal = new Date().toISOString().substr(0, 10);


    this.getEstatusEstudiosClinicos();
    this.getCategorias();
    this.getEstuciosClinicos();
  }


  modalDetalleEstudio(id) {



    this.apiService.loader = true;

    this.apiService.get(`/Patient/GetClinicalStudyDetail?StudiesCliniciansId=${id}`).subscribe((r) => {
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

  getEstatusEstudiosClinicos() {
    this.apiService.loader = true;



    this.apiService.get(`/BackOffice/GetEstatusEstudiosClinicos`).subscribe((r) => {
      this.apiService.loader = false;
      if (r.success) {
        this.estatus = r.result;
        console.log(this.estatus);


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


  eliminarEstudio(id) {

    if (confirm("¿Esta seguro de querer eliminar el estudio?")) {
      this.apiService.loader = true;



      this.apiService.post(`/BackOffice/deleteEstudiosClinicos?StudiesCliniciansId=${id}`,this.data).subscribe((r) => {
        this.apiService.loader = false;
        console.log("resultado:",r);
        if (r.result) {

          this.toastr.success("El estudio clinicio se elimino con exito");
          this.getEstuciosClinicos();
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
    this.router.navigate(['updateEstudiosClinicos', id]);

  }

  getEstuciosClinicos() {

    this.apiService.loader = true;

    console.log(this.fechaInicial);
    console.log(this.FechaFinal);
    console.log(this.estatusId);
    console.log(this.categoriaId);
    

    this.apiService.get(`/BackOffice/GetEnzabezadoEstudiosClinicos?fechaInicial=${this.fechaInicial}&FechaFinal=${this.FechaFinal}&statusId=${this.estatusId}&categoriaId=${this.categoriaId}`).subscribe((r) => {
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
