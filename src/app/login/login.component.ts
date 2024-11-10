import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';
  sessionMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.ifLogin();
  }

  ifLogin() {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(response => {
        console.log(response);

        if (response.status === 'successLogin') {
          this.router.navigate(['/dashboard']);
        } else if (response.status === 'accountDeactive') {
          this.messageError("Akun anda tidak aktif!");
        } else if (response.status === 'internalServerError') {
          this.messageError('Terjadi kesalahan di server! atau Akun Tidak Aktif!');
        } else {
          this.messageError('Server tidak merespon!');
        }
      });
    } else {
      this.messageError('Periksa kembali Email dan Password!');
    }
  }

  messageError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}