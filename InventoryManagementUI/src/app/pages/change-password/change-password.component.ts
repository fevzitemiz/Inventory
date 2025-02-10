import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { PasswordUpdateModel, UserService } from '../../../openapi/services';
import { AuthService } from '../../services/auth.service';
import { TokenModel } from '../../services/models/tokenModel';


@Component({
  selector: 'app-change-password',
  imports: [
    FormsModule,
    NzTableModule,
    NzInputModule,
    NzPopconfirmModule,
    NzDividerModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    NzIconModule,
    NzSelectModule,
    NzDropDownModule,
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
  providers: []
})
export class ChangePasswordComponent implements OnInit {

  currentPassword: string = ""
  password: string = ""
  passwordConfirm: string = ""
  isVisible: boolean = false;
  tokenInfo!: TokenModel | any

  constructor(
    private msg: NzMessageService,
    private userService: UserService,
    private authService: AuthService
  ) {

  }

  ngOnInit(): void {

  }

  showModal(): void {
    this.resetForm()
    this.isVisible = true;
  }

  async handleOk(): Promise<void> {

    if (this.password !== this.passwordConfirm){
      this.msg.info('Yeni parolalar uyuşmuyor!');
      return
    }

    this.tokenInfo = this.authService.tokenInfo()
    let cmd: PasswordUpdateModel = {
      userId: this.tokenInfo.userId,
      passwordNew: this.password,
      passwordOld: this.currentPassword
    }
    this.userService.apiUserUpdatePasswordPost(cmd).subscribe(async res => {
      this.msg.info('Parola Güncellendi!');
      this.isVisible = false;
    })
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  resetForm() {
    this.currentPassword = ""
    this.password = ""
    this.passwordConfirm = ""
  }

}
