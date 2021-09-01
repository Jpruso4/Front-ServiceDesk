import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from './login.model';

@Injectable()
export class DataServices {
  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string) {
    let userLogin = new Login(email, password);
    return this.httpClient.post('http://localhost:9090/login', userLogin).subscribe(
      (response) => console.log('El usuario inicio la sesion' + response.toString),
      (error) => console.log('Error al guardar Personas: ' + error)
    );
  }
}
