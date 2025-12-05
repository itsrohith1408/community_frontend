// src/App.js
import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import FamilyList from './components/FamilyList';
import MemberCard from './components/MemberCard';
import AddMemberForm from './components/AddMemberForm';
import {
  fetchFamilies,
  createFamily,
  fetchMembers,
  addMember,
  updateMember,
  deleteMember,
  deleteFamily
} from './api';

export default function App() {
  const [families, setFamilies] = useState([]);
  const [loadingFamilies, setLoadingFamilies] = useState(false);
  const [selectedFamily, setSelectedFamily] = useState(null);
  const [members, setMembers] = useState([]);
  const [loadingMembers, setLoadingMembers] = useState(false);
  const [showAddMemberFor, setShowAddMemberFor] = useState(null);

  useEffect(() => { loadFamilies(); }, []);

  useEffect(() => {
    if (selectedFamily) loadMembers(selectedFamily._id);
    else setMembers([]);
  }, [selectedFamily]);

  async function loadFamilies() {
    setLoadingFamilies(true);
    try {
      const data = await fetchFamilies();
      setFamilies(data);
    } catch (e) {
      console.error(e);
      alert('Failed to load families');
    } finally { setLoadingFamilies(false); }
  }

  async function handleAddFamily(name) {
    if (!name) return;
    try {
      const fam = await createFamily(name);
      setFamilies(prev => [fam, ...prev]);
      setSelectedFamily(fam);
    } catch (e) { console.error(e); alert('Failed to add family'); }
  }

  async function loadMembers(familyId) {
    setLoadingMembers(true);
    try {
      const data = await fetchMembers(familyId);
      setMembers(data);
    } catch (e) { console.error(e); alert('Failed to load members'); }
    finally { setLoadingMembers(false); }
  }

  async function handleAddMember(familyId, memberObj) {
    try {
      const newMember = await addMember(familyId, memberObj);
      setMembers(prev => [newMember, ...prev]);
      setShowAddMemberFor(null);
    } catch (e) { console.error(e); alert('Failed to add member'); }
  }

  async function handleUpdateMember(id, updated) {
    try {
      const res = await updateMember(id, updated);
      setMembers(prev => prev.map(m => (m._id === id ? res : m)));
    } catch (e) { console.error(e); alert('Failed to update member'); }
  }

  async function handleDeleteMember(id) {
    if (!window.confirm('Delete this member?')) return;
    try {
      await deleteMember(id);
      setMembers(prev => prev.filter(m => m._id !== id));
    } catch (e) { console.error(e); alert('Failed to delete member'); }
  }

  async function handleDeleteFamily(id) {
    if (!window.confirm('Delete this family and all its members?')) return;
    try {
      await deleteFamily(id);
      setFamilies(prev => prev.filter(f => f._id !== id));
      if (selectedFamily && selectedFamily._id === id) setSelectedFamily(null);
    } catch (e) { console.error(e); alert('Failed to delete family'); }
  }

  return (
    <Container maxWidth="lg" sx={{ pt: 4 }}>
      <Typography variant="h4" gutterBottom>Community — Families</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <FamilyList
              families={families}
              loading={loadingFamilies}
              onAddFamily={handleAddFamily}
              onSelect={setSelectedFamily}
              selectedFamily={selectedFamily}
              onDeleteFamily={handleDeleteFamily}
              onOpenAddMember={(famId) => setShowAddMemberFor(famId)}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            {!selectedFamily ? (
              <Typography>Select a family to view members</Typography>
            ) : (
              <Box>
                <Typography variant="h6" gutterBottom>{selectedFamily.name} — Members</Typography>

                {showAddMemberFor === selectedFamily._id ? (
                  <AddMemberForm
                    familyId={selectedFamily._id}
                    onCancel={() => setShowAddMemberFor(null)}
                    onAdd={(member) => handleAddMember(selectedFamily._id, member)}
                  />
                ) : (
                  <Box mb={2}>
                    <button className="btn" onClick={() => setShowAddMemberFor(selectedFamily._id)}>
                      + Add Member
                    </button>
                  </Box>
                )}

                {loadingMembers ? (
                  <Typography>Loading members...</Typography>
                ) : members.length === 0 ? (
                  <Typography>No members yet. Add one!</Typography>
                ) : (
                  <Grid container spacing={2}>
                    {members.map(m => (
                      <Grid key={m._id} item xs={12} sm={6}>
                        <MemberCard
                          member={m}
                          onUpdate={handleUpdateMember}
                          onDelete={() => handleDeleteMember(m._id)}
                        />
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
