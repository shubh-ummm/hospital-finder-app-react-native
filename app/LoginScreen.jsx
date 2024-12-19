import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useOAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const router = useRouter();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onSignInWithGoogle = async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
        router.push("/(tabs)");
      }
    } catch (err) {
      console.error("OAuth error:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/1copy.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Your Health, Our Priority</Text>
      <TouchableOpacity style={styles.button} onPress={onSignInWithGoogle}>
        <Image
          source={require("../assets/images/google.png")}
          style={styles.googleIcon}
        />
        <Text style={styles.buttonText}>Continue with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  logo: {
    marginBottom: 1,
    width: 300,
    height: 100,
    resizeMode: "contain",
  },
  title: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 40,
    color: "#278a84",
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 99,
    padding: 16,
    width: "100%",
    maxWidth: 300,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  buttonText: {
    textAlign: "center",
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 12,
  },
  googleIcon: {
    width: 24,
    height: 24,
  },
});

export default LoginScreen;
