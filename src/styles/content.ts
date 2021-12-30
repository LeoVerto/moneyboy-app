import { createColors } from '@styles/colors';
import { StylingProps } from '@styles/stylingProps';
import { mix } from '@styles/utils';

export const createContentStyles = (props?: StylingProps) => {
  const colors = createColors(props);
  const separator = {
    color: props?.mode === 'dark' ? colors.shades.dark : colors.shades.veryLight,
  };

  const shadows = {
    color: props?.mode === 'dark' ? colors.base.black : colors.shades.soft,
  };

  const base = props?.mode === 'dark' ? colors.dark.background.base : colors.base.white;
  const background = {
    dp00: base.toString(16),
    dp01: mix('ffffff', base.toString(16), 5),
    dp02: mix('ffffff', base.toString(16), 7),
    dp03: mix('ffffff', base.toString(16), 8),
    dp04: mix('ffffff', base.toString(16), 9),
    dp06: mix('ffffff', base.toString(16), 11),
    dp08: mix('ffffff', base.toString(16), 12),
    dp12: mix('ffffff', base.toString(16), 14),
    dp16: mix('ffffff', base.toString(16), 15),
    dp24: mix('ffffff', base.toString(16), 16),
  };

  // TODO lome: when introducing dark-mode, use several stages of content
  return {
    background,
    separator,
    shadows,
  };
};
