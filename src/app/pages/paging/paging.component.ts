import { Component, ViewChild } from '@angular/core';
import { IgxGridComponent, IgxGridModule, IgxIconModule } from 'igniteui-angular';
import { athletesData } from '../../data/athletesData';
import { IgxPreventDocumentScrollModule } from '../../directives/prevent-scrollview.directive';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-paging',
  standalone:true,
  imports: [IgxGridModule,IgxPreventDocumentScrollModule,IgxIconModule,DecimalPipe,FormsModule],
  templateUrl: './paging.component.html',
  styleUrl: './paging.component.scss'
})
export class PagingComponent {
  @ViewChild('grid1', { static: true }) public grid1!: IgxGridComponent;
  public data!: any[];

  public ngOnInit(): void {
      this.data = athletesData;
  }

  public removeRow(rowIndex:any) {
      const row = this.grid1.getRowByIndex(rowIndex);
      if (row) {
          if (row.delete) {
              row.delete();
          }
      }
  }

}
