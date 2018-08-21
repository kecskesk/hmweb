import { Component, OnInit } from '@angular/core';
import { AuthService } from '../common/auth.service';
import { Router } from '@angular/router';
import { Dictionary } from '../common/dictionary';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {
  routes = new Dictionary<string>();

  constructor(private authService: AuthService, public router: Router) {
    this.routes['inbox'] = 'Levelek';
    this.routes['home'] = 'Kezdőlap';
    this.routes['bio'] = 'Bemutatkozás';
    this.routes['blog'] = 'Blog';
    this.routes['songs'] = 'Dalok';
    this.routes['concert'] = 'Koncertek';
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
