import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";

const { width } = Dimensions.get("window");

function DragCard({ title }: { title: string }) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const gesture = Gesture.Pan()
    .onBegin(() => {
      scale.value = withSpring(1.05);
    })
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd(() => {
      scale.value = withSpring(1);

      if (
        translateX.value < -250 &&
        translateY.value < -80
      ) {
        translateX.value = withSpring(-320);
        translateY.value = withSpring(-260);
      } else if (
        translateX.value > 250 &&
        translateY.value < -80
      ) {
        translateX.value = withSpring(320);
        translateY.value = withSpring(-260);
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <Text style={styles.cardText}>{title}</Text>
      </Animated.View>
    </GestureDetector>
  );
}

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Arraste para uma coluna
      </Text>

      <View style={styles.columns}>
        <View style={styles.zone}>
          <Text style={styles.zoneTitle}>
            NÃO GOSTO
          </Text>
        </View>

        <View style={styles.zone}>
          <Text style={styles.zoneTitle}>
            GOSTO
          </Text>
        </View>
      </View>

      <View style={styles.cardsArea}>
        <DragCard title="Brócolis" />
        <DragCard title="Pizza" />
        <DragCard title="Chuva" />
        <DragCard title="Praia" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 80,
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },

  columns: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: width,
    marginBottom: 40,
  },

  zone: {
    width: width * 0.42,
    height: 220,
    borderWidth: 2,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },

  zoneTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  cardsArea: {
    gap: 15,
  },

  card: {
    width: 180,
    padding: 18,
    backgroundColor: "#87cefa",
    borderRadius: 12,
    alignItems: "center",
  },

  cardText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});