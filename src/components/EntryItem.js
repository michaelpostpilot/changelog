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
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      {isEditing ? (
        <div className="space-y-4">
          <textarea
            className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-gray-50"
            rows="4"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <div className="flex justify-end space-x-3">
            <button
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
              onClick={handleSave}
            >
              <Check size={18} className="mr-2" />
              Save
            </button>
            <button
              className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
              onClick={handleCancel}
            >
              <X size={18} className="mr-2" />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{entry.text}</p>
            </div>
            <div className="flex space-x-3 ml-4">
              <button
                className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                onClick={() => setIsEditing(true)}
                title="Edit"
              >
                <Edit size={20} />
              </button>
              <button
                className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                onClick={() => onDelete(entry.id)}
                title="Delete"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-500 flex items-center justify-between border-t border-gray-100 pt-4">
            <span className="flex items-center">
              Posted: {formatDate(entry.timestamp)}
            </span>
            {entry.edited && (
              <span className="italic text-gray-400">
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
