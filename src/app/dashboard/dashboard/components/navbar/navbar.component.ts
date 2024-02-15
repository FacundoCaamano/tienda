import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { user, userData } from 'src/app/auth/models';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public user$!:Observable<userData | null>
  constructor(private authService:AuthService) {
  }
  ngOnInit(): void {
    this.user$ = this.authService.user$
    console.log(this.user$);
    
  }
  logout() {
    //this.user$ = null   probar vaciando user del servicio
    this.authService.logout()
  }
}
