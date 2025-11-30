// app/(auth)/login.tsx
import React, { useState } from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native";

// BNA UI
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Text as BNAText } from "@/components/ui/text";
import { View as BNAView } from "@/components/ui/view";
import { useColor } from "@/hooks/useColor";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const borderColor = useColor("border");
  const backgroundColor = useColor("background");
  const textColor = useColor("text");

  return (
    <View className="flex-1">
      {/* Top 50% : Blue */}
      <View className="flex-1 bg-blue-600" />

      {/* Bottom 50% : White */}
      <View className="flex-1 bg-white" />

      {/* Floating card */}
      <View className="absolute inset-0 items-center justify-center px-6 max-w-lg mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <View style={{ gap: 16 }}>
              <View>
                <Text style={{ marginBottom: 8, fontWeight: "500" }}>
                  Email
                </Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  style={{
                    borderWidth: 1,
                    borderColor,
                    borderRadius: 999,
                    padding: 12,
                    backgroundColor,
                    color: textColor,
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              <View>
                <Text style={{ marginBottom: 8, fontWeight: "500" }}>
                  Password
                </Text>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  secureTextEntry
                  style={{
                    borderWidth: 1,
                    borderColor,
                    borderRadius: 999,
                    padding: 12,
                    backgroundColor,
                    color: textColor,
                  }}
                />
              </View>
            </View>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Cancel</Button>
            <Button>Sign In</Button>
          </CardFooter>
        </Card>
      </View>
    </View>
  );
}
