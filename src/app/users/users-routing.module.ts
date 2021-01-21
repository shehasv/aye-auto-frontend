import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleComponent } from '../vehicle/vehicle.component';
import { VehicleModule } from '../vehicle/vehicle.module';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';

import { UsersComponent } from './users.component';

const routes: Routes = [
  { path: '', component: UsersComponent },
  {path:'home',component:HomeComponent},
  {path:'signup',component:SignupComponent},
  {path:'vehicle',loadChildren: () => VehicleModule}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
