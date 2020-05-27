import { Component, OnInit } from '@angular/core';
import { Map, PointTuple, map, tileLayer, marker, Marker, LatLng } from 'leaflet';

import 'leaflet-routing-machine';
import { Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { delay } from 'rxjs/operators';
import { HttpService } from 'src/app/services/http/http.service';
import { Racemodel} from 'src/app/models/race/racemodel';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/services/location/location.service';

@Component({
  selector: 'app-newrace',
  templateUrl: './newrace.page.html',
  styleUrls: ['./newrace.page.scss'],
})

export class NewracePage implements OnInit {
  
  lat:any='41.27555556'
  lng:any='1.98694444'

  map: Map;
  center: PointTuple;
  startCoords: PointTuple = [this.lat, this.lng];
  startMarker: Marker;

  newRace: Racemodel;

  constructor(
    private http: HttpService,
    public platform: Platform,
    private location: LocationService,
    private router: Router) 
  {
    this.center = this.startCoords;
    
  }
  async ionViewDidEnter(){
    await this.leafletMap();
  }
  async ngOnInit(){
    await this.http.setOptionsAsync();
    this.newRace = {
      title: '',
      author: '',
      date: new Date(),
      description:'',
      distance: 0,
      startingPoint: {
        coordinates: [this.lat, this.lng],
        type: ''
      },
      subscribers: []
    }
  }
  async leafletMap()
  {
    this.map = map('mapId', 
    {
      center: this.center,
      zoom: 15
    });
    const position = await this.location.getLocation();
    console.log('Current', position);
    this.map.setView([position.coords.latitude, position.coords.longitude], 12);
    tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: '', 
    }).addTo(this.map);

    this.startMarker = marker([position.coords.latitude, position.coords.longitude], {draggable: true}).addTo(this.map)
      .bindPopup('Starting point')
      .on('dragend', function() {
        console.log("dragged");
        //console.log(this);
        //this.startMarker.bindPopup('Starting Point <br>' + String(this.startMarker.getLatLng()));
      });
   
  }

  async save(){
    console.log(this.newRace);
    const coord :LatLng = this.startMarker.getLatLng();
    this.newRace.startingPoint.coordinates[0] = coord.lng;
    this.newRace.startingPoint.coordinates[1] = coord.lat;
    this.newRace.date = new Date();
    console.log(this.newRace);
    this.http.post('/races', this.newRace).subscribe(( res => {
      console.log(res);
      //iria bien hacer una comprobacion de si ha subido bien la race
      this.router.navigateByUrl('/races');
      console.log("posted");
    }));
  }
}