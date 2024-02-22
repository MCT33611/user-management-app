import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from './account.service';
import { ToastrService } from 'ngx-toastr';

export const adminGuard: CanActivateFn = (route, state) => {
  const accServices = inject(AccountService)
  const router = inject(Router)
  let toastr = inject(ToastrService)
  if( accServices.IsAdmin() && accServices.IsLoggedIn()){
    
    return true
  }

  toastr.error("Access Denied","unauthorized")
  router.navigate(['/'])
  return false
};
