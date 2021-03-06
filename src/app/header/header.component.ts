import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit() {
  }

  onSelectSignIn() {
    this.router.navigate(['/signin']);
  }

  onSelectSignUp() {
    this.router.navigate(['/signup']);
  }

  onLogOut() {
    this.authService.logout();
  }

  onSelectMyAccount() {
    this.router.navigate(['/student']);
  }

  onSelectChapters() {
    this.router.navigate(['/chapters', 'list']);
  }

  onSelectIndexPage() {
    this.router.navigate(['']);
  }
}
