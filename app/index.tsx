import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect } from "expo-router";

export default function Home() {
  return <Redirect href={"/(auth)/welcome"} />;
}
