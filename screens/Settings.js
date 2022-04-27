import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Toggle from "../components/Toggle";

export default function Settings() {
  return (
    <>
      <View style={styles.body}>
        <View style={styles.section}>
          <View style={styles.container}>
            <Text style={styles.title}> Orientation</Text>
          </View>

          <View style={styles.container}>
            <View style={styles.containerOrientationElement}>
              <Ionicons
                name="phone-portrait"
                size="45"
                color="#b00a00"
              ></Ionicons>
              <Text> Portrait </Text>
            </View>

            <View style={styles.toggleContainer}>
              <Toggle></Toggle>
            </View>

            <View style={styles.containerOrientationElement}>
              <Ionicons
                name="phone-landscape"
                size="45"
                color="#b00a00"
              ></Ionicons>
              <Text> Paysage </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.container}>
          <Text style={styles.title}>Allow the access to the device gallery</Text>
        </View>

        <View style={styles.container}>
            <View style={styles.containerOrientationElement}>
              <Text> Non </Text>
            </View>

            <View style={styles.toggleContainer}>
              <Toggle></Toggle>
            </View>

            <View style={styles.containerOrientationElement}>
              <Text> Oui </Text>
            </View>
          </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: "white",
    borderRadius: 15,
    margin: 15,
    paddingBottom: 25,
  },
  containerOrientationElement: {
    flex: 0,
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: 45,
  },
  body: {
    flex: 0,
  },
  title: {
    marginTop: 20,
    marginBottom: 25,
    fontWeight: "bold",
    color: "#b00a00",
  },
  container: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
