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