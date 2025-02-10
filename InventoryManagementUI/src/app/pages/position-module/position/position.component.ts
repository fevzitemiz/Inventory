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
import { PositionCreateModel, Positions, PositionService, PositionUpdateModel } from '../../../../openapi/services';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-position',
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
  templateUrl: './position.component.html',
  styleUrl: './position.component.css',
  providers: []
})
export class PositionComponent implements OnInit {

  newDescription: string = ""
  listOfData!: Positions[]
  isVisible = false;
  editCache: { [key: string]: { edit: boolean; data: Positions } } = {};

  searchValue = '';
  searchVisible = false;

  constructor(
    private positionService: PositionService,
    private msg: NzMessageService
  ) { }

  async getData() {
    await this.positionService.apiPositionsGet().toPromise().then(x => {
      this.listOfData = x?.data as Positions[]
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

    let cmd: PositionUpdateModel = {
      id: id,
      description: this.editCache[id].data.description
    }
    this.positionService.apiPositionPut(cmd).subscribe(async res => {
      await this.updateEditCache()
      this.msg.info('Güncelleme Başarılı!!');
      const index = this.listOfData.findIndex(item => item.id === id);
      Object.assign(this.listOfData[index], this.editCache[id].data);
      this.editCache[id].edit = false;
    })
  }

  delete(id: number): void {
    this.positionService.apiPositionIdDelete(id.toString()).subscribe(async res => {
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
    let cmd: PositionCreateModel = {
      description: this.newDescription
    }
    this.positionService.apiPositionPost(cmd).subscribe(async res => {
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
    this.listOfData = this.listOfData.filter((item: Positions) => item.description.toLowerCase().indexOf(this.searchValue.toLowerCase()) != -1);
  }

  resetForm() {
    this.newDescription = ""
  }
}

