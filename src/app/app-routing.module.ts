import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './componentes/admin/admin.component';
import { FormularioComponent } from './componentes/formulario/formulario.component';
import { LoginComponent } from './componentes/login/login.component';
import { MaquinasComponent } from './componentes/maquinas/maquinas.component';
import { ReportesComponent } from './componentes/reportes/reportes.component';
import { TecnicoComponent } from './componentes/tecnico/tecnico.component';
import { TecnicosComponent } from './componentes/tecnicos/tecnicos.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'formulario', component: FormularioComponent},
  {path: 'tecnico', component: TecnicoComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'maquinas', component: MaquinasComponent },
  {path: 'reportes', component: ReportesComponent},
  {path: 'tecnicos', component: TecnicosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
