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
  View
} from "react-native";
import GradientBackground from "../../components/GradientBackground";
import { useData } from "../../context/DataContext";

const VARIETY_OPTIONS = ["Sai Nam Phueng", "Mandarin", "Tangerine"];

export default function DataCollectionScreen() {
  const { collectionItems, addCollectionItem, updateCollectionItem, deleteCollectionItem } = useData();
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [newItem, setNewItem] = useState({
    variety: "",
    circleLine: "",
    weight: "",
  });


  const filteredData = collectionItems.filter((item) =>
    item.variety.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddItem = () => {
    if (!newItem.variety || !newItem.circleLine || !newItem.weight) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    if (editingId) {
      // Update existing item
      updateCollectionItem(editingId, {
        variety: newItem.variety,
        circleLine: newItem.circleLine,
        weight: newItem.weight,
      });
      Alert.alert("Success", "Item updated successfully");
    } else {
      // Add new item
      addCollectionItem({
        variety: newItem.variety,
        circleLine: newItem.circleLine,
        weight: newItem.weight,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        time: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        image: "https://images.unsplash.com/photo-1569410849066-a82e2b7c3df7?w=100&q=80",
      });
      Alert.alert("Success", "Item added to collection");
    }

    setNewItem({ variety: "", circleLine: "", weight: "" });
    setModalVisible(false);
    setEditingId(null);
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setNewItem({
      variety: item.variety,
      circleLine: item.circleLine,
      weight: item.weight,
    });
    setModalVisible(true);
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
          deleteCollectionItem(id);
          Alert.alert("Success", "Item deleted successfully");
        },
        style: "destructive",
      },
    ]);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.itemCard}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemContent}>
        <View style={styles.itemHeader}>
          <View>
            <Text style={styles.itemVariety}>{item.variety}</Text>
            <Text style={styles.itemId}>ID: {item.id}</Text>
          </View>
          <View style={styles.itemActions}>
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

        <View style={styles.itemDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Circle Line:</Text>
            <Text style={styles.detailValue}>{item.circleLine}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Weight:</Text>
            <Text style={styles.detailValue}>{item.weight}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date/Time:</Text>
            <Text style={styles.detailValue}>
              {item.date} at {item.time}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <GradientBackground>
      <View style={styles.container}>
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
            placeholder="Search varieties..."
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Add Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setEditingId(null);
            setNewItem({ variety: "", circleLine: "", weight: "" });
            setModalVisible(true);
          }}
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={["#FFD270", "#FFA160"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.addGradient}
          >
            <MaterialIcons name="add" size={24} color="#FFF" />
            <Text style={styles.addButtonText}>Add New Data</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Data List */}
        {filteredData.length > 0 ? (
          <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <MaterialIcons name="inbox" size={48} color="#CCC" />
            <Text style={styles.emptyText}>No data found</Text>
          </View>
        )}

        {/* Add/Edit Modal */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent
          onRequestClose={() => {
            setModalVisible(false);
            setEditingId(null);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {editingId ? "Edit Data" : "Add New Data"}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                    setEditingId(null);
                  }}
                >
                  <MaterialIcons name="close" size={24} color="#2C2C2C" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalForm}>
                {/* Fruit Image */}
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1569410849066-a82e2b7c3df7?w=200&q=80",
                  }}
                  style={styles.modalImage}
                />

                {/* Form Fields */}
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Variety *</Text>
                  <TouchableOpacity
                    style={styles.dropdownButton}
                    onPress={() => setDropdownVisible(!dropdownVisible)}
                  >
                    <Text style={[styles.dropdownText, !newItem.variety && { color: "#999" }]}>
                      {newItem.variety || "Select variety..."}
                    </Text>
                    <MaterialIcons
                      name={dropdownVisible ? "expand-less" : "expand-more"}
                      size={20}
                      color="#FD8342"
                    />
                  </TouchableOpacity>
                  {dropdownVisible && (
                    <View style={styles.dropdownMenu}>
                      {VARIETY_OPTIONS.map((option) => (
                        <TouchableOpacity
                          key={option}
                          style={styles.dropdownMenuItem}
                          onPress={() => {
                            setNewItem({ ...newItem, variety: option });
                            setDropdownVisible(false);
                          }}
                        >
                          <Text style={styles.dropdownMenuItemText}>{option}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Circle Line *</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="e.g., 32 cm"
                    placeholderTextColor="#999"
                    value={newItem.circleLine}
                    onChangeText={(text) =>
                      setNewItem({ ...newItem, circleLine: text })
                    }
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Weight *</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="e.g., 250g"
                    placeholderTextColor="#999"
                    value={newItem.weight}
                    onChangeText={(text) =>
                      setNewItem({ ...newItem, weight: text })
                    }
                  />
                </View>

                {/* Buttons */}
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => {
                      setModalVisible(false);
                      setEditingId(null);
                    }}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleAddItem}
                    activeOpacity={0.7}
                  >
                    <LinearGradient
                      colors={["#FFD270", "#FFA160"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.submitGradient}
                    >
                      <Text style={styles.submitButtonText}>
                        {editingId ? "Update" : "Add"}
                      </Text>
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

  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 12,
    alignItems: "center",
    marginBottom: 16,
    marginTop: 12,
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

  addButton: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
  },

  addGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    gap: 12,
  },

  addButtonText: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: "#FFF",
    fontWeight: "600",
  },

  listContent: {
    paddingBottom: 20,
    gap: 12,
  },

  itemCard: {
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

  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: "#F0F0F0",
  },

  itemContent: {
    flex: 1,
    justifyContent: "space-between",
  },

  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },

  itemVariety: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: "#2C2C2C",
    fontWeight: "600",
  },

  itemId: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: "#999",
    marginTop: 2,
  },

  itemActions: {
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

  itemDetails: {
    gap: 6,
  },

  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  detailLabel: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: "#999",
  },

  detailValue: {
    fontSize: 12,
    fontFamily: "Inter-Medium",
    color: "#2C2C2C",
    fontWeight: "600",
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

  dropdownButton: {
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dropdownText: {
    fontFamily: "Inter-Regular",
    color: "#2C2C2C",
    fontSize: 14,
  },

  dropdownMenu: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    marginTop: 4,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  dropdownMenuItem: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  dropdownMenuItemText: {
    fontFamily: "Inter-Regular",
    color: "#2C2C2C",
    fontSize: 14,
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