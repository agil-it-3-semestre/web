import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from '../../core/user/user.service';
import { User } from '../../core/user/user';

@Component({
  selector: 'ma-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {

  user$: Observable<User>;
  links = []

  constructor(private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private router: Router) {
      this.user$ = userService.getUser();
  }
  ngOnInit(): void {
    let link1;
    let link2;
    let link3;
    let link4;
    let link5;

    link1 = {
      "name":"Empresa",
      "icon":"store_mall_directory",
      "redirect":"empresa"
    };

    link2 = {
      "name":"Ordens",
      "icon":"assignment_ind",
      "redirect":"terceiros"
    };

    link3 = {
      "name":"Máquinas",
      "icon":"ac_unit",
      "redirect":"maquinas"
    };

    link4 = {
      "name":"Monitorar",
      "icon":"remove_red_eye",
      "redirect":"monitor"
    };

    this.links.push(link1);
    this.links.push(link2);
    this.links.push(link3);
    this.links.push(link4);
  }
  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

}
