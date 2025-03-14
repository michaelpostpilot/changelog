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
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col space-y-4">
        <textarea
          className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-gray-50"
          rows="4"
          placeholder="What's new this week?"
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
        />
        <button
          type="submit"
          className="self-end bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center justify-center transition-colors duration-200 font-medium"
        >
          <PlusCircle className="mr-2" size={20} />
          Add Update
        </button>
      </div>
    </form>
  );
};

export default EntryForm;
