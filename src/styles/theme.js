const colors = {
  darkPurple: '#FF2983',
  white: '#FFFFFF',
  veryDarkViolet: '#2B2632',
  darkYellow: '#F6D050',
  veryDarkGray: '#070707',
  fadedVeryDarkGray: '#585858',
  veryDarkGrayFaded: 'rgba(22,22,22,0.6)',
  darkGrayishRed: '#807c7c',
  veryDarkPink: '#6C1C32',
  darkGray: '#7E7E7E',
  black: '#000000',
  lightRed: "#FFCCCB",
  lightGreen : "#90EE90",
  strongRed: "#bd1a1a",
  slate:"#334155",
};

const shadows = {
  normal: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  larger: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },
};

const theme = {
  colors,
  shadows,
};

export default theme;
