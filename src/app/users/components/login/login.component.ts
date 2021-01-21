import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder, private loginService:LoginService, private route:Router) { }

  public selectedVal: string;
  ngOnInit(): void {

  this.selectedVal ='customer';

  }

  
  public onValChange(val: string) {
    this.selectedVal = val;
  }

  get email(){
    return this.loginForm.get('email')
  }

  get password(){
    return this.loginForm.get('password')
  }


  loginForm = this.fb.group({
    email: ['',[Validators.required,Validators.email]],
    password : ['',[Validators.required]]
  })
  


  public wrongPass: boolean = false;
  public failed: boolean = false;
  public clciked:boolean = false

  login(){
    if(this.selectedVal === "customer"){
      this.clciked = true;
    console.log(this.loginForm.value)
    this.loginService.login(this.loginForm.value)
      .subscribe((response)=>{
        console.log(response)
        if(response){
          this.clciked = false
        }
        if (response.msg === 'failed') {
          this.loginForm.patchValue({
            email: this.loginForm.get('email').value,
            password: '',
          });
          this.wrongPass = true;
          setTimeout(()=>{
            this.wrongPass = false
          },4000)
        }

        else if (response.msg === 'success'){
          sessionStorage.setItem('id',response.id)
          this.route.navigate(['/home']);

        }
        else{
          this.failed = true
          setTimeout(()=>{
            this.failed = false
          },4000)
          this.loginForm.reset();
        }

      },(error) => {
        console.log('error occured', error);
        this.loginForm.reset();
      })
    }
    else{
      this.clciked = true;
      console.log(this.loginForm.value)
      this.loginService.vehicleLogin(this.loginForm.value)
        .subscribe((response)=>{
          console.log(response)
          if(response){
            this.clciked = false
          }
          if (response.msg === 'failed') {
            this.loginForm.patchValue({
              email: this.loginForm.get('email').value,
              password: '',
            });
            this.wrongPass = true;
            setTimeout(()=>{
              this.wrongPass = false
            },4000)
          }
  
          else if (response.msg === 'success'){
            sessionStorage.setItem('id',response.id)
            this.route.navigate(['/vehicle']);
  
          }
          else{
            this.failed = true
            setTimeout(()=>{
              this.failed = false
            },4000)
            this.loginForm.reset();
          }
  
        },(error) => {
          console.log('error occured', error);
          this.loginForm.reset();
        })
    }
  }

}
