import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

const EntryForm = ({ onAddEntry }) => {
  const [newEntry, setNewEntry] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newEntry.trim() !== '') {
      onAddEntry(newEntry);
      setNewEntry('');
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New Update</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <textarea
            className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows="3"
            placeholder="What's new this week?"
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-lg flex items-center"
          >
            <PlusCircle className="mr-2" size={20} />
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default EntryForm;
