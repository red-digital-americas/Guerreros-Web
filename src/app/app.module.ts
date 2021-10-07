import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoguinComponent } from './loguin/loguin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RecuperaPasswordComponent } from './recupera-password/recupera-password.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { NgxLoadingModule } from 'ngx-loading';
import { ChartsModule } from 'ng2-charts';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { AgregarUsuarioComponent } from './agregar-usuario/agregar-usuario.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ExitoaddusuarioComponent } from './exitoaddusuario/exitoaddusuario.component';
import { EnlistaPostulantesComponent } from './enlista-postulantes/enlista-postulantes.component';
import { DetallePostulacionComponent } from './detalle-postulacion/detalle-postulacion.component';
import { PostularPacienteComponent } from './postular-paciente/postular-paciente.component';
import { ActualizaPostulacionComponent } from './actualiza-postulacion/actualiza-postulacion.component';
import { EnlistaEstudiosclinicossComponent } from './enlista-estudiosclinicoss/enlista-estudiosclinicoss.component';
import { AgregaEstudioClinicoComponent } from './agrega-estudio-clinico/agrega-estudio-clinico.component';
import { ActualizaEstudiosClinicosComponent } from './actualiza-estudios-clinicos/actualiza-estudios-clinicos.component';
import { EnlistaProgramasApoyoComponent } from './enlista-programas-apoyo/enlista-programas-apoyo.component';
import { AgregarProgramaApoyoComponent } from './agregar-programa-apoyo/agregar-programa-apoyo.component';
import { ActualizaProgramaApoyoComponent } from './actualiza-programa-apoyo/actualiza-programa-apoyo.component';
import { ActualizaUsuarioComponent } from './actualiza-usuario/actualiza-usuario.component';
import { EnlistaNewsComponent } from './enlista-news/enlista-news.component';
import { UpdateNewsComponent } from './update-news/update-news.component';
import { AddNewsComponent } from './add-news/add-news.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    LoguinComponent,
    RecuperaPasswordComponent,
    PerfilUsuarioComponent,
    AgregarUsuarioComponent,
    ExitoaddusuarioComponent,
    EnlistaPostulantesComponent,
    DetallePostulacionComponent,
    PostularPacienteComponent,
    ActualizaPostulacionComponent,
    EnlistaEstudiosclinicossComponent,
    AgregaEstudioClinicoComponent,
    ActualizaEstudiosClinicosComponent,
    EnlistaProgramasApoyoComponent,
    AgregarProgramaApoyoComponent,
    ActualizaProgramaApoyoComponent,
    ActualizaUsuarioComponent,
    EnlistaNewsComponent,
    UpdateNewsComponent,
    AddNewsComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    NgxLoadingModule.forRoot({}),
    ChartsModule,
    FilterPipeModule,
    ImageCropperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
