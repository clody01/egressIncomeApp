import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
  }

  onSubmit(userData: any) {
    if (userData != null) {
      this.authService.createUser(userData.name, userData.email, userData.password);
    }
   // console.log(userData);
  }
}
