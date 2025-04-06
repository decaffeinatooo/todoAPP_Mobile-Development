import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="todo"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#e0c090",
        tabBarInactiveTintColor: "#999",
        tabBarStyle: {
          backgroundColor: "#292929",
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="todo"
        options={{
          title: "ToDo",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="edit" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="completed"
        options={{
          title: "Completed",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="checklist" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
