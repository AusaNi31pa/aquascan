import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AnalysisScreen from "../screens/analysis/AnalysisScreen";
import CollectionScreen from "../screens/collection/CollectionScreen";
import HistoryScreen from "../screens/history/HistoryScreen";
import HomeScreen from "../screens/home/HomeScreen";
import ResultScreen from "../screens/result/ResultScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack Navigator for Analysis with Result screen
function AnalysisStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AnalysisMain" component={AnalysisScreen} />
      <Stack.Screen name="ResultDetail" component={ResultScreen} />
    </Stack.Navigator>
  );
}

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        // 🟠 Navbar style
        tabBarStyle: {
          height: 60,
          backgroundColor: "#FD8342",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: "absolute",
        },

        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#FFE6D5",

        tabBarLabelStyle: {
          fontSize: 10,
          marginBottom: 6,
        },
      }}
    >
      {/* 🏠 Home */}
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={24} color={color} />
          ),
          tabBarLabel: "Home",
        }}
      />

      {/* 📦 Data Collection */}
      <Tab.Screen
        name="Collection"
        component={CollectionScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="inventory" size={24} color={color} />
          ),
          tabBarLabel: "Collection",
        }}
      />

      {/* 📈 Analysis */}
      <Tab.Screen
        name="Analysis"
        component={AnalysisStack}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="analytics" size={24} color={color} />
          ),
          tabBarLabel: "Analysis",
        }}
      />

      {/* 🍊 Result */}
      <Tab.Screen
        name="Result"
        component={ResultScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="assessment" size={24} color={color} />
          ),
          tabBarLabel: "Result",
        }}
      />

      {/* ⏱️ History */}
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="history" size={24} color={color} />
          ),
          tabBarLabel: "History",
        }}
      />
    </Tab.Navigator>
  );
}