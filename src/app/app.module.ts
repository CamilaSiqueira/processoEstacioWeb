import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { LoginModule, LoginRoutingModule } from './autenticacao';
import { AppRoutingModule } from './app-routing.module';
import { AdminModule, AdminRoutingModule } from './admin';
import { UsuarioModule, UsuarioRoutingModule } from './usuario';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule, MatIconModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    LoginModule,
    LoginRoutingModule,
    AdminModule,
    AdminRoutingModule,
    UsuarioModule,
    UsuarioRoutingModule,

    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
