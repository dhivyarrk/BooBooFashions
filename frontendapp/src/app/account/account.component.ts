import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {Observable} from 'rxjs';
import { UserserviceService } from '../userservice.serviceold';
import {User} from '../user.model';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  title = 'app';
  examsListSubs!: Subscription;
  examsList!: User;
  user$!: Observable<User>;
  us: any;

  constructor(private usersApi: UserserviceService) {
    console.log("in constructor component");
    console.log(this.examsListSubs);
    console.log(this.user$);
  
  }
  ngOnInit() {
    this.user$ = this.usersApi.getUsers();
    console.log("in user component");
    console.log(this.user$);
    //this.usersListSubs = this.usersApi
    // .getUsers()
    //  .subscribe(res => {
    //      this.usersList = res;
    //    },
    //    console.error
    //  );
    this.examsListSubs = this.usersApi.getUsers().subscribe({
      complete: () => console.log("am i here in component")
      //complete: () => console.log(this.examsList)
    }
    );

    console.log("in where component");
    console.log(this.examsListSubs);
    //console.log(complete);
    this.usersApi.getUsers().subscribe({
      next: (response) => {
        this.us = response;
        console.log("hids");
        console.log(this.us);
        //for (let color of this.us) {
        //  console.log(color);
        //}
        
      },
      error: (err) => {
        console.error('Error fetching data', err);
      }
    });
  
  }


  ngOnDestroy() {
    //this.usersListSubs.unsubscribe();
  }

}
