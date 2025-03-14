import React from 'react';
import EntryItem from './EntryItem';

const EntryList = ({ entries, onUpdateEntry, onDeleteEntry }) => {
  return (
    <div className="w-full">
      {entries.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500">No entries yet. Add your first update above!</p>
        </div>
      ) : (
        <div className="space-y-6">
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
