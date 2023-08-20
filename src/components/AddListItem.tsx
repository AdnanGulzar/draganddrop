import { Button, ListItem, ListItemText, TextField } from '@mui/material'
import React, { useState } from 'react'

interface AddListItemProps {
    handleFunction: (text: string, setText: React.Dispatch<React.SetStateAction<string>>) => void;
}

const AddListItem: React.FC<AddListItemProps> = ({ handleFunction }) => {
    const [newItemText, setNewItemText] = useState<string>('');
    return (
        <ListItem>
            <ListItemText>
                <TextField
                    label="New Item"
                    value={newItemText}
                    onChange={(e) => setNewItemText(e.target.value)}
                />
                <Button onClick={() => handleFunction(newItemText, setNewItemText)}>
                    Add Item
                </Button>
            </ListItemText>
        </ListItem>
    )
}

export default AddListItem