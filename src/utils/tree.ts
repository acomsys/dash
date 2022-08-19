import { IFlatNode } from "../models/tree/IFlatNode";
import { IFlatTree } from "../models/tree/IFlatTree";

export const sortTree = (tree: IFlatTree): IFlatNode[] => {
    const output: IFlatNode[] = [];

    const roots = tree.nodes
        .sort((a, b) => a.s - b.s)
        .filter(node => node.pid === undefined);
    roots.forEach(root => {
        const node: IFlatNode = {
            id: root.id,
            l: 0,
            pid: root.pid,
            s: root.s,
        };
        output.push(node);
        if (tree.expanded.includes(node.id)) {
            output.push(..._sortTree(node, tree));
        }
    });

    return output;
}

const _sortTree = (node: IFlatNode, tree: IFlatTree): IFlatNode[] => {
    const output: IFlatNode[] = [];
    const children = tree.nodes
        .filter(n => n.pid === node.id);
    children.forEach(child => {
        const childNode: IFlatNode = {
            id: child.id,
            l: node.l + 1,
            pid: child.pid,
            s: child.s,
        }
        output.push(childNode);
        if (tree.expanded.includes(childNode.id)) {
            output.push(..._sortTree(childNode, tree));
        }
    }
    );

    return output;
}