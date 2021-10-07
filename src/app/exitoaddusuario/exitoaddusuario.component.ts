import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exitoaddusuario',
  templateUrl: './exitoaddusuario.component.html',
  styleUrls: ['./exitoaddusuario.component.css']
})
export class ExitoaddusuarioComponent implements OnInit {
  name: string = "";
  constructor(private _Activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.name = this._Activatedroute.snapshot.paramMap.get("name");


  }

}
