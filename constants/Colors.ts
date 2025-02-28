/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#fff';
const tintColorDark = '#2563EB';

export const Colors = {
  light: {
    text: '#FFFFFF',
    background: '#2563EB',
    tint: tintColorDark,
    icon: '#FFFFFF',
    tabIconDefault: tintColorLight,
    tabIconSelected: tintColorDark,
  },
  dark: {
    text: '#2563EB',
    background: '#FFFFFF',
    tint: tintColorLight,
    icon: '#2563EB',
    tabIconDefault: tintColorDark,
    tabIconSelected: tintColorLight,
  },
};
