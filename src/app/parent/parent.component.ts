import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Parent, GET_PARENT } from './../models';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParentComponent implements OnInit {

  public parent$: Observable<Parent>;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.parent$ = this.apollo.watchQuery<{ parent: Parent }>({
      query: GET_PARENT,
    }).valueChanges.pipe(
      map(result => result.data && result.data.parent)
    );
  }
}
