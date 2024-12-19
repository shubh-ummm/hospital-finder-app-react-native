import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

const UserProfile = () => {
  const { signOut } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/LoginScreen");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={{ uri: user.imageUrl }} style={styles.profileImage} />
        <Text style={styles.userName}>{user.fullName}</Text>
        <Text style={styles.userEmail}>
          {user.primaryEmailAddress?.emailAddress}
        </Text>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Email Verified</Text>
          <Text style={styles.infoValue}>
            {user.primaryEmailAddress?.verification?.status === "verified"
              ? "Yes"
              : "No"}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Member Since</Text>
          <Text style={styles.infoValue}>
            {new Date(user.createdAt).toLocaleDateString()}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  profileHeader: {
    alignItems: "center",
    marginTop: 50,
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  infoSection: {
    backgroundColor: "#f8f8f8",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  infoLabel: {
    fontSize: 16,
    color: "#666",
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "500",
  },
  signOutButton: {
    backgroundColor: "#E74C3C",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  signOutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default UserProfile;
