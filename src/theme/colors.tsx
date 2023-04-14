interface ColorScheme {
  primary: string;
  secondary: string;
  alternative: string;
}

const colorSchemes: { [key: string]: ColorScheme } = {
  blackAndWhite: {
    primary: "#000000",
    secondary: "#FFFFFF",
    alternative: "#B2BEB5",
  },
  twilight: {
    primary: "#03001C",
    secondary: "#5B8FB9",
    alternative: "#301E67",
  },
};
