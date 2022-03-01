import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@ng-mfe/shared/data-access-user';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'ng-mfe-root',
  template: `
    <div class="dashboard-nav">Admin Dashboard</div>
    <div *ngIf="isLoggedIn$ | async; else signIn">
      You are authenticated so you can see this content.
    </div>
    <ng-template #signIn>
      <router-outlet></router-outlet>
    </ng-template>
  `,
  styles: [``],
})
export class AppComponent implements OnInit {
  isLoggedIn$ = this.userService.isUserLoggedIn$;

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$
      .pipe(distinctUntilChanged())
      .subscribe(async (isLoggedIn) => {
        if (!isLoggedIn) {
          this.router.navigateByUrl('login');
        } else {
          this.router.navigateByUrl('');
        }
      });
  }
}
