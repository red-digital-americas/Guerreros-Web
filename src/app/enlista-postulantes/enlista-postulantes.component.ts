import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enlista-postulantes',
  templateUrl: './enlista-postulantes.component.html',
  styleUrls: ['./enlista-postulantes.component.css']
})
export class EnlistaPostulantesComponent implements OnInit {
  medicos: any[] = [];
  pacientes: any[] = [];
  fechaInicial: string = "";
  FechaFinal: string = "";
  medicoId: number = 0;
  pacienteId: string = "0";
  result: any[] = [];
  pacientecode: string = "";
  resultdetalle: any = {};

  @ViewChild('pdetalleModal', { static: true }) pdetalleModal: NgbModal;

  constructor(private apiService: ApiService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    var dinicial = new Date();
    dinicial.setDate(dinicial.getDate() - 10);

    this.fechaInicial = dinicial.toISOString().substr(0, 10);
    this.FechaFinal = new Date().toISOString().substr(0, 10);



    this.getUsuariosMedicos();
    this.getPacientes();
    this.getPostulaciones();


  }

  getUsuariosMedicos() {


    this.apiService.loader = true;



    this.apiService.get(`/BackOffice/GetDDLUsuariosMedicos`).subscribe((r) => {
      this.apiService.loader = false;
      if (r.success) {
        this.medicos = r.result;
        console.log(this.medicos);

      }
    }, (r) => {
      console.log(r);
      this.apiService.loader = false;
    })



  }

  getPacientes() {
    this.apiService.loader = true;

    this.apiService.get(`/BackOffice/GetDDLPostulaciones`).subscribe((r) => {
      this.apiService.loader = false;
      if (r.success) {
        this.pacientes = r.result;
        console.log(this.pacientes);

      }
    }, (r) => {
      console.log(r);
      this.apiService.loader = false;
    })



  }


  modalDetallePostulacion(id) {



    this.apiService.loader = true;

    this.apiService.get(`/BackOffice/GetDetallePostulacionBackOffice?postulacionId=${id}`).subscribe((r) => {
      this.apiService.loader = false;
      if (r.success) {
        this.resultdetalle = r.result;
        console.log(this.pacientes);

      }
    }, (r) => {
      console.log(r);
      this.apiService.loader = false;
    })



    this.modalService.open(this.pdetalleModal, { scrollable: true, size: 'lg' });
  }


  enviaUpdate(id) {
    this.router.navigate(['updatepostulantes', id]);

  }


  getPostulaciones() {

    this.apiService.loader = true;

    console.log(this.fechaInicial);
    console.log(this.FechaFinal);
    console.log(this.medicoId);
    console.log(this.pacienteId);

    if (this.pacienteId == "0") {
      this.pacientecode = "";
    }
    else {
      this.pacientecode = this.pacienteId;
    }

    this.apiService.get(`/BackOffice/GetEnzabezadoPostulaciones?fechaInicial=${this.fechaInicial}&FechaFinal=${this.FechaFinal}&idMedico=${this.medicoId}&idPaciente=${this.pacientecode}`).subscribe((r) => {
      this.apiService.loader = false;
      if (r.success) {
        this.result = r.result;
        console.log('resultado de busqueda',this.result);

      }
    }, (r) => {
      console.log(r);
      this.apiService.loader = false;
    })
  }

}
