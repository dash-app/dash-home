interface ThemeConfigProps {
  variant: {
    name: string
  },
}

const ThemeConfig: { [key: string]: ThemeConfigProps } = {
  'CHEEKY_WHITE': {
    variant: {
      name: 'light'
    },
  },
  'NERD_BLACK': {
    variant: {
      name: 'dark',
    },
  }
};

export const GetThemeEntry = (key: string) => {
  if (ThemeConfig[key]) {
    return ThemeConfig[key];
  } else {
    return ThemeConfig['CHEEKY_WHITE'];
  }
};