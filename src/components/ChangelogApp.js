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
