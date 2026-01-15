import { useAuth } from "../hooks/useAuth";
import AuthNavigator from "./AuthNavigator";
import MainTabNavigator from "./MainTabNavigator";

export default function RootNavigator() {
  const { isLogin, isLoading } = useAuth();

  // 🔐 ถ้าข้อมูลยังกำลังโหลด
  if (isLoading) {
    return null; // หรือ return loading screen
  }

  // 🔑 ถ้ายังไม่ login → Auth
  if (!isLogin) {
    return <AuthNavigator />;
  }

  // 🔑 login แล้ว → Navbar (Tab)
  return <MainTabNavigator />;
}