import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleRoutingModule } from './vehicle-routing.module';
import { VehicleComponent } from './vehicle.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@NgModule({
  declarations: [VehicleComponent],
  imports: [
    CommonModule,
    VehicleRoutingModule,
    MatButtonToggleModule
  ]
})
export class VehicleModule { }
