import { Stack } from "expo-router";

export default function ModalsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="new-pet"
        options={{
          title: "Nueva mascota",
          presentation: "modal",
          headerStyle: { backgroundColor: "#fff" },
          headerTintColor: "#4f46e5",
        }}
      />
    </Stack>
  );
}