import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/images/todoLogo.png')} style={styles.logo} />
      </View>
      
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
      
      <TouchableOpacity style={styles.signInButton}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.signUpButton} onPress={() => router.push("/signup")}>
        <Text style={styles.signUpText}>Sign up</Text>
      </TouchableOpacity>
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
