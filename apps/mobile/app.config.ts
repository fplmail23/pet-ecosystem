import { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "PetEcosystem",
  slug: "pet-ecosystem",
  version: "1.0.0",
  orientation: "portrait",
  scheme: "petecosystem",
  userInterfaceStyle: "automatic",
  icon: "./assets/images/icon.png",
  android: {
    package: "com.petecosystem.app",
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff"
    }
  },
  plugins: ["expo-router"],
  experiments: { typedRoutes: true },
  extra: {
    newArchEnabled: true
  }
};

export default config;
