import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function EditTaskScreen() {
  const router = useRouter();
  const { id, text } = useLocalSearchParams();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        paddingTop: 40,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "90%",
          marginBottom: 40,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text
          style={{ color: "#fff", fontSize: 20, textAlign: "center", flex: 1 }}
        >
          Edit
        </Text>
      </View>

      <TextInput
        defaultValue={text?.toString()}
        placeholder="Title"
        placeholderTextColor="#ccc"
        style={{
          backgroundColor: "#d1bfa8",
          color: "#000",
          fontSize: width * 0.05,
          paddingVertical: 10,
          paddingHorizontal: 15,
          borderRadius: 8,
          marginBottom: 20,
          width: width * 0.9,
          maxWidth: 500,
        }}
      />

      <TextInput
        multiline
        numberOfLines={4}
        placeholder="Details"
        placeholderTextColor="#000"
        style={{
          backgroundColor: "#d1bfa8",
          color: "#000",
          fontSize: width * 0.04,
          paddingVertical: 10,
          paddingHorizontal: 15,
          borderRadius: 8,
          textAlignVertical: "top",
          marginBottom: 30,
          width: width * 0.9,
          maxWidth: 500,
          minHeight: height * 0.1,
        }}
      />

      <TouchableOpacity
        style={{
          backgroundColor: "#2E4E6E",
          paddingVertical: height * 0.02,
          borderRadius: 8,
          marginBottom: 15,
          width: width * 0.9,
          maxWidth: 500,
        }}
        onPress={() => console.log("Update pressed")}
      >
        <Text
          style={{ color: "#fff", textAlign: "center", fontSize: width * 0.05 }}
        >
          Update
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: "#4E4E2E",
          paddingVertical: height * 0.02,
          borderRadius: 8,
          marginBottom: 15,
          width: width * 0.9,
          maxWidth: 500,
        }}
        onPress={() => console.log("Mark as Incomplete pressed")}
      >
        <Text
          style={{ color: "#fff", textAlign: "center", fontSize: width * 0.05 }}
        >
          Incomplete
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: "#6E2E2E",
          paddingVertical: height * 0.02,
          borderRadius: 8,
          width: width * 0.9,
          maxWidth: 500,
        }}
        onPress={() => console.log("Delete pressed")}
      >
        <Text
          style={{ color: "#fff", textAlign: "center", fontSize: width * 0.05 }}
        >
          Delete
        </Text>
      </TouchableOpacity>
    </View>
  );
}
