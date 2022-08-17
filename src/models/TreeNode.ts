export type TreeNode = {
    id: number;
    index: number; // index as it appears in the flat list of nodes
    text: string;
    hasChildren?: boolean;
    expanded?: boolean;
    parentID?: number;
    level: number;
    selected?: boolean;
    type?: string;
};