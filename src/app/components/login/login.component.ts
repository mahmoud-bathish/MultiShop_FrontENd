import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationService } from 'src/app/services/navigation.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  message = "";
  constructor(
    private fb:FormBuilder,
    private navigaitonsvc: NavigationService,
    private utilitysvc: UtilityService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      pwd:['',[Validators.required,Validators.minLength(6),Validators.maxLength(15)]],
    })
  }
  login() {
    this.navigaitonsvc.loginUser(this.Email.value,this.PWD.value).subscribe((res:any)=>{
      if(res.toString() !== 'invalid'){
        this.message = 'Logged in Seccessfully.';
        this.utilitysvc.setUser(res.toString())
      }else {
        this.message = 'Invalid Credentials';
      }
    })
    this.loginForm.reset();
  }

  get Email():FormControl{
    return this.loginForm.get('email') as FormControl;
  }

  get PWD():FormControl{
    return this.loginForm.get('pwd') as FormControl;
  }
}
