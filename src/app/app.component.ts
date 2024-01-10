import { Component } from '@angular/core';
import { AuthService } from './auth/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'carrito-pro';
  constructor(private authService:AuthService){
    this.authService.checkSession()
    
  }
}
