import React from "react";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import RootNavigation from "./navigation";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootNavigation />
    </GestureHandlerRootView>
  );
}
