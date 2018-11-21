import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  componentSubs: Subscription[] = [];
  isAuth = false;

  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.componentSubs.push(this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    }));
  }

  onSidenavToggle() {
    this.sidenavToggle.emit();
  }

  onLogOut() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.componentSubs.forEach(subs => {
      subs.unsubscribe();
    });
  }
}
