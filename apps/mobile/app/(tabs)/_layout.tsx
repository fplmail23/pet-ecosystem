import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: "#4f46e5",
      tabBarInactiveTintColor: "#9ca3af",
      tabBarStyle: { borderTopWidth: 1, borderTopColor: "#f0f0f0", paddingBottom: 4 },
      headerStyle: { backgroundColor: "#fff" },
      headerTintColor: "#1a1a2e",
    }}>
      <Tabs.Screen name="home" options={{ title: "Inicio", tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="pets" options={{ title: "Mascotas", tabBarIcon: ({ color, size }) => <Ionicons name="paw-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="services" options={{ title: "Servicios", tabBarIcon: ({ color, size }) => <Ionicons name="grid-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="profile" options={{ title: "Perfil", tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} /> }} />
    </Tabs>
  );
}
