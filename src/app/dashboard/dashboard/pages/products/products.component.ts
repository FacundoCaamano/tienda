import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  user:any
  constructor(private authService:AuthService) {
    
  }
}
