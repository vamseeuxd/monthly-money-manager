import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users$: Observable<{
    users: { name: string; email: string }[]
  }> = this.http.get<{
    users: {
      name: string;
      email: string
    }[]
  }>('http://localhost:8080/api/users/all');

  constructor(
    public http: HttpClient
  ) {
  }

  ngOnInit(): void {
  }

  onFormSubmit(userForm: NgForm) {
    const subscription = this.http.post('http://localhost:8080/api/users/add', {user: userForm.value}).subscribe(
      value => {
        subscription.unsubscribe();
        userForm.resetForm({});
      },
      error => {
        subscription.unsubscribe();
        debugger;
      }
    )
  }
}
