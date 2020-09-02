import { Component, OnInit, ChangeDetectionStrategy, Input, HostListener, OnChanges, SimpleChanges } from '@angular/core';
import { GrandChild, Child, Parent } from '../models';
import { Apollo, gql } from 'apollo-angular';
import { GET_PARENT } from '../parent/parent.component';
import { mod, all, matching } from 'shades';

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

        // parent = {
        //   parent: {
        //     ...parent,
        //     children: [...parent.parent.children]
        // };

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
