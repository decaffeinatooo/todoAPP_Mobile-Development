import { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { View, ActivityIndicator, Text } from "react-native";

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      // Simulating a delay to mimic an async call (e.g., backend check)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock authentication logic
      const userIsLoggedIn = false; // Simulate user being logged in (change to true for testing logged-in state)
      setIsLoggedIn(userIsLoggedIn);
      setIsLoading(false);

    
      if (router.isReady) {
      
        if (userIsLoggedIn) {
          router.replace("/main/home");
        } else {
          router.replace("/signup"); 
        }
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#000",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#e0c090" />
        <Text style={{ color: "#fff", marginTop: 10 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>

    </Stack>
  );
}
