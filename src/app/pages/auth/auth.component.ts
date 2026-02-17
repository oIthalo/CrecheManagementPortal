import { Component } from '@angular/core';
import { LoginComponent } from '../../components/auth/login/login.component';

@Component({
  selector: 'app-auth',
  imports: [LoginComponent],
  templateUrl: './auth.component.html'
})
export class AuthComponent {

}
