import {
  Canvas,
  Circle,
  Group,
  mix,
  RadialGradient,
  useSharedValueEffect,
  useValue,
  vec,
} from "@shopify/react-native-skia";
import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import {
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useSelector } from "react-redux";

const Bubble = () => {
  const [bubbles, setBubbles] = useState([]);

  const { completed } = useSelector((state) => state.TileReducer);

  useEffect(() => {
    for (let i = 0; i < 5; i++) {
      const startingXOffset = Math.round(Math.random() * width);
      const radius = Math.round(Math.random() * 15);
      randomStart.push({ startingXOffset, radius });
    }
    setBubbles(randomStart);
  }, [completed]);

  const x = useValue(0);
  const progress = useSharedValue(1.5);

  useEffect(() => {
    progress.value = withRepeat(withTiming(-0.6, { duration: 5000 }), -1, true);
  }, [progress]);

  useSharedValueEffect(() => {
    x.current = mix(progress.value, 0, 100);
  }, progress);

  const y = useValue(0);
  const yprogress = useSharedValue(-1);
  useEffect(() => {
    yprogress.value = withRepeat(withTiming(1, { duration: 5000 }), -1, true);
  }, [yprogress]);
  useSharedValueEffect(() => {
    y.current = mix(yprogress.value, 0, 100);
  }, yprogress);

  const z = useValue(0);
  const zprogress = useSharedValue(0.5);
  useEffect(() => {
    zprogress.value = withRepeat(
      withTiming(-0.6, { duration: 5000 }),
      -1,
      true
    );
  }, [zprogress]);

  useSharedValueEffect(() => {
    z.current = mix(zprogress.value, 0, 100);
  }, zprogress);

  const { width } = Dimensions.get("window");
  const randomStart = [];

  const g = [x, y, z, x, y];

  return (
    <Canvas style={{ flex: 3 }}>
      {bubbles.map((item, index) => {
        return (
          <Group key={index}>
            <Circle cx={item.startingXOffset} cy={g[index]} r={15} />
          </Group>
        );
      })}
      <RadialGradient
        c={vec(200, 30)}
        r={200}
        colors={["white", "#00ffff", "white", "#00ffff"]}
      />
    </Canvas>
  );
};

export default Bubble;
