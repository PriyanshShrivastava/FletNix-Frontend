import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Fletnix';

  constructor(private router: Router) {}

  // checking whether the url is the homepage
  isHomePage() {
    return this.router.url === '/';
  }
}
