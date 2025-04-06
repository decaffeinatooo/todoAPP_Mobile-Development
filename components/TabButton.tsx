import { TouchableOpacity, Text, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

type TabButtonProps = {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onPress: () => void;
};

export default function TabButton({
  icon,
  label,
  active,
  onPress,
}: TabButtonProps) {
  return (
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
        style={{
          color: active ? "#e0c090" : "#999",
          marginTop: 4,
          fontSize: 14,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
