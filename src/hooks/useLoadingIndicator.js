import {useEffect, useState} from 'react';

const useLoadingIndicator = isLoading => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let intervalId;

    if (isLoading) {
      intervalId = setInterval(() => {
        setRotation(prevRotation => prevRotation + 30);
      }, 100);
    } else {
      clearInterval(intervalId);
      setRotation(0);
    }

    return () => clearInterval(intervalId);
  }, [isLoading]);

  return {rotation}
};

export default useLoadingIndicator;
