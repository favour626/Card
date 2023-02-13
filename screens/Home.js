import React from "react";
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Board } from "../components/Board";
import { GAP_SIZE, useCardSize } from "../style/sizes";
import { WinOverlayTouch } from "../components/WinOverlayTouch";
import { color } from "../style/color";
import { InfoModal } from "../components/InfoModal";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { TYPE } from "../redux/actions";
import Bubble from "../components/bubble";
import Option from "../components/Option";
import { CommonActions } from "@react-navigation/native";

export default function Home({ navigation }) {
  const isDarkMode = useColorScheme() === "dark";
  const isPortrait = true;
  const { boardSize } = useCardSize();

  const [showInfoModal, setShowInfoModal] = React.useState(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const textStyleTop = { fontSize: isPortrait ? 22 : 18 };
  const textStyleBottom = { fontSize: isPortrait ? 24 : 20 };
  const row2Style = {
    marginTop: isPortrait ? 12 : 3,
    marginBottom: isPortrait ? 15 : 2,
  };

  const dispatch = useDispatch();
  const { cards, completed, clicks, type } = useSelector(
    (state) => state.TileReducer
  );

  const resetAction = CommonActions.reset({
    index: 1,
    routes: [
      { name: "Home" },
      {
        name: "Home",
      },
    ],
  });

  const types = () =>
    dispatch({
      type: TYPE,
    });

  const { width } = Dimensions.get("window");
  const randomStart = [];

  for (let i = 0; i < 2; i++) {
    const startingXOffset = Math.round(Math.random() * width);
    randomStart.push(startingXOffset);
  }

  return (
    <SafeAreaView style={[styles.fullHeight, backgroundStyle]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />

      <LinearGradient
        colors={["#00ffff", color.blue]}
        useAngle={true}
        angle={145}
        style={[styles.container]}
      >
        <View
          style={{
            flex: 3,
            width: "100%",
          }}
        >
          <Bubble />
        </View>

        <View style={[styles.row1, { width: boardSize }]}>
          <Text style={[styles.title, textStyleTop]}>Tile Flipper</Text>
          <Pressable
            style={({ pressed }) => [
              styles.infoPressable,
              {
                backgroundColor: pressed ? color.teal : color.tealLight,
              },
            ]}
            onPress={() => {
              setShowInfoModal(true);
            }}
          >
            <Text style={[styles.infoText, textStyleTop]}>i</Text>
          </Pressable>
        </View>
        <View style={[styles.row2, row2Style, { width: boardSize }]}>
          <Text
            style={[
              {
                fontWeight: "bold",
                color: Math.floor(clicks / 2) > 15 ? "red" : "green",
              },
              textStyleBottom,
            ]}
          >
            {Math.floor(clicks / 2)} moves
          </Text>
          {/* <Text style={[styles.textBottom, textStyleBottom]}>
            {game.timer.seconds} s
          </Text> */}
        </View>
        <Board cards={cards} type={type} />

        <View
          style={{
            flex: 3,
            width: "100%",
          }}
        >
          <Bubble />
        </View>
      </LinearGradient>
      <Pressable
        style={({ pressed }) => [
          styles.restartPressable,
          {
            backgroundColor: pressed ? color.teal : "rgba(255, 255, 255, 0.1)",
          },
        ]}
        onPress={() => {
          navigation.dispatch(resetAction);
        }}
      >
        <Text style={[textStyleTop, styles.text]}>restart</Text>
      </Pressable>
      {!completed && <Option />}
      {completed && (
        <WinOverlayTouch
          onClose={() => {
            types();
          }}
        />
      )}

      {showInfoModal && <InfoModal onClose={() => setShowInfoModal(false)} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
  fullHeight: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  spaceTop: {
    flex: 1,
  },
  spaceBottom: {
    flex: 2,
  },
  row1: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: GAP_SIZE,
    zIndex: 1,
    position: "absolute",
    top: "10%",
  },
  row2: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: GAP_SIZE,
    zIndex: 1,
    position: "absolute",
    top: "15%",
  },
  title: {
    textAlignVertical: "center",
    color: "white",
    fontWeight: "700",
    letterSpacing: 5,
  },
  textBottom: {},
  infoPressable: {
    justifyContent: "center",
    alignItems: "center",
    width: 35,
    height: 35,
    borderWidth: 2,
    borderRadius: 25,
    borderColor: color.teal,
  },
  infoText: {
    fontWeight: "600",
  },
  restartPressable: {
    zIndex: 1,
    position: "absolute",
    left: "40%",
    bottom: "10%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: color.blue,
  },
});
