export type TreeNode = {
    id: number;
    text: string;
    hasChildren?: boolean;
    expanded?: boolean;
    parentID?: number;
    selected?: boolean;
    type?: string;
};