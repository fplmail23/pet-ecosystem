import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, Alert, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { useApi } from "../../hooks/useApi";

type Species = { id: string; name: string };
type Breed = { id: string; name: string };

export default function NewPetModal() {
  const api = useApi();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [species, setSpecies] = useState<Species[]>([]);
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [householdId, setHouseholdId] = useState("");

  const [name, setName] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [selectedBreed, setSelectedBreed] = useState("");
  const [sex, setSex] = useState<"MALE"|"FEMALE"|"UNKNOWN">("UNKNOWN");

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const [speciesRes, householdRes] = await Promise.all([
        api.get("/api/v1/pets/species"),
        api.get("/api/v1/households/mine"),
      ]);
      setSpecies(speciesRes.data ?? []);
      setHouseholdId(householdRes.data?.id ?? "");
    } catch (err) {
      console.log("Error cargando datos:", err);
    }
  };

  const loadBreeds = async (speciesId: string) => {
    try {
      const res = await api.get(`/api/v1/pets/breeds?speciesId=${speciesId}`);
      setBreeds(res.data ?? []);
    } catch {}
  };

  const handleSelectSpecies = (id: string) => {
    setSelectedSpecies(id);
    setSelectedBreed("");
    loadBreeds(id);
  };

  const handleSave = async () => {
    if (!name.trim()) return Alert.alert("Error", "El nombre es requerido");
    if (!selectedSpecies) return Alert.alert("Error", "Selecciona una especie");
    if (!householdId) return Alert.alert("Error", "No se encontro el hogar del usuario");
    setLoading(true);
    try {
      await api.post("/api/v1/pets", {
        name: name.trim(),
        speciesId: selectedSpecies,
        breedId: selectedBreed || undefined,
        sex,
        householdId,
      });
      router.back();
    } catch (err) {
      Alert.alert("Error", "No se pudo guardar la mascota");
    } finally {
      setLoading(false);
    }
  };

  const SEX_OPTIONS = [
    { value: "MALE", label: "Macho" },
    { value: "FEMALE", label: "Hembra" },
    { value: "UNKNOWN", label: "Desconocido" },
  ];

  return (
    <ScrollView style={s.container} contentContainerStyle={s.content}>
      <Text style={s.title}>Nueva mascota</Text>

      <Text style={s.label}>Nombre *</Text>
      <TextInput style={s.input} placeholder="Nombre de tu mascota" value={name} onChangeText={setName} />

      <Text style={s.label}>Especie *</Text>
      <View style={s.options}>
        {species.map((sp) => (
          <TouchableOpacity key={sp.id} style={[s.option, selectedSpecies === sp.id && s.optionActive]} onPress={() => handleSelectSpecies(sp.id)}>
            <Text style={[s.optionText, selectedSpecies === sp.id && s.optionTextActive]}>{sp.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {breeds.length > 0 && (
        <>
          <Text style={s.label}>Raza</Text>
          <View style={s.options}>
            {breeds.map((b) => (
              <TouchableOpacity key={b.id} style={[s.option, selectedBreed === b.id && s.optionActive]} onPress={() => setSelectedBreed(b.id)}>
                <Text style={[s.optionText, selectedBreed === b.id && s.optionTextActive]}>{b.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      <Text style={s.label}>Sexo</Text>
      <View style={s.options}>
        {SEX_OPTIONS.map((o) => (
          <TouchableOpacity key={o.value} style={[s.option, sex === o.value && s.optionActive]} onPress={() => setSex(o.value as any)}>
            <Text style={[s.optionText, sex === o.value && s.optionTextActive]}>{o.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={s.button} onPress={handleSave} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={s.buttonText}>Guardar mascota</Text>}
      </TouchableOpacity>

      <TouchableOpacity style={s.cancel} onPress={() => router.back()}>
        <Text style={s.cancelText}>Cancelar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 24, paddingBottom: 48 },
  title: { fontSize: 24, fontWeight: "bold", color: "#1a1a2e", marginBottom: 24 },
  label: { fontSize: 14, fontWeight: "600", color: "#374151", marginBottom: 8, marginTop: 16 },
  input: { borderWidth: 1, borderColor: "#e0e0e0", borderRadius: 12, padding: 16, fontSize: 16, backgroundColor: "#fafafa" },
  options: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  option: { borderWidth: 1, borderColor: "#e0e0e0", borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8 },
  optionActive: { backgroundColor: "#4f46e5", borderColor: "#4f46e5" },
  optionText: { fontSize: 14, color: "#374151" },
  optionTextActive: { color: "#fff" },
  button: { backgroundColor: "#4f46e5", borderRadius: 12, padding: 16, alignItems: "center", marginTop: 32 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  cancel: { alignItems: "center", marginTop: 12, padding: 12 },
  cancelText: { color: "#666", fontSize: 14 },
});