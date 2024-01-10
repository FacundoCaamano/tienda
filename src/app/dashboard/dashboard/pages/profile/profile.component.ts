import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { user } from 'src/app/auth/models';
import { AuthService } from 'src/app/auth/service/auth.service';
//asi se importa imagen desde assets

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent{

  public user: Observable<user | null>
 
  constructor(private authService:AuthService) {
    this.user = this.authService.user$
  }
}
