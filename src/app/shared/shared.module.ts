import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MascaraDirective } from './directives/mascara.directive';
import { HttpUtilService } from './services';
import { PtBrMatPaginatorIntl} from './';

@NgModule({
  declarations: [
    MascaraDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MascaraDirective
  ],
  providers: [
    HttpUtilService,
  	PtBrMatPaginatorIntl
  ]
})
export class SharedModule { }
