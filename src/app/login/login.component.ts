import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string;

  constructor(fb: FormBuilder, private service: AuthService, public router: Router) {
    this.loginForm = fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  signIn(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      this.service.signIn(credentials.email, credentials.password)
        .then(() => this.router.navigate(['sprints']))
        .catch((error) => {
          console.error(error);
          this.errorMessage = "Invalid credentials"
        });
    } else {
      Object.keys(this.loginForm.controls).forEach(key => this.loginForm.controls[key].markAsTouched());
    }
  }

  isFormControlInValid(controlName: string): boolean {
    const control = this.loginForm.controls[controlName];
    return !control.valid && control.touched;
  }
}
