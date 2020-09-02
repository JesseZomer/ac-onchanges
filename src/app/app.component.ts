import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-parent></app-parent>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'ac-onchanges';
}
