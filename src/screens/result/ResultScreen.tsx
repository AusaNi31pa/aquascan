import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import GradientBackground from "../../components/GradientBackground";
import { useData } from "../../context/DataContext";

export default function ResultScreen() {
  const navigation = useNavigation<any>();
  const { selectedItem, saveAnalysisResult } = useData();
  const [percentage1] = useState(90);
  const [percentage2] = useState(80);

  const resultData = selectedItem || {
    variety: "Unknown",
    image: "https://images.unsplash.com/photo-1569410849066-a82e2b7c3df7?w=300&q=80",
  };

  const statusOptions = ["Excellent", "Good", "Fair", "Poor"];
  const [status, setStatus] = useState("Good");

  const handleSave = () => {
    if (!selectedItem) {
      navigation.goBack();
      return;
    }

    saveAnalysisResult(
      selectedItem.id,
      status,
      percentage1,
      percentage2
    );

    navigation.navigate("History");
  };

  return (
    <GradientBackground>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Result</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="close" size={24} color="#FD8342" />
          </TouchableOpacity>
        </View>

        {/* Result Card */}
        <LinearGradient
          colors={["#FD8342", "#FF9C5B"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.resultCard}
        >
          {/* Fruit Image */}
          <Image
            source={{ uri: resultData.image }}
            style={styles.resultImage}
          />

          {/* Fruit Name */}
          <Text style={styles.fruitName}>{resultData.variety}</Text>

          {/* Status Selection */}
          <View style={styles.statusSelection}>
            <Text style={styles.statusLabel}>Status</Text>
            <View style={styles.statusOptions}>
              {statusOptions.map((opt) => (
                <TouchableOpacity
                  key={opt}
                  onPress={() => setStatus(opt)}
                  style={[
                    styles.statusOption,
                    status === opt && styles.statusOptionActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusOptionText,
                      status === opt && styles.statusOptionTextActive,
                    ]}
                  >
                    {opt}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Percentages */}
          <View style={styles.percentageSection}>
            <View style={styles.percentageInput}>
              <Text style={styles.percentageLabel}>Quality %</Text>
              <View style={styles.percentageRow}>
                <Text style={styles.percentageValue}>{percentage1}%</Text>
                <View style={styles.percentageSlider} />
              </View>
            </View>

            <View style={styles.percentageInput}>
              <Text style={styles.percentageLabel}>Ripeness %</Text>
              <View style={styles.percentageRow}>
                <Text style={styles.percentageValue}>{percentage2}%</Text>
                <View style={styles.percentageSlider} />
              </View>
            </View>
          </View>

          {/* Date and Time */}
          <View style={styles.dateTimeContainer}>
            <MaterialIcons name="calendar-today" size={16} color="#FFF" />
            <Text style={styles.dateTimeText}>
              {new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </Text>
            <Text style={styles.dateTimeSeparator}>•</Text>
            <MaterialIcons name="access-time" size={16} color="#FFF" />
            <Text style={styles.dateTimeText}>
              {new Date().toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>
        </LinearGradient>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleSave}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={["#FFD270", "#FFA160"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.actionGradient}
            >
              <Text style={styles.actionButtonText}>Save to History</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
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

  headerTitle: {
    fontSize: 28,
    fontFamily: "Cormorant-SemiBold",
    color: "#FD8342",
    fontWeight: "700",
  },

  resultCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    alignItems: "center",
  },

  resultImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 3,
    borderColor: "#FFF",
  },

  fruitName: {
    fontSize: 28,
    fontFamily: "Cormorant-SemiBold",
    color: "#FFF",
    fontWeight: "600",
    marginBottom: 20,
  },

  statusSelection: {
    width: "100%",
    marginBottom: 20,
  },

  statusLabel: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 8,
    fontWeight: "600",
  },

  statusOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  statusOption: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },

  statusOptionActive: {
    backgroundColor: "#FFF",
  },

  statusOptionText: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: "#FFF",
  },

  statusOptionTextActive: {
    color: "#FD8342",
    fontWeight: "600",
  },

  percentageSection: {
    width: "100%",
    marginBottom: 16,
    gap: 12,
  },

  percentageInput: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  percentageLabel: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 6,
  },

  percentageRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  percentageValue: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    color: "#FFF",
    fontWeight: "600",
  },

  percentageSlider: {
    flex: 1,
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 2,
  },

  dateTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 16,
  },

  dateTimeText: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: "rgba(255, 255, 255, 0.9)",
    marginHorizontal: 4,
  },

  dateTimeSeparator: {
    color: "rgba(255, 255, 255, 0.6)",
    marginHorizontal: 4,
  },

  actionButtons: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },

  actionButton: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
  },

  actionGradient: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
  },

  actionButtonText: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: "#FFF",
    fontWeight: "600",
  },

  cancelButton: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    backgroundColor: "#FFF",
  },

  cancelButtonText: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: "#2C2C2C",
    fontWeight: "600",
  },
});
