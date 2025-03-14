import React from 'react';
import EntryItem from './EntryItem';

const EntryList = ({ entries, onUpdateEntry, onDeleteEntry }) => {
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Updates History</h2>
      
      {entries.length === 0 ? (
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <p className="text-gray-500">No entries yet. Add your first update above!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {entries.map(entry => (
            <EntryItem 
              key={entry.id}
              entry={entry}
              onUpdate={onUpdateEntry}
              onDelete={onDeleteEntry}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EntryList;
