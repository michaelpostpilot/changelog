import React, { useState, useEffect } from 'react';
import EntryForm from './EntryForm';
import EntryList from './EntryList';

const ChangelogApp = () => {
  const [entries, setEntries] = useState([]);

  // Load entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('changelog-entries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('changelog-entries', JSON.stringify(entries));
  }, [entries]);

  const addEntry = (text) => {
    if (text.trim() === '') return;
    
    const newEntryObject = {
      id: Date.now(),
      text: text,
      timestamp: new Date().toISOString(),
      edited: false
    };
    
    setEntries([newEntryObject, ...entries]);
  };

  const updateEntry = (id, newText) => {
    setEntries(entries.map(entry => {
      if (entry.id === id) {
        return {
          ...entry,
          text: newText,
          edited: true,
          lastEdited: new Date().toISOString()
        };
      }
      return entry;
    }));
  };

  const deleteEntry = (id) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Weekly Changelog</h1>
      
      <EntryForm onAddEntry={addEntry} />
      
      <EntryList 
        entries={entries} 
        onUpdateEntry={updateEntry} 
        onDeleteEntry={deleteEntry} 
      />
    </div>
  );
};

export default ChangelogApp;
