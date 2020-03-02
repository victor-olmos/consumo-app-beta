import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteService } from './clientes/cliente.service';
import {RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './clientes/form.component';
import {FormsModule} from  '@angular/forms';
import {registerLocaleData} from '@angular/common';
import localeES from '@angular/common/locales/es';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ResetpasswordComponent } from './auth/resetpassword/resetpassword.component';
import { RegisterService } from './auth/register/register.service';

registerLocaleData(localeES, 'es');
const routes: Routes =[
  
  /*{path:'',redirectTo:'/clientes',pathMatch:'full'},*/
/********Componentes aplicacion************* */
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path: 'login', component: LoginComponent},

  {path: 'register', component: RegisterComponent},
  {path: 'resetpassword', component: ResetpasswordComponent},


  {path:'directivas', component: DirectivaComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'clientes/form', component: FormComponent},
  {path: 'clientes/form/:id', component: FormComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent,
    LoginComponent,
    RegisterComponent,
    ResetpasswordComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [ClienteService,RegisterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
