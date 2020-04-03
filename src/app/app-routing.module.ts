import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { LoginPage } from './login/login.page';
import { RegistrationPage } from './registration/registration.page';
import { ProfilePage } from './profile/profile.page';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  // { path: 'login', loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)},
  // { path: 'registration', loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule) },
  // { path: 'forgot-password', loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule) },
  // { path: 'profile', loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule) },
  { path: '/home', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegistrationPage},
  { path: '/profile', component: ProfilePage},
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
