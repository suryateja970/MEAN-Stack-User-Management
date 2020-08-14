import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  durationInSeconds = 5;
  title = 'delicon';
 form1=true
 form2=false
  constructor(private fb:FormBuilder,private router:Router
    ,private snack:MatSnackBar,private service:ServiceService)
  {
    
  }
  loginForm=this.fb.group({
    emailid:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]{6,10}')]],
  })
  regForm=this.fb.group({
    name:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]{6,10}')]],
    emailid:['',[Validators.required,Validators.email]],
    phoneno:['',[Validators.required,Validators.pattern('[0-9]{10}')]],
    address:['',[Validators.required]],
    pincode:['',[Validators.required,Validators.pattern('[0-9]{6}')]],
  })
ngOnInit()
{
  var x=document.getElementById("but")
x.style.left="0px"
x.style.transition='left 1s'

}

  login()
  {
    var x=document.getElementById("but")
    var a=document.getElementById("form1")
x.style.left="0px"
x.style.transition='left 1s'
this.form2=false
this.form1=true
  }
  register()
  {
    var y=document.getElementById("but")
    var b=document.getElementById("form2")

    y.style.left="100px"
    y.style.transition='left 1s'
    this.form1=false
    this.form2=true
  }
  loginsubmit()
  {
  
    if(this.loginForm.invalid)
    {
    this.snack.open('sorry invalid credentials','end now',{duration:500})
    }
    else{
      this.service.login(this.loginForm.value).subscribe(
        result=>
        {
          console.log(result);
          localStorage.setItem("token",result['token'])
          this.router.navigate(['/home'])
        },err=>{
          console.log(err);
        }
      )
    }
  }
  regsubmit()
  {
    if(this.regForm.invalid)
    {
    this.snack.open('sorry invalid details','end now',{duration:500})
    }
    else{
      this.service.register(this.regForm.value).subscribe(
        result=>
        {
          console.log(result);
                this.snack.open('user registered successfully','end now',{duration:1000})

        }
      )
    }

  
  }
}
