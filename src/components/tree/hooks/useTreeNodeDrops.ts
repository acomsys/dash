import { ConnectDropTarget } from "react-dnd";
import { TreeNode } from "../../../models/TreeNode";
import { useTreeNodeDrop } from "./useTreeNodeDrop";

export const useTreeNodeDrops = (node: TreeNode): TreeNodeDropsResult => {
    const [top, dropTop] = useTreeNodeDrop(node, "top");
    const [bottom, dropBottom] = useTreeNodeDrop(node, "bottom");
    const [inner, dropInner] = useTreeNodeDrop(node, "inner");
    const className = top + bottom + inner;
    return [className, dropTop, dropBottom, dropInner];
}

export type TreeNodeDropsResult = [string, ConnectDropTarget, ConnectDropTarget, ConnectDropTarget];