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
                            'groupTag' | 
                            'borderColor' | 
                            'boardContentBackgroundColor' | 
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
        darkerViolet: ["#1c1f46"],
        groupTag: ["#037F4C", "#E2445C", "#808080", "#579BFC", "#BB3354", "#FF158A", "#FF5AC4"],
        borderColor: ["#ddd"],
        boardContentBackgroundColor: ["#F4F5F8"]
    },
}