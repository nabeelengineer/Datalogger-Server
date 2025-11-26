exports.addSyncTimestamp = (timestampsArray, limit = 7) => {
  const updated = [...timestampsArray, new Date().toISOString()];

  if (updated.length > limit) {
    return updated.slice(updated.length - limit);
  }
  return updated;
};
