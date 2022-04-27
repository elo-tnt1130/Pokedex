import React, { useState } from "react";
import { View, Switch, StyleSheet, Text } from "react-native";

export default function Toggle() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <>
      
          <Switch
            trackColor={{ false: "#707070", true: "#FF9900" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
          />
          
    </>
  );
}

const styles = StyleSheet.create({
  
});
