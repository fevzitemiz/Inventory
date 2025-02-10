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
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule, DatePipe } from '@angular/common';
import { Employees, EmployeeService, SoftwareCreateModel, Softwares, SoftwareService, SoftwareUpdateModel } from '../../../../openapi/services';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-softwares',
  imports: [
    CommonModule,
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
    NzDatePickerModule,
    NzDropDownModule,
  ],
  templateUrl: './softwares.component.html',
  styleUrl: './softwares.component.css',
  providers: [DatePipe]
})
export class SoftwaresComponent implements OnInit {

  name: string = ""
  companyEmail: string = ""
  companyPhone: string = ""
  description: string = ""
  lastAgreementDate: any
  nextAgreementDate: any

  selectedResponsibleEmployeeId!: number
  optionListResponsibleEmployees!: Employees[]

  listOfData!: Softwares[]
  isVisible = false;
  editCache: { [key: string]: { edit: boolean; data: Softwares } } = {};

  searchValue = '';
  searchVisible = false;

  constructor(
    private softwareService: SoftwareService,
    private employeeService: EmployeeService,
    private msg: NzMessageService,
    private datePipe: DatePipe
  ) { }

  async getData() {
    await this.softwareService.apiSoftwaresGet().toPromise().then(x => {
      this.listOfData = x?.data as Softwares[]
    })
  }

  async getEmployees() {
    await this.employeeService.apiEmployeesGet().toPromise().then(x => {
      this.optionListResponsibleEmployees = x?.data as Employees[]
    })
  }


  startEdit(id: number): void {
    this.selectedResponsibleEmployeeId = this.editCache[id].data.employee.id
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
    let cmd: SoftwareUpdateModel = {
      id: id,
      companyEmail: this.editCache[id].data.companyEmail,
      companyPhone: this.editCache[id].data.companyPhone,
      description: this.editCache[id].data.description,
      employeeId: this.selectedResponsibleEmployeeId,
      lastAgreementDate: this.editCache[id].data.lastAgreementDate,
      name: this.editCache[id].data.name,
      nextAgreementDate: this.editCache[id].data.nextAgreementDate,
    }
    this.softwareService.apiSoftwarePut(cmd).subscribe(async res => {
      await this.updateEditCache()
      this.msg.info('Güncelleme Başarılı!!');
      const index = this.listOfData.findIndex(item => item.id === id);
      Object.assign(this.listOfData[index], this.editCache[id].data);
      this.editCache[id].edit = false;
    })
  }

  delete(id: number): void {
    this.softwareService.apiSoftwareIdDelete(id.toString()).subscribe(async res => {
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
    await this.getEmployees()
    this.updateEditCache();
  }

  showModal(): void {
    this.resetForm()
    this.isVisible = true;
    this.selectedResponsibleEmployeeId = 0
  }

  async handleOk(): Promise<void> {
    let cmd: SoftwareCreateModel = {
      companyEmail: this.companyEmail,
      companyPhone: this.companyPhone,
      description: this.description,
      employeeId: this.selectedResponsibleEmployeeId,
      lastAgreementDate: this.datePipe.transform(this.lastAgreementDate, "yyyy-MM-dd")!.toString(),
      name: this.name,
      nextAgreementDate: this.datePipe.transform(this.nextAgreementDate, "yyyy-MM-dd")!.toString(),
    }
    this.softwareService.apiSoftwarePost(cmd).subscribe(async res => {
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
    this.listOfData = this.listOfData.filter((item: Softwares) => item.description.toLowerCase().indexOf(this.searchValue.toLowerCase()) != -1);
  }

  resetForm() {
    this.companyEmail = ""
    this.companyPhone = ""
    this.description = ""
    this.lastAgreementDate = ""
    this.selectedResponsibleEmployeeId = 0
    this.name = ""
    this.nextAgreementDate = ""
  }
}
