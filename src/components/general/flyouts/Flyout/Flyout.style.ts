import { useStyle } from '@moneyboy/hooks/useStyle';
import { StyleSheet } from 'react-native';
import variables from '@moneyboy/config/variables';

export const useFlyoutStyles = () => {
  const { Flyouts } = useStyle();
  return StyleSheet.create({
    flyoutContainer: {
      backgroundColor: Flyouts.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingHorizontal: 20,
      paddingTop: 20,
      elevation: 5,
      shadowColor: Flyouts.shadow,
      shadowRadius: 10,
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.5,
      maxHeight: '80%',
    },
    closeButtonContainer: {
      position: 'absolute',
      top: 0,
      right: 0,
    },
    closeButton: {
      zIndex: 9999,
    },
    closeIcon: {
      fontSize: variables.font.size.default,
      color: Flyouts.icon.color,
    },
    modal: {
      margin: 0,
      justifyContent: 'flex-end',
      overflow: 'hidden',
    },
  });
};
