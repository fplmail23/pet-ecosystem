import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={s.container}>
      <View style={s.header}>
        <Text style={s.greeting}>Hola, bienvenido</Text>
        <Text style={s.subtitle}>Que necesitan tus mascotas hoy?</Text>
      </View>
      <View style={s.grid}>
        <TouchableOpacity style={[s.card, { backgroundColor: "#eef2ff" }]} onPress={() => router.push("/(tabs)/pets")}>
          <Text style={s.emoji}>??</Text>
          <Text style={s.cardTitle}>Mis mascotas</Text>
          <Text style={s.cardDesc}>Gestiona sus perfiles</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[s.card, { backgroundColor: "#f0fdf4" }]}>
          <Text style={s.emoji}>??</Text>
          <Text style={s.cardTitle}>Clinicas</Text>
          <Text style={s.cardDesc}>Agenda una cita</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[s.card, { backgroundColor: "#fff7ed" }]}>
          <Text style={s.emoji}>??</Text>
          <Text style={s.cardTitle}>Paseadores</Text>
          <Text style={s.cardDesc}>Reserva un paseo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[s.card, { backgroundColor: "#fdf4ff" }]}>
          <Text style={s.emoji}>???</Text>
          <Text style={s.cardTitle}>Tienda</Text>
          <Text style={s.cardDesc}>Productos para tu pet</Text>
        </TouchableOpacity>
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
  cardDesc: { fontSize: 12, color: "#666", marginTop: 2 }
});
