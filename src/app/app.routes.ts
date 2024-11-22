import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { FirstComponent } from './components/first/first.component';
import { UserComponent } from './components/user/user.component';



export const routes: Routes = [
  {path:'first',component:FirstComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'home',component:HomeComponent,canActivate:[authGuard]},
  {path:'user',component:UserComponent},
  {path:'', redirectTo:'first',pathMatch:'full'},


];
