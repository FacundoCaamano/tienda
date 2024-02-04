import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { userData } from 'src/app/auth/models';
import { AuthService } from 'src/app/auth/service/auth.service';
import { UserService } from '../../service/user.service';
import { Buy } from './model';

@Component({
  selector: 'app-buys',
  templateUrl: './buys.component.html',
  styleUrls: ['./buys.component.scss']
})
export class BuysComponent implements OnInit, OnDestroy {

  user: Observable<userData | null>;
  userId: string | undefined;

  buys$!: Observable<Buy[]> 
  products:any

  private userSubscription: Subscription | undefined;

  constructor(private authService: AuthService, private userService:UserService) {
    this.user = this.authService.user$;
   
    
  }

  ngOnInit(): void {
    this.userSubscription = this.user.subscribe((userData: userData | null) => {
      if (userData) {
        this.userId = userData.id;
        this.userService.loadBuys(this.userId!);
        this.buys$=this.userService.getBuys()
        
      }
    });
    this.buys$.subscribe(
      data => {
        this.products = data
        console.log(this.products);
        
      }
    )
    
    
    
  }

  ngOnDestroy(): void { 
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}