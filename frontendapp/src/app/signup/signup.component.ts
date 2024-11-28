import { Component } from '@angular/core';
//import { User } from 'models/user.model'; // Import User model
import { FormsModule } from '@angular/forms';
//import { HttpClient } from '@angular/common/http';
import { AccountComponent } from '../account/account.component';

import { UserService } from '../user.service';
import {User} from '../models/user.model';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, AccountComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  user: User = {
    user_name: '',
    password: '', // New password field
    join_date: '',
    membership: 'regular', // Default value
    contact_number: undefined,
    email_id: '',
    user_type: 'customer', // Default value
  }
    constructor(private userService: UserService) {}

    onSubmit() {
      this.userService.signup(this.user).subscribe({
        next: (response) => alert('Signup successful!'),
        error: (error) => alert('Error during signup: ' + error.message),
      });
    }

}
