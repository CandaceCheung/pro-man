import { Global } from '@mantine/core';
import lalezar from './Lalezar-Regular.woff2';

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