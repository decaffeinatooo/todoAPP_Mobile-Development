import { View, TouchableOpacity, Text, Image } from "react-native";
import { useRouter } from "expo-router";

export default function Profile() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#121212",
      }}
    >
      <Image
        source={require("../../assets/images/todoLogo.png")}
        style={{ width: 200, height: 200 }}
      />
      <TouchableOpacity
        onPress={() => router.replace("/auth/signin")}
        style={{
          marginTop: 20,
          padding: 10,
          borderWidth: 1,
          borderColor: "#d9c5a4",
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "#d9c5a4" }}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}
