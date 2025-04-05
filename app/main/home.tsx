import { View, Text, TouchableOpacity, Image, FlatList, Dimensions,TextInput } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { useRouter } from "expo-router";  



const { width, height } = Dimensions.get("window");

/************************************Main Screen************************************/
export default function MainScreen() {
  const [activeTab, setActiveTab] = useState<"ToDo" | "Completed" | "Profile" | "EditTask">("ToDo");
  const [completedTasks, setCompletedTasks] = useState([
    { id: "1", text: "Completed 1" },
    { id: "2", text: "Completed 2" },
    { id: "3", text: "Completed 3" },
    { id: "4", text: "Completed 4" },
    { id: "5", text: "Completed 5" },
    
  ]);
  const [selectedTask, setSelectedTask] = useState<{ id: string; text: string } | null>(null);


  const removeTask = (id: string) => {
    setCompletedTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

 
  const onTaskClick = (task: { id: string; text: string }) => {
    setSelectedTask(task);
    setActiveTab("EditTask");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {activeTab === "ToDo" && <Text style={{ color: "#fff", fontSize: 24 }}>ToDo Screen</Text>}
        {activeTab === "Completed" && (
          <CompletedScreen tasks={completedTasks} onDelete={removeTask} onTaskClick={onTaskClick} />
        )}
        {activeTab === "Profile" && <ProfileScreen />}
        {activeTab === "EditTask" && selectedTask && (
          <EditTaskScreen task={selectedTask} onBack={() => setActiveTab("Completed")} />
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
  tasks: { id: string; text: string }[];
  onDelete: (id: string) => void;
  onTaskClick: (task: { id: string; text: string }) => void;
};

const CompletedScreen = ({ tasks, onDelete, onTaskClick }: CompletedScreenProps) => {
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
              <Text style={{ color: "#fff", fontSize: 18 }}>{item.text}</Text>
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
const EditTaskScreen = ({ task, onBack }: { task: { id: string; text: string }; onBack: () => void }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#000", alignItems: "center", paddingTop: 40 }}>

      <View style={{ 
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "space-between", 
        width: "90%", 
        marginBottom: 40 
      }}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        
        <Text style={{ color: "#fff", fontSize: 20, textAlign: "center", flex: 1 }}>
          Edit
        </Text>

       
      </View>

     
      <TextInput
        value={task.text}
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
        <Text style={{ color: "#fff", textAlign: "center", fontSize: width * 0.05 }}>Update</Text>
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
        <Text style={{ color: "#fff", textAlign: "center", fontSize: width * 0.05 }}>Incomplete</Text>
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
        <Text style={{ color: "#fff", textAlign: "center", fontSize: width * 0.05 }}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

