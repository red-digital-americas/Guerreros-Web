import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-enlista-news',
  templateUrl: './enlista-news.component.html',
  styleUrls: ['./enlista-news.component.css']
})
export class EnlistaNewsComponent implements OnInit {
  fechaInicial: string = "";
  FechaFinal: string = "";
  estatusId: number = 0;
  categoriaId: number = 0;
  categorias: any[] = [];
  estatus: any[] = [];
  result: any[] = [];
  resultdetalle: any = {};
  data: any = {};


  constructor(private apiService: ApiService, private router: Router, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.getNews();
  }



  



  



  enviaUpdate(id) {
    this.router.navigate(['updatenews', id]);

  }

  getNews() {

    this.apiService.loader = true;


    this.apiService.get(`/Patient/GetNews`).subscribe((r) => {
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
