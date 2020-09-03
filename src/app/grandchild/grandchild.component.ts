import { ChangeDetectionStrategy, Component, HostListener, Input, OnChanges, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { all, mod } from 'shades';

import { GrandChild, Parent, GET_PARENT } from '../models';

@Component({
  selector: 'app-grandchild',
  templateUrl: './grandchild.component.html',
  styleUrls: ['./grandchild.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GrandchildComponent implements OnInit, OnChanges {

  @Input() grandchild: GrandChild;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    console.log('in onchanges grandchild: ', this.grandchild.id);
  }

  @HostListener('click')
  public onClick() {
    this.apollo.mutate({
      mutation: gql`
        mutation removeGrandchild {
          removeGrandchild
        }
      `,
      update: (cache) => {
        let parent = cache.readQuery<{ parent: Parent }>({
          query: GET_PARENT,
        })

        // matching({ grandChildren: (gc: []) => gc.some((_gc: GrandChild) => _gc.id === this.grandchild.id) })
        parent = mod('parent', 'children', all(),
          'grandChildren')((gc: GrandChild[]) => gc.filter((_gc) => _gc.id !== this.grandchild.id))(parent);

        cache.writeQuery({
          query: GET_PARENT,
          data: parent
        });

        // cache.evict({
        //   id: cache.identify({ __typename: 'GrandChild', id: this.grandchild.id })
        // });
      }
    }).subscribe();
  }

}
