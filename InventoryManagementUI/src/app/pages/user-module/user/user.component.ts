import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Employees, EmployeeService, Roles, RoleService, UserCreateModel, Users, UserService, UserUpdateModel } from '../../../../openapi/services';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-user',
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
    NzCheckboxModule,
    NzDropDownModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  providers: []
})
export class UserComponent implements OnInit {

  userName: string = ""
  isActive: boolean = false
  password: string = ""
  passwordCheck: string = ""
  selectedRole!: number
  optionListRoles!: Roles[]

  selectedEmployee!: number
  optionListEmployees!: Employees[]

  listOfData!: Users[]
  isVisible = false;
  editCache: { [key: string]: { edit: boolean; data: Users } } = {};

  searchValue = '';
  searchVisible = false;

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private employeeService: EmployeeService,
    private msg: NzMessageService
  ) { }

  async getData() {
    await this.userService.apiUsersGet().toPromise().then(x => {
      this.listOfData = x?.data as Users[]
    })
  }

  async getRoles() {
    await this.roleService.apiRolesGet().toPromise().then(x => {
      this.optionListRoles = x?.data as Roles[]
    })
  }

  async getEmployees() {
    await this.employeeService.apiEmployeesGet().toPromise().then(x => {
      this.optionListEmployees = x?.data as Employees[]
    })
  }

  startEdit(id: number): void {
    this.selectedRole = this.editCache[id].data.role.id
    this.editCache[id].edit = true;
  }

  cancelEdit(id: number): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  update(id: number): void {
    let cmd: UserUpdateModel = {
      id: id,
      userName: this.editCache[id].data.userName,
      isActive: this.editCache[id].data.isActive,
      roleId: this.selectedRole,
    }
    this.userService.apiUserPut(cmd).subscribe(async res => {
      await this.updateEditCache()
      this.msg.info('Güncelleme Başarılı!!');
      const index = this.listOfData.findIndex(item => item.id === id);
      Object.assign(this.listOfData[index], this.editCache[id].data);
      this.editCache[id].edit = false;
    })
  }

  delete(id: number): void {
    this.userService.apiUserIdDelete(id.toString()).subscribe(async res => {
      await this.updateEditCache()
      this.msg.info('Veri silindi!');
      this.isVisible = false;
    })

  }

  async updateEditCache(): Promise<void> {
    await this.getData()
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  async ngOnInit(): Promise<void> {
    await this.getRoles()
    await this.getEmployees()
    this.updateEditCache();
  }

  showModal(): void {
    this.resetForm()
    this.isVisible = true;
    this.selectedRole = 0
  }

  async handleOk(): Promise<void> {

    if (this.password === this.passwordCheck) {

      let cmd: UserCreateModel = {
        employeeId: this.selectedEmployee,
        isActive: true,
        password: this.password,
        roleId: this.selectedRole,
        userName: this.userName
      }
      this.userService.apiUserPost(cmd).subscribe(async res => {
        await this.updateEditCache()
        this.msg.info('Kayıt Başarılı!');
        this.isVisible = false;
      })

    } else {
      this.msg.warning('Parola eşleşmiyor!');
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  reset(): void {
    this.searchValue = '';
    this.getData();
  }

  search(): void {
    this.searchVisible = false;
    this.listOfData = this.listOfData.filter((item: Users) => item.userName.toLowerCase().indexOf(this.searchValue.toLowerCase()) != -1);
  }

  resetForm() {
    this.userName = ""
    this.isActive = false
    this.password = ""
    this.passwordCheck = ""
    this.selectedRole = 0
    this.selectedEmployee = 0
  }
}
