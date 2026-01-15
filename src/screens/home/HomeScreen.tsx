import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import GradientBackground from "../../components/GradientBackground";
import { useAuth } from "../../hooks/useAuth";

export default function HomeScreen() {
  const { logout } = useAuth();
  const navigation = useNavigation<any>();

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        onPress: () => {},
      },
      {
        text: "Logout",
        onPress: async () => {
          try {
            await logout();
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          } catch {
            Alert.alert("Error", "Failed to logout. Please try again.");
          }
        },
      },
    ]);
  };

  // Mock latest analysis result
  const latestResult = {
    name: "Mandarin",
    status: "Good",
    percentage1: 90,
    percentage2: 80,
    image:
      "https://images.unsplash.com/photo-1569410849066-a82e2b7c3df7?w=200&q=80",
  };

  // Mock variety data
  const varieties = [
    {
      id: 1,
      name: "Sai Nam Phueng",
      image:
        "https://images.unsplash.com/photo-1599599810694-b5ac4dd63edb?w=100&q=80",
    },
    {
      id: 2,
      name: "Mandarin",
      image:
        "https://images.unsplash.com/photo-1569410849066-a82e2b7c3df7?w=100&q=80",
    },
    {
      id: 3,
      name: "Tangerine",
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=100&q=80",
    },
  ];

  return (
    <GradientBackground>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* Header with Profile Icon */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Home</Text>
          <TouchableOpacity>
            <MaterialIcons name="menu" size={24} color="#FD8342" />
          </TouchableOpacity>
        </View>

        {/* Latest Analysis Card */}
        <LinearGradient
          colors={["#FD8342", "#FF9C5B"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.analysisCard}
        >
          {/* Fruit Image */}
          <Image
            source={{ uri: latestResult.image }}
            style={styles.fruitImage}
          />

          {/* Fruit Info */}
          <View style={styles.fruitInfo}>
            <Text style={styles.fruitName}>{latestResult.name}</Text>

            {/* Status and Percentages */}
            <View style={styles.statusContainer}>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{latestResult.status}</Text>
              </View>
              <View style={styles.percentagesRow}>
                <View style={styles.percentageBadge}>
                  <Text style={styles.percentageText}>
                    {latestResult.percentage1}%
                  </Text>
                </View>
                <View style={styles.percentageBadge}>
                  <Text style={styles.percentageText}>
                    {latestResult.percentage2}%
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featuresGrid}>
            <TouchableOpacity
              style={styles.featureButton}
              activeOpacity={0.7}
              onPress={() => Alert.alert("Hardware", "Hardware information")}
            >
              <MaterialIcons name="hardware" size={28} color="#FD8342" />
              <Text style={styles.featureLabel}>Hardware</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.featureButton}
              activeOpacity={0.7}
              onPress={() => Alert.alert("AI", "AI analysis information")}
            >
              <MaterialIcons name="smart-toy" size={28} color="#FD8342" />
              <Text style={styles.featureLabel}>AI</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.featureButton}
              activeOpacity={0.7}
              onPress={() => Alert.alert("Quality", "Quality analysis")}
            >
              <MaterialIcons name="check-circle" size={28} color="#FD8342" />
              <Text style={styles.featureLabel}>Quality</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Variety Section */}
        <View style={styles.varietySection}>
          <Text style={styles.sectionTitle}>Variety</Text>
          <View style={styles.varietyGrid}>
            {varieties.map((variety) => (
              <TouchableOpacity
                key={variety.id}
                style={styles.varietyItem}
                activeOpacity={0.7}
                onPress={() =>
                  Alert.alert(variety.name, "View more details about this variety")
                }
              >
                <Image
                  source={{ uri: variety.image }}
                  style={styles.varietyImage}
                />
                <Text style={styles.varietyName}>{variety.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={styles.actionButtonRow}
            activeOpacity={0.7}
            onPress={() => navigation.navigate("Collection")}
          >
            <LinearGradient
              colors={["#FFD270", "#FFA160"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.actionGradient}
            >
              <MaterialIcons name="add" size={24} color="#FFF" />
              <Text style={styles.actionText}>New</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButtonRow}
            activeOpacity={0.7}
            onPress={() => navigation.navigate("Analysis")}
          >
            <LinearGradient
              colors={["#FFD270", "#FFA160"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.actionGradient}
            >
              <MaterialIcons name="analytics" size={24} color="#FFF" />
              <Text style={styles.actionText}>Analyze</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButtonRow}
            activeOpacity={0.7}
            onPress={() => navigation.navigate("History")}
          >
            <LinearGradient
              colors={["#FFD270", "#FFA160"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.actionGradient}
            >
              <MaterialIcons name="history" size={24} color="#FFF" />
              <Text style={styles.actionText}>History</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButtonRow}
            activeOpacity={0.7}
            onPress={handleLogout}
          >
            <LinearGradient
              colors={["#FF6B6B", "#EE5A52"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.actionGradient}
            >
              <MaterialIcons name="logout" size={24} color="#FFF" />
              <Text style={styles.actionText}>Logout</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    marginTop: 10,
  },

  greeting: {
    fontSize: 28,
    fontFamily: "Cormorant-SemiBold",
    color: "#FD8342",
    fontWeight: "700",
  },

  /* Analysis Card */
  analysisCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    alignItems: "center",
  },

  fruitImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 16,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 3,
    borderColor: "#FFF",
  },

  fruitInfo: {
    alignItems: "center",
    width: "100%",
  },

  fruitName: {
    fontSize: 24,
    fontFamily: "Cormorant-SemiBold",
    color: "#FFF",
    fontWeight: "600",
    marginBottom: 12,
  },

  statusContainer: {
    alignItems: "center",
    gap: 8,
  },

  statusBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 8,
  },

  statusText: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    color: "#FFF",
    fontWeight: "600",
  },

  percentagesRow: {
    flexDirection: "row",
    gap: 12,
  },

  percentageBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 10,
  },

  percentageText: {
    fontSize: 13,
    fontFamily: "Inter-Medium",
    color: "#FFF",
    fontWeight: "600",
  },

  /* Features Section */
  featuresSection: {
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    color: "#2C2C2C",
    marginBottom: 16,
    fontWeight: "600",
  },

  featuresGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  featureButton: {
    flex: 1,
    backgroundColor: "rgba(253, 131, 66, 0.1)",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(253, 131, 66, 0.2)",
  },

  featureLabel: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    color: "#FD8342",
    marginTop: 8,
    fontWeight: "600",
  },

  /* Variety Section */
  varietySection: {
    marginBottom: 24,
  },

  varietyGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  varietyItem: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  varietyImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },

  varietyName: {
    fontSize: 12,
    fontFamily: "Inter-Medium",
    color: "#2C2C2C",
    textAlign: "center",
    fontWeight: "600",
  },

  /* Action Buttons */
  actionButtonsContainer: {
    marginBottom: 20,
  },

  actionButtonRow: {
    marginBottom: 12,
  },

  actionGradient: {
    flexDirection: "row",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },

  actionText: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: "#FFF",
    fontWeight: "600",
  },
});
