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

export default function LoginScreen({ navigation }: any) {
  /* 🔐 State สำหรับ Login */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useAuth();

  /* ✅ ฟังก์ชัน Login */
  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please enter username and password");
      return;
    }

    try {
      const success = await login(username, password);

      if (success) {
        // ✅ Login สำเร็จ → ไปหน้า Home
        Alert.alert("Success", "Login successful!", [
          {
            text: "OK",
            onPress: () => {
              setUsername("");
              setPassword("");
            },
          },
        ]);
      } else {
        Alert.alert("Login Failed", "Invalid username or password");
      }
    } catch {
      Alert.alert("Error", "An unexpected error occurred");
    }
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
        {/* 🔥 Tilt Neon */}
        <Text style={styles.title}>SIGN IN</Text>

        <TextInput
          placeholder="Username"
          placeholderTextColor="#5E2206"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#5E2206"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        {/* 🔒 Remember / Forget */}
        <View style={styles.rememberRow}>
          <TouchableOpacity style={styles.rememberLeft} activeOpacity={0.7}>
            <View style={styles.checkbox} />
            <Text style={styles.rememberText}>Remember Me</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.forgotText}>Forget Password</Text>
          </TouchableOpacity>
        </View>

        {/* ✅ Login */}
        <TouchableOpacity activeOpacity={0.85} onPress={handleLogin} disabled={isLoading}>
          <LinearGradient
            colors={["#FD691A", "#FFA160", "#FFD270"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              {isLoading ? "Loading..." : "Login"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Create account */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={styles.link}
        >
          <Text style={styles.linkText}>Create New Account</Text>
        </TouchableOpacity>

        {/* 🔹 SOCIAL LOGIN */}
        <View style={styles.socialContainer}>
          <TouchableOpacity activeOpacity={0.85}>
            <LinearGradient
              colors={["#FFD36A", "#FF9F1C"]}
              style={styles.socialButton}
            >
              <Text style={styles.socialIcon}>f</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.85}>
            <LinearGradient
              colors={["#FFD36A", "#FF9F1C"]}
              style={styles.socialButton}
            >
              <Text style={styles.socialIcon}>G</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.85}>
            <LinearGradient
              colors={["#FFD36A", "#FF9F1C"]}
              style={styles.socialButton}
            >
              <Text style={styles.socialIcon}>iOS</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </GradientBackground>
  );
}

/* 🎨 Styles (เหมือนเดิมทั้งหมด) */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    justifyContent: "center",
  },

  title: {
    fontSize: 36,
    fontFamily: "TiltNeon-Regular",
    color: "#922D24",
    marginBottom: 30,
    borderBottomWidth: 2,
    borderColor: "#922D24",
    width: 140,
    letterSpacing: 2,
  },

  input: {
    backgroundColor: "#FD8342",
    borderRadius: 20,
    padding: 14,
    marginBottom: 16,
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: "white",
  },

  rememberRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 4,
  },

  rememberLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    backgroundColor: "#A35A2A",
  },

  rememberText: {
    fontFamily: "Inter-Regular",
    color: "#5E2206",
    fontSize: 14,
  },

  forgotText: {
    fontFamily: "Inter-Regular",
    color: "#5E2206",
    fontSize: 14,
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

  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 14,
    gap: 20,
  },

  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  socialIcon: {
    fontSize: 26,
    fontWeight: "700",
    color: "#fff",
  },
});