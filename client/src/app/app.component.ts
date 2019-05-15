import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './core/user/user';
import { UserService } from './core/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  user$: Observable<User>;

  constructor(
    private userService: UserService) {
    this.user$ = userService.getUser();
  }
}
