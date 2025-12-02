// components/AuthGuard.tsx

// components/AuthGuard.tsx

import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState, store } from "@/store";
import { clearToken, getToken, decodeToken } from "@/services/auth.util";
import { useRouter, useSegments } from "expo-router";
import { logout as logoutAction } from "@/store/slices/auth.slice";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const segments = useSegments();

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function verify() {
      if (!mounted) return;

      // Wait until router knows where we are
      if (segments.length === 0) return;

      const current = segments.join("/") || "";
      console.log("🚦 Segments:", segments);
      console.log("🧭 Current Route:", current);

      const token = await getToken();
      console.log("🔑 Token from storage:", token);

      // -----------------------------------------
      // 1. NO TOKEN → only protect non-auth routes
      // -----------------------------------------
      if (!token) {
        console.log("🙅‍♂️ No token found");

        const isAuthRoute = current.startsWith("(auth)");

        if (!isAuthRoute) {
          console.log("➡️ Redirect to /login (no token)");
          router.replace("/(auth)/login");
        }

        if (mounted) setChecking(false);
        return;
      }

      // -----------------------------------------
      // 2. TOKEN EXISTS → validate expiry
      // -----------------------------------------
      const decoded: any = decodeToken(token);
      console.log("📜 Decoded Token:", decoded);

      const expired =
        !decoded || !decoded.exp || decoded.exp * 1000 < Date.now();
      console.log("⏰ Expired:", expired);

      if (expired) {
        console.log("❌ Token expired → clearing & redirecting");

        await clearToken();
        store.dispatch(logoutAction());

        const isAuthRoute = current.startsWith("(auth)");
        if (!isAuthRoute) {
          router.replace("/(auth)/login");
        }

        if (mounted) setChecking(false);
        return;
      }

      // -----------------------------------------
      // 3. LOGGED IN user trying to access auth routes
      // -----------------------------------------
      const isAuthRoute = current.startsWith("(auth)");
      if (isAuthRoute) {
        console.log("✅ Logged in but in auth route → redirect /home");
        router.replace("/(tabs)/(home)");
      }

      if (mounted) setChecking(false);
    }

    verify();

    return () => {
      mounted = false;
    };
  }, [segments, isAuthenticated]);

  if (checking) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="small" />
      </View>
    );
  }

  return <>{children}</>;
}
