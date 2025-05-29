// src/App.tsx
import { registerRootComponent } from "expo";
import { AppRegistry } from "react-native";
import { useFonts } from "expo-font";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHome,
  faArrowLeft,
  faCameraRotate,
  faCamera,
  faMagnifyingGlass,
  faImage,
  faFloppyDisk,
  faChartLine,
  faEye,
  faEyeSlash,
  faUsers,
  faUtensils,
  faSignOutAlt,
  faPlus,
  faTrash,
  faEdit,
  faFilter,
  faSort,
  faCheck,
  faTimes
} from "@fortawesome/free-solid-svg-icons";

import { AuthProvider } from './context/AuthContext';
import AppContainer from './AppContainer';

export default function App() {
  const [fontsLoaded] = useFonts({
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null; 
  }

  // Add all icons used in the app
  library.add(
    faHome,
    faArrowLeft,
    faCameraRotate,
    faCamera,
    faMagnifyingGlass,
    faImage,
    faFloppyDisk,
    faChartLine,
    faEye,
    faEyeSlash,
    faUsers,
    faUtensils,
    faSignOutAlt,
    faPlus,
    faTrash,
    faEdit,
    faFilter,
    faSort,
    faCheck,
    faTimes
  );

  return (
    <AuthProvider>
      <AppContainer />
    </AuthProvider>
  );
}

registerRootComponent(App);
AppRegistry.registerComponent("main", () => App);