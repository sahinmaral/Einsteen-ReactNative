import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

const useKeyboardState = (
  callbackWhenKeyboardIsVisible,
  callbackWhenKeyboardIsNotVisible,
) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);

        if (
          callbackWhenKeyboardIsVisible &&
          typeof callbackWhenKeyboardIsVisible === 'function'
        ) {
          callbackWhenKeyboardIsVisible();
        }
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);

        if (
          callbackWhenKeyboardIsNotVisible &&
          typeof callbackWhenKeyboardIsNotVisible === 'function'
        ) {
          callbackWhenKeyboardIsNotVisible();
        }
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return {isKeyboardVisible};
};

export default useKeyboardState;
