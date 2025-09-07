import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../Services/auth';
import { Router, RouterLink } from '@angular/router';
import { CommonEngine } from '@angular/ssr/node';
import { CommonModule } from '@angular/common';
import { LoginDto } from '../../Models/LoginDto';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth: Auth, private router: Router) { }
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email,
        //Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
        ]],
      password: ['', Validators.required,
        // Validators.pattern(
        //   '^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-=[\\]{};:\'",.<>/?]).{6,}$'
        // )
      ]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    const loginDto = new LoginDto(this.loginForm.value.email, this.loginForm.value.password);
    this.auth.login(loginDto).subscribe({
      next: res => {
        this.auth.saveToken(res.token);
        console.log('Login successful');
        const role = this.auth.getRole();
        console.log('User role:', role);
        if (role === 'Admin') {
          this.router.navigate(['/admin_dashboard']);
        }
        else if (role === 'User') {
          this.router.navigate(['/user_dashboard']);
        }
      },
      error: () => alert('Login failed')
    });
  }

}
