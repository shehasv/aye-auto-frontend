import { flatten } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {

  constructor(private fb:FormBuilder,private LoginService:LoginService,private route:Router) { }

  ngOnInit(): void {
  }

  get email(){
    return this.emailForm.get('email')
  }

  emailForm = this.fb.group({
    email: ['',[Validators.required,Validators.email]],
  })


  public clciked:boolean = false
  public mail;
  public done:boolean = false
  public error:boolean = false;
  emailVerify(){
    this.clciked = true;
    this.mail = this.emailForm.get('email').value
    this.LoginService.verifyMail(this.emailForm.value)
    .subscribe(response =>{
      console.log(response)
      if(response){
        this.clciked = false
      }
      if(response.msg === "ok"){
        this.done = true
        this.emailForm.reset();
        setTimeout(()=>{
          this.route.navigate([''])
        },10000)
      }
      else{
        this.done = false;
        this.error = true;
        this.emailForm.reset();
      }

    })
  }

}
