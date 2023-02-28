import { IndexComponent } from './item/index/index.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'item/index', pathMatch: 'full'},
  { path: 'item/index', component: IndexComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
