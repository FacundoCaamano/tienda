import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { userData } from 'src/app/auth/models';
import { AuthService } from 'src/app/auth/service/auth.service';
import { UserService } from '../../service/user.service';
import { Buy } from './model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-buys',
  templateUrl: './buys.component.html',
  styleUrls: ['./buys.component.scss']
})
export class BuysComponent implements OnInit, OnDestroy {

  user: Observable<userData | null>;
  userId: string | undefined;

  buys$: Observable<Buy[]> | undefined; 
  products: any | undefined;


  private userSubscription: Subscription | undefined;
  private buysSubscription: Subscription | undefined;

  constructor(private authService: AuthService, private userService: UserService) {
    this.user = this.authService.user$;
  }
  
  ngOnInit(): void {
    this.userSubscription = this.user.subscribe((userData: userData | null) => {
      if (userData) {
        this.userId = userData.id;
        this.userService.loadBuys(this.userId!);
        this.buys$ = this.userService.getBuys();
        if (this.buys$) {
          this.buysSubscription = this.buys$.subscribe(
            data => {
              this.products = data;
            }
            );
          }
        }
      });
    }

  ngOnDestroy(): void { 
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.buysSubscription) {
      this.buysSubscription.unsubscribe();
    }
  }

  sumarDias(fecha: Date){
    const nuevaFecha = new Date(fecha)
    nuevaFecha.setDate(nuevaFecha.getDate() + 7)
    return nuevaFecha.toISOString().split('T')[0]
  }
}
