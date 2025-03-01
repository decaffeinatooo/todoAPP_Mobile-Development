import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";

export default function SignUpScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/todoLogo.png')} style={styles.logo} />

      <TextInput
        style={styles.input}
        placeholder="User name"
        placeholderTextColor="#aaa"
        value={username}
        onChangeText={setUsername}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Email address"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.signUpButton}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signInButton} onPress={() => router.push("/signin")}>
        <Text style={styles.signUpText}>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#333",
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: "#fff",
  },
  signUpButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#d9c5a4",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  signInButton: {
    width: "100%",
    height: 50,
    borderColor: "#d9c5a4",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  signUpText: {
    color: "#d9c5a4",
    fontSize: 16,
    fontWeight: "bold",
  },
});
