import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyC2T98GBsp5gjqzkZFEByOr_Budl7PAMM0',
      authDomain: 'ngrecipebook-ecc8e.firebaseio.com'
    });
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
