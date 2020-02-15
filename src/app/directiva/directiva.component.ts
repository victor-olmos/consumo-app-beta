import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css']
})
export class DirectivaComponent implements OnInit {

  listado: String[] = ['phyton', 'el pejelagarto',' ella en 4', 'la tia igual','la hermana tambien','y la ailyn'];
  habilitar: boolean =true;
  constructor() { }

  ngOnInit() {
  }

}
