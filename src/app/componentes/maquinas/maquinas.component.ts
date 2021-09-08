import { Component, OnInit } from '@angular/core';
import { Tecnico } from 'src/app/tecnico.model';

@Component({
  selector: 'app-maquinas',
  templateUrl: './maquinas.component.html',
  styleUrls: ['./maquinas.component.css']
})
export class MaquinasComponent implements OnInit {
  tecnico: Tecnico;
  constructor() {
    this.obtener_localstorage();
   }

  ngOnInit(): void {
  }
  
  obtener_localstorage(){
    this.tecnico = JSON.parse(localStorage.getItem("tecnico")!);
    console.log(this.tecnico);
  }
}
