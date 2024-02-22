import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountComponent } from '../pages/account/account.component';
import { AccountService } from './account.service';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router)
  let account = inject(AccountService)

  if(account.IsLoggedIn()){
    return true;
  }
  else{
    router.navigate(['/login']);
    return false;
  }
  
};
