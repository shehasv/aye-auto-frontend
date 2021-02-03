import { Pipe, PipeTransform } from '@angular/core';
import { element } from 'protractor';
import { Vehicle } from '../vehicle';

@Pipe({
  name: 'freeVehicles'
})
export class FreeVehiclesPipe implements PipeTransform {


  freevehicle: Vehicle[] = []

  transform(vehicleDetails: Array<Vehicle>): Array<Vehicle> {
    vehicleDetails.forEach(elem =>{
      if(elem.availability === "free"){
        this.freevehicle.push(elem)
      }
    })
    return this.freevehicle
  }

}
