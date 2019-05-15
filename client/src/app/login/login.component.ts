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

  constructor(private formBuilder: FormBuilder, private router: Router,private authService: AuthService) { }
  LogIn() {
    
    const userName = this.loginForm.get('userName').value;
    const password = this.loginForm.get('password').value;

    let autenticado = this.authService.authenticate(userName, password)
    if (!autenticado){
        this.loginForm.reset();
        alert('Invalid user name or password');
    }
    this.router.navigate(['']);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      remember: [false]
    });
  }

}