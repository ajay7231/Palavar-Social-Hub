import { Palette } from "@mui/material";

// color design tokens export
export interface ColorTokens {
  grey: Record<number, string>;
  primary: Record<number, string>;
}

export interface CustomPalette extends Palette {
  neutral: {
    dark: string;
    main: string;
    mediumMain: string;
    medium: string;
    light: string;
  };
  background: {
    paper: string;
    default: string;
    alt: string;
  };
}

export type PaletteMode = "light" | "dark";

export interface ThemeSettings {
  palette: {
    mode: PaletteMode;
    primary: {
      dark: string;
      main: string;
      light: string;
    };
    neutral: {
      dark: string;
      main: string;
      mediumMain: string;
      medium: string;
      light: string;
    };
    background: {
      default: string;
      alt: string;
    };
  };
  typography: {
    fontFamily: string;
    fontSize: number;
    h1: {
      fontFamily: string;
      fontSize: number;
    };
    h2: {
      fontFamily: string;
      fontSize: number;
    };
    h3: {
      fontFamily: string;
      fontSize: number;
    };
    h4: {
      fontFamily: string;
      fontSize: number;
    };
    h5: {
      fontFamily: string;
      fontSize: number;
    };
    h6: {
      fontFamily: string;
      fontSize: number;
    };
  };
}

export const colorTokens: ColorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },
  primary: {
    50: "#FFD8DB",
    100: "#FCC9CC",
    200: "#F99B9F",
    300: "#F89198",
    400: "#FC848C",
    500: "#FF6D79",
    600: "#D94E5A",
    700: "#B02F3B",
    800: "#7E1F2A",
    900: "#4D1019",
  },
};

export const themeSettings = (mode: PaletteMode): ThemeSettings => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              dark: colorTokens.primary[200],
              main: colorTokens.primary[500],
              light: colorTokens.primary[800],
            },
            neutral: {
              dark: colorTokens.grey[100],
              main: colorTokens.grey[200],
              mediumMain: colorTokens.grey[300],
              medium: colorTokens.grey[400],
              light: colorTokens.grey[700],
            },
            background: {
              default: colorTokens.grey[900],
              alt: colorTokens.grey[800],
            },
          }
        : {
            // palette values for light mode
            primary: {
              dark: colorTokens.primary[700],
              main: colorTokens.primary[500],
              light: colorTokens.primary[50],
            },
            neutral: {
              dark: colorTokens.grey[700],
              main: colorTokens.grey[500],
              mediumMain: colorTokens.grey[400],
              medium: colorTokens.grey[300],
              light: colorTokens.grey[50],
            },
            background: {
              default: colorTokens.grey[10],
              alt: colorTokens.grey[0],
            },
          }),
    },
    typography: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// export const themeSettings = (mode) => {
//   const palette = {
//     primary: {
//       dark: colorTokens.primary[mode === "dark" ? 200 : 700],
//       main: colorTokens.primary[500],
//       light: colorTokens.primary[mode === "dark" ? 800 : 50],
//     },
//     neutral: {
//       dark: colorTokens.grey[mode === "dark" ? 100 : 700],
//       main: colorTokens.grey[mode === "dark" ? 200 : 500],
//       mediumMain: colorTokens.grey[mode === "dark" ? 300 : 400],
//       medium: colorTokens.grey[mode === "dark" ? 400 : 300],
//       light: colorTokens.grey[mode === "dark" ? 700 : 50],
//     },
//     background: {
//       default: colorTokens.grey[mode === "dark" ? 900 : 10],
//       alt: colorTokens.grey[mode === "dark" ? 800 : 0],
//     },
//   };

//   return {
//     palette,
//     typography: {
//       fontFamily: ["Rubik", "sans-serif"].join(","),
//       fontSize: 12,
//       h1: {
//         fontFamily: ["Rubik", "sans-serif"].join(","),
//         fontSize: 40,
//       },
//       h2: {
//         fontFamily: ["Rubik", "sans-serif"].join(","),
//         fontSize: 32,
//       },
//       h3: {
//         fontFamily: ["Rubik", "sans-serif"].join(","),
//         fontSize: 24,
//       },
//       h4: {
//         fontFamily: ["Rubik", "sans-serif"].join(","),
//         fontSize: 20,
//       },
//       h5: {
//         fontFamily: ["Rubik", "sans-serif"].join(","),
//         fontSize: 16,
//       },
//       h6: {
//         fontFamily: ["Rubik", "sans-serif"].join(","),
//         fontSize: 14,
//       },
//     },
//   };
// };
