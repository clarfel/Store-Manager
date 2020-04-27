// Screens
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import StoreScreen from "./screens/StoreScreen";
import CaisseScreen from "./screens/CaisseScreen";
import ArchivesScreen from "./screens/ArchivesScreen";
import CourbeScreen from "./screens/CourbeScreen";

//React Navigation Setup
import { createAppContainer, createSwitchNavigator } from "react-navigation";

const MainNavigator = createSwitchNavigator({
  Login: { screen: LoginScreen },
  Profile: { screen: ProfileScreen },
  Store: { screen: StoreScreen },
  Caisse: { screen: CaisseScreen },
  Archives: { screen: ArchivesScreen },
  Courbe: { screen: CourbeScreen },
});

const App = createAppContainer(MainNavigator);

export default App;
