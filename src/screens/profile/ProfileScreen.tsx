import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import GradientBackground from "../../components/GradientBackground";
import { useAuth } from "../../hooks/useAuth";

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  return (
    <GradientBackground>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>

        {/* Profile Section */}
        <LinearGradient
          colors={["#FD8342", "#FF9C5B"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.profileCard}
        >
          <View style={styles.profileContent}>
            <View style={styles.avatar}>
              <MaterialIcons name="person" size={50} color="#FFF" />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{user?.fullName}</Text>
              <Text style={styles.userEmail}>{user?.email}</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity style={styles.settingItem}>
            <MaterialIcons name="person-outline" size={24} color="#FD8342" />
            <View style={styles.settingContent}>
              <Text style={styles.settingName}>Edit Profile</Text>
              <Text style={styles.settingDesc}>Update your information</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#8B4513" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <MaterialIcons name="lock-outline" size={24} color="#FD8342" />
            <View style={styles.settingContent}>
              <Text style={styles.settingName}>Change Password</Text>
              <Text style={styles.settingDesc}>Update your password</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#8B4513" />
          </TouchableOpacity>
        </View>

        {/* Privacy & Security */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy & Security</Text>
          <TouchableOpacity style={styles.settingItem}>
            <MaterialIcons name="privacy-tip" size={24} color="#FD8342" />
            <View style={styles.settingContent}>
              <Text style={styles.settingName}>Privacy Policy</Text>
              <Text style={styles.settingDesc}>Read our privacy policy</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#8B4513" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <MaterialIcons name="info-outline" size={24} color="#FD8342" />
            <View style={styles.settingContent}>
              <Text style={styles.settingName}>Terms & Conditions</Text>
              <Text style={styles.settingDesc}>Read our terms</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#8B4513" />
          </TouchableOpacity>
        </View>

        {/* App Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App</Text>
          <TouchableOpacity style={styles.settingItem}>
            <MaterialIcons name="notifications-none" size={24} color="#FD8342" />
            <View style={styles.settingContent}>
              <Text style={styles.settingName}>Notifications</Text>
              <Text style={styles.settingDesc}>Manage notifications</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#8B4513" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <MaterialIcons name="language" size={24} color="#FD8342" />
            <View style={styles.settingContent}>
              <Text style={styles.settingName}>Language</Text>
              <Text style={styles.settingDesc}>English</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#8B4513" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <MaterialIcons name="info" size={24} color="#FD8342" />
            <View style={styles.settingContent}>
              <Text style={styles.settingName}>About</Text>
              <Text style={styles.settingDesc}>Version 1.0.0</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#8B4513" />
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={async () => await logout()}
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={["#FF6B6B", "#EE5A52"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.logoutGradient}
          >
            <MaterialIcons name="logout" size={20} color="#FFF" />
            <Text style={styles.logoutText}>Logout</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  header: {
    marginBottom: 20,
    marginTop: 10,
  },

  headerTitle: {
    fontSize: 24,
    fontFamily: "Inter-Medium",
    color: "#5E2206",
    fontWeight: "600",
  },

  profileCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },

  profileContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFF",
  },

  profileInfo: {
    flex: 1,
  },

  userName: {
    fontSize: 18,
    fontFamily: "Cormorant-SemiBold",
    color: "#FFFFFF",
    fontWeight: "600",
  },

  userEmail: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 4,
  },

  section: {
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    color: "#5E2206",
    fontWeight: "600",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(253, 131, 66, 0.1)",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    gap: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#FD8342",
  },

  settingContent: {
    flex: 1,
  },

  settingName: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    color: "#5E2206",
    fontWeight: "500",
  },

  settingDesc: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: "#8B4513",
    marginTop: 2,
  },

  logoutButton: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 30,
    marginTop: 20,
  },

  logoutGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    gap: 8,
  },

  logoutText: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    color: "#FFFFFF",
    fontWeight: "500",
  },
});