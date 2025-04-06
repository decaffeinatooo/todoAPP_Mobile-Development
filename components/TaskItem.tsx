import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type TaskItemProps = {
  title: string;
  time?: string;
  onEdit: () => void;
};

export default function TaskItem({ title, time, onEdit }: TaskItemProps) {
  return (
    <TouchableOpacity
      onPress={onEdit}
      style={{
        backgroundColor: "#292929",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View>
        <Text style={{ color: "#fff", fontSize: 16 }}>{title}</Text>
        {time && <Text style={{ color: "#aaa", fontSize: 12 }}>{time}</Text>}
      </View>
      <Ionicons name="chevron-forward" size={20} color="#fff" />
    </TouchableOpacity>
  );
}
