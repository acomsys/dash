import { INode } from "./INode";

export type IFlatTree = {
    nodes: INode[],
    expanded: string[],
};