import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { Login } from 'src/app/login.model';
import { Tecnico } from 'src/app/tecnico.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string;
  password:string;
  dataTecnico : any;

  constructor(
    private router: Router,
    private flashMessages: FlashMessagesService,
    private loginService: LoginService,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
  }

  login(){
    let userLogin = new Login(this.email, this.password);
    return this.httpClient.post('http://localhost:9090/login', userLogin).subscribe(
      (response) => {
        this.dataTecnico = response;
        if(this.dataTecnico.body.nombres === "Call"){
          let tecnico: Tecnico = this.dataTecnico.body;
          this.grabar_localstorage(tecnico);
          this.router.navigate(["/formulario"]);
        }else 
          if(this.dataTecnico.body.nombres === "Admin"){
            let tecnico: Tecnico = this.dataTecnico.body;
            this.grabar_localstorage(tecnico);
            this.router.navigate(["/admin"])
          }else{
            let tecnico: Tecnico = this.dataTecnico.body;
            this.grabar_localstorage(tecnico);
            this.router.navigate(["/tecnico"]);
          }
        console.log(this.dataTecnico)     
    },
      (error) => console.log('Error al guardar Personas: ' + error)
    );
  }

  grabar_localstorage(tecnico:Tecnico){
    localStorage.setItem("tecnico", JSON.stringify(tecnico));
  }

}
