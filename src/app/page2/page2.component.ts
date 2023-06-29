import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { timer } from 'rxjs';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})

export class Page2Component implements OnInit {
  Date: any
  bills: any;
  orders: any;
  sumall: any;
  
  constructor(private http: HttpClient) { }

  // page2 left |แสดง bills ทันที //
  ngOnInit(): void {
    timer(0, 100).subscribe(() => {
      this.Date = new Date();
    })
    
    console.log('show data');
    this.http.get('http://localhost:81/mookratha/bills').subscribe((data: any) => {
      console.log(data);
      this.bills = data;
    })
  }

  // page2 right | แสดงรายการ Orders +id //
  click_bill(id: any) {
    console.log(id);
    this.http.get('http://localhost:81/mookratha/orders/' + id).subscribe((data: any) => {
      console.log(data);
      this.orders = data;
      let sum = 0;
      for (let i = 0; i < data.length; i++) {
        sum += data[i].amount * data[i].price;
      }
      this.sumall = sum;
    })
  }
}
