import axios from 'axios';
import QuestionDifficult from '../enums/QuestionDifficult';

const fetchQuestions = (questionCount, difficult, categoryId) => {
  let baseURL = 'https://opentdb.com/api.php?';

  let concattedURL = baseURL;

  concattedURL = concattedURL.concat(`amount=${questionCount}`);
  concattedURL = concattedURL.concat(`&category=${categoryId}`);

  concattedURL = concattedURL.concat('&type=multiple');

  concattedURL =
    difficult !== QuestionDifficult.Any
      ? concattedURL.concat(
          `&difficult=${QuestionDifficult.Easy.toLowerCase()}`,
        )
      : concattedURL;

  return axios.get(concattedURL);
};

export {fetchQuestions};
