import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { getPokemon } from "../API/PokeApi";
import { useState, useEffect } from "react";

export default function PokemonCardSearch(props) {
  const { url, name, navigation, route, data, ...restProps } = props;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("PokemonDetailsScreen", {
          datas: data,
        })
      }
    >
      <View style={styles.containerInfo}>
        <Text style={styles.pokemonName}>{data.name.toUpperCase()}</Text>
      </View>
      <View style={styles.containerImage}>
        <Image
          style={styles.image}
          source={{ uri: data.sprites.other["official-artwork"].front_default }}
          // source={{ uri: data.sprites.front_default }}
          resizeMode={"center"}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    width: 200,
    alignItems: "center",
  },
  containerImage: {
    height: "25%",
    width: "80%",
    display: "flex",
    backgroundColor: "white",
    borderRadius: 15,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowColor: "black",

    borderColor: "blue",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  pokemonName: {
    color: "#B00A00",
    height: 20,
    textAlign: "center",
  },
});
