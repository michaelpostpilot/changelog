import React, { useState } from 'react';
import { Edit, Trash2, Check, X } from 'lucide-react';
import { formatDate } from '../utils/dateFormatter';

const EntryItem = ({ entry, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(entry.text);

  const handleSave = () => {
    if (editText.trim() !== '') {
      onUpdate(entry.id, editText);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(entry.text);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {isEditing ? (
        <div className="mb-2">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows="3"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <div className="flex justify-end mt-2 space-x-2">
            <button
              className="flex items-center px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
              onClick={handleSave}
            >
              <Check size={16} className="mr-1" />
              Save
            </button>
            <button
              className="flex items-center px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              onClick={handleCancel}
            >
              <X size={16} className="mr-1" />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <p className="text-gray-800 whitespace-pre-wrap">{entry.text}</p>
            </div>
            <div className="flex space-x-2 ml-4">
              <button
                className="text-blue-600 hover:text-blue-800"
                onClick={() => setIsEditing(true)}
              >
                <Edit size={18} />
              </button>
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => onDelete(entry.id)}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-500 flex items-center justify-between">
            <span>
              Posted: {formatDate(entry.timestamp)}
            </span>
            {entry.edited && (
              <span className="italic">
                (Edited: {formatDate(entry.lastEdited)})
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default EntryItem;
