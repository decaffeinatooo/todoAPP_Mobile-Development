import { View, FlatList, Text } from "react-native";
import TaskItem from "../../components/TaskItem";
import { useRouter } from "expo-router";

export default function Completed() {
  const router = useRouter();
  const completedTasks = [
    { id: "1", text: "Completed 1", time: "Today at 16:45" },
    { id: "2", text: "Completed 2", time: "Today at 16:45" },
    { id: "3", text: "Completed 3", time: "Today at 16:45" },
    { id: "4", text: "Completed 4", time: "Today at 16:45" },
    { id: "5", text: "Completed 5", time: "Today at 16:45" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#000", padding: 20 }}>
      <Text
        style={{
          color: "#fff",
          fontSize: 24,
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        Completed
      </Text>

      <FlatList
        data={completedTasks}
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
    </View>
  );
}
