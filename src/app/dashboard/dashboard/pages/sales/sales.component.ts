import { Component, OnInit } from '@angular/core';
import { SalesService } from './service/sales.service';

import { AuthService } from 'src/app/auth/service/auth.service';
import { Observable, take } from 'rxjs';
import { Sales } from './model';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit{

  userId:any
  sales!: Observable<Sales[]>
  constructor(private saleService:SalesService, private authService:AuthService){
  }
  ngOnInit(): void {
    this.authService.user$.subscribe(
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
