import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import Navigation from "./navigation/navigation";

// import Orientation from "react-native-orientation";
import * as ScreenOrientation from 'expo-screen-orientation'

export default function App() {

  const [orientationIsLandscape,setOrientation]=useState(true)

  // useEffect(() => {
  //   Orientation.unlockAllOrientations();
  // }, []);
  
  return <Navigation></Navigation>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  baseText: {
    fontSize: 24,
    lineHeight: 50,
    fontWeight: "bold",
    textAlign: "center",
  },
});
