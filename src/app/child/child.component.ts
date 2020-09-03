import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { matching, mod } from 'shades';

import { Child, GrandChild, Parent, GET_PARENT } from '../models';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent implements OnInit, OnChanges {

  @Input() child: Child;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    console.log('in onchanges for child:', this.child.name);
  }

  addGrandchild() {
    this.apollo.mutate({
      mutation: gql`
        mutation addGrandchild {
          addGrandchild
        }
      `,
      update: (cache) => {
        let parent = cache.readQuery<{ parent: Parent }>({
          query: GET_PARENT,
        })

        parent = mod('parent', 'children', matching({ name: this.child.name }), 'grandChildren')
          ((gc: GrandChild[]) => {
            const newGrandChild = {
              __typename: 'GrandChild',
              id: `${this.child.name}-${Number(gc[gc.length - 1].name) + 1}`,
              name: Number(gc[gc.length - 1].name) + 1
            };
            return [...gc, newGrandChild];
          })(parent);

        cache.writeQuery({
          query: GET_PARENT,
          data: parent
        });
      }
    }).subscribe();
  }

  trackById(index, item) {
    return item.id;
  }

}
