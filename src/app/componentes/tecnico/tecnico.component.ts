import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Tecnico } from 'src/app/tecnico.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tecnico',
  templateUrl: './tecnico.component.html',
  styleUrls: ['./tecnico.component.css']
})
export class TecnicoComponent implements OnInit {
  
  incidentes: any;
  respuesta: any;
  tecnico: Tecnico;
  idIncidente: number;

  declaracionTecnico: string;
  fechaSolucion: Date;

  declaracionEscalonado: string;
  asignarTipoIncidente: string;
  asignarTecnico: string;

  tecnicosTipoIncidente: any;

  constructor(private httpClient: HttpClient, public modal:NgbModal) { 
    this.obtener_localstorage();
  }

  ngOnInit(){ 
    this.httpClient.get('http://localhost:9090/incidentes/incidentesTecnico/'+ this.tecnico.idTecnico).subscribe(
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

  resolverIncidente(){
    Swal.fire({
      title: 'Solucionar Incidente',
      text: '¿Desea solucionar el incidente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Solucionar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
          this.httpClient.put('http://localhost:9090/incidentes/solucion', this.mapperModeloIncidente()).subscribe((response) =>{
            this.respuesta = response;
            if(this.respuesta.body){
              Swal.fire(
                'Incidente resuelto con exito',
                'El incidente se ha resulto con exito',
              );
              window.location.reload();
            }
            window.location.reload();  
          })
      }else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Solución Cancelada',
          'La solución no se ha podido completar',
          'error'
        );
      }
    });
  }
  
  escalonarIncidente(){
    Swal.fire({
      title: 'Escalonar Incidente',
      text: '¿Desea escalonar el incidente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Escalonar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
          this.httpClient.put('http://localhost:9090/incidentes', this.mapperModeloIncidenteEscalonar()).subscribe((response) =>{
            this.respuesta = response;
            if(this.respuesta.body){
              Swal.fire(
                'Incidente escalonado con exito',
                'El incidente se ha escalonado con exito',
              );
              window.location.reload();
            }
            window.location.reload();  
          })
      }else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Escalonamiento Cancelada',
          'El escalonamiento no se ha podido completar',
          'error'
        );
      }
    });
  }

  openModal(template: TemplateRef<any>, idIncidente: number){
    this.idIncidente = idIncidente;
    this.modal.open(template);
  }

  openModalEscalonar(template: TemplateRef<any>, idIncidente: number){
    this.idIncidente = idIncidente;
    this.modal.open(template);
  }

  mapperModeloIncidente(){
    return {
      idIncidente: this.idIncidente,
      fechaSolucion: this.fechaSolucion,
      declaracionTecnico: this.declaracionTecnico,
      estado: "0"
    }
  }

  mapperModeloIncidenteEscalonar(){
    return {
      idIncidente: this.idIncidente,
      tecnico:{
        nombres: this.asignarTecnico
      },
      tipoIncidente:{
        nombreTipoIncidente: this.asignarTipoIncidente
      },
      idTecnicoEscalono: this.tecnico.idTecnico,
      declaracionEscalonamiento: this.declaracionEscalonado 
    }
  }

  arrayTipoTecnicos(){
    this.httpClient.get('http://localhost:9090/tecnico/tipoTecnico/'+ this.asignarTipoIncidente).subscribe(
      (response) => {
        this.tecnicosTipoIncidente = response;
        console.log(this.tecnicosTipoIncidente);     
    },
      (error) => console.log('Error al mostrar Incidentes: ' + error)
    );
  }
}

