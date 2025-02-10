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
import { TitleCreateModel, Titles, TitleService, TitleUpdateModel } from '../../../../openapi/services';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-title',
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
  templateUrl: './title.component.html',
  styleUrl: './title.component.css',
  providers: []
})
export class TitleComponent implements OnInit {

  newDescription: string = ""
  listOfData!: Titles[]
  isVisible = false;
  editCache: { [key: string]: { edit: boolean; data: Titles } } = {};

  searchValue = '';
  searchVisible = false;

  constructor(
    private titleService: TitleService,
    private msg: NzMessageService
  ) { }

  async getData() {
    await this.titleService.apiTitlesGet().toPromise().then(x => {
      this.listOfData = x?.data as Titles[]
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

    let cmd: TitleUpdateModel = {
      id: id,
      description: this.editCache[id].data.description
    }
    this.titleService.apiTitlePut(cmd).subscribe(async res => {
      await this.updateEditCache()
      this.msg.info('Güncelleme Başarılı!!');
      const index = this.listOfData.findIndex(item => item.id === id);
      Object.assign(this.listOfData[index], this.editCache[id].data);
      this.editCache[id].edit = false;
    })

  }

  delete(id: number): void {
    this.titleService.apiTitleIdDelete(id.toString()).subscribe(async res => {
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
    let cmd: TitleCreateModel = {
      description: this.newDescription
    }
    this.titleService.apiTitlePost(cmd).subscribe(async res => {
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

  async search(): Promise<void> {
    await this.getData();
    this.searchVisible = false;
    this.listOfData = this.listOfData.filter((item: Titles) => item.description.toLowerCase().indexOf(this.searchValue.toLowerCase()) != -1);
  }

  resetForm() {
    this.newDescription = ""
  }
}
