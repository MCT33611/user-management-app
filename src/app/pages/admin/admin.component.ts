import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AccountService } from '../../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { SuccessStatus } from '../../constants/constants';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { changeUserAccess, deleteUser, loadUser } from '../../_store/admin/admin.actions';
import { getUserList } from '../../_store/admin/admin.selector';
import { UpsertComponent } from '../../components/upsert/upsert.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,AsyncPipe,UpsertComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  induUserId = 0;
  ishidden = true;
  ngOnInit(): void {
    this.store.dispatch(loadUser())
    this.store.select(getUserList).subscribe(user => {
      this.users = user;
      // console.log(user)
    })
  }
  users ! :User[];

  constructor(
    private store:Store,
    private accountService:AccountService,
    private toastr: ToastrService,
  ) {
    
  }

  toggleUpsert(id?:number | null ){
    this.ishidden = !this.ishidden;
    
    this.induUserId = id ?? 0;
    // this.justFn(1,2,4,5,)
  }


  userDel(id: number | null | undefined) {
    console.log(id);
    if (id && confirm('do you want delete?')) {
      // this.accountService.deleteUser(id).subscribe((res) => {
      //   if (res.status === SuccessStatus) {
      //     this.toastr.success(res.message);
      //   } else {
      //     this.toastr.error(res.message);
      //   }
      // });
      this.store.dispatch(deleteUser({userId:id}))
    }
  }

  userAccess(id: number | null | undefined) {
    console.log(id);
    if (id && confirm('do you want delete?')) {
      this.store.dispatch(changeUserAccess({userId:id}))
      // this.accountService.updateUserAccess(id).subscribe((res) => {
      //   if (res.status === SuccessStatus) {
      //     this.toastr.success(res.message);
      //   } else {
      //     this.toastr.error(res.message);
      //   }
      // });
    }
  }
}
