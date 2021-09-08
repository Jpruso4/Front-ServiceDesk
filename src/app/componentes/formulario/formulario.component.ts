import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Tecnico } from 'src/app/tecnico.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent implements OnInit {
  solucionCallCenter: string;
  fecha: Date;
  numeroDocumento: string;
  tipoDependencia: string;
  bloqueDependencia: string;
  numeroDependencia: string;
  numeroEquipo: number;
  problemaUsuario: string;
  tipoIncidente: string;
  declaracionCallcenter: string;
  tecnico: string = "";

  mostrarTecnico: boolean = false;
  mostrarDeclaracionCallCenter: boolean = false;

  tecnicoData: Tecnico;
  respuesta: any;

  tecnicosTipoIncidente: any;

  constructor(private httpClient: HttpClient) {
    this.obtener_localstorage();
  }

  ngOnInit(){}

  mostrarContenido() {
    if (this.solucionCallCenter === 'No') {
      this.mostrarTecnico = true;
      this.mostrarDeclaracionCallCenter = false;
    } else {
      if (this.solucionCallCenter === 'Sí')
        this.mostrarDeclaracionCallCenter = true;
      this.mostrarTecnico = false;
    }
  }

  obtener_localstorage() {
    this.tecnicoData = JSON.parse(localStorage.getItem('tecnico')!);
    console.log(this.tecnicoData);
  }

  registrarIncidente() {
    Swal.fire({
      title: 'Registrar Incidente',
      text: '¿Desea registrar un nuevo Incidente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Registrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
          this.httpClient.post('http://localhost:9090/incidentes', this.mapperModeloIncidente()).subscribe((response) =>{
            this.respuesta = response;
            if(this.respuesta.body){
              Swal.fire(
                'Registro con exito',
                'El Registro se ha hecho con exito',
              );
              window.location.reload();
            }else{
              Swal.fire(
                'Registro fallado, por favor revise los campos'
              );
            }   
          })
      }else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Registro Cancelado',
          'El registro no se ha completado',
          'error'
        );
      }
    });
  }
  

  validarUsuario() {
    Swal.fire({
      title: 'Validar Usuario',
      text: '¿Desea validar el usuario con numero de documento ' + this.numeroDocumento + " ?",
      icon: 'warning',
      confirmButtonText: 'Validar',
    }).then((result) => {
      if (result.isConfirmed) {
          this.httpClient.post('http://localhost:9090/usuario/validarUsuario', this.mappearModeloUsuario()).subscribe((response) =>{
            this.respuesta = response;
            if(this.respuesta.body){
              Swal.fire(
                'Validado con exito',
                'Usuario con documento '+this.numeroDocumento + ' ha sido validado con exito',
              );
            }else{
              Swal.fire(
                'Usuario inexistente'
              );
            }   
          })
      }
    });
  }

  validarMaquina(){
    Swal.fire({
      title: 'Validar Maquina',
      text: '¿Desea validar la maquina numero ' + this.numeroEquipo + ' del bloque '+ this.bloqueDependencia + ' del salon '+ this.numeroDependencia +" ?",
      icon: 'warning',
      confirmButtonText: 'Validar',
    }).then((result) => {
      if (result.isConfirmed) {
          this.httpClient.post('http://localhost:9090/maquina/validarMaquina', this.mappearModeloMaquina()).subscribe((response) =>{
            this.respuesta = response;
            if(this.respuesta.body){
              Swal.fire(
                'Validado con exito',
                'La maquina numero ' + this.numeroEquipo + ' del bloque '+ this.bloqueDependencia + ' en el salon '+ this.numeroDependencia + ' ha sido validado con exito',
              );
            }else{
              Swal.fire(
                'Maquina inexistente'
              );
            }   
          })
      }
    });
  }

  mappearModeloUsuario(){
    return {
      numeroDocumento: this.numeroDocumento
    }
  }

  mappearModeloMaquina(){
    return {
      tipoDependencia:{
        nombreDependencia: this.tipoDependencia
      },
      numeroComputador: this.numeroEquipo,
      numeroDependencia:{
        numeroDependencia: this.numeroDependencia
      },
      bloqueDependencia:{
        nombreBloqueDependencia: this.bloqueDependencia
      }
    }
  }

  mapperModeloIncidente(){
    return{
      fecha: this.fecha,
      usuario:{
        numeroDocumento: this.numeroDocumento
      },
      maquina:{
        tipoDependencia:{
          nombreDependencia: this.tipoDependencia
        },
        numeroComputador: this.numeroEquipo,
        numeroDependencia:{
          numeroDependencia: this.numeroDependencia
        },
        bloqueDependencia:{
          nombreBloqueDependencia: this.bloqueDependencia
        }
      },
      tecnico:{
        nombres: this.tecnico
      },
      tipoIncidente:{
        nombreTipoIncidente: this.tipoIncidente
      },
      declaracionCallcenter: this.declaracionCallcenter,
      problemaUsuario: this.problemaUsuario
    }
  }

  arrayTipoTecnicos(){
    this.httpClient.get('http://localhost:9090/tecnico/tipoTecnico/'+ this.tipoIncidente).subscribe(
      (response) => {
        this.tecnicosTipoIncidente = response;
        console.log(this.tecnicosTipoIncidente);     
    },
      (error) => console.log('Error al mostrar Incidentes: ' + error)
    );
  }
}
