import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'scanner',
    pathMatch: 'full'
  },
  {
    path: 'scanner',
    loadChildren: () => import('./pages/scanner/scanner.module').then(m => m.ScannerPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'wine-view/:wineId',
    loadChildren: () => import('./pages/wine/wine-view/wine-view.module').then(m => m.WineViewPageModule)
  },
  {
    path: 'wine-edit/:wineId',
    loadChildren: () => import('./pages/wine/wine-edit/wine-edit.module').then(m => m.WineViewEditModule)
  },
  {
    path: 'wine-list',
    loadChildren: () => import('./pages/wine/wine-list/wine-list.module').then(m => m.WineListPageModule)
  },
  {
    path: 'wine-create',
    loadChildren: () => import('./pages/wine/wine-create/wine-create.module').then(m => m.WineViewCreateModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
