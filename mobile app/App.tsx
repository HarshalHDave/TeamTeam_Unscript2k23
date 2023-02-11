import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ContextProvider } from "./src/lib/Context";
import RootNavigation from "./src/navigation/index";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Montserrat-Black": require("./assets/fonts/Montserrat-Black.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <ContextProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <RootNavigation />
      </NavigationContainer>
    </ContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
