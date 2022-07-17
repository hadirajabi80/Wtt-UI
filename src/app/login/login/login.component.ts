import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userName: string = '';
  password: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    
  }

  onLogin() {
    this.loginService
      .login(this.userName, this.password)
      .pipe(catchError(err => this.errorHandler(err)))
      .subscribe((res: any) => {
        localStorage.setItem('token', res.token);
        {
          (this.userName = ''), (this.password = '');
        }

        this.router.navigate(['/dashboard']);
      });
  }

  errorHandler(err) { 
    this.toastr.error('نام کاربری یا رمز عبور اشتباه است');
    return throwError(err);
  }
}
