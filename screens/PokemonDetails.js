import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, Text, View, Image } from "react-native";
import PokemonCard from "../components/PokemonCard";
import { getPokemon } from "../API/PokeApi";

export default function PokemonDetails(props) {
  const { route, navigation, ...restProps } = props;

  const pokemonData = route.params.datas;

  useEffect(() => {
    // console.log('yo ' + pokemonData.weight);
  }, []);

  return (
    <>
      <Text style={styles.pokemonName}>{pokemonData.forms[0].name}</Text>

      <View style={styles.containerImage}>
        <Image
          style={styles.image}
          source={{ uri: pokemonData.sprites.front_default }}
        />
        <Image
          style={styles.image}
          source={{ uri: pokemonData.sprites.back_default }}
        />
      </View>
      
      <Text>Type : {pokemonData.types[0].type.name}</Text>
      <Text>Height : {pokemonData.height}</Text>
      <Text>Weight : {pokemonData.weight}</Text>

    </>
  );
}

const styles = StyleSheet.create({
  pokemonName: {
    color: "orange",
    fontSize: 25,
    margin: 20,
    height: 40,
    textAlign: "center",
  },
  containerImage: {
    height: "60%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 15,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowColor: "black",
    marginBottom: 20
  },
  image: {
    flex: 1,
    justifyContent: "center",
    width: "50%",
    height: "50%",
  },
});
