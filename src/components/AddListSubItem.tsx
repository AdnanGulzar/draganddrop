import { Button, ListItem, ListItemText, TextField } from '@mui/material'
import React, { useState } from 'react'

interface AddListSubItemProps {
    handleFunction: (parentIndex: number, text: string, setText: React.Dispatch<React.SetStateAction<string>>) => void;
    parentIndex: number;
}

const AddListSubItem: React.FC<AddListSubItemProps> = ({ handleFunction, parentIndex }) => {
    const [newItemText, setNewItemText] = useState<string>('');
    return (
        <ListItem>
            <ListItemText>
                <TextField
                    label="New Sub Item"
                    value={newItemText}
                    onChange={(e) => setNewItemText(e.target.value)}
                />
                <Button onClick={() => handleFunction(parentIndex, newItemText, setNewItemText)}>
                    Add Sub Item
                </Button>
            </ListItemText>
        </ListItem>
    )
}

export default AddListSubItem