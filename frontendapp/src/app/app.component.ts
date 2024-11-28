import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AccountComponent } from './account/account.component';
import { SigninComponent } from './signin/signin.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SignupComponent, NavbarComponent, AccountComponent, SigninComponent],
  //imports: [UserComponent],
  //templateUrl: './app.component.html',
  template: `
    <main>
      <header class="brand-name">
        <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true" />
      </header>
      <section class="content">

      </section>
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'app-frontend';
}
