import firestore from '@react-native-firebase/firestore';

const getScoresCollectionByQuizInformations = quizInformations => {
  const scoresCollection = firestore().collection('scores');

  const query = scoresCollection
    .where(
      new firestore.FieldPath('quizInformations', 'difficult'),
      '==',
      quizInformations.difficult,
    )
    .where(
      new firestore.FieldPath('quizInformations', 'questionCount'),
      '==',
      quizInformations.questionCount,
    )
    .where(
      new firestore.FieldPath('quizInformations', 'category', 'id'),
      '==',
      quizInformations.category.id,
    )
    .orderBy(
      new firestore.FieldPath('quizInformations', 'correctQuestionCount'),
      'desc',
    )
    .orderBy(
      new firestore.FieldPath('quizInformations', 'totalEstimated'),
      'asc',
    )
    .limit(10);

  return query.get();
};

const getUserAllScoresByUserId = userId => {
  const scoresCollection = firestore().collection('scores');

  const query = scoresCollection
    .where('userId', '==', userId)
    .orderBy(
      new firestore.FieldPath('quizInformations', 'correctQuestionCount'),
      'desc',
    )
    .orderBy(
      new firestore.FieldPath('quizInformations', 'totalEstimated'),
      'asc',
    );

  return query.get();
};

const getUsersAdditionalInformationsByUserIds = userIds => {
  const usersCollection = firestore().collection('users');

  const query = usersCollection.where(
    firestore.FieldPath.documentId(),
    'in',
    userIds,
  );

  return query.get();
};

const saveUsersAdditionalInformations = async (savedUserId, values) => {
  return await firestore().collection('users').doc(savedUserId).set({
    firstName: values.firstName,
    lastName: values.lastName.toUpperCase(),
    email: values.email,
  });
};

const getUserAdditionalInformationsByUserId = async savedUserId => {
  return await firestore().collection('users').doc(savedUserId).get();
};

const getUserCollection = () => {
  return firestore().collection('users');
}

export {
  getUserCollection,
  getScoresCollectionByQuizInformations,
  getUserAdditionalInformationsByUserId,
  getUsersAdditionalInformationsByUserIds,
  getUserAllScoresByUserId,
  saveUsersAdditionalInformations,
};
