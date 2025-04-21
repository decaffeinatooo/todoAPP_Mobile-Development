import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  TextInput,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useTasks } from "../../context/TasksContext";
import { Task } from "../../components/types";

const { width, height } = Dimensions.get("window");

/************************************Main Screen************************************/
export default function MainScreen() {
  const [activeTab, setActiveTab] = useState<
    "ToDo" | "Completed" | "Profile" | "EditTask"
  >("ToDo");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [newTaskText, setNewTaskText] = useState("");
  const { tasks, addTask, setTasks } = useTasks();

  // Add a new task
  const handleAddTask = () => {
    if (newTaskText.trim() === "") return;
    const newTask: Task = {
      id: Date.now().toString(),
      text: newTaskText,
      time: new Date().toLocaleString(),
      completed: false,
    };
    addTask(newTask);
    setNewTaskText("");
  };

  // Mark as complete/incomplete
  const toggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Edit a task (open edit screen)
  const onTaskClick = (task: Task) => {
    setSelectedTask(task);
    setActiveTab("EditTask");
  };

  // Update a task (from edit screen)
  const updateTask = (id: string, newText: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
    setActiveTab("ToDo");
  };

  // Split tasks
  const activeTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={{ flex: 1, alignItems: "center" }}>
        {activeTab === "ToDo" && (
          <View
            style={{
              width: "100%",
              alignItems: "center",
              marginTop: 60,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 24, marginBottom: 20 }}>
              ToDo
            </Text>
            <View
              style={{ flexDirection: "row", width: "90%", marginBottom: 20 }}
            >
              <TextInput
                style={{
                  flex: 1,
                  height: 50,
                  backgroundColor: "#333",
                  borderRadius: 5,
                  paddingHorizontal: 15,
                  color: "#fff",
                  marginRight: 10,
                }}
                placeholder="Add a new task..."
                placeholderTextColor="#aaa"
                value={newTaskText}
                onChangeText={setNewTaskText}
                onSubmitEditing={handleAddTask}
                returnKeyType="done"
              />
              <TouchableOpacity
                style={{
                  backgroundColor: "#d9c5a4",
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingHorizontal: 16,
                }}
                onPress={handleAddTask}
              >
                <Ionicons name="add" size={28} color="#000" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={activeTasks}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => onTaskClick(item)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "#2E4E6E",
                    paddingVertical: 15,
                    paddingHorizontal: 20,
                    marginBottom: 10,
                    width: width * 0.9,
                    borderRadius: 8,
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity onPress={() => toggleComplete(item.id)}>
                    <Ionicons
                      name={item.completed ? "checkbox" : "square-outline"}
                      size={24}
                      color="#fff"
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 18,
                      flex: 1,
                      marginLeft: 10,
                    }}
                  >
                    {item.text}
                  </Text>
                  <TouchableOpacity onPress={() => deleteTask(item.id)}>
                    <Ionicons name="trash" size={24} color="#fff" />
                  </TouchableOpacity>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text style={{ color: "#888", fontSize: 18, marginTop: 20 }}>
                  No tasks yet
                </Text>
              }
            />
          </View>
        )}
        {activeTab === "Completed" && (
          <CompletedScreen
            tasks={completedTasks}
            onDelete={deleteTask}
            onTaskClick={onTaskClick}
            onToggleComplete={toggleComplete}
          />
        )}
        {activeTab === "Profile" && <ProfileScreen />}
        {activeTab === "EditTask" && selectedTask && (
          <EditTaskScreen
            task={selectedTask}
            onBack={() => setActiveTab("ToDo")}
            onUpdate={updateTask}
            onDelete={deleteTask}
          />
        )}
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: "#292929",
          paddingVertical: 12,
          borderTopWidth: 0,
          paddingBottom: 20,
        }}
      >
        <TabButton
          icon={
            <MaterialIcons
              name="edit"
              size={24}
              color={activeTab === "ToDo" ? "#e0c090" : "#999"}
            />
          }
          label="ToDo"
          active={activeTab === "ToDo"}
          onPress={() => setActiveTab("ToDo")}
        />
        <TabButton
          icon={
            <MaterialIcons
              name="checklist"
              size={24}
              color={activeTab === "Completed" ? "#e0c090" : "#999"}
            />
          }
          label="Completed"
          active={activeTab === "Completed"}
          onPress={() => setActiveTab("Completed")}
        />
        <TabButton
          icon={
            <Ionicons
              name="person"
              size={24}
              color={activeTab === "Profile" ? "#e0c090" : "#999"}
            />
          }
          label="Profile"
          active={activeTab === "Profile"}
          onPress={() => setActiveTab("Profile")}
        />
      </View>
    </View>
  );
}

