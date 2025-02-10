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
import { Brands, BrandsService, ItemCreateModel, Items, ItemService, ItemUpdateModel, TypeOfItems, TypeOfItemService } from '../../../../openapi/services';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-items',
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
  templateUrl: './items.component.html',
  styleUrl: './items.component.css',
  providers: []
})
export class ItemsComponent implements OnInit {

  description: string = ""
  eRegistryNumber: string = ""
  model: string = ""
  serialNumber: string = ""

  selectedBrand!: number
  optionListBrands!: Brands[]

  selectedTypeOfItem!: number
  optionListTypesOfItem!: TypeOfItems[]

  listOfData!: Items[]
  isVisible = false;
  editCache: { [key: string]: { edit: boolean; data: Items } } = {};

  searchValue = '';
  searchVisible = false;

  constructor(
    private itemService: ItemService,
    private brandService: BrandsService,
    private typeOfItemService: TypeOfItemService,
    private msg: NzMessageService
  ) { }

  async getData() {
    await this.itemService.apiItemsGet().toPromise().then(x => {
      this.listOfData = x?.data as Items[]
    })
  }

  async getBrands() {
    await this.brandService.apiBrandsGet().toPromise().then(x => {
      this.optionListBrands = x?.data as Brands[]
    })
  }

  async getTypesOfItems() {
    await this.typeOfItemService.apiTypeOfItemsGet().toPromise().then(x => {
      this.optionListTypesOfItem = x?.data as TypeOfItems[]
    })
  }

  startEdit(id: number): void {
    this.selectedBrand = this.editCache[id].data.brand.id
    this.selectedTypeOfItem = this.editCache[id].data.typeOfItem.id
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
    let cmd: ItemUpdateModel = {
      id: id,
      brandId: this.selectedBrand,
      typeOfItemId: this.selectedTypeOfItem,
      description: this.editCache[id].data.description,
      eRegistryNumber: this.editCache[id].data.eRegistryNumber,
      model: this.editCache[id].data.model,
      serialNumber: this.editCache[id].data.serialNumber
    }
    this.itemService.apiItemPut(cmd).subscribe(async res => {
      await this.updateEditCache()
      this.msg.info('Güncelleme Başarılı!!');
      const index = this.listOfData.findIndex(item => item.id === id);
      Object.assign(this.listOfData[index], this.editCache[id].data);
      this.editCache[id].edit = false;
    })
  }

  delete(id: number): void {
    this.itemService.apiItemIdDelete(id.toString()).subscribe(async res => {
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
    await this.getBrands()
    await this.getTypesOfItems()
    this.updateEditCache();
  }

  showModal(): void {
    this.resetForm()
    this.isVisible = true;
    this.selectedBrand = 0
    this.selectedTypeOfItem = 0
  }

  async handleOk(): Promise<void> {
    let cmd: ItemCreateModel = {
      brandId: this.selectedBrand,
      typeOfItemId: this.selectedTypeOfItem,
      description: this.description,
      eRegistryNumber: this.eRegistryNumber,
      model: this.model,
      serialNumber: this.serialNumber
    }
    this.itemService.apiItemPost(cmd).subscribe(async res => {
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
    this.listOfData = this.listOfData.filter((item: Items) => item.description.toLowerCase().indexOf(this.searchValue.toLowerCase()) != -1);
  }

  resetForm() {
    this.description = ""
    this.eRegistryNumber = ""
    this.model = ""
    this.serialNumber = ""
    this.selectedBrand = 0
    this.selectedTypeOfItem = 0
  }
}
