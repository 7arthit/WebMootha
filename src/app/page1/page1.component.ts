import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css'],
  providers: [ConfirmationService]
})

// สร้าง class
export class Page1Component implements OnInit {
  // สร้าง attribute
  Date: any
  amount = [1, 1, 1, 1];
  index: any;
  name_food: any;
  price_food: any;
  showfood: any = [];
  sumall = 0;
  total_price: any;
  new_id: any;
  bill_oder: any;
  lid: any;
  disbuthon: any = true;
  display_pay: boolean | undefined;
  display_img: boolean | undefined;
  display_ok: boolean | undefined;
  display_detete: boolean | undefined;
  showup_dialog: boolean | undefined;

  // constructor ทำงานทันทีเมื่อสร้าง class
  constructor(private http: HttpClient, private confirmationService: ConfirmationService) { }

  // แสดงรายการ ทันที
  async ngOnInit(): Promise<void> {

    timer(0, 100).subscribe(() => {
      this.Date = new Date();
    })

    this.strat();
  }

  //page1 left | สั่งอาหาร//

  // กดสั่งอาหาร เมนูที่ 1 จะแสดง ชื่ออาหาร และ ราคา เลือกจำนวน
  menu_order_img1(namefood: any, price: any, index: number) {
    this.display_img = true;
    console.log(index + ' ' + namefood + ' ' + price);
    this.name_food = namefood;
    this.price_food = price;
    this.index = index;
  }

  // กดสั่งอาหาร เมนูที่ 2 จะแสดง ชื่ออาหาร และ ราคา  เลือกจำนวน
  menu_order_img2(namefood: any, price: any, index: number) {
    this.display_img = true;
    console.log(index + ' ' + namefood + ' ' + price);
    this.name_food = namefood;
    this.price_food = price;
    this.index = index;
  }

  // กดสั่งอาหาร เมนูที่ 3 จะแสดง ชื่ออาหาร และ ราคา เลือกจำนวน
  menu_order_img3(namefood: any, price: any, index: number) {
    this.display_img = true;
    console.log(index + ' ' + namefood + ' ' + price);
    this.name_food = namefood;
    this.price_food = price;
    this.index = index;
  }

  // กดสั่งอาหาร เมนูที่ 4 จะแสดง ชื่ออาหาร และ ราคา เลือกจำนวน
  menu_order_img4(namefood: any, price: any, index: number) {
    this.display_img = true;
    console.log(index + ' ' + namefood + ' ' + price);
    this.name_food = namefood;
    this.price_food = price;
    this.index = index;
  }

  // กดสั่งอาหาร เลือกจำนวน กดเพิ่มรายการ
  async addlist() {
    this.disbuthon = true;
    this.display_img = false;
    
    let order_moota = {
      name: this.name_food,
      price: this.price_food,
      amount: this.amount[this.index],
    }
    this.sumall += this.price_food * this.amount[this.index];
    console.log(order_moota);

    let jst_oder = JSON.stringify(order_moota);
    let addorder = await this.http.post('http://localhost:81/mookratha/orders', jst_oder).toPromise(); // เพิ่มรายการอาหารทีละรายการ
    console.log(addorder);

    let show_mootha = await this.http.get('http://localhost:81/mookratha/showmootha').toPromise(); // แสดงรายการจัดการ
    this.showfood = show_mootha;
  }

  // กดลบจำนวน
  m() {
    if (this.amount[this.index] - 1 >= 1) {
      this.amount[this.index]--
      console.log(this.index + ' ' + this.amount[this.index]);
    }
  }

  // กดเพิ่มจำนวน
  p() {
    if (this.amount[this.index] + 1 <= 10) {
      this.amount[this.index]++
      console.log(this.index + ' ' + this.amount[this.index]);
    }
  }

  //page1 right | จัดการรายการอาหาร//

  //กดตารางแล้วเปิด dialog
  async showupdialog(id: any, name: any, price: any, amount: any) {
    this.showup_dialog = true;
    this.lid = id;
    this.name_food = name;
    this.price_food = price;
    this.amount[this.index] = amount;
  }

  // ปรับปรุง จำนวนอาหารที่สั่ง ทีละรายการ
  async addamount() {
    this.showup_dialog = false;

    let total = this.price_food * this.amount[this.index];
    this.total_price = total;
    let order_moota = {
      amount: this.amount[this.index]
    }
    console.log(order_moota);
    let jst_oder = JSON.stringify(order_moota);
    let update_mootha = await this.http.post('http://localhost:81/mookratha/update/' + this.lid, jst_oder).toPromise(); // ปรับปรุง
    console.log(update_mootha);
    this.strat();
  }

  // ลบรายการ อาหารที่สั่ง ทีละรายการ
  async delete() {
    this.showup_dialog = false;
    this.display_detete = true;
    let delete_mootha = await this.http.delete('http://localhost:81/mookratha/delete/' + this.lid).toPromise();// ลบรายการ
    console.log(delete_mootha);
    this.strat();
  }

  // กดชำระเงิน จะไปที่หน้า ยืนยัน
  async payment() {
    this.confirmationService.confirm({
      message: 'ยืนยันการชำระค่าอาหาร?',
      header: 'ยืนยัน',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log('comform');
        this.confirm();
        this.display_ok = true;
      },
      reject: () => {
        console.log('cancel');
      }
    })
  }

  // กดตกลง ชำระเงิน
  confirm_bill() {
    this.confirmationService.confirm({
      message: 'ยืนยันการชำระค่าอาหาร?',
      header: 'ยืนยัน',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log('comform');
      }
    });
  }

  // ทำงานหลัง กดปุ่มตกลง
  async confirm() {
    this.display_pay = true;
    console.log('ชำระเงินแล้ว');

    let list = {
      sum: this.sumall
    };
    let insbill = await this.http.post('http://localhost:81/mookratha/bills', JSON.stringify(list)).toPromise(); // เพิ่มใบเสร็จ
    console.log(insbill);

    let getbill = await this.http.get('http://localhost:81/mookratha/bills/getid').toPromise(); // รับ list ล่าสุด
    console.log(getbill);

    let jst = JSON.stringify(getbill);
    let jso = JSON.parse(jst);
    
    console.log(jso[0].list);
    console.log(jso);
    this.new_id = jso[0].list;
    let idbill = {
      list: this.new_id
    };
    let upidbill = await this.http.post('http://localhost:81/mookratha/orders/upbills', JSON.stringify(idbill)).toPromise(); // อัพเดท list ของ ออเดอร์ 
    console.log(upidbill);
  }

  // ปิดหน้าต่าง แล้วเซ็ตค่าเริ่มต้น
  close_windows() {
    this.amount = [1, 1, 1, 1];
    this.display_ok = false;
    this.sumall = 0;
    this.showfood.splice(0, this.showfood.length)
    console.log('ปิดหน้าต่าง');
    if (this.showfood.length <= 0) {
      this.disbuthon = false;
    }
  }

  // รีหน้าค่าเริ่มต้น
  async strat() {
    let show_mootha = await this.http.get('http://localhost:81/mookratha/showmootha').toPromise(); // แสดงรายการ จาก list ที่เป็น null
    this.showfood = show_mootha;
    let sum = 0;
    for (let i = 0; i < this.showfood.length; i++) {
      sum += this.showfood[i].amount * this.showfood[i].price;
    }
    this.sumall = sum;
    if (this.showfood.length <= 0) {
      this.disbuthon = false;
    }
  }
}