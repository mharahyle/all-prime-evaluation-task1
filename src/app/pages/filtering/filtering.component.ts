import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IgxGridModule } from 'igniteui-angular';
import { IgxPreventDocumentScrollModule } from '../../directives/prevent-scrollview.directive';
import { WINDDATA } from '../../data/windData';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filtering',
  standalone:true,
  imports: [FormsModule,CommonModule,
    IgxPreventDocumentScrollModule,
    IgxGridModule],
  templateUrl: './filtering.component.html',
  styleUrl: './filtering.component.scss'
})
export class FilteringComponent {
  public data!: any[];

    constructor() {
    }
    public ngOnInit(): void {
        this.data = WINDDATA;
    }

    public formatDate(val: Date) {
        return new Intl.DateTimeFormat('en-US').format(val);
    }

    public formatCurrency(val: string) {
        return parseInt(val, 10).toFixed(2);
    }
}
