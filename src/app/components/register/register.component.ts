import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, NgModel } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { User } from '../../interfaces/user';
import { catchError, map } from 'rxjs/operators';
import { SuccessStatus } from '../../constants/constants';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private accountService: AccountService,private router:Router,private toastr:ToastrService) { }
  formVlid = {
    IsName: "",
    IsPass: "",
    IsCPass: "",
  }
  
  checkValidation() {
    let values = this.registerForm.value;
    if((""+values.name).length < 11){
      this.formVlid.IsName = "user name is too long";
    }
    else if (values.name?.includes(" ")) {
      this.formVlid.IsName = "Not Allow space";
    }
    else{
      this.formVlid.IsName = "";
    }
  
    if (!this.accountService.isStrongPassword(values.hashedPassword+"")) {
      this.formVlid.IsPass = "Password is not strong";
    }
    else{
      this.formVlid.IsPass = "";
    }
  
    if (values.CPassword !== values.hashedPassword) {
      this.formVlid.IsCPass = "Passwords do not match";
    }
    else{
      this.formVlid.IsCPass = "";
    }
  }
  
  registerForm = new FormGroup({
    name: new FormControl("", Validators.required),
    hashedPassword: new FormControl("", Validators.required),
    CPassword: new FormControl("", Validators.required),
  });
  

  onRegister(){
    
    if((this.formVlid.IsName&& this.formVlid.IsCPass&& this.formVlid.IsPass) == ""){
      
      let user:User = this.registerForm.value;
      this.accountService.register(user).subscribe({
        next: data => {
          
          if(data.status == SuccessStatus)
          {
            this.toastr.success(data.message);
          this.router.navigate(['/']);
          }else{
            this.toastr.error(data.message);
          }
        },
        error: err => {
          console.log(err);
          
          // Handle the error
        }
      });
    }
  }



}
