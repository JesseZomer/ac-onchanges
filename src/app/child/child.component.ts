import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Child } from '../models';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent implements OnInit, OnChanges {

  @Input() child: Child;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    console.log('in onchanges for child:', this.child.name);
  }

  trackById(index, item) {
    return item.id;
  }

}
