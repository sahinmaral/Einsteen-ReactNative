const mapFirebaseDocumentObjectWithId = doc => {
  return {...doc.data(), id: doc.id};
};

export {mapFirebaseDocumentObjectWithId}