import { DefaultTheme } from 'styled-components/native';
import colors from './colors';
import { space, lineHeights } from './spacing';
import sizes from './sizes';
import { fonts, fontWeights, fontSizes } from './fonts';

const theme: DefaultTheme = {
  Color: colors,
  Font: {
    fontSizes,
    fontWeights,
    fonts,
  },
  Size: { size: sizes },
  Spacing: {
    lineHeights,
    space,
  },
};

export default theme;
