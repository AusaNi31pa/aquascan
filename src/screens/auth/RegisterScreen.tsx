import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import GradientBackground from "../../components/GradientBackground";
import { useAuth } from "../../hooks/useAuth";

export default function RegisterScreen({ navigation }: any) {
  /* 🔐 State */
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register, isLoading } = useAuth();

  /* ✅ Register Handler */
  const handleRegister = async () => {
    if (
      !fullName ||
      !username ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    try {
      const success = await register(fullName, username, email, password);

      if (success) {
        Alert.alert("Success", "Account created successfully!", [
          {
            text: "OK",
            onPress: () => {
              setFullName("");
              setUsername("");
              setEmail("");
              setPassword("");
              setConfirmPassword("");
            },
          },
        ]);
      } else {
        Alert.alert("Register Failed", "Username already exists or invalid data");
      }
    } catch {
      Alert.alert("Error", "An unexpected error occurred");
    }
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
        {/* 🔥 Tilt Neon */}
        <Text style={styles.title}>REGISTER</Text>

        {/* 🔥 Inter */}
        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#5E2206"
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          placeholder="Username"
          placeholderTextColor="#5E2206"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#5E2206"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#5E2206"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#5E2206"
          secureTextEntry
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        {/* ✅ Gradient Button */}
        <TouchableOpacity activeOpacity={0.85} onPress={handleRegister} disabled={isLoading}>
          <LinearGradient
            colors={["#FD691A", "#FFA160", "#FFD270"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              {isLoading ? "Loading..." : "Register"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* กลับไป Login */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.link}
        >
          <Text style={styles.linkText}>Already have an account?</Text>
        </TouchableOpacity>
      </View>
    </GradientBackground>
  );
}

/* 🎨 Styles (เหมือนเดิมทั้งหมด) */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },

  title: {
    fontSize: 36,
    fontFamily: "TiltNeon-Regular",
    color: "#922D24",
    marginBottom: 30,
    borderBottomWidth: 2,
    borderColor: "#922D24",
    width: 170,
    letterSpacing: 2,
  },

  input: {
    backgroundColor: "#FD8342",
    borderRadius: 20,
    padding: 14,
    marginBottom: 14,
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: "white",
  },

  button: {
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Inter-Medium",
  },

  link: {
    marginTop: 18,
    alignItems: "center",
  },

  linkText: {
    color: "#5E2206",
    fontFamily: "Inter-Regular",
  },
});