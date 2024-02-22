import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { LoginModel } from '../../interfaces/login-model';
import { SuccessStatus } from '../../constants/constants';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private accountService: AccountService, private toastr: ToastrService, private router: Router,private store:Store) { }
  loading = false;
  submitted = false;
  loginForm = new FormGroup({
    Name: new FormControl("", Validators.required),
    Password: new FormControl("", Validators.required)
  })

  OnLogin() {

    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    let loginModel: LoginModel = {
      Name: this.loginForm.value.Name + "",
      HashedPassword: this.loginForm.value.Password + ""
    }
    this.accountService.login(loginModel)
      .subscribe({
        next: data => {
          if (data.status == SuccessStatus) {
            console.log(data);  
            
            if (data.roleId == 1) {
              this.toastr.success(data.message);
              this.router.navigate(['/admin']);
            }
            else {

              this.toastr.success(data.message);
              this.router.navigate(['/']);
            }

          }
        },
        error: err => {
          this.loading = false;
          // Handle the error
        }
      });

  }
}
