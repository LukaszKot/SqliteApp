import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Main from "./components/Main"
import Data from "./components/Data"

const Root = createStackNavigator({
  main: { screen: Main },
  data: { screen: Data },
});

const App = createAppContainer(Root);

export default App;