import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './pages/admin/admin.component';
import { authGuard } from './services/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { adminGuard } from './services/admin.guard';

export const routes: Routes = [
    {path:"",component:HomeComponent,canActivate:[authGuard]},
    {path:"login",component:LoginComponent},
    {path:"register",component:RegisterComponent},
    {path:"admin",component:AdminComponent,canActivate:[adminGuard]},
    {path:"**",redirectTo:''},

];
