/**
 * Format a date string into a more human-readable format
 * @param {string} dateString - ISO date string to format
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  const options = { 
    weekday: 'long',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
