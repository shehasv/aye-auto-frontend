import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthStateGuard } from '../auth-state.guard';
import { AuthGuard } from '../auth.guard';
import { VehicleModule } from '../vehicle/vehicle.module';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';

import { UsersComponent } from './users.component';

const routes: Routes = [
  {path: '', component: UsersComponent,canActivate:[AuthStateGuard]},
  {path:'home',component:HomeComponent, canActivate:[AuthGuard]},
  {path:'signup',component:SignupComponent},
  {path:'vehicle',loadChildren: () => VehicleModule,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
