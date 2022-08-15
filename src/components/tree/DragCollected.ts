import { XYCoord } from "react-dnd";

export type DragCollected = {
    isDragging: boolean;
    getClientOffset: XYCoord | null;
};