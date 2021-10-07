import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualizaEstudiosClinicosComponent } from './actualiza-estudios-clinicos/actualiza-estudios-clinicos.component';
import { ActualizaPostulacionComponent } from './actualiza-postulacion/actualiza-postulacion.component';
import { ActualizaProgramaApoyoComponent } from './actualiza-programa-apoyo/actualiza-programa-apoyo.component';
import { ActualizaUsuarioComponent } from './actualiza-usuario/actualiza-usuario.component';
import { AddNewsComponent } from './add-news/add-news.component';
import { AgregaEstudioClinicoComponent } from './agrega-estudio-clinico/agrega-estudio-clinico.component';
import { AgregarProgramaApoyoComponent } from './agregar-programa-apoyo/agregar-programa-apoyo.component';
import { AgregarUsuarioComponent } from './agregar-usuario/agregar-usuario.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EnlistaEstudiosclinicossComponent } from './enlista-estudiosclinicoss/enlista-estudiosclinicoss.component';
import { EnlistaNewsComponent } from './enlista-news/enlista-news.component';
import { EnlistaPostulantesComponent } from './enlista-postulantes/enlista-postulantes.component';
import { EnlistaProgramasApoyoComponent } from './enlista-programas-apoyo/enlista-programas-apoyo.component';
import { ExitoaddusuarioComponent } from './exitoaddusuario/exitoaddusuario.component';
import { LoguinComponent } from './loguin/loguin.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { PostularPacienteComponent } from './postular-paciente/postular-paciente.component';
import { RecuperaPasswordComponent } from './recupera-password/recupera-password.component';
import { UpdateNewsComponent } from './update-news/update-news.component';

const routes: Routes = [
  {
    path: '',
    component:LoguinComponent

  },
  {
    path: 'dashboard',
    component:DashboardComponent
  },
  {
    path: 'recuperapassw/:email',
    component:RecuperaPasswordComponent
  },
  {
    path: 'usuarios',
    component:PerfilUsuarioComponent
  },
  {
    path: 'addusuarios',
    component:AgregarUsuarioComponent
  },
  {
    path: 'exitoaddusuario/:name',
    component:ExitoaddusuarioComponent
  },
  {
    path: 'enlistapostulantes',
    component:EnlistaPostulantesComponent
  },
  {
    path: 'addpostulante',
    component:PostularPacienteComponent
  },
  {
    path: 'updatepostulantes/:id',
    component:ActualizaPostulacionComponent
  },
  {
    path: 'enlistaestudios',
    component:EnlistaEstudiosclinicossComponent
  },
  {
    path: 'addEstudiosClinicos',
    component:AgregaEstudioClinicoComponent
  },
  {
    path: 'updateEstudiosClinicos/:id',
    component:ActualizaEstudiosClinicosComponent
  },
  {
    path: 'enlistaApoyos',
    component:EnlistaProgramasApoyoComponent
  },
  {
    path: 'addProgramasApoyo',
    component:AgregarProgramaApoyoComponent
    
  },
  {
    path: 'updateProgramasApoyo/:id',
    component:ActualizaProgramaApoyoComponent
  },
  {
    path: 'updateUsuarios/:id',
    component: ActualizaUsuarioComponent
  },
  {
    path: 'news',
    component:EnlistaNewsComponent
  },
  {
    path: 'updatenews/:id',
    component:UpdateNewsComponent
  },
  {
    path: 'addnews',
    component:AddNewsComponent
  }

  




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
