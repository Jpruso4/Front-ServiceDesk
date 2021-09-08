import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Tecnico } from 'src/app/tecnico.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tecnicos',
  templateUrl: './tecnicos.component.html',
  styleUrls: ['./tecnicos.component.css']
})
export class TecnicosComponent implements OnInit {
  idTecnico: number = 1;
  tecnicoSesion: Tecnico;
  tecnicos: any;

  tipoDocumentoNew: string;
  numeroDocumentoNew: string;
  tipoTecnicoNew: string;
  nombresNew: string;
  apellidosNew: string;
  telefonoNew: string;
  celularNew: string;
  correoNew: string;
  contrasenaNew: string;

  idTecnicoEdit: number;
  tipoDocumentoEdit: string;
  numeroDocumentoEdit: string;
  tipoTecnicoEdit: string;
  nombresEdit: string;
  apellidosEdit: string;
  telefonoEdit: string;
  celularEdit: string;
  correoEdit: string;
  contrasenaEdit: string

  respuesta: any;

  constructor(private httpClient: HttpClient, public modal:NgbModal) { 
    this.obtener_localstorage();
  }

  ngOnInit(){
    this.httpClient.get('http://localhost:9090/tecnico').subscribe(
      (response) => {
        this.tecnicos = response;
        console.log(this.tecnicos);     
    },
      (error) => console.log('Error al mostrar Incidentes: ' + error)
    );
  }
  
  obtener_localstorage(){
    this.tecnicoSesion = JSON.parse(localStorage.getItem("tecnico")!);
    console.log(this.tecnicoSesion);
  }

  openModal(template: TemplateRef<any>, idTecnico: number){
    this.idTecnico = idTecnico;
    this.modal.open(template);
  }

  openModalEditar(template: TemplateRef<any>, tecnico: any){
    this.idTecnicoEdit = tecnico.idTecnico;
    this.tipoDocumentoEdit = tecnico.tipoDocumento.nombreDocumento;
    this.numeroDocumentoEdit = tecnico.numeroDocumento;
    this.tipoTecnicoEdit = tecnico.tipoTecnico.especialidad;    
    this.nombresEdit = tecnico.nombres;
    this.apellidosEdit = tecnico.apellidos;
    this.telefonoEdit = tecnico.telefono;
    this.celularEdit = tecnico.celular;
    this.correoEdit = tecnico.correo;
    this.contrasenaEdit = tecnico.contrasena;
    this.modal.open(template);
  }

  editarTecnico(){
    Swal.fire({
      title: 'Editar Tecnico',
      text: '¿Desea editar el tecnico?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
          this.httpClient.put('http://localhost:9090/tecnico', this.mapperModeloTecnicoEditar()).subscribe((response) =>{
            this.respuesta = response;
            if(this.respuesta.body){
              Swal.fire(
                'Editado con exito',
                'Se ha editado con exito',
              );
              window.location.reload();
            }else{
              Swal.fire(
               'Editar fallado, por favor revise los campos'
              );
            }   
          })
      }else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Editar Cancelado',
          'La edición no se ha completado',
          'error'
        );
      }
    });
  }

  agregarTecnico(){
    Swal.fire({
      title: 'Registrar Tecnico',
      text: '¿Desea registrar un nuevo Tecnico?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Registrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
          this.httpClient.post('http://localhost:9090//tecnico', this.mapperModeloTecnicoAgregar()).subscribe((response) =>{
            this.respuesta = response;
            if(this.respuesta.body){
              Swal.fire(
                'Registro con exito',
                'El Registro se ha hecho con exito',
              );
              window.location.reload();
            }else{
              if(this.respuesta.errorCode === 13){
                Swal.fire(
                  'El usuario ya existe, por favor revise el numero de documento'
                );
              }else{
                Swal.fire(
                  'Registro fallado, por favor revise los campos'
                );
              }
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

  eliminarTecnico(idTecnicoEliminar: number){
    Swal.fire({
      title: 'Eliminar Tecnico',
      text: '¿Desea eliminar el tecnico?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
          this.httpClient.delete('http://localhost:9090/tecnico/' + idTecnicoEliminar).subscribe((response) =>{
            this.respuesta = response;
            if(this.respuesta.body){
              Swal.fire(
                'Eliminado con exito',
                'Se ha eliminado el registro con exito',
              );
              window.location.reload();
            }  
          })
      }else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Eliminar Cancelado',
          'La eliminación del registro no se ha completado',
          'error'
        );
      }
    });
  }

  mapperModeloTecnicoAgregar(){
    return{
      tipoDocumento:{
        nombreDocumento: this.tipoDocumentoNew
      },
      tipoTecnico:{
        especialidad: this.tipoTecnicoNew
      },
      numeroDocumento: this.numeroDocumentoNew,  
      nombres: this.nombresNew,
      apellidos: this.apellidosNew,
      telefono: this.telefonoNew,
      celular: this.celularNew,
      correo: this.correoNew,
      contrasena: this.contrasenaNew
    }
  }

  mapperModeloTecnicoEditar(){
    return{
      idTecnico: this.idTecnicoEdit,
      tipoDocumento:{
        nombreDocumento: this.tipoDocumentoEdit
      },
      tipoTecnico:{
        especialidad: this.tipoTecnicoEdit
      },
      numeroDocumento: this.numeroDocumentoEdit,  
      nombres: this.nombresEdit,
      apellidos: this.apellidosEdit,
      telefono: this.telefonoEdit,
      celular: this.celularEdit,
      correo: this.correoEdit,
      contrasena: this.contrasenaEdit
    }
  }
}
