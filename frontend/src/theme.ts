import { DefaultMantineColor, MantineThemeOverride, Tuple } from "@mantine/core";

type ExtendedCustomColors = 'lightViolet' | 
                            'lightHoverViolet' | 
                            'lightActiveViolet' | 
                            'normalViolet' | 
                            'normalHoverViolet' | 
                            'normalActiveViolet' | 
                            'darkViolet' | 
                            'darkHoverViolet' | 
                            'darkActiveViolet' | 
                            'darkerViolet' | 
                            DefaultMantineColor;

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, Tuple<string, 10>>;
  }
}

export const themeObject: MantineThemeOverride = {
    colors: {
        lightViolet: ["#eeeefa"],
        lightHoverViolet: ["#e5e6f7"],
        lightActiveViolet: ["#c9ccee"],
        normalViolet: ["#5059c9"],
        normalHoverViolet: ["#4850b5"],
        normalActiveViolet: ["#4047a1"],
        darkViolet: ["#3c4397"],
        darkHoverViolet: ["#303579"],
        darkActiveViolet: ["#24285a"],
        darkerViolet: ["#1c1f46"]
    }
}