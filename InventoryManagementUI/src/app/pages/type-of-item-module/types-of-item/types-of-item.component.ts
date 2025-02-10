import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TypeOfItemCreateModel, TypeOfItems, TypeOfItemService, TypeOfItemUpdateModel } from '../../../../openapi/services';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-types-of-item',
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
    NzDropDownModule,
  ],
  templateUrl: './types-of-item.component.html',
  styleUrl: './types-of-item.component.css',
  providers: []
})
export class TypesOfItemComponent implements OnInit {

  newDescription: string = ""
  listOfData!: TypeOfItems[]
  isVisible = false;
  editCache: { [key: string]: { edit: boolean; data: TypeOfItems } } = {};

  searchValue = '';
  searchVisible = false;

  constructor(
    private typeOfItemService: TypeOfItemService,
    private msg: NzMessageService
  ) { }

  async getData() {
    await this.typeOfItemService.apiTypeOfItemsGet().toPromise().then(x => {
      this.listOfData = x?.data as TypeOfItems[]
    })
  }

  startEdit(id: number): void {
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

    let cmd: TypeOfItemUpdateModel = {
      id: id,
      description: this.editCache[id].data.description
    }
    this.typeOfItemService.apiTypeOfItemPut(cmd).subscribe(async res => {
      await this.updateEditCache()
      this.msg.info('Güncelleme Başarılı!!');
      const index = this.listOfData.findIndex(item => item.id === id);
      Object.assign(this.listOfData[index], this.editCache[id].data);
      this.editCache[id].edit = false;
    })
  }

  delete(id: number): void {
    this.typeOfItemService.apiTypeOfItemIdDelete(id.toString()).subscribe(async res => {
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
    this.updateEditCache();
  }

  showModal(): void {
    this.resetForm()
    this.isVisible = true;
  }

  async handleOk(): Promise<void> {
    let cmd: TypeOfItemCreateModel = {
      description: this.newDescription
    }
    this.typeOfItemService.apiTypeOfItemPost(cmd).subscribe(async res => {
      await this.updateEditCache()
      this.msg.info('Kayıt Başarılı!');
      this.newDescription = ""
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
    this.listOfData = this.listOfData.filter((item: TypeOfItems) => item.description.toLowerCase().indexOf(this.searchValue.toLowerCase()) != -1);
  }

  resetForm() {
    this.newDescription = ""
  }
}
