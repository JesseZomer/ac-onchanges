import gql from 'graphql-tag';

export interface Parent {
    id: string;
    title: string;
    children: Child[];
}

export interface Child {
    name: string;
    grandChildren: GrandChild[]
}

export interface GrandChild {
    id: string;
    name: string;
}

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