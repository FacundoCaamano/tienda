import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { user, userData } from 'src/app/auth/models';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public user$!:Observable<userData | null>
  constructor(private authService:AuthService) {
    this.user$ = this.authService.user$
  }
  logout() {
    this.authService.logout()
  }
}
