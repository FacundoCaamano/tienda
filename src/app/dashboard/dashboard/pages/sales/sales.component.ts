import { Component, OnInit } from '@angular/core';
import { SalesService } from './service/sales.service';

import { AuthService } from 'src/app/auth/service/auth.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent{

  userId:any
  sales: any = []
  constructor(private saleService:SalesService, private authService:AuthService){
    this.authService.user$.pipe(take(1)).subscribe(
      data =>{
        this.userId = data?.id
        this.saleService.loadSales(this.userId)
        this.obtenerSales()
      }
      )
    }
    obtenerSales(){
     this.sales = this.saleService.getSales()
      
    }
}
