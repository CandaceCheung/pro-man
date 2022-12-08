import { Global } from '@mantine/core';
import lalezar from './Lalezar-Regular.woff2';
import { Property } from 'csstype';

// For auto complete type recognition
declare module "@mantine/styles" {
  interface CSSObject {
    fontFamily?: Property.FontFamily | 'Lalezar';
  }
}

export function CustomFonts() {
  return (
    <Global
      styles={[
        {
          '@font-face': {
            fontFamily: 'Lalezar',
            src: `url('${lalezar}') format("woff2")`,
            fontWeight: 700,
            fontStyle: 'normal',
          },
        }
      ]}
    />
  );
}