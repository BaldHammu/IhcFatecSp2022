import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', loadChildren: ()=> import('./core/core.module').then(m=>m.CoreModule)}];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ preloadingStrategy:PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
