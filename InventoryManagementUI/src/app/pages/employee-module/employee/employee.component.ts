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
import { EmployeeCreateModel, Employees, EmployeeService, EmployeeUpdateModel, Positions, PositionService, Titles, TitleService } from '../../../../openapi/services';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-employee',
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
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
  providers: []
})
export class EmployeeComponent implements OnInit {

  email: string = ""
  gsm: string = ""
  name: string = ""
  position: number = 0
  surName: string = ""
  titleId: number = 0
  positionId: number = 0
  selectedPosition!: number
  selectedTitle!: number
  optionListTitles!: Titles[]
  optionListPositions!: Positions[]

  listOfData!: Employees[]
  isVisible = false;
  editCache: { [key: string]: { edit: boolean; data: Employees } } = {};

  searchValue = '';
  searchVisible = false;

  constructor(
    private employeeService: EmployeeService,
    private titleService: TitleService,
    private positionService: PositionService,
    private msg: NzMessageService
  ) { }

  async getData() {
    await this.employeeService.apiEmployeesGet().toPromise().then(x => {
      this.listOfData = x?.data as Employees[]
    })
  }

  async getTitles() {
    await this.titleService.apiTitlesGet().toPromise().then(x => {
      this.optionListTitles = x?.data as Titles[]
    })
  }

  async getPositions() {
    await this.positionService.apiPositionsGet().toPromise().then(x => {
      this.optionListPositions = x?.data as Positions[]
    })
  }

  startEdit(id: number): void {
    this.selectedPosition = this.editCache[id].data.position.id
    this.selectedTitle = this.editCache[id].data.title.id
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

    let cmd: EmployeeUpdateModel = {
      id: id,
      email: this.editCache[id].data.email,
      gsm: this.editCache[id].data.gsm,
      name: this.editCache[id].data.name,
      positionId: this.selectedPosition,
      surName: this.editCache[id].data.surName,
      titleId: this.selectedTitle,
    }
    this.employeeService.apiEmployeePut(cmd).subscribe(async res => {
      await this.updateEditCache()
      this.msg.info('Güncelleme Başarılı!!');
      const index = this.listOfData.findIndex(item => item.id === id);
      Object.assign(this.listOfData[index], this.editCache[id].data);
      this.editCache[id].edit = false;
    })
  }

  delete(id: number): void {
    this.employeeService.apiEmployeeIdDelete(id.toString()).subscribe(async res => {
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
    await this.getTitles()
    await this.getPositions()
    this.updateEditCache();
  }

  showModal(): void {
    this.resetForm()
    this.isVisible = true;
    this.selectedPosition = 0
    this.selectedTitle = 0
  }

  async handleOk(): Promise<void> {
    let cmd: EmployeeCreateModel = {
      email: this.email,
      gsm: this.gsm,
      name: this.name,
      positionId: this.selectedPosition,
      surName: this.surName,
      titleId: this.selectedTitle,
    }
    this.employeeService.apiEmployeePost(cmd).subscribe(async res => {
      await this.updateEditCache()
      this.msg.info('Kayıt Başarılı!');
      this.isVisible = false;
    })
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
    this.listOfData = this.listOfData.filter((item: Employees) => item.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) != -1);
  }

  resetForm() {
    this.email = ""
    this.gsm = ""
    this.name = ""
    this.position = 0
    this.surName = ""
    this.titleId = 0
    this.positionId = 0
    this.selectedPosition = 0
    this.selectedTitle = 0
  }
}
