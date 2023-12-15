const formatTime = time => {
  const minutes = Math.floor(time / 60);
  const remainingSeconds = time % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

export {formatTime};
