import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ILoginDto } from 'src/app/models/dtos/ILoginDto';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginDto: ILoginDto = {
    Username: 'username90',    
    Password: '12345678'
  }

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  loginAction(){
    this.authService.login(this.loginDto);
  }

}
