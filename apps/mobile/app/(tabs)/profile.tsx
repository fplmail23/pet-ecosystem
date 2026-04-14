import { View, Text, StyleSheet } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={s.container}>
      <Text style={s.title}>Mi perfil</Text>
      <Text style={s.subtitle}>Proximamente</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", color: "#1a1a2e" },
  subtitle: { fontSize: 14, color: "#666", marginTop: 8 }
});
