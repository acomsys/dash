import { ConnectDropTarget, useDrop } from "react-dnd";
import { TreeNode } from "../../../models/TreeNode";
import { Collect } from "../Collect";
import { Drop } from "../Drop";
import { ItemTypes } from "../ItemType";

/**
 * Creates a drop target hook for a tree node. 
 * 
 * @param node The node of the receiving element.
 * @returns The class to be applied to the target element when dropped.
 */
export const useTreeNodeDrop = (node: TreeNode, name: string): TreeNodeDropResult => {
    const [drag, drop] = useDrop<TreeNode, Drop, Collect>(() => ({
        accept: ItemTypes.TREE_NODE,
        drop: () => ({ target: node }),
        collect: (monitor) => ({
            class: monitor.canDrop() && monitor.isOver() ? name : "",
        }),
    }));

    return [drag.class, drop];
}

export type TreeNodeDropResult = [string, ConnectDropTarget];