import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthStateGuard } from '../auth-state.guard';
import { AuthGuard } from '../auth.guard';
import { VehicleModule } from '../vehicle/vehicle.module';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { FareCalculationComponent } from './components/fare-calculation/fare-calculation.component';
import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/list/list.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

import { UsersComponent } from './users.component';

const routes: Routes = [
  {path: '', component: LoginComponent,canActivate:[AuthStateGuard]},
  {path:'home',component:HomeComponent, canActivate:[AuthGuard]},
  {path:'signup/:mail',component:SignupComponent},
  {path:'email',component:EmailVerificationComponent},
  {path:'vehicle',loadChildren: () => VehicleModule,canActivate:[AuthGuard]},
  {path:'list',component:ListComponent,canActivate:[AuthGuard]},
  {path:'fare',component:FareCalculationComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
