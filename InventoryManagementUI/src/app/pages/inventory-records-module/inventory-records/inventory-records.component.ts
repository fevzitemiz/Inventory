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
import { Employees } from '../../../../openapi/services/model/employees';
import { EmployeeService, InventoryRecordCreateModel, InventoryRecords, InventoryRecordService, InventoryRecordUpdateModel, Items, ItemService } from '../../../../openapi/services';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-inventory-records',
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
  templateUrl: './inventory-records.component.html',
  styleUrl: './inventory-records.component.css',
  providers: [DatePipe]
})
export class InventoryRecordsComponent implements OnInit {

  itemId: number = 0
  deliveredByEmployeeId: number = 0
  deliveredToEmployeeId: number = 0
  description: string = ""
  deliveryDate: any
  returnDate: any

  selectedDeliveredByEmployeeId!: number
  optionListDeliveredByEmployees!: Employees[]

  selectedDeliveredToEmployeeId!: number
  optionListDeliveredToEmployees!: Employees[]

  selectedItemId!: number
  optionListItems!: Items[]

  listOfData!: InventoryRecords[]
  isVisible = false;
  editCache: { [key: string]: { edit: boolean; data: InventoryRecords } } = {};

  searchValue = '';
  searchVisible = false;

  constructor(
    private inventoryRecordService: InventoryRecordService,
    private employeeService: EmployeeService,
    private itemService: ItemService,
    private msg: NzMessageService,
    private datePipe: DatePipe
  ) { }

  async getData() {
    await this.inventoryRecordService.apiInventoryRecordsGet().toPromise().then(x => {
      this.listOfData = x?.data as InventoryRecords[]
    })
  }

  async getEmployees() {
    await this.employeeService.apiEmployeesGet().toPromise().then(x => {
      this.optionListDeliveredByEmployees = x?.data as Employees[]
      this.optionListDeliveredToEmployees = x?.data as Employees[]
    })
  }

  async getItems() {
    await this.itemService.apiItemsGet().toPromise().then(x => {
      this.optionListItems = x?.data as Items[]
    })
  }

  startEdit(id: number): void {
    this.selectedDeliveredByEmployeeId = this.editCache[id].data.deliveredByEmployee.id
    this.selectedDeliveredToEmployeeId = this.editCache[id].data.deliveredToEmployee.id
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
    let cmd: InventoryRecordUpdateModel = {
      id: id,
      deliveredByEmployeeId: this.selectedDeliveredByEmployeeId,
      deliveredToEmployeeId: this.selectedDeliveredToEmployeeId,
      deliveryDate: this.editCache[id].data.deliveryDate,
      returnDate: this.editCache[id].data.returnDate,
      description: this.editCache[id].data.description,
      itemId: this.editCache[id].data.item.id
    }
    this.inventoryRecordService.apiInventoryRecordPut(cmd).subscribe(async res => {
      await this.updateEditCache()
      this.msg.info('Güncelleme Başarılı!!');
      const index = this.listOfData.findIndex(item => item.id === id);
      Object.assign(this.listOfData[index], this.editCache[id].data);
      this.editCache[id].edit = false;
    })
  }

  delete(id: number): void {
    this.inventoryRecordService.apiInventoryRecordIdDelete(id.toString()).subscribe(async res => {
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
    await this.getItems()
    this.updateEditCache();
  }

  showModal(): void {
    this.isVisible = true;
    this.selectedDeliveredByEmployeeId = 0
    this.selectedDeliveredToEmployeeId = 0
    this.selectedItemId = 0
  }

  async handleOk(): Promise<void> {
    let cmd: InventoryRecordCreateModel = {
      deliveredByEmployeeId: this.selectedDeliveredByEmployeeId,
      deliveredToEmployeeId: this.selectedDeliveredToEmployeeId,
      deliveryDate: (this.deliveryDate != null ? this.datePipe.transform(this.deliveryDate, "yyyy-MM-dd")!.toString() : ""),
      returnDate: (this.returnDate != null ? this.datePipe.transform(this.returnDate, "yyyy-MM-dd")!.toString() : ""),
      description: this.description,
      itemId: this.selectedItemId
    }
    this.inventoryRecordService.apiInventoryRecordPost(cmd).subscribe(async res => {
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
    this.listOfData = this.listOfData.filter((item: InventoryRecords) => item.description.toLowerCase().indexOf(this.searchValue.toLowerCase()) != -1);
  }

  resetForm() {
    this.itemId = 0
    this.deliveredByEmployeeId = 0
    this.deliveredToEmployeeId = 0
    this.description = ""
    this.deliveryDate = ""
    this.returnDate = ""
  }
}
