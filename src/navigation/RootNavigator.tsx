import { useState } from "react";
import AuthNavigator from "./AuthNavigator";
import MainTabNavigator from "./MainTabNavigator";

export default function RootNavigator() {
  const [isLogin, setIsLogin] = useState(false);

  // 🔑 ถ้ายังไม่ login → Auth
  if (!isLogin) {
    return <AuthNavigator setHasEnteredApp={setIsLogin} />;
  }

  // 🔑 login แล้ว → Navbar (Tab)
  return <MainTabNavigator />;
}
