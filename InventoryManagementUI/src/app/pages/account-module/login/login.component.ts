import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from "../../../services/auth.service"
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NzButtonModule, NzCheckboxModule, NzFormModule, NzInputModule, CommonModule,NzIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, AfterViewChecked {


  returnUrl!: string;
  username: string = '';
  password: string = '';
  validateForm: any;
  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, private fb: NonNullableFormBuilder) {
    this.validate()
   
  }
  ngAfterViewChecked(): void {
   
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'.toString()] || '';
    
  }

  validate() {
    this.validateForm = this.fb.group({
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
      remember: this.fb.control(true)
    });
  }
  submitForm(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.authService.setToken(response.authToken);
        this.router.navigate(['']);
      },
      error: (err) => {
        console.error('Login failed', err);
      }
    });
  }

}
