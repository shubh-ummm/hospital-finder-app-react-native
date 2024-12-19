import { Stack } from "expo-router";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { useEffect } from "react";
import { useRouter, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { View, ActivityIndicator } from "react-native";

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const CLERK_PUBLISHABLE_KEY =
  "pk_test_Y3VyaW91cy1zbmFpbC0xOS5jbGVyay5hY2NvdW50cy5kZXYk";

function InitialLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inTabsGroup = segments[0] === "(tabs)";
    const inAuthGroup = segments[0] === "LoginScreen";

    if (isSignedIn && !inTabsGroup) {
      // Redirect to home if user is signed in and not in tabs
      router.replace("/(tabs)");
    } else if (!isSignedIn && !inAuthGroup) {
      // Redirect to login if user is not signed in and not in auth group
      router.replace("/LoginScreen");
    }
  }, [isLoaded, isSignedIn, segments]);

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#278a84" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="LoginScreen" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <InitialLayout />
    </ClerkProvider>
  );
}
