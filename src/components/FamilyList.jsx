import React, { useState } from 'react';
import { Box, Button, Divider, IconButton, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export default function FamilyList({ families, loading, onAddFamily, onSelect, selectedFamily, onDeleteFamily, onOpenAddMember }) {
  const [name, setName] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddFamily(name.trim());
    setName('');
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
        <Typography variant="h6">Families asojasokasokas</Typography>
        <IconButton size="small" color="primary" onClick={() => { }}>
          <AddIcon />
        </IconButton>
      </Box>

      <form onSubmit={submit} style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <TextField fullWidth size="small" placeholder="New family name" value={name} onChange={(e) => setName(e.target.value)} />
        <Button variant="contained" type="submit">Add</Button>
      </form>

      <Divider sx={{ mb: 1 }} />

      {loading ? <Typography>Loading...</Typography> : families.length === 0 ? <Typography>No families yet.</Typography> : (
        <List dense>
          {families.map(f => (
            <ListItem
              key={f._id}
              secondaryAction={
                <Box>
                  <Button size="small" onClick={() => onOpenAddMember(f._id)}>Add</Button>
                  <IconButton edge="end" aria-label="delete" onClick={() => onDeleteFamily(f._id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              }
              selected={selectedFamily && selectedFamily._id === f._id}
              button
              onClick={() => onSelect(f)}
            >
              <ListItemText primary={f.name} secondary={new Date(f.createdAt).toLocaleString()} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
