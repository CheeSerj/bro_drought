import {Component, OnInit} from '@angular/core';
import { registerLocaleData } from '@angular/common';
import Ru from '@angular/common/locales/ru';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'bro-drought';

  ngOnInit(): void {
    registerLocaleData(Ru);
  }
}
