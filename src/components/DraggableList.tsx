import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid'
import { DragIndicator as DragIndicatorIcon, ExpandMore, ExpandLess } from '@mui/icons-material';
import AddListItem from './AddListItem';
import NestedItems from './NestedItems';
import itemsList from '../data/itemList';
interface TopLevelItem {
    id: string;
    text: string;
    children: NestedItem[];
}

interface NestedItem {
    id: string;
    text: string;
}
const DraggableList: React.FC = () => {
    const [openIndexes, setOpenIndexes] = useState<number[]>([]);
    const [items, setItems] = useState<TopLevelItem[]>(itemsList);
    const handleAddTopLevelItem = (text: string, setNewItemText: React.Dispatch<React.SetStateAction<string>>): void => {
        const newTopLevelItem: TopLevelItem = {
            id: uuidv4(),
            text: text,
            children: [],
        };

        setItems((prevItems) => [...prevItems, newTopLevelItem]);
        setNewItemText('');
    };

    const handleAddSubItem = (parentIndex: number, text: string, setNewItemText: React.Dispatch<React.SetStateAction<string>>): void => {
        if (parentIndex !== null) {
            const newSubItem: NestedItem = {
                id: uuidv4(),
                text: text,
            };

            const updatedItems = [...items];
            updatedItems[parentIndex].children.push(newSubItem);

            setItems(updatedItems);
            setNewItemText('');
        }
    };

    const handleToggle = (index: number): void => {
        if (openIndexes.includes(index)) {
            setOpenIndexes(openIndexes.filter((i) => i !== index));
        } else {
            setOpenIndexes([...openIndexes, index]);
        }
    };

    const handleDragEnd = (result: any): void => {
        if (!result.destination) {
            return;
        }

        const updatedItems = Array.from(items);

        if (result.type === 'NESTED_ITEM') {
            // Reorder within a nested list
            const sourceParentIndex = parseInt(result.source.droppableId, 10);
            const destParentIndex = parseInt(result.destination.droppableId, 10);
            const sourceParent = updatedItems[sourceParentIndex];
            const destParent = updatedItems[destParentIndex];

            const [movedItem] = sourceParent.children.splice(result.source.index, 1);
            destParent.children.splice(result.destination.index, 0, movedItem);
        } else {
            // Reorder top-level items
            setOpenIndexes([]);
            const [movedItem] = updatedItems.splice(result.source.index, 1);
            updatedItems.splice(result.destination.index, 0, movedItem);
        }

        setItems(updatedItems);
    };

    // const handleDragStart = (result: any): void => {
    //     console.log(result)
    //     if (result.type === "TOP_LEVEL_ITEM") {
    //         setOpenIndexes([]);
    //     }
    // };

    return (
        <DragDropContext onDragEnd={handleDragEnd}    >
            <Droppable droppableId="top-level-droppable" type="TOP_LEVEL_ITEM">
                {(provided) => (<>
                    <List {...provided.droppableProps} ref={provided.innerRef}>
                        {items.map((item, index) => (
                            <div key={item.id}>
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}

                                >
                                    {(provided) => (
                                        <ListItem
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <ListItemIcon>
                                                <DragIndicatorIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={item.text} />
                                            {item.children && (
                                                <div onClick={() => handleToggle(index)}>
                                                    {openIndexes.includes(index) ? <ExpandLess /> : <ExpandMore />}
                                                </div>
                                            )}
                                        </ListItem>
                                    )}
                                </Draggable>
                                {item.children && (
                                    <Droppable droppableId={String(index)} type="NESTED_ITEM">
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                            >
                                                <NestedItems parentIndex={index} nestedItems={item.children} openIndexes={openIndexes} handleAddSubItem={handleAddSubItem} />
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                )}
                            </div>
                        ))}

                        {provided.placeholder}
                    </List>
                    <AddListItem handleFunction={handleAddTopLevelItem} />
                </>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default DraggableList;
