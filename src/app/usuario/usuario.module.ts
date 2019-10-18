import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemComponent, UsuarioComponent } from './components';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UsuarioService } from './services';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {
  MatInputModule,
  MatButtonModule,
  MatListModule,
  MatTooltipModule,
  MatIconModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTableModule,
  MatSortModule,
  MatCardModule
} from '@angular/material';

@NgModule({
  declarations: [
    ListagemComponent,
    UsuarioComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatTooltipModule,
    MatIconModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatCardModule
  ],
  providers: [
    UsuarioService
  ]
})
export class UsuarioModule { }
