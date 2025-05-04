import { View, Text, TouchableOpacity, Image, FlatList, Dimensions, TextInput } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { useTasks } from "../../context/TasksContext";
import { Task } from "../../components/types";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get("window");

/************************************Main Screen************************************/
export default function MainScreen() {
  const [activeTab, setActiveTab] = useState<"ToDo" | "Completed" | "Profile" | "EditTask">("ToDo");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const { tasks, addTask, setTasks } = useTasks();

  // Add a new task
  const handleAddTask = async () => {
    if (newTaskText.trim() === "") return;
    const userId = await AsyncStorage.getItem('userId');
    if (!userId) {
      alert('User not found. Please sign in again.');
      return;
    }
    try {
      const response = await fetch('https://todo-list.dcism.org/addItem_action.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          item_name: newTaskText,
          item_description: newTaskDescription,
          user_id: Number(userId),
        }),
      });
      const data = await response.json();
      if (data.status === 200 && data.data) {
        // Optionally, add the new task to local state
        addTask({
          id: data.data.item_id.toString(),
          text: data.data.item_name,
          description: data.data.item_description,
          time: data.data.timemodified,
          completed: false,
        });
        setNewTaskText("");
        setNewTaskDescription("");
      } else {
        alert(data.message || 'Failed to add task.');
      }
    } catch (e) {
      alert('Network error. Please try again.');
    }
  };

  // Mark as complete/incomplete
  const toggleComplete = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    const newStatus = task.completed ? "active" : "inactive";
    try {
      const response = await fetch('https://todo-list.dcism.org/statusItem_action.php', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          item_id: Number(id),
          status: newStatus,
        }),
      });
      const data = await response.json();
      if (data.status === 200) {
        setTasks((prev) =>
          prev.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          )
        );
      } else {
        alert(data.message || 'Failed to update status.');
      }
    } catch (e) {
      alert('Network error. Please try again.');
    }
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
  const updateTask = (id: string, newText: string, newDescription: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, text: newText, description: newDescription } : task
      )
    );
    setActiveTab("ToDo");
  };

  // Split tasks
  const activeTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  useEffect(() => {
    const fetchTasks = async () => {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) return;
      try {
        // Fetch active tasks for ToDo
        const activeRes = await fetch(`https://todo-list.dcism.org/getItems_action.php?status=active&user_id=${userId}`);
        const activeData = await activeRes.json();
        let activeTasks: Task[] = [];
        if (activeData.status === 200 && activeData.data) {
          activeTasks = Object.values(activeData.data).map((item: any) => ({
            id: item.item_id.toString(),
            text: item.item_name,
            description: item.item_description,
            time: item.timemodified,
            completed: false,
          }));
        }
        // Fetch inactive tasks for Completed
        const completedRes = await fetch(`https://todo-list.dcism.org/getItems_action.php?status=inactive&user_id=${userId}`);
        const completedData = await completedRes.json();
        let completedTasks: Task[] = [];
        if (completedData.status === 200 && completedData.data) {
          completedTasks = Object.values(completedData.data).map((item: any) => ({
            id: item.item_id.toString(),
            text: item.item_name,
            description: item.item_description,
            time: item.timemodified,
            completed: true,
          }));
        }
        setTasks([...activeTasks, ...completedTasks]);
      } catch (e) {
        // Optionally handle error
      }
    };
    fetchTasks();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {activeTab === "ToDo" && (
          <View style={{ width: "100%", alignItems: "center", paddingTop: 40 }}>
            <Text style={{ color: "#fff", fontSize: 28, fontWeight: "bold", marginBottom: 20, letterSpacing: 1 }}>ToDo</Text>
            <View style={{ width: "90%", marginBottom: 16, backgroundColor: "#232323", borderRadius: 10, padding: 16, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 8, elevation: 3 }}>
              <TextInput
                style={{
                  width: "100%",
                  height: 48,
                  backgroundColor: "#333",
                  borderRadius: 8,
                  paddingHorizontal: 15,
                  color: "#fff",
                  marginBottom: 10,
                  fontSize: 16,
                }}
                placeholder="Add a new task..."
                placeholderTextColor="#aaa"
                value={newTaskText}
                onChangeText={setNewTaskText}
                returnKeyType="done"
              />
              <TextInput
                style={{
                  width: "100%",
                  height: 48,
                  backgroundColor: "#333",
                  borderRadius: 8,
                  paddingHorizontal: 15,
                  color: "#fff",
                  marginBottom: 10,
                  fontSize: 16,
                }}
                placeholder="Description (optional)"
                placeholderTextColor="#aaa"
                value={newTaskDescription}
                onChangeText={setNewTaskDescription}
                returnKeyType="done"
              />
              <TouchableOpacity
                style={{
                  backgroundColor: "#d9c5a4",
                  borderRadius: 8,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 14,
                  marginTop: 4,
                  shadowColor: '#d9c5a4',
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                  elevation: 2,
                }}
                onPress={handleAddTask}
              >
                <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold", letterSpacing: 0.5 }}>Add Task</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={activeTasks}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingBottom: 40 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => onTaskClick(item)}
                  activeOpacity={0.85}
                  style={{
                    backgroundColor: "#2E4E6E",
                    marginBottom: 16,
                    width: width * 0.9,
                    borderRadius: 12,
                    shadowColor: '#000',
                    shadowOpacity: 0.15,
                    shadowRadius: 6,
                    elevation: 2,
                    padding: 18,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity onPress={() => toggleComplete(item.id)} style={{ marginRight: 14 }}>
                    <Ionicons
                      name={item.completed ? "checkbox" : "square-outline"}
                      size={28}
                      color="#fff"
                    />
                  </TouchableOpacity>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>{item.text}</Text>
                    {item.description ? (
                      <Text style={{ color: "#ccc", fontSize: 15, marginTop: 2 }}>{item.description}</Text>
                    ) : null}
                    <Text style={{ color: "#aaa", fontSize: 12, marginTop: 4 }}>{item.time}</Text>
                  </View>
                  <TouchableOpacity onPress={() => deleteTask(item.id)} style={{ marginLeft: 10 }}>
                    <Ionicons name="trash" size={24} color="#fff" />
                  </TouchableOpacity>
                </TouchableOpacity>
              )}
              ListEmptyComponent={<Text style={{ color: "#888", fontSize: 18, marginTop: 20, textAlign: 'center' }}>No tasks yet</Text>}
            />
          </View>
        )}
        {activeTab === "Completed" && (
          <CompletedScreen tasks={completedTasks} onDelete={deleteTask} onTaskClick={onTaskClick} onToggleComplete={toggleComplete} />
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
        }}
      >
        <TabButton
          icon={<MaterialIcons name="edit" size={24} color={activeTab === "ToDo" ? "#e0c090" : "#999"} />}
          label="ToDo"
          active={activeTab === "ToDo"}
          onPress={() => setActiveTab("ToDo")}
        />
        <TabButton
          icon={<MaterialIcons name="checklist" size={24} color={activeTab === "Completed" ? "#e0c090" : "#999"} />}
          label="Completed"
          active={activeTab === "Completed"}
          onPress={() => setActiveTab("Completed")}
        />
        <TabButton
          icon={<Ionicons name="person" size={24} color={activeTab === "Profile" ? "#e0c090" : "#999"} />}
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
    <Text style={{ color: active ? "#e0c090" : "#999", marginTop: 4, fontSize: 14 }}>
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

const CompletedScreen = ({ tasks, onDelete, onTaskClick, onToggleComplete }: CompletedScreenProps) => {
  return (
    <View style={{ flex: 1, alignItems: "center", width: "100%", paddingTop: 40 }}>
      <Text style={{ color: "#fff", fontSize: 20, marginBottom: 40 }}>Completed</Text>
      {tasks.length === 0 ? (
        <Text style={{ color: "#888", fontSize: 18, marginTop: 20 }}>No completed tasks yet</Text>
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
                <Ionicons name={item.completed ? "checkbox" : "square-outline"} size={24} color="#fff" />
              </TouchableOpacity>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={{ color: "#fff", fontSize: 18, flex: 1, marginLeft: 10 }}>{item.text}</Text>
                {item.description ? (
                  <Text style={{ color: "#ccc", fontSize: 14, marginLeft: 10, marginTop: 2 }}>{item.description}</Text>
                ) : null}
              </View>
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
      <View style={{ position: "absolute", top: 40, left: 0, right: 0, alignItems: "center" }}>
        <Text style={{ color: "#fff", fontSize: 20 }}>Profile</Text>
      </View>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("../../assets/images/todoLogo.png")}
          style={{ width: 300, height: 300, borderRadius: 60, marginBottom: 20 }}
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
const EditTaskScreen = ({ task, onBack, onUpdate, onDelete }: { task: Task; onBack: () => void; onUpdate: (id: string, newText: string, newDescription: string) => void; onDelete: (id: string) => void }) => {
  const [editText, setEditText] = useState(task.text);
  const [editDescription, setEditDescription] = useState(task.description || "");
  return (
    <View style={{ flex: 1, backgroundColor: "#000", alignItems: "center", paddingTop: 40 }}>
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "90%",
        marginBottom: 40,
      }}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={{ color: "#fff", fontSize: 20, textAlign: "center", flex: 1 }}>
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
      <TextInput
        value={editDescription}
        onChangeText={setEditDescription}
        placeholder="Description"
        placeholderTextColor="#ccc"
        style={{
          backgroundColor: "#d1bfa8",
          color: "#000",
          fontSize: width * 0.04,
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
        onPress={() => onUpdate(task.id, editText, editDescription)}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontSize: width * 0.05 }}>Update</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "#6E2E2E",
          paddingVertical: height * 0.02,
          borderRadius: 8,
          width: width * 0.9,
          maxWidth: 500,
        }}
        onPress={() => { onDelete(task.id); onBack(); }}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontSize: width * 0.05 }}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

