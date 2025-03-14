import React, { useState, useEffect } from 'react';
import EntryForm from './EntryForm';
import EntryList from './EntryList';
import { supabase } from '../lib/supabase';

const ChangelogApp = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load entries from Supabase on component mount
  useEffect(() => {
    fetchEntries();
    
    // Subscribe to real-time changes
    const channel = supabase
      .channel('entries')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'entries' }, 
        (payload) => {
          fetchEntries();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchEntries = async () => {
    try {
      const { data, error } = await supabase
        .from('entries')
        .select('*')
        .order('timestamp', { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error('Error fetching entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const addEntry = async (text) => {
    if (text.trim() === '') return;
    
    try {
      const newEntry = {
        text,
        timestamp: new Date().toISOString(),
        edited: false
      };
      
      const { error } = await supabase
        .from('entries')
        .insert([newEntry]);

      if (error) throw error;
    } catch (error) {
      console.error('Error adding entry:', error);
    }
  };

  const updateEntry = async (id, newText) => {
    try {
      const { error } = await supabase
        .from('entries')
        .update({ 
          text: newText,
          edited: true,
          last_edited: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating entry:', error);
    }
  };

  const deleteEntry = async (id) => {
    try {
      const { error } = await supabase
        .from('entries')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-8 bg-white min-h-screen">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
        Weekly AI Tips & Best Practices
      </h1>
      
      <div className="w-full bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New Update</h2>
        <EntryForm onAddEntry={addEntry} />
      </div>
      
      <div className="w-full bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Updates History</h2>
        <EntryList 
          entries={entries} 
          onUpdateEntry={updateEntry} 
          onDeleteEntry={deleteEntry} 
        />
      </div>
    </div>
  );
};

export default ChangelogApp;
