import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dictionary } from '../common/dictionary';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {
  isCollapsed = true;
  routes = new Dictionary<string>();

	constructor(public router: Router) {
      this.routes['/bio'] = 'Bemutatkozás';
      this.routes['/songs'] = 'Dalok';
      this.routes['/concert'] = 'Koncertek';
      this.routes['/blog'] = 'Blog';
      this.routes['/gallery'] = 'Galéria';
      this.routes['/contact'] = 'Kapcsolat';
  }

	ngOnInit() {}

}
