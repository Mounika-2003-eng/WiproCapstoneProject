import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../Services/auth';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: Auth, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, 
                   Validators.email,
                   Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
                  ]],
      // password should contain atleast one capital letter, one special char, and one number
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(
            '^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-=[\\]{};:\'",.<>/?]).{6,}$'
          )
        ]
      ],
      role: ['User'] // Default role
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    this.auth.register(this.registerForm.value).subscribe({
      next: res => {
        this.auth.saveToken(res.token);
        const role = this.auth.getRole();

        if (role === 'Admin') {
          this.router.navigate(['/admin_dashboard']);
        }
        else if (role === 'User') {
          this.router.navigate(['/user_dashboard']);
        }
      },
      error: () => alert('Registration failed')
    });
  }
}
