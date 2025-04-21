import { useRouter } from "expo-router";
import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Animated } from "react-native";

export default function SignUpScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const opacity = useRef(new Animated.Value(0)).current; 
  const translateY = useRef(new Animated.Value(50)).current;  
  
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,  
      useNativeDriver: true,
    }).start();

    Animated.timing(translateY, {
      toValue: 0,
      duration: 1000,  
      useNativeDriver: true,
    }).start();
  }, [opacity, translateY]);

  const handleSignUp = async () => {
    setError("");
    setSuccess("");
    if (!first_name || !last_name || !email || !password || !confirm_password) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirm_password) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      // Replace with your real API endpoint
      const response = await fetch("https://todo-list.dcism.org/signup_action.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ first_name, last_name, email, password, confirm_password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Sign up failed.");
      } else {
        setSuccess("Sign up successful! Redirecting to sign in...");
        setTimeout(() => router.push("/signin"), 1500);
      }
    } catch (e) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/todoLogo.png')} style={styles.logo} />
      <Animated.View style={[styles.inputContainer, { opacity, transform: [{ translateY }] }]}> 
        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor="#aaa"
          value={first_name}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor="#aaa"
          value={last_name}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
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
          value={confirm_password}
          onChangeText={setConfirmPassword}
        />
        {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}
        {success ? <Text style={{ color: 'green', marginBottom: 10 }}>{success}</Text> : null}
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Signing up...' : 'Sign up'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signInButton} onPress={() => router.push("/signin")}> 
          <Text style={styles.signUpText}>Sign in</Text>
        </TouchableOpacity>
      </Animated.View>
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
  inputContainer: {
    width: "100%",
    alignItems: "center",
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
