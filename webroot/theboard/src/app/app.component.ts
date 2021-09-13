import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as numeral from 'numeral';
import { ApiService } from './api.service';
import { MCEvent } from './event/event.model';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {

  events: MCEvent[];
  constructor(private api: ApiService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadSheet();
  }

  loadSheet() {
    this.api.getSheet().subscribe(data => {
      console.log(data);
      this.events = data;
    });
  }

  showStockSnackBar(message) {
    this.snackBar.open(message, "Close", {
      duration: 2000
    });
  }

  getPriceColor(change: number) {
    if (!change) {
      return "grey";
    } else if (change > 0) {
      return "green";
    } else {
      return "red";
    }
  }

  getFormattedNumber(value: number, format?: string) {
    if (!format) {
      format = "0.00a";
    }
    return numeral(value)
      .format(format)
      .toString()
      .toUpperCase();
  }

}
