import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl, Alert } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { useApi } from "../../hooks/useApi";
import { useRouter } from "expo-router";

type Pet = {
  id: string;
  name: string;
  species?: { name: string };
  breed?: { name: string };
  sex: string;
  birthDate?: string;
  size?: string;
};

const SEX_LABEL: Record<string, string> = { MALE: "Macho", FEMALE: "Hembra", UNKNOWN: "Desconocido" };
const SIZE_LABEL: Record<string, string> = { TOY: "Toy", SMALL: "Pequeño", MEDIUM: "Mediano", LARGE: "Grande", GIANT: "Gigante" };

export default function PetsScreen() {
  const api = useApi();
  const router = useRouter();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadPets = useCallback(async () => {
    try {
      const res = await api.get("/api/v1/pets");
      setPets(res.data ?? []);
    } catch (err) {
      Alert.alert("Error", "No se pudieron cargar las mascotas");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { loadPets(); }, []);

  const onRefresh = () => { setRefreshing(true); loadPets(); };

  if (loading) {
    return <View style={s.center}><ActivityIndicator size="large" color="#4f46e5" /></View>;
  }

  return (
    <View style={s.container}>
      <ScrollView
        contentContainerStyle={s.scroll}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {pets.length === 0 ? (
          <View style={s.empty}>
            <Text style={s.emptyIcon}>🐾</Text>
            <Text style={s.emptyTitle}>Sin mascotas aun</Text>
            <Text style={s.emptyDesc}>Agrega tu primera mascota para comenzar</Text>
          </View>
        ) : (
          pets.map((pet) => (
            <View key={pet.id} style={s.card}>
              <View style={s.cardHeader}>
                <Text style={s.petIcon}>{pet.species?.name?.toLowerCase().includes("gato") ? "🐱" : "🐶"}</Text>
                <View style={s.cardInfo}>
                  <Text style={s.petName}>{pet.name}</Text>
                  <Text style={s.petBreed}>{pet.breed?.name ?? pet.species?.name ?? "Sin especie"}</Text>
                </View>
              </View>
              <View style={s.cardTags}>
                <View style={s.tag}><Text style={s.tagText}>{SEX_LABEL[pet.sex] ?? pet.sex}</Text></View>
                {pet.size && <View style={s.tag}><Text style={s.tagText}>{SIZE_LABEL[pet.size] ?? pet.size}</Text></View>}
              </View>
            </View>
          ))
        )}
      </ScrollView>
      <TouchableOpacity style={s.fab} onPress={() => router.push("/(modals)/new-pet")}>
        <Text style={s.fabText}>+ Agregar mascota</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  scroll: { padding: 16, paddingBottom: 100 },
  empty: { alignItems: "center", paddingTop: 80 },
  emptyIcon: { fontSize: 64, marginBottom: 16 },
  emptyTitle: { fontSize: 20, fontWeight: "bold", color: "#1a1a2e", marginBottom: 8 },
  emptyDesc: { fontSize: 14, color: "#666", textAlign: "center" },
  card: { backgroundColor: "#fff", borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: "#f0f0f0" },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  petIcon: { fontSize: 40, marginRight: 12 },
  cardInfo: { flex: 1 },
  petName: { fontSize: 18, fontWeight: "bold", color: "#1a1a2e" },
  petBreed: { fontSize: 13, color: "#666", marginTop: 2 },
  cardTags: { flexDirection: "row", gap: 8 },
  tag: { backgroundColor: "#eef2ff", borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  tagText: { fontSize: 12, color: "#4f46e5", fontWeight: "500" },
  fab: { position: "absolute", bottom: 90, left: 16, right: 16, backgroundColor: "#4f46e5", borderRadius: 14, padding: 16, alignItems: "center" },
  fabText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});