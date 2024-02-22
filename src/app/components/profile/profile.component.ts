import { Component, Input, input } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { FormGroup,FormControl,ReactiveFormsModule,Validator, Validators } from '@angular/forms';
import { User } from '../../interfaces/user';
import { Store } from '@ngrx/store';
import { NgClass } from '@angular/common';
import { SuccessStatus } from '../../constants/constants';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  @Input() ishidden : boolean | null = true;
  constructor(private accountSevice:AccountService,private store:Store,private toastr:ToastrService){
    accountSevice.getUserById(accountSevice.getUserIdFromToken(accountSevice.getToken()) as number).subscribe((user)=>{
      console.log(user.name);
      
      this.Form.get('id')?.setValue(user.id);
      this.Form.get('name')?.setValue(user.name);
      this.Form.get('hashedPassword')?.setValue(user.hashedPassword);
    })
    

  }
  
  Form = new FormGroup({
    id:new FormControl(0),
    name:new FormControl('',Validators.required),
    hashedPassword:new FormControl("",Validators.required),
    CPassword:new FormControl("",Validators.required)
  })
  formVaild = {
    IsPass:"",
    IsCPass:""
  }
  checkValidations(){
    console.log(this.Form.value);
    
    if(!this.accountSevice.isStrongPassword(this.Form.value.hashedPassword+"")){
      this.formVaild.IsPass = "Password is not stronge"
    }
    else
    {
      this.formVaild.IsPass = ""
    }

    if(this.Form.value.CPassword && this.Form.value.hashedPassword){
      this.formVaild.IsCPass = "Passwords are not Matching"
    }
    else
    {
      this.formVaild.IsCPass =""
    }
  }

  onUpdate(){
    this.accountSevice.upsertUser(this.Form.value).subscribe((res)=>{
      console.log(res);
      if(res.status== SuccessStatus){
        this.ishidden = true;
        this.toastr.success("successfully updated",'update')
      }else{
        this.toastr.error("something went wrong in update",'update')

      }
    })
  }

}
