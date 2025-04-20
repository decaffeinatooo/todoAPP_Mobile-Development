import { useRouter } from "expo-router";
import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Animated } from "react-native";

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handleSignIn = async () => {
    setError("");
    setSuccess("");
    if (!email || !password) {
      setError("All fields are required.");
      return;
    }
    setLoading(true);
    try {
      const url = `https://todo-list.dcism.org/signin_action.php/signin_action.php?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
      const response = await fetch(url, {
        method: "GET",
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Sign in failed.");
      } else {
        setSuccess("Sign in successful! Redirecting to home...");
        setTimeout(() => router.push("/main/home"), 1500);
      }
    } catch (e) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/images/todoLogo.png')} style={styles.logo} />
      </View>
      
    
      <Animated.View style={[styles.inputContainer, { opacity, transform: [{ translateY }] }]}>
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
        
        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Signing in...' : 'Sign in'}</Text>
        </TouchableOpacity>
        {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}
        {success ? <Text style={{ color: 'green', marginBottom: 10 }}>{success}</Text> : null}
        <TouchableOpacity style={styles.signUpButton} onPress={() => router.push("/signup")}>
          <Text style={styles.signUpText}>Sign up</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    marginBottom: 40,
    borderRadius: 100,
    padding: 30,
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#333',
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: '#fff',
  },
  signInButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#d9c5a4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpButton: {
    width: '100%',
    height: 50,
    borderColor: '#d9c5a4',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  signUpText: {
    color: '#d9c5a4',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
