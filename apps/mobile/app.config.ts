import { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "PetEcosystem",
  slug: "pet-ecosystem",
  version: "1.0.0",
  orientation: "portrait",
  scheme: "petecosystem",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  icon: "./assets/images/icon.png",
  android: {
    package: "com.petecosystem.app",
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff"
    }
  },
  plugins: ["expo-router", "expo-font", "expo-secure-store"],
  experiments: { typedRoutes: true },
};

export default config;