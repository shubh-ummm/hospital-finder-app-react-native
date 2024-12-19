// import 'react-native-get-random-values'
import { Tabs } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import Header from "../components/Header";
import { UserLocationProvider } from "../Context/UserLocationContext";

export default function TabLayout() {
  return (
    <>
      <UserLocationProvider>
        <Header />
        <Tabs screenOptions={{ headerShown: false }}>
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="home" size={24} color="#278a84" />
              ),
            }}
          />
          <Tabs.Screen
            name="UserProfile"
            options={{
              title: "Profile",
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="user" size={24} color="#278a84" />
              ),
            }}
          />
        </Tabs>
      </UserLocationProvider>
    </>
  );
}
