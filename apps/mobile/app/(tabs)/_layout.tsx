import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: "#4f46e5",
      tabBarInactiveTintColor: "#9ca3af",
      tabBarStyle: { borderTopWidth: 1, borderTopColor: "#f0f0f0", paddingBottom: 4 },
      headerStyle: { backgroundColor: "#fff" },
      headerTintColor: "#1a1a2e",
    }}>
      <Tabs.Screen name="home" options={{ title: "Inicio" }} />
      <Tabs.Screen name="pets" options={{ title: "Mascotas" }} />
      <Tabs.Screen name="services" options={{ title: "Servicios" }} />
      <Tabs.Screen name="profile" options={{ title: "Perfil" }} />
    </Tabs>
  );
}