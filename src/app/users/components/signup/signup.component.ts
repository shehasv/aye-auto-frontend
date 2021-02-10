import { utf8Encode } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { ConfirmedValidator } from '../../services/confirmed.validator';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private router:Router, private fb:FormBuilder, private loginService:LoginService, private toastr: ToastrService) { }

  public mail;

  get name(){
    return this.signupForm.get('name')
  }

  get password(){
    return this.signupForm.get('password')
  }

  get confirmPassword(){
    return this.signupForm.get('confirmPassword')
  }

  get phone(){
    return this.signupForm.get('phone')
  }


  signupForm = this.fb.group({
    name: ['',[Validators.required]],
    email:[''],
    phone:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.min(6000000000),Validators.max(9999999999),]],
    password: ['',[Validators.required,Validators.minLength(8)]],
    confirmPassword: ['',Validators.required]
  },{
    validator: ConfirmedValidator('password', 'confirmPassword'),
  })
  
  

  ngOnInit(): void {
    
    let link = this.router.url.split('/')[2]
    
    var reb64 = CryptoJS.enc.Hex.parse(link);
    var bytes = reb64.toString(CryptoJS.enc.Base64);
    var decrypt = CryptoJS.AES.decrypt(bytes, 'secret key');
    this.mail = decrypt.toString(CryptoJS.enc.Utf8);
    console.log(this.mail)
    

  }



  signup(){
      this.signupForm.patchValue({email : this.mail})
      console.log(this.signupForm.value)
      this.loginService.signup(this.signupForm.value)
      .subscribe(response =>{
        if(response.msg === "ok"){
          this.router.navigate(['/'])
          this.toastr.success('Registration Completed!', 'Success');
        }
        else{
          this.router.navigate(['/'])
          this.toastr.error('Error occured, try again later!', 'Failed');
        }
      })
  }

}
