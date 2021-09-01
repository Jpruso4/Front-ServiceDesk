import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioComponent } from './componentes/formulario/formulario.component';
import { LoginComponent } from './componentes/login/login.component';
import { TecnicoComponent } from './componentes/tecnico/tecnico.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'formulario', component: FormularioComponent},
  {path: 'tecnico', component: TecnicoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
