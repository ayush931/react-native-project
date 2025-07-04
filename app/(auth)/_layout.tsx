import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name={"welcome"} />
      <Stack.Screen name={"sign-in"} />
      <Stack.Screen name={"sign-up"} />
    </Stack>
  );
}
