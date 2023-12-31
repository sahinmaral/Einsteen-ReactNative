const shuffleArray = array => {
  const shuffledArray = array.slice();

  // Perform Fisher-Yates shuffle
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
};

const mapFirebaseDocumentArrayWithId = docs => {
  return docs.map(doc => {
    return {...doc.data(), id: doc.id};
  });
};

function groupByItemsOfArrayThatDoesntHaveAnyProperty(array) {
  return array.filter((value, index, array) => array.indexOf(value) === index);
}

function distinctItemsOfArrayByProperty(array, property) {
  const uniqueArray = array.filter((obj, index, array) => {
    return array.findIndex(item => item[property] === obj[property]) === index;
  });

  return uniqueArray;
}

export {
  shuffleArray,
  mapFirebaseDocumentArrayWithId,
  distinctItemsOfArrayByProperty,
  groupByItemsOfArrayThatDoesntHaveAnyProperty,
};
