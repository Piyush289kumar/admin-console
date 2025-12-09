// app/(tabs)/(profile)/index.tsx

import { SearchBarSuggestions } from "@/components/search/searchbar";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useColor } from "@/hooks/useColor";
import { Code, Eye, Palette, Settings } from "lucide-react-native";

export default function ProfileScreen() {
  const card = useColor("card");
  const border = useColor("border");
  const primary = useColor("primary");

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        flex: 1,
        gap: 18,
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: "center",
      }}
    >
      <View style={{width:"100%"}}>
        <SearchBarSuggestions />
      </View>
      <View
        style={{
          width: "100%",
          marginBottom: 40,
        }}
      >
        <Card>
          <CardContent>
            <Text>
              A simple card with just content. Perfect for displaying basic
              information or messages.
            </Text>
          </CardContent>
        </Card>
      </View>
    </ScrollView>
  );
}
