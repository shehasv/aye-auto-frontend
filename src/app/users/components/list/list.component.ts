import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../vehicle';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private vehicleService:VehicleService) { }

  vehicleDetails:Vehicle[];

  filterStatus = 'all';

  ngOnInit(): void {

    this.vehicleService.getVehicleDetails()
    .subscribe(response =>{
      // console.log(response)
      this.vehicleDetails = response
    })

  }

  statusToAll(){
    this.filterStatus = 'all'
  }

  statusToFree(){
    this.filterStatus = 'free'
  }

  statusToRide(){
    this.filterStatus = 'on-ride'
  }

  

}