type TabButtonProps = {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onPress: () => void;
};

const TabButton = ({ icon, label, active, onPress }: TabButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      alignItems: "center",
      flex: 1,
      width: width / 3,
    }}
  >
    {icon}
    <Text
      style={{ color: active ? "#e0c090" : "#999", marginTop: 4, fontSize: 14 }}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

/************************************Completed Screen************************************/
type CompletedScreenProps = {
  tasks: Task[];
  onDelete: (id: string) => void;
  onTaskClick: (task: Task) => void;
  onToggleComplete: (id: string) => void;
};

const CompletedScreen = ({
  tasks,
  onDelete,
  onTaskClick,
  onToggleComplete,
}: CompletedScreenProps) => {
  return (
    <View
      style={{ flex: 1, alignItems: "center", width: "100%", marginTop: 60 }}
    >
      <Text style={{ color: "#fff", fontSize: 20, marginBottom: 20 }}>
        Completed
      </Text>
      {tasks.length === 0 ? (
        <Text style={{ color: "#888", fontSize: 18, marginTop: 20 }}>
          No completed tasks yet
        </Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => onTaskClick(item)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#2E4E2E",
                paddingVertical: 15,
                paddingHorizontal: 50,
                marginBottom: 10,
                width: width * 0.9,
                borderRadius: 8,
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity onPress={() => onToggleComplete(item.id)}>
                <Ionicons
                  name={item.completed ? "checkbox" : "square-outline"}
                  size={24}
                  color="#fff"
                />
              </TouchableOpacity>
              <Text
                style={{ color: "#fff", fontSize: 18, flex: 1, marginLeft: 10 }}
              >
                {item.text}
              </Text>
              <TouchableOpacity onPress={() => onDelete(item.id)}>
                <Ionicons name="trash" size={24} color="#fff" />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

/************************************Profile Screen************************************/
const ProfileScreen = () => {
  const router = useRouter();

  const handleSignOut = () => {
    router.replace("/signin");
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          position: "absolute",
          top: 40,
          left: 0,
          right: 0,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 20, marginTop: 20 }}>
          Profile
        </Text>
      </View>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("../../assets/images/todoLogo.png")}
          style={{
            width: 300,
            height: 300,
            borderRadius: 60,
            marginBottom: 20,
          }}
        />
        <TouchableOpacity
          style={{
            paddingVertical: 10,
            paddingHorizontal: 80,
            borderWidth: 1,
            borderColor: "#e0c090",
            borderRadius: 5,
          }}
          onPress={handleSignOut}
        >
          <Text style={{ color: "#e0c090" }}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

/************************************Edit Task Screen******************************/
const EditTaskScreen = ({
  task,
  onBack,
  onUpdate,
  onDelete,
}: {
  task: Task;
  onBack: () => void;
  onUpdate: (id: string, newText: string) => void;
  onDelete: (id: string) => void;
}) => {
  const [editText, setEditText] = useState(task.text);
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
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text
          style={{ color: "#fff", fontSize: 20, textAlign: "center", flex: 1 }}
        >
          Edit
        </Text>
      </View>
      <TextInput
        value={editText}
        onChangeText={setEditText}
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
      <TouchableOpacity
        style={{
          backgroundColor: "#2E4E6E",
          paddingVertical: height * 0.02,
          borderRadius: 8,
          marginBottom: 15,
          width: width * 0.9,
          maxWidth: 500,
        }}
        onPress={() => onUpdate(task.id, editText)}
      >
        <Text
          style={{ color: "#fff", textAlign: "center", fontSize: width * 0.05 }}
        >
          Update
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
        onPress={() => {
          onDelete(task.id);
          onBack();
        }}
      >
        <Text
          style={{ color: "#fff", textAlign: "center", fontSize: width * 0.05 }}
        >
          Delete
        </Text>
      </TouchableOpacity>
    </View>
  );
};
