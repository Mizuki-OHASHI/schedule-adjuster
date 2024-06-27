"use client";

import { type FC } from "react";

import DndProvider from "@components/DnD/DnDprovider";
import DragItem from "@components/DnD/DragItem";
import DropZone from "@components/DnD/DropZone";
import AppTemplate from "@components/Template";

const MePage: FC = () => {
  return (
    <DndProvider>
      <AppTemplate>
        <div className="size-full flex items-center justify-center">
          <DropZone
            onDropped={() => {
              console.log("Dropped!");
            }}
            classNames="w-64 h-64 border-2 border-dashed border-gray-400 bg-gray-700"
            isDraggableClassNames=""
          >
            Drop here!
          </DropZone>
          <DragItem
            onDragStart={() => {
              console.log("Drag start!");
            }}
            onDragEnd={() => {
              console.log("Drag end!");
            }}
            classNames="w-64 h-64 bg-gray-400"
            isDraggingClassNames=""
          >
            Drag me!
          </DragItem>
        </div>
      </AppTemplate>
    </DndProvider>
  );
};

export default MePage;
