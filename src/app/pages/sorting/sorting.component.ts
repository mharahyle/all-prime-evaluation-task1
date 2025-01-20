import { Component, ViewChild } from '@angular/core';
import { DefaultSortingStrategy, IgxGridComponent, IgxGridModule, IgxIconModule, IgxInputGroupModule, IgxRippleModule, IgxSelectComponent, IgxSelectModule, SortingDirection } from 'igniteui-angular';
import { DATA } from '../../data/localData';
import { IgxPreventDocumentScrollModule } from '../../directives/prevent-scrollview.directive';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
enum TYPE {
  SINGLE = 'single',
  MULTI = 'multiple'
}
@Component({
  selector: 'app-sorting',
  imports: [IgxGridModule,IgxIconModule,
    IgxRippleModule,FormsModule,CommonModule,
    IgxInputGroupModule,IgxPreventDocumentScrollModule,
    IgxSelectModule],
  standalone:true,
  templateUrl: './sorting.component.html',
  styleUrl: './sorting.component.scss'
})
export class SortingComponent {
  @ViewChild('grid1', { read: IgxGridComponent, static: true })
  public grid1!: IgxGridComponent;

  @ViewChild(IgxSelectComponent)
  public igxSelect: IgxSelectComponent | undefined;

  public data!: any[];
  public sortingTypes = [{ name: 'Multiple Sort', value: TYPE.MULTI }, { name: 'Single Sort', value: TYPE.SINGLE }];
  public currentSortingType: TYPE = TYPE.SINGLE;

  constructor() {
  }
  public ngOnInit(): void {
      this.data = DATA;
      this.grid1.sortingExpressions = [
          {
              dir: SortingDirection.Asc, fieldName: 'CategoryName',
              ignoreCase: true, strategy: DefaultSortingStrategy.instance()
          }
      ];
  }

  public formatDate(val: Date) {
      return new Intl.DateTimeFormat('en-US').format(val);
  }

  public removeSorting($event: any) {
      if (this.currentSortingType === TYPE.SINGLE) {
          this.grid1.columns.forEach((col) => {
              if (!(col.field === $event.fieldName)) {
                  this.grid1.clearSort(col.field);
              }
          });
      }
  }

  public sortTypeSelection(event: any) {
          this.grid1.clearSort();
  }
}
