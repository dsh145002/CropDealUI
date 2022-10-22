import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {  HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './Components/footer/footer.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { AddCropComponent } from './Components/add-crop/add-crop.component';
import { AuthInterceptor } from './token-interceptor.service';
import { AuthGuard } from 'src/auth.guard';
import { HasRoleGuard } from './has-role.guard';
import { InvoiceComponent } from './Components/invoice/invoice.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    FooterComponent,
    NavbarComponent,
    AddCropComponent,
    InvoiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
   
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  },
  AuthGuard,
  HasRoleGuard
],
  bootstrap: [AppComponent]
})
export class AppModule { }
