import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Parent } from './../models';

export const GET_PARENT = gql`
  {
    parent {
        id
        title
        children {
          name
          grandChildren {
            id
            name
          }
        }
    }
  }
`;

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
