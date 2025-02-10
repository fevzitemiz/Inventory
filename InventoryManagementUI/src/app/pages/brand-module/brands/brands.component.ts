import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { BrandCreateModel, Brands, BrandsService, BrandUpdateModel } from '../../../../openapi/services';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-brands',
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
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
  providers: []
})
export class BrandsComponent implements OnInit {

  newDescription: string = ""
  listOfData!: Brands[]
  isVisible = false;
  editCache: { [key: string]: { edit: boolean; data: Brands } } = {};

  searchValue = '';
  searchVisible = false;

  constructor(
    private brandService: BrandsService,
    private msg: NzMessageService
  ) { }

  async getData() {
    await this.brandService.apiBrandsGet().toPromise().then(x => {
      this.listOfData = x?.data as Brands[]
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

    let cmd: BrandUpdateModel = {
      id: id,
      description: this.editCache[id].data.description
    }
    this.brandService.apiBrandPut(cmd).subscribe(async res => {
      await this.updateEditCache()
      this.msg.info('Güncelleme Başarılı!!');
      const index = this.listOfData.findIndex(item => item.id === id);
      Object.assign(this.listOfData[index], this.editCache[id].data);
      this.editCache[id].edit = false;
    })

  }

  delete(id: number): void {
    this.brandService.apiBrandIdDelete(id.toString()).subscribe(async res => {
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
    let cmd: BrandCreateModel = {
      description: this.newDescription
    }
    this.brandService.apiBrandPost(cmd).subscribe(async res => {
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
    this.listOfData = this.listOfData.filter((item: Brands) => item.description.toLowerCase().indexOf(this.searchValue.toLowerCase()) != -1);
  }

  resetForm() {
    this.newDescription = ""
  }
}
