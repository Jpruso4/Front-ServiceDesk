import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tecnico } from 'src/app/tecnico.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: [
  ]
})
export class AdminComponent implements OnInit {
  tecnico: Tecnico;
  incidentes: any;

  constructor(private httpClient: HttpClient) { 
    this.obtener_localstorage();
  }
  

  ngOnInit(){
    this.httpClient.get('http://localhost:9090/incidentes').subscribe(
      (response) => {
        this.incidentes = response;
        console.log(this.incidentes);     
    },
      (error) => console.log('Error al mostrar Incidentes: ' + error)
    );
  }

  obtener_localstorage(){
    this.tecnico = JSON.parse(localStorage.getItem("tecnico")!);
    console.log(this.tecnico);
  }

  openModalEscalonar(template: TemplateRef<any>){
    
  }
}
