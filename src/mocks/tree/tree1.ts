import { TreeNode } from '../../models/TreeNode';

export const Tree1: TreeNode[] = [
    { id: 1, text: 'Australia', hasChildren: true, expanded: true, type: "root" },
    { id: 2, parentID: 1, text: 'New South Wales', selected: true, expanded: true, hasChildren: true },
    { id: 3, parentID: 2, text: 'Victoria', hasChildren: true, expanded: true },
    { id: 4, parentID: 3, text: 'South Australia', hasChildren: true, expanded: true },
    { id: 6, parentID: 4, text: 'Western Australia', selected: true, hasChildren: true, expanded: true },
    { id: 7, text: 'Brazil', hasChildren: true },
    { id: 8, parentID: 7, text: 'Paraná' },
    { id: 9, parentID: 7, text: 'Ceará' },
    { id: 10, parentID: 7, text: 'Acre' },
    { id: 11, text: 'China', hasChildren: true },
    { id: 12, parentID: 11, text: 'Guangzhou' },
    { id: 13, parentID: 11, text: 'Shanghai' },
    { id: 14, parentID: 11, text: 'Beijing' },
    { id: 15, parentID: 11, text: 'Shantou' },
    { id: 16, text: 'France', hasChildren: true },
    { id: 17, parentID: 16, text: 'Pays de la Loire' },
    { id: 18, parentID: 16, text: 'Aquitaine' },
    { id: 19, parentID: 16, text: 'Brittany' },
    { id: 20, parentID: 16, text: 'Lorraine' },
    { id: 21, text: 'India', hasChildren: true },
    { id: 22, parentID: 21, text: 'Assam' },
    { id: 23, parentID: 21, text: 'Bihar' },
    { id: 24, parentID: 21, text: 'Tamil Nadu' },
    { id: 25, parentID: 21, text: 'Punjab' }
];