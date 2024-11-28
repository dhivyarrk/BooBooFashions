import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import {API_URL} from '../env';


@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  credentials = {
    email_id: '',
    password: '',
  };
  constructor(private userService: UserService, private router: Router) {}

  onSignin() {
    this.userService.signin(this.credentials).subscribe({
        next: (response) => { // Define the expected shape of 'response'
          alert('Signin successful!');
          localStorage.setItem('token', response.user.token); // Save JWT token
          localStorage.setItem('user_type', response.user.user_type); // Save JWT token
          console.log(response.user);
          this.router.navigate(['/dashboard']); // Navigate to products page
          //this.router.navigateByUrl(`${API_URL}/dashboard`);
        },
        error: (error: any) => alert('Signin failed: ' + error.error.error),
      });
  }
}
