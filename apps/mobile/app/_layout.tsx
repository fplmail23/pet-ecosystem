import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";

function InitialLayout() {
  const segments = useSegments();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return;
    setReady(true);
    const inAuthGroup = segments[0] === "(auth)";
    if (!inAuthGroup) router.replace("/(auth)/login");
  }, [ready]);

  return <Slot />;
}

export default function RootLayout() {
  return <InitialLayout />;
}
