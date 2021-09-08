import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { TecnicoComponent } from './componentes/tecnico/tecnico.component';
import { FormularioComponent } from './componentes/formulario/formulario.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataServices } from './data.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { LoginService } from './componentes/login/login.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AdminComponent } from './componentes/admin/admin.component';
import { ReportesComponent } from './componentes/reportes/reportes.component';
import { TecnicosComponent } from './componentes/tecnicos/tecnicos.component';
import { MaquinasComponent } from './componentes/maquinas/maquinas.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TecnicoComponent,
    FormularioComponent,
    AdminComponent,
    ReportesComponent,
    TecnicosComponent,
    MaquinasComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [DataServices, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
