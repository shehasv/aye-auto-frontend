import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import {ReactiveFormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http';
import { SignupComponent } from './components/signup/signup.component'
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { FooterComponent } from './components/footer/footer.component';
import { ListComponent } from './components/list/list.component';
import { FreeVehiclesPipe } from './pipes/free-vehicles.pipe';
import { RideVehiclesPipe } from './pipes/ride-vehicles.pipe';

@NgModule({
  declarations: [UsersComponent, LoginComponent, HomeComponent, SignupComponent, FooterComponent, ListComponent, FreeVehiclesPipe, RideVehiclesPipe],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonToggleModule
  ]
})
export class UsersModule { }
