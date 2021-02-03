import { Pipe, PipeTransform } from '@angular/core';
import { Vehicle } from '../vehicle';

@Pipe({
  name: 'rideVehicles'
})
export class RideVehiclesPipe implements PipeTransform {

  ridevehicle: Vehicle[] = []

  transform(vehicleDetails: Array<Vehicle>): Array<Vehicle> {
    vehicleDetails.forEach(elem =>{
      if(elem.availability === "on-ride"){
        this.ridevehicle.push(elem)
      }
    })
    return this.ridevehicle
  }
}
