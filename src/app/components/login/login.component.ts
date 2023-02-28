import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardPageComponent } from './../dashboard-page/dashboard-page.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  constructor( private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      emailAddress: [''],
      password:['']
    })
  }
  login() {
    this.http.get<any>('http://localhost:3000/signupUsers').subscribe(res => {
      const user = res.find((a: any) => {
        return a.emailAddress === this.loginForm.value.emailAddress && a.password === this.loginForm.value.password
      });
      if (user) {
        alert("Login Successfully");
        this.loginForm.reset();
        this.router.navigate(['/dashboard-page'])
      }else {
        alert("User not found try again")
      }
    }, err => {
      alert("Something went wrong")
    });
  }
}
