import { Component } from '@angular/core';
import { BweatService } from './bweat.service';
import { Chart } from 'chart.js';
import { map } from 'rxjs/operators';
import { interval } from 'rxjs';

const secondsCounter = interval(10000);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'bang';
  public max=0;
  public min =0;
  chart = []; 



  constructor(private _weather: BweatService) {
	  secondsCounter.subscribe(n =>
      this.update(n); )
  }
  
  update(x) {
		this._weather.contForecast()
      .subscribe(res => {
		  
		let tr = Array.of(res.json().main.temp);
		let alldates = res.json().dt;  
		let jsd = new Date();
		jsd = new Date(alldates);		
		this.chart.data.labels.push(jsd.toLocaleTimeString());
		this.chart.data.datasets.forEach((dataset) => {
        dataset.data.push(tr);
		});
		this.chart.update();
		console.log(jsd.toLocaleTimeString());
		console.log("Updated");
		if(tr[0]>this.max) { this.max =tr[0]}
		if(tr[0]<this.min) { this.min = tr[0]}
		}
		
  }

  ngOnInit() {
    this._weather.contForecast()
      .subscribe(res => {
		  
	 let tr: any[] = Array.of(res.json().main.temp);
	   this.max = tr[0];
	  this.min = tr[0];
	 console.log(this.max);
	let alldates = res.json().dt;

	
	
	
/* COnverting Unix Timestamp to readable Date-Time */
	let weatherDates = [];
	let jsdate  = new Date();
	jsdate  = new Date(alldates);
	weatherDates.push(jsdate.toLocaleTimeString())
	
	/* The chart information  */
	this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: weatherDates,
            datasets: [
              { 
                data: tr,
                borderColor: "#3e95cd",
                fill: false
              }
            ]
          },
          options: {
			  title: {
				  display: true;
				  text: 'Temperature at Bangalore'
			  },
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],
            }
          }
        });

      })
      })
	  
	  
  );
}



}
