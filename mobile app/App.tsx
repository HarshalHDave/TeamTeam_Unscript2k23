import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ContextProvider } from "./src/lib/Context";
import RootNavigation from "./src/navigation/index";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <ContextProvider>
      <NavigationContainer>
        <StatusBar style="light"/>
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
