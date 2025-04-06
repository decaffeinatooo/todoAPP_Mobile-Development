import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function FloatingActionButton({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: "#e0c090",
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        elevation: 5,
      }}
    >
      <Ionicons name="add" size={30} color="#000" />
    </TouchableOpacity>
  );
}
