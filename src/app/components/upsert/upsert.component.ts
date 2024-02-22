import { NgClass } from '@angular/common';
import { Component, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { SuccessStatus } from '../../constants/constants';
import { User } from '../../interfaces/user';
import { Store } from '@ngrx/store';
import { upsertUser } from '../../_store/admin/admin.actions';

@Component({
  selector: 'app-upsert',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './upsert.component.html',
  styleUrl: './upsert.component.css'
})
export class UpsertComponent implements OnChanges {
  @Input() ishidden!: boolean;
  @Input() userId!: number;
  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private store:Store,
    private elRef: ElementRef
  ) {}

  @HostListener('document:click', ['$event'])
  onClick(event: Event): void {
    const clickedInside = this.elRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.ishidden = !this.ishidden;
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId']) {
      this.accountService.getUserById(this.userId).subscribe((user) => {
        // console.log(user);
        this.Form.get('id')?.setValue(user.id);
        this.Form.get('name')?.setValue(user.name);
        this.Form.get('hashedPassword')?.setValue(user.hashedPassword);
        this.Form.get('roleId')?.setValue(2);
      });
    } else {

      console.log("user not found");

    }
  }
  Form = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    hashedPassword: new FormControl("", Validators.required),
    CPassword: new FormControl("", Validators.required),
    roleId: new FormControl(0),

  })
  formVaild = {
    IsName: "",
    IsPass: "",
    IsCPass: ""
  }
  checkValidations() {
    console.log(this.Form.value);
    if (this.Form.value.name == "" || this.Form.value.name?.includes(' ')) {
      this.formVaild.IsName = "Username is Invalid"
    }
    else {
      this.formVaild.IsName = ""
    }
    if (!this.accountService.isStrongPassword(this.Form.value.hashedPassword + "")) {
      this.formVaild.IsPass = "Password is not stronge"
    }
    else {
      this.formVaild.IsPass = ""
    }
    if (this.Form.value.CPassword && this.Form.value.hashedPassword) {
      this.formVaild.IsCPass = "Passwords are not Matching"
    }
    else {
      this.formVaild.IsCPass = ""
    }

  }

  onUpsert() {
    if ((this.formVaild.IsCPass || this.formVaild.IsName || this.formVaild.IsPass) != "") {
      this.store.dispatch(upsertUser({user:this.Form.value}))
      this.ishidden = true;
      //   this.accountService.upsertUser(this.Form.value).subscribe((res) => {
      //     console.log(res);
      //     if (res == SuccessStatus) {
      //       this.ishidden = true;
      //       this.toastr.success("successfully updated", 'update')
      //     } else {
      //       this.toastr.error("something went wrong in update", 'update')

      //     }
      //   })
      // } else {
      //   this.toastr.error("Invalied Inputs", 'update')
      // }
    }
  }

  hide(){
    this.ishidden = true;
  }
}
