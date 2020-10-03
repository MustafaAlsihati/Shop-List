import { useFonts } from 'expo-font';

export function useFont() {
  let [fontsLoaded] = useFonts({
    'Montserrat-Light': require('../../assets/fonts/Montserrat-Light.ttf'),
    'Montserrat-Regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-Bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-Thin': require('../../assets/fonts/Montserrat-Thin.ttf'),
  });

  return [fontsLoaded];
}
