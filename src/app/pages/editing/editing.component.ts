import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { DATA } from '../../data/localData';
import { CommonModule } from '@angular/common';
import { IgxGridModule, IgxSwitchModule, IgxIconModule } from 'igniteui-angular';
import { IgxPreventDocumentScrollModule } from '../../directives/prevent-scrollview.directive';
import { WINDDATA } from '../../data/windData';

@Component({
  selector: 'app-editing',
  standalone:true,
  imports: [CommonModule,IgxGridModule,
    IgxSwitchModule,
    IgxIconModule,IgxPreventDocumentScrollModule ],
  templateUrl: './editing.component.html',
  styleUrl: './editing.component.scss'
})
export class EditingComponent {
  @ViewChild('logger')
  public logger!: ElementRef;

  public $rowEditEnter = false;
  public $cellEditEnter = false;
  public $cellEdit = false;
  public $rowEdit = false;
  public data;


  public constructor(private renderer: Renderer2) {
      this.data = WINDDATA;
  }

  public rowEditEnter(evt:any) {
      evt.cancel = this.$rowEditEnter;
      this.logAnEvent(`=> 'rowEditEnter' with 'RowID':` + evt.rowID, evt.cancel);
  }
  public cellEditEnter(evt:any) {
      evt.cancel = this.$cellEditEnter;
      this.logAnEvent(`=> 'cellEditEnter' with 'value':` + evt.oldValue, evt.cancel);
  }
  public cellEdit(evt:any) {
      evt.cancel = this.$cellEdit;
      this.logAnEvent(`=> 'cellEdit' with 'newValue':` + evt.newValue, evt.cancel);
  }
  public cellEditDone() {
      this.logAnEvent(`=> 'cellEditDone'`);
  }
  public cellEditExit() {
      this.logAnEvent(`=> 'cellEditExit'`);
  }
  public rowEdit(evt:any) {
      evt.cancel = this.$rowEdit;
      this.logAnEvent(`=> 'rowEdit'`, evt.cancel);
  }
  public rowEditDone() {
      this.logAnEvent(`=> 'rowEditDone'`);
  }
  public rowEditExit() {
      this.logAnEvent(`=> 'rowEditExit'  << End of cycle >>`);
  }

  private logAnEvent(msg: string, canceled?: boolean) {
      const createElem = this.renderer.createElement('p');

      if (canceled) {
          msg = msg.concat(': has been canceled ');
      }

      const text = this.renderer.createText(msg);
      this.renderer.appendChild(createElem, text);
      const container = this.logger.nativeElement;
      this.renderer.insertBefore(container, createElem, container.children[0]);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public clearLog() {
      const  elements = this.logger.nativeElement.querySelectorAll('p');
      for (let index = 0; index < elements.length; index++) {
          this.renderer.removeChild(this.logger.nativeElement, elements[index]);
      }
  }
}
