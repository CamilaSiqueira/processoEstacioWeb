import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListagemComponent, UsuarioComponent } from './components';

export const UsuarioRoutes: Routes = [
    {
        path: 'usuario', component: UsuarioComponent,
        children: [
            { path: '', component: ListagemComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(UsuarioRoutes)],
    exports: [RouterModule]
})

export class UsuarioRoutingModule { }