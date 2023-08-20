import { Collapse, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { DragIndicator as DragIndicatorIcon } from '@mui/icons-material';
import { Draggable } from 'react-beautiful-dnd';
import React from 'react'
import AddListSubItem from './AddListSubItem';
interface NestedItem {
    id: string;
    text: string;
}

interface NestedItemsProps {
    nestedItems: NestedItem[];
    parentIndex: number;
    openIndexes: number[];
    handleAddSubItem: (parentIndex: number, text: string, setNewItemText: React.Dispatch<React.SetStateAction<string>>) => void;
}

const NestedItems: React.FC<NestedItemsProps> = ({ nestedItems, parentIndex, openIndexes, handleAddSubItem }) => {
    return (
        <Collapse in={openIndexes.includes(parentIndex)}>
            <List disablePadding>
                {nestedItems.map((nestedItem, nestedIndex) => (
                    <Draggable
                        key={nestedItem.id}
                        draggableId={nestedItem.id}
                        index={nestedIndex}
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
                                <ListItemText primary={nestedItem.text} />
                            </ListItem>
                        )}
                    </Draggable>
                ))}
                <AddListSubItem handleFunction={handleAddSubItem} parentIndex={parentIndex} />

            </List>

        </Collapse>
    )
}

export default NestedItems