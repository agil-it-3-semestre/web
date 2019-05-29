import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators }  from '@angular/forms';
import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router,private authService: AuthService) { 

  }

  async LogIn() {

    const userName = this.loginForm.get('userName').value;
    const password = this.loginForm.get('password').value;

    let autenticado = await this.authService.login(userName, password)
    console.log("autenticado---->",autenticado);
    if (!autenticado){
        this.loginForm.reset();
        alert('Invalid user name or password');
    }else{
      this.router.navigate(['create-order']);
    }

    
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      remember: [false]
    });
  }

}
