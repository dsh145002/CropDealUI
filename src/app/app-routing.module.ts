import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/auth.guard';
import { AddCropComponent } from './Components/add-crop/add-crop.component';
import { InvoiceComponent } from './Components/invoice/invoice.component';
import { LoginComponent } from './Components/login/login.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { RegisterComponent } from './Components/register/register.component';
import { HasRoleGuard } from './has-role.guard';
import { ProfileCardComponent } from './profile-card/profile-card.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},
  {path:'add-crop',component:AddCropComponent,canActivate:[AuthGuard,HasRoleGuard],data:{
    role:'Farmer',
  }},
  {path:'invoices',component:InvoiceComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
