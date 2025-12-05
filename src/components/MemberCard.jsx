// src/components/MemberCard.js
import React, { useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, Divider, IconButton, TextField, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

export default function MemberCard({ member, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    firstName: member.firstName || '',
    lastName: member.lastName || '',
    age: member.age || '',
    relation: member.relation || '',
    notes: member.notes || ''
  });

  function change(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function save() {
    const payload = { ...form, age: form.age ? Number(form.age) : undefined };
    await onUpdate(member._id, payload);
    setEditing(false);
  }

  return (
    <Card variant="outlined">
      <CardContent>
        {editing ? (
          <Box display="grid" gap={1}>
            <TextField name="firstName" value={form.firstName} onChange={change} label="First name" size="small" />
            <TextField name="lastName" value={form.lastName} onChange={change} label="Last name" size="small" />
            <TextField name="age" value={form.age} onChange={change} label="Age" size="small" />
            <TextField name="relation" value={form.relation} onChange={change} label="Relation" size="small" />
            <TextField name="notes" value={form.notes} onChange={change} label="Notes" multiline rows={2} size="small" />
          </Box>
        ) : (
          <Box>
            <Typography variant="subtitle1">{member.firstName} {member.lastName}</Typography>
            <Typography variant="body2">Relation: {member.relation || '—'}</Typography>
            <Typography variant="body2">Age: {member.age ?? '—'}</Typography>
            {member.notes && (
              <>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body2">{member.notes}</Typography>
              </>
            )}
          </Box>
        )}
      </CardContent>

      <CardActions>
        {editing ? (
          <>
            <IconButton onClick={save} color="primary" aria-label="save"><SaveIcon /></IconButton>
            <IconButton onClick={() => setEditing(false)} aria-label="cancel"><CancelIcon /></IconButton>
          </>
        ) : (
          <>
            <IconButton onClick={() => setEditing(true)} aria-label="edit"><EditIcon /></IconButton>
            <IconButton onClick={onDelete} aria-label="delete"><DeleteIcon /></IconButton>
          </>
        )}
      </CardActions>
    </Card>
  );
}
