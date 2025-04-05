import { useRouter } from "expo-router";
import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Animated } from "react-native";

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

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

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/images/todoLogo.png')} style={styles.logo} />
      </View>
      
    
      <Animated.View style={[styles.inputContainer, { opacity, transform: [{ translateY }] }]}>
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
