import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={s.container}>
      <Text style={s.title}>Pet Ecosystem</Text>
      <Text style={s.subtitle}>Bienvenido de vuelta</Text>
      <TextInput style={s.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <TextInput style={s.input} placeholder="Contrasena" value={password} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity style={s.button} onPress={() => router.replace("/(tabs)/home")}>
        <Text style={s.buttonText}>Iniciar sesion</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
        <Text style={s.link}>No tienes cuenta? Registrate</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#fff" },
  title: { fontSize: 32, fontWeight: "bold", color: "#1a1a2e", textAlign: "center", marginBottom: 8 },
  subtitle: { fontSize: 16, color: "#666", textAlign: "center", marginBottom: 32 },
  input: { borderWidth: 1, borderColor: "#e0e0e0", borderRadius: 12, padding: 16, marginBottom: 12, fontSize: 16, backgroundColor: "#fafafa" },
  button: { backgroundColor: "#4f46e5", borderRadius: 12, padding: 16, alignItems: "center", marginTop: 8 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  link: { color: "#4f46e5", textAlign: "center", marginTop: 16, fontSize: 14 }
});
