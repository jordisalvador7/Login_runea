import { Placemodel } from './../../models/place/placemodel';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpService } from 'src/app/services/http/http.service';
import { Component, OnInit } from '@angular/core';

type placeProfile = {
  name: string,
  N: number,
  E: number
}

@Component({
  selector: 'app-races',
  templateUrl: './races.page.html',
  styleUrls: ['./races.page.scss'],
})
export class RacesPage implements OnInit {

  
  

  constructor(private http:HttpService, private authService:AuthService) { }

  places: Place[];
  distancia: number;

  ngOnInit(): void {
    this.http.get<Place[]>('/races/places').subscribe(
      (places:Place[]) => {
        this.places= places;
        console.log(this.places)
        })
  }
  


}
interface Place{
  name: string,
  N: number,
  E: number
}
