import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BweatService {

  constructor(private _http: Http) { }
  
  contForecast() {
    return this._http.get("http://api.openweathermap.org/data/2.5/weather?q=Bangalore&appid=2eeb6371534f171130d9b537b4f26803")
      .pipe(.map(result => result));
  }
}
