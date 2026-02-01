import { MaterialIcons } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
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
import { analysisRepository } from "../../firebase/repositories/analysisRepository";

type HistoryItem = {
  resultId: string;
  id: string;
  name: string;
  grade: string;
  sweetness: string;
  date: string;
  time: string;
  image?: string;
};

const DEFAULT_IMAGE = "https://via.placeholder.com/150";

/* 🔁 แปลงค่าเกรด */
const gradeText = (grade: HistoryItem["grade"]) => {
  const g = grade?.toLowerCase?.() || "";
  if (g === "good") return "Good";
  if (g === "medium") return "Medium";
  if (g === "bad") return "Bad";
  return grade || "-";
};

export default function HistoryScreen() {
  const [data, setData] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<any>();
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

        const rows: any[] = await analysisRepository.getAllAnalysis(userId);
        const list: HistoryItem[] = rows.map((row) => {
          const analyzedAt = row.analyzed_at
            ? new Date(row.analyzed_at)
            : new Date();
          return {
            resultId: row.result_id,
            id: row.orange_id,
            name: row.variety || "-",
            grade: row.grade || "-",
            sweetness: `${row.brix_value ?? "-"}`,
            date: analyzedAt.toLocaleDateString("th-TH"),
            time: analyzedAt.toLocaleTimeString("th-TH"),
            image: row.image_uri || DEFAULT_IMAGE,
          };
        });

        setData(list);
      } catch (err) {
        console.log("LOAD HISTORY ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    if (isFocused) {
      setLoading(true);
      load();
    }
  }, [isFocused]);

  // 🔎 Filter logic
  const filteredData = data.filter((item) => {
    const keyword = searchText.toLowerCase();

    return (
      item.id.toLowerCase().includes(keyword) ||
      item.name.toLowerCase().includes(keyword) ||
      gradeText(item.grade).toLowerCase().includes(keyword) ||
      item.sweetness.toLowerCase().includes(keyword) ||
      item.date.toLowerCase().includes(keyword) ||
      item.time.toLowerCase().includes(keyword)
    );
  });

  return (
    <GradientBackground>
      <View style={styles.container}>
        <AppHeader />

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

        {loading ? (
          <ActivityIndicator size="large" color="#FD8342" />
        ) : (
          <ScrollView contentContainerStyle={styles.list}>
            {filteredData.map((item) => (
              <HistoryCard key={item.resultId} item={item} />
            ))}
          </ScrollView>
        )}
      </View>
    </GradientBackground>
  );
}

/* 🧩 Card */
function HistoryCard({ item }: { item: HistoryItem }) {
  const handleDelete = async (resultId: string) => {
    try {
      await analysisRepository.deleteAnalysis(resultId);
    } catch (err) {
      console.log("DELETE ERROR:", err);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardActions}>
        {/* ❌ เอา Edit ออก เหลือแค่ Delete */}
        <TouchableOpacity onPress={() => handleDelete(item.resultId)}>
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
          <Text style={styles.cardItem}>🏷️ Grade: {gradeText(item.grade)}</Text>
          <Text style={styles.cardItem}>🍬 Sweetness: {item.sweetness}</Text>
          <Text style={styles.cardItem}>📅 {item.date}</Text>
          <Text style={styles.cardItem}>⏰ {item.time}</Text>
        </View>
      </View>
    </View>
  );
}

/* 🎨 Styles (ไม่แตะ) */
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
  cardActions: {
    position: "absolute",
    top: 10,
    right: 12,
    flexDirection: "row",
    zIndex: 10,
  },
});
