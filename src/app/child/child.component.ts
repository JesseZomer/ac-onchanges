import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Child, Parent, GrandChild } from '../models';
import { Apollo, gql } from 'apollo-angular';
import { GET_PARENT } from '../parent/parent.component';
import { mod, all, matching } from 'shades';

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
            const newGrandChild = { id: `${this.child.name}-${Number(gc[gc.length - 1].name) + 1}`, name: Number(gc[gc.length - 1].name) + 1 };
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
