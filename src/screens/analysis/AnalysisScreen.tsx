import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
    Alert,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import GradientBackground from "../../components/GradientBackground";
import { useData } from "../../context/DataContext";

export default function AnalysisScreen() {
  const navigation = useNavigation<any>();
  const { getUnarialyzedItems, selectItem, selectedItem } = useData();
  const [selectedImage, setSelectedImage] = useState<string>(
    "https://images.unsplash.com/photo-1569410849066-a82e2b7c3df7?w=300&q=80"
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const unarialyzedItems = getUnarialyzedItems();

  const handleSelectImage = () => {
    Alert.alert("Select Image", "Choose how to upload", [
      {
        text: "Camera",
        onPress: () => {
          setSelectedImage(
            "https://images.unsplash.com/photo-1569410849066-a82e2b7c3df7?w=300&q=80"
          );
        },
      },
      {
        text: "Gallery",
        onPress: () => {
          setSelectedImage(
            "https://images.unsplash.com/photo-1599599810694-b5ac4dd63edb?w=300&q=80"
          );
        },
      },
      { text: "Cancel", onPress: () => {} },
    ]);
  };

  const handleMeasure = () => {
    if (!selectedItem) {
      Alert.alert("Error", "Please select an item from the collected data");
      return;
    }
    
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      navigation.navigate("Result");
    }, 2000);
  };

  const handleSelectItem = (item: any) => {
    selectItem(item);
    setSelectedImage(item.image);
  };

  const renderCollectedItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={[
        styles.collectedItem,
        selectedItem?.id === item.id && styles.collectedItemSelected
      ]}
      onPress={() => handleSelectItem(item)}
    >
      <View style={styles.collectedItemContent}>
        <Text style={styles.collectedItemVariety}>{item.variety}</Text>
        <View style={styles.collectedItemDetails}>
          <Text style={styles.collectedItemDetail}>
            Circle: {item.circleLine}
          </Text>
          <Text style={styles.collectedItemDetail}>Weight: {item.weight}</Text>
        </View>
      </View>
      <View style={styles.collectedItemCheckbox}>
        {selectedItem?.id === item.id && (
          <MaterialIcons name="check" size={20} color="#FD8342" />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <GradientBackground>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Analysis</Text>
          <TouchableOpacity onPress={handleSelectImage}>
            <MaterialIcons name="add-a-photo" size={24} color="#FD8342" />
          </TouchableOpacity>
        </View>

        {/* Selected Fruit Image */}
        <LinearGradient
          colors={["#FD8342", "#FF9C5B"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.imageCard}
        >
          {/* Heart Icon */}
          <TouchableOpacity style={styles.heartIcon}>
            <MaterialIcons name="favorite-border" size={28} color="#FFF" />
          </TouchableOpacity>

          {/* Image */}
          <Image
            source={{ uri: selectedImage }}
            style={styles.analysisImage}
          />
        </LinearGradient>

        {/* Measure Button */}
        <TouchableOpacity
          style={styles.measureButton}
          onPress={handleMeasure}
          disabled={isAnalyzing}
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={["#FFD270", "#FFA160"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.measureGradient}
          >
            <MaterialIcons
              name={isAnalyzing ? "schedule" : "check-circle"}
              size={24}
              color="#FFF"
            />
            <Text style={styles.measureText}>
              {isAnalyzing ? "Analyzing..." : "Measure"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Collected Data Section */}
        <View style={styles.collectedSection}>
          <Text style={styles.sectionTitle}>Collected Data</Text>

          {unarialyzedItems.length > 0 ? (
            <FlatList
              data={unarialyzedItems}
              renderItem={renderCollectedItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.collectedList}
            />
          ) : (
            <View style={styles.emptyState}>
              <MaterialIcons name="inbox" size={48} color="#CCC" />
              <Text style={styles.emptyText}>No data to analyze</Text>
            </View>
          )}
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

  imageCard: {
    borderRadius: 20,
    height: 280,
    marginBottom: 20,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  heartIcon: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 10,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },

  analysisImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  measureButton: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 24,
  },

  measureGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    gap: 12,
  },

  measureText: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: "#FFF",
    fontWeight: "600",
  },

  collectedSection: {
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    color: "#2C2C2C",
    marginBottom: 16,
    fontWeight: "600",
  },

  collectedList: {
    gap: 12,
  },

  collectedItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  collectedItemSelected: {
    backgroundColor: "rgba(253, 131, 66, 0.1)",
    borderWidth: 2,
    borderColor: "#FD8342",
  },

  collectedItemContent: {
    flex: 1,
  },

  collectedItemVariety: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: "#2C2C2C",
    fontWeight: "600",
    marginBottom: 6,
  },

  collectedItemDetails: {
    gap: 4,
  },

  collectedItemDetail: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: "#999",
  },

  collectedItemCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },

  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
  },

  emptyText: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#999",
    marginTop: 12,
  },
});
