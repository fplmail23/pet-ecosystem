const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Mock react-dom for React Native (required by @clerk/clerk-react)
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  "react-dom": require.resolve("react-native"),
};

// Fix expo-crypto version mismatch
config.resolver.blockList = [
  /node_modules\/.pnpm\/expo-crypto@55.*/,
];

module.exports = config;