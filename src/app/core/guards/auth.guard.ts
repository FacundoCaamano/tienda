 import { inject } from '@angular/core';
 import { CanActivateFn, Router } from '@angular/router';
 import { map , pipe} from 'rxjs';
 import { AuthService } from 'src/app/auth/service/auth.service';

 export const authGuard: CanActivateFn = (route, state) => {
   const router = inject(Router)
   const authService = inject(AuthService)


   if(authService.isAuthenticated()){
     return true
   }else{
    router.navigate(['/auth/login'])
     return false

   }
 };
