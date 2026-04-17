import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useUser();

  const cards = [
    { emoji: "🐾", title: "Mis mascotas", desc: "Gestiona sus perfiles", bg: "#eef2ff", onPress: () => router.push("/(tabs)/pets") },
    { emoji: "🏥", title: "Clinicas", desc: "Agenda una cita", bg: "#f0fdf4", onPress: () => {} },
    { emoji: "🚶", title: "Paseadores", desc: "Reserva un paseo", bg: "#fff7ed", onPress: () => {} },
    { emoji: "🛍️", title: "Tienda", desc: "Productos para tu pet", bg: "#fdf4ff", onPress: () => {} },
  ];

  return (
    <ScrollView style={s.container}>
      <View style={s.header}>
        <Text style={s.greeting}>Hola, {user?.firstName ?? "bienvenido"} 👋</Text>
        <Text style={s.subtitle}>Que necesitan tus mascotas hoy?</Text>
      </View>
      <View style={s.grid}>
        {cards.map((card) => (
          <TouchableOpacity key={card.title} style={[s.card, { backgroundColor: card.bg }]} onPress={card.onPress}>
            <Text style={s.emoji}>{card.emoji}</Text>
            <Text style={s.cardTitle}>{card.title}</Text>
            <Text style={s.cardDesc}>{card.desc}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { padding: 24, paddingTop: 32 },
  greeting: { fontSize: 26, fontWeight: "bold", color: "#1a1a2e" },
  subtitle: { fontSize: 15, color: "#666", marginTop: 4 },
  grid: { flexDirection: "row", flexWrap: "wrap", padding: 12, gap: 12 },
  card: { width: "47%", borderRadius: 16, padding: 16, marginBottom: 4 },
  emoji: { fontSize: 28, marginBottom: 8 },
  cardTitle: { fontSize: 15, fontWeight: "600", color: "#1a1a2e" },
  cardDesc: { fontSize: 12, color: "#666", marginTop: 2 },
});