import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
    Alert,
    FlatList,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import GradientBackground from "../../components/GradientBackground";
import { useData } from "../../context/DataContext";

export default function HistoryScreen() {
  const { historyItems } = useData();
  const [search, setSearch] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const filteredData = historyItems.filter((item) =>
    item.variety.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (item: any) => {
    setEditData({ ...item });
    setEditModalVisible(true);
  };

  const handleSaveEdit = () => {
    if (!editData) return;
    // For now, just close the modal - in a real app you'd update to context
    setEditModalVisible(false);
    setEditData(null);
    Alert.alert("Success", "Item updated successfully");
  };

  const handleDelete = (id: string) => {
    Alert.alert("Delete Item", "Are you sure you want to delete this item?", [
      {
        text: "Cancel",
        onPress: () => {},
      },
      {
        text: "Delete",
        onPress: () => {
          Alert.alert("Success", "Item deleted successfully");
        },
        style: "destructive",
      },
    ]);
  };

  const renderHistoryItem = ({ item }: { item: any }) => (
    <View style={styles.historyCard}>
      <Image source={{ uri: item.image }} style={styles.historyImage} />

      <View style={styles.historyContent}>
        <View style={styles.historyHeader}>
          <View>
            <Text style={styles.historyFruitName}>{item.variety}</Text>
            <Text style={styles.historyDate}>
              {item.analysisDate} at {item.analysisTime}
            </Text>
          </View>
          <View style={styles.historyActions}>
            <TouchableOpacity
              onPress={() => handleEdit(item)}
              style={styles.actionIcon}
            >
              <MaterialIcons name="edit" size={20} color="#FD8342" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDelete(item.id)}
              style={styles.actionIcon}
            >
              <MaterialIcons name="delete" size={20} color="#FF6B6B" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.historyDetails}>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
          <View style={styles.percentagesRow}>
            <Text style={styles.percentageText}>{item.percentage1}%</Text>
            <Text style={styles.percentageText}>{item.percentage2}%</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <GradientBackground>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>History</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <MaterialIcons
            name="search"
            size={20}
            color="#999"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search history..."
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* History List */}
        {filteredData.length > 0 ? (
          <FlatList
            data={filteredData}
            renderItem={renderHistoryItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <MaterialIcons name="history" size={48} color="#CCC" />
            <Text style={styles.emptyText}>No history found</Text>
          </View>
        )}
        {/* Edit Modal */}
        <Modal
          visible={editModalVisible}
          animationType="slide"
          transparent
          onRequestClose={() => {
            setEditModalVisible(false);
            setEditData(null);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Edit History</Text>
                <TouchableOpacity
                  onPress={() => {
                    setEditModalVisible(false);
                    setEditData(null);
                  }}
                >
                  <MaterialIcons name="close" size={24} color="#2C2C2C" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalForm}>
                {/* Fruit Image */}
                {editData && (
                  <Image
                    source={{ uri: editData.image }}
                    style={styles.modalImage}
                  />
                )}

                {/* Fruit Name */}
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Fruit Variety</Text>
                  <TextInput
                    style={styles.formInput}
                    value={editData?.variety}
                    onChangeText={(text) => {
                      if (editData) setEditData({ ...editData, variety: text });
                    }}
                  />
                </View>

                {/* Status */}
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Status</Text>
                  <TextInput
                    style={styles.formInput}
                    value={editData?.status}
                    onChangeText={(text) => {
                      if (editData) setEditData({ ...editData, status: text });
                    }}
                  />
                </View>

                {/* Percentages */}
                <View style={styles.formRow}>
                  <View style={[styles.formGroup, { flex: 1 }]}>
                    <Text style={styles.formLabel}>Quality %</Text>
                    <TextInput
                      style={styles.formInput}
                      value={editData?.percentage1.toString()}
                      onChangeText={(text) => {
                        if (editData)
                          setEditData({
                            ...editData,
                            percentage1: parseInt(text) || 0,
                          });
                      }}
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={[styles.formGroup, { flex: 1, marginLeft: 12 }]}>
                    <Text style={styles.formLabel}>Ripeness %</Text>
                    <TextInput
                      style={styles.formInput}
                      value={editData?.percentage2.toString()}
                      onChangeText={(text) => {
                        if (editData)
                          setEditData({
                            ...editData,
                            percentage2: parseInt(text) || 0,
                          });
                      }}
                      keyboardType="numeric"
                    />
                  </View>
                </View>

                {/* Buttons */}
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => {
                      setEditModalVisible(false);
                      setEditData(null);
                    }}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSaveEdit}
                    activeOpacity={0.7}
                  >
                    <LinearGradient
                      colors={["#FFD270", "#FFA160"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.submitGradient}
                    >
                      <Text style={styles.submitButtonText}>Save</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
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
    marginBottom: 20,
    marginTop: 10,
  },

  headerTitle: {
    fontSize: 28,
    fontFamily: "Cormorant-SemiBold",
    color: "#FD8342",
    fontWeight: "700",
  },

  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 12,
    alignItems: "center",
    marginBottom: 16,
    height: 48,
    borderWidth: 1,
    borderColor: "rgba(253, 131, 66, 0.2)",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  searchIcon: {
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    fontFamily: "Inter-Regular",
    color: "#2C2C2C",
    fontSize: 14,
  },

  listContent: {
    paddingBottom: 20,
    gap: 12,
  },

  historyCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    gap: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  historyImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: "#F0F0F0",
  },

  historyContent: {
    flex: 1,
    justifyContent: "space-between",
  },

  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },

  historyFruitName: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: "#2C2C2C",
    fontWeight: "600",
  },

  historyDate: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: "#999",
    marginTop: 2,
  },

  historyActions: {
    flexDirection: "row",
    gap: 8,
  },

  actionIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(253, 131, 66, 0.1)",
  },

  historyDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  statusBadge: {
    backgroundColor: "rgba(253, 131, 66, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(253, 131, 66, 0.2)",
  },

  statusText: {
    fontSize: 12,
    fontFamily: "Inter-Medium",
    color: "#FD8342",
    fontWeight: "600",
  },

  percentagesRow: {
    flexDirection: "row",
    gap: 8,
  },

  percentageText: {
    fontSize: 12,
    fontFamily: "Inter-Medium",
    color: "#2C2C2C",
    fontWeight: "600",
    backgroundColor: "rgba(253, 131, 66, 0.1)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 40,
  },

  emptyText: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#999",
    marginTop: 12,
  },

  /* Modal Styles */
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
  },

  modalContent: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "85%",
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  modalTitle: {
    fontSize: 20,
    fontFamily: "Inter-SemiBold",
    color: "#2C2C2C",
    fontWeight: "600",
  },

  modalImage: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    marginBottom: 20,
    backgroundColor: "#F0F0F0",
  },

  modalForm: {
    paddingBottom: 20,
  },

  formGroup: {
    marginBottom: 16,
  },

  formLabel: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    color: "#2C2C2C",
    marginBottom: 8,
    fontWeight: "600",
  },

  formInput: {
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontFamily: "Inter-Regular",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    color: "#2C2C2C",
    fontSize: 14,
  },

  formRow: {
    flexDirection: "row",
  },

  modalButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
    marginBottom: 20,
  },

  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    alignItems: "center",
  },

  cancelButtonText: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: "#2C2C2C",
    fontWeight: "600",
  },

  submitButton: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
  },

  submitGradient: {
    paddingVertical: 12,
    alignItems: "center",
  },

  submitButtonText: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: "#FFF",
    fontWeight: "600",
  },
});
