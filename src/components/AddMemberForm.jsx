// src/components/AddMemberForm.js
import React, { useState } from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';

export default function AddMemberForm({ familyId, onCancel, onAdd }) {
  const [form, setForm] = useState({ firstName: '', lastName: '', age: '', relation: '', notes: '' });

  function change(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function submit(e) {
    e.preventDefault();
    const payload = { ...form, age: form.age ? Number(form.age) : undefined };
    await onAdd(payload);
    setForm({ firstName: '', lastName: '', age: '', relation: '', notes: '' });
  }

  return (
    <Box component="form" onSubmit={submit} sx={{ mb: 2 }}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <TextField name="firstName" value={form.firstName} onChange={change} label="First name" fullWidth required />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField name="lastName" value={form.lastName} onChange={change} label="Last name" fullWidth />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField name="age" value={form.age} onChange={change} label="Age" fullWidth />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField name="relation" value={form.relation} onChange={change} label="Relation" fullWidth />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField name="notes" value={form.notes} onChange={change} label="Notes" fullWidth />
        </Grid>

        <Grid item xs={12} display="flex" gap={1}>
          <Button type="submit" variant="contained">Add</Button>
          <Button variant="outlined" onClick={onCancel}>Cancel</Button>
        </Grid>
      </Grid>
    </Box>
  );
}
