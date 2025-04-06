import { View, FlatList } from "react-native";
import { useRouter } from "expo-router";
import TaskItem from "../../components/TaskItem";
import FloatingActionButton from "../../components/FloatingActionButton";

export default function Todo() {
  const router = useRouter();
  const tasks = [{ id: "1", text: "Do MobDev Todo", time: "Today at 16:45" }];

  return (
    <View style={{ flex: 1, backgroundColor: "#000", padding: 20 }}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            title={item.text}
            time={item.time}
            onEdit={() =>
              router.push({ pathname: "/tasks/editTask", params: item })
            }
          />
        )}
      />
      <FloatingActionButton onPress={() => router.push("/tasks/addTask")} />
    </View>
  );
}
