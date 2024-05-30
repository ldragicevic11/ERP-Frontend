import { Component, OnInit } from '@angular/core';
import { SuggestedProduct } from '../models/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  suggestedProducts: SuggestedProduct[] = [
    {
      banerImage: 'Baner/baner1.jpg'
    },
    {
      banerImage: 'Baner/baner2.jpg'
    }
  ];
  constructor() {}

  ngOnInit(): void {}
}
