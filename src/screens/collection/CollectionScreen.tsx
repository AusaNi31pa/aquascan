import { MaterialIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import AppHeader from "../../components/AppHeader";
import GradientBackground from "../../components/GradientBackground";
import { auth } from "../../firebase/firebase";
import { orangeRepository } from "../../firebase/repositories/orangeRepository";

type CollectionItem = {
  orangeId: string;
  id: string;
  name: string;
  size: string;
  weight: string;
  date: string;
  time: string;
  image?: string;
};

const DEFAULT_IMAGE = "https://via.placeholder.com/150";

export default function CollectionScreen({ navigation }: any) {
  const [data, setData] = useState<CollectionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  // 🔍 Search state
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const userId = auth.currentUser?.uid;
        if (!userId) {
          setData([]);
          setLoading(false);
          return;
        }

        const rows: any[] = await orangeRepository.getOrangesByUser(userId);

        const list: CollectionItem[] = rows.map((row) => {
          const createdAt = row.created_at
            ? new Date(row.created_at)
            : new Date();
          return {
            orangeId: row.orange_id,
            id: row.orange_id,
            name: row.variety || "-",
            size: String(row.circle_line ?? "-") || "-",
            weight: String(row.weight ?? "-") || "-",
            date: createdAt.toLocaleDateString("th-TH"),
            time: createdAt.toLocaleTimeString("th-TH"),
            image: row.image_uri || DEFAULT_IMAGE,
          };
        });

        setData(list);
      } catch (err) {
        console.log("LOAD COLLECTION ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    if (isFocused) {
      setLoading(true);
      load();
    }
  }, [isFocused]);

  // 🔎 Filtered data (ไม่กระทบ data เดิม)
  const filteredData = data.filter((item) => {
    const keyword = searchText.toLowerCase();

    return (
      item.id.toLowerCase().includes(keyword) ||
      item.name.toLowerCase().includes(keyword) ||
      item.size.toLowerCase().includes(keyword) ||
      item.weight.toLowerCase().includes(keyword) ||
      item.date.toLowerCase().includes(keyword) ||
      item.time.toLowerCase().includes(keyword)
    );
  });

  return (
    <GradientBackground>
      <View style={styles.container}>
        {/* 🔝 Header */}
        <AppHeader />

        {/* 🔍 Search */}
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Search"
            placeholderTextColor="#FD8342"
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
          />
          <MaterialIcons name="search" size={22} color="#FD8342" />
        </View>

        {/* 📦 List */}
        {loading ? (
          <ActivityIndicator size="large" color="#FD8342" />
        ) : (
          <ScrollView contentContainerStyle={styles.list}>
            {filteredData.map((item) => (
              <DataCard
                key={item.orangeId}
                item={item}
                navigation={navigation}
              />
            ))}
          </ScrollView>
        )}

        {/* ➕ Floating Button */}
        <TouchableOpacity
          style={styles.fab}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("AddCollection")}
        >
          <MaterialIcons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </GradientBackground>
  );
}

/* 🧩 Card Component */
function DataCard({
  item,
  navigation,
}: {
  item: CollectionItem;
  navigation: any;
}) {
  const handleDelete = async () => {
    try {
      await orangeRepository.deleteOrange(item.orangeId);
    } catch (err) {
      console.log("DELETE ERROR:", err);
    }
  };

  return (
    <View style={styles.card}>
      {/* 🔝 Icons มุมขวาบน */}
      <View style={styles.cardActions}>
        <TouchableOpacity
          onPress={() => navigation.navigate("EditCollection", { item })}
        >
          <MaterialIcons name="edit" size={18} color="#FD8342" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleDelete} style={{ marginLeft: 10 }}>
          <MaterialIcons name="delete" size={18} color="red" />
        </TouchableOpacity>
      </View>

      <Image
        source={{ uri: item.image || DEFAULT_IMAGE }}
        style={styles.cardImage}
      />

      <View style={styles.cardInfo}>
        <View style={styles.cardGrid}>
          <Text style={styles.cardItem}>🍊 {item.id}</Text>
          <Text style={styles.cardItem}>🍊 {item.name}</Text>
          <Text style={styles.cardItem}>⭕ {item.size}</Text>
          <Text style={styles.cardItem}>⚖️ {item.weight}</Text>
          <Text style={styles.cardItem}>📅 {item.date}</Text>
          <Text style={styles.cardItem}>⏰ {item.time}</Text>
        </View>
      </View>
    </View>
  );
}

/* 🎨 Styles */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  searchBox: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
    height: 48,
  },
  searchInput: {
    flex: 1,
    color: "#FD8342",
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 14,
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "center",
    position: "relative",
  },
  cardActions: {
    position: "absolute",
    top: 10,
    right: 12,
    flexDirection: "row",
    zIndex: 10,
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  cardItem: {
    width: "50%",
    fontSize: 12,
    marginBottom: 4,
  },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 70,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FF8A3D",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
