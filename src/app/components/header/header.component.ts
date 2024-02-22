import { Component,EventEmitter,Input, Output } from '@angular/core';
import { OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router} from '@angular/router';
import { Store } from '@ngrx/store';
import * as AppActions from '../../_store/profile/profile.actions'
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private accountService:AccountService,private router: Router,private store:Store){}
@Input() nameStr = ""
@Input() headerTitle = "Home"
@Input() imageUrl = ""

logOut(){
  this.accountService.unsetToken();
  this.router.navigate(["/login"])
}

toggleProfile() {
  this.store.dispatch(AppActions.toggleProfile());
}

}
