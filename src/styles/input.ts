import { createColors } from '@moneyboy/styles/colors';
import { StylingProps } from '@moneyboy/styles/stylingProps';

export const createInputStyles = (props?: StylingProps) => {
  const colors = createColors(props);
  return {
    label: {
      color: props?.mode === 'dark' ? colors.shades.light : colors.shades.dark,
    },
    border: {
      color: colors.shades.veryLight,
    },
    placeholder: {
      color: colors.shades.mediumDark,
    },
  };
};
