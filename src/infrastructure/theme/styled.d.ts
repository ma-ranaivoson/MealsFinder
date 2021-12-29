// import original module declarations
import 'styled-components';
import { Colors } from '../models/Colors';
import { Fonts } from '../models/Fonts';
import { Sizes } from '../models/Sizes';
import { Spacing } from '../models/Spacing';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    Color: Colors;
    Font: Fonts;
    Size: Sizes;
    Spacing: Spacing;
  }
}
