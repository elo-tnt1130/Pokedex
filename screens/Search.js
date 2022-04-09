import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, Text, View, Image } from "react-native";
import SearchPokemon from '../components/SearchBox'

export default function Search(props) {

  const {route, navigation, ...restProps } = props

    return (
    <>
      <View style={styles.container}>

        <SearchPokemon></SearchPokemon>

      </View>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    alignItems: "center",
  }
});