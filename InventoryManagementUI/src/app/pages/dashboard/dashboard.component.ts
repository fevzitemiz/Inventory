import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { TokenModel } from '../../services/models/tokenModel';
import { WelcomeComponent } from '../welcome/welcome.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterLink,
    RouterOutlet,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    CommonModule,
    WelcomeComponent,
    NzDropDownModule,
    NzSpaceModule,
    NzToolTipModule,
    NzButtonModule,
    ChangePasswordComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, AfterViewChecked {

  @ViewChild(ChangePasswordComponent) changePasswordComponent!: ChangePasswordComponent;

  isLoggedIn!: boolean;

  isCollapsed = true;
  isCollapsedMain = true;
  
  tokenInfo!: TokenModel | any
  isAdmin: boolean = false
  isWelcome: boolean = false;
  adminRoutes: string[] = ["/brands", "/titles", "/employees", "/users", "/positions", "/types-of-item"]
  userRoutes: string[] = ["/inventory-records", "/items", "/softwares"]
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    router.events.subscribe((val) => {
      let currentRoute = val as NavigationEnd
      if (this.adminRoutes.includes(currentRoute.url))
        this.isCollapsed = false
      if (this.userRoutes.includes(currentRoute.url))
        this.isCollapsedMain = false
    });
  }


  ngOnInit(): void {
    this.getTokenInfo()
  }

  logout() {
    this.authService.logout()
  }

  ngAfterViewChecked(): void {
    this.isWelcome = this.authService.checkWelcomePage()
    this.getTokenInfo()
  }

  checkRoute() {
    console.log(this.router.getCurrentNavigation())
  }

  getTokenInfo() {
    this.tokenInfo = this.authService.tokenInfo()
    this.isAdmin = this.tokenInfo.isAdmin
  }

  openModel() {
    this.changePasswordComponent.showModal()
  }

}
