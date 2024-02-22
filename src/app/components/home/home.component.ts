import { Component, NgZone } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ProfileComponent } from '../profile/profile.component';
import { AccountService } from '../../services/account.service';
import { AsyncPipe } from '@angular/common';
import { User } from '../../interfaces/user';
import { Observable, map } from 'rxjs';
import { OnInit } from '@angular/core';
import { Store,select } from '@ngrx/store';
import { selectProfileVisible } from '../../_store/profile/profile.selector';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,ProfileComponent,AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  user: User = {};
  user$: Observable<User>; 
  profileVisible$ !: Observable<boolean>;
  constructor(private accountService:AccountService,private store:Store,private ngZone: NgZone){
    this.profileVisible$ = this.store.pipe(select(selectProfileVisible));
    this.user$ = this.accountService.getUserById(this.accountService.getUserIdFromToken(this.accountService.getToken())as number)
  }
  ngOnInit() {
    this.user$.subscribe((user) => {
      if (user) {
        this.ngZone.run(() => {
          this.user.name = user.name;
          this.user.hashedPassword = user.hashedPassword;
          this.user.id = user.id;
          this.user.photoUrl = user.photoUrl;
  
          console.log("User in HomeComponent: ", this.user);
  
          // If you want to dispatch the user data to the ProfileComponent
          // this.store.dispatch({ type: 'SET_USER', payload: this.user });
        });
      }
    });
  }


}
