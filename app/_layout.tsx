import { Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#363636", // Customize the background color of the tab bar
        },
        tabBarActiveTintColor: "#fff", // Color for the active tab
        tabBarInactiveTintColor: "#ccc", // Color for inactive tabs
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "ToDo",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="checklist" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="signin"
        options={{
          tabBarLabel: "Completed",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="checkmark-done" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="signup"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
