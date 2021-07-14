import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-store-setting',
  templateUrl: './store-setting.component.html',
  styleUrls: ['./store-setting.component.css']
})
export class StoreSettingComponent implements OnInit {

  constructor(private apiService:ApiService) { }

  ngOnInit() {
  }
  zoom: number = 8;

  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  changeLoation() {
    this.apiService.testLocaiton().subscribe(
      result=>{
        console.error(result);
        
      }
    )
    this.lat = 22.716825;
    this.lng = 75.873437;
    this.markers[0].lat = this.lat;
    this.markers[0].lng = this.lng;
  //  console.error();

  }

  mapClicked($event: MouseEvent) {
    this.markers = [{
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      label: 'A',
      draggable: true
    }
    ];
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  markers: marker[] = [
    {
      lat: this.lat,
      lng: this.lng,
      label: 'A',
      draggable: true
    }
  ]
}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
