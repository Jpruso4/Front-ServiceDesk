import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Tecnico } from 'src/app/tecnico.model';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  tecnico: Tecnico;
  tecnicoMasIncidente: any;
  usuarioMasIncidente: any;
  tipoMasIncidente: any;
  incidentesActivos: any;
  incidentesInactivos: any;
  

  fechaInicioTecnico: Date;
  fechaFinTecnico: Date;

  fechaInicioUsuario: Date;
  fechaFinUsuario: Date;

  fechaInicioTipo: Date;
  fechaFinTipo: Date;

  fechaInicioIncidentesCerrados: Date;
  fechaFinIncidentesCerrados: Date;

  fechaInicioIncidentesAbiertos: Date;
  fechaFinIncidentesAbiertos: Date;

    
  constructor(private httpClient: HttpClient) {
    this.obtener_localstorage();
    
   }

  ngOnInit(){}
  
  obtener_localstorage(){
    this.tecnico = JSON.parse(localStorage.getItem("tecnico")!);
    console.log(this.tecnico);
  }

  tecnicoConMasIncidentes(){
    this.httpClient.post('http://localhost:9090/incidentes/TecnicoMasIncidente',this.mappearModeloFechasReports(this.fechaInicioTecnico, this.fechaFinTecnico)).subscribe(
      (response) => {
        this.tecnicoMasIncidente = response;
        console.log(this.tecnicoMasIncidente);     
    },
      (error) => console.log('Error al mostrar Incidentes: ' + error)
    );
  }

  usuarioConMasIncidentes(){
    this.httpClient.post('http://localhost:9090/incidentes/UsuarioMasIncidente',this.mappearModeloFechasReports(this.fechaInicioUsuario, this.fechaFinUsuario)).subscribe(
      (response) => {
        this.usuarioMasIncidente = response;
        console.log(this.usuarioMasIncidente);     
    },
      (error) => console.log('Error al mostrar Incidentes: ' + error)
    );
  }

  tipoIncidenteMasReportado(){
    this.httpClient.post('http://localhost:9090/incidentes/TipoMasIncidente',this.mappearModeloFechasReports(this.fechaInicioTipo, this.fechaFinTipo)).subscribe(
      (response) => {
        this.tipoMasIncidente = response;
        console.log(this.tipoMasIncidente);     
    },
      (error) => console.log('Error al mostrar Incidentes: ' + error)
    );
  }

  incidentesTotalCerrados(){
    this.httpClient.post('http://localhost:9090/incidentes/IncidentesActivos',this.mappearModeloFechasReports(this.fechaInicioIncidentesCerrados, this.fechaFinIncidentesCerrados)).subscribe(
      (response) => {
        this.incidentesActivos = response;
        console.log(this.incidentesActivos);     
    },
      (error) => console.log('Error al mostrar Incidentes: ' + error)
    );
  }

  incidentesTotalAbiertos(){
    this.httpClient.post('http://localhost:9090/incidentes/IncidentesInactivos',this.mappearModeloFechasReports(this.fechaInicioIncidentesAbiertos, this.fechaFinIncidentesAbiertos)).subscribe(
      (response) => {
        this.incidentesInactivos = response;
        console.log(this.incidentesInactivos);     
    },
      (error) => console.log('Error al mostrar Incidentes: ' + error)
    );
  }

  mappearModeloFechasReports(fechaInicio:Date, fechaFin:Date){
    return {
      fechaInicioTecnico: fechaInicio,
      fechaFinTecnico: fechaFin
    }
  }
}
