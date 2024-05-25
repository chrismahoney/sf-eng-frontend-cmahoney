import { MantineColorsTuple, createTheme, rem } from "@mantine/core";

const baseColors: MantineColorsTuple = [
  "#e1f9ff",
  "#ccedff",
  "#9ad7ff",
  "#64c1ff",
  "#3baefe",
  "#20a2fe",
  "#099cff",
  "#0088e4",
  "#0078cd",
  "#0069b6"
];

export const AppTheme = createTheme({
  colors: {
    // Add your color
    baseColors
  },

  primaryColor: 'baseColors',
  primaryShade: 9,

  shadows: {
    md: '1px 1px 3px rgba(0, 0, 0, .25)',
    xl: '5px 5px 3px rgba(0, 0, 0, .25)',
  },

  fontFamily: 'Helvetica, Roboto, sans-serif',

  headings: {
    // fontFamily: 'Helvetica, Roboto, sans-serif',
    sizes: {
      h1: { fontSize: rem(36) },
      h2: { fontSize: rem(24) },
      h3: { fontSize: rem(20) },
      h4: { fontSize: rem(18) },
      h5: { fontSize: rem(16) },
      h6: { fontSize: rem(14) },
    },
  }
});