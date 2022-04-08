import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, Text, View, Image } from "react-native";
import PokemonCard from "../components/PokemonCard";
import { getPokemon } from "../API/PokeApi";

export default function PokemonDetails(props) {
  //* Add a .forEach() on the types to show all types and not only the first
  const { route, navigation, ...restProps } = props;

  const pokemonData = route.params.datas;
  const imgArtWork =
    pokemonData.sprites.other["official-artwork"].front_default;
  const imgFrontDefault = pokemonData.sprites.front_default;
  const imgBackDefault = pokemonData.sprites.back_default;
  const moreDetails = pokemonData.species.url;
  const [pokemonDesc, setPokemonDesc] = useState("");
  const typesPokemon = pokemonData.types;
  const [pokeType1, setPokeType1] = useState("");
  const [pokeType2, setPokeType2] = useState("");

  const pokemonTypes = (url) => {
    getPokemon(url).then(() => {
      let count = 0;
      let precedentType = "";
      console.log(typesPokemon);

      typesPokemon.forEach((type) => {
        if (count < 2) {
          if (count === 0) {
            setPokeType1(type.type.name);
          } else {
            setPokeType2(type.type.name);
          }
          count++;
        }
      });
    });
  };

  const pokemonDescription = (url) => {
    getPokemon(url).then((data) => {
      const desc = data.flavor_text_entries.find(
        (desc) => desc.language.name === "en"
      );
      setPokemonDesc(desc.flavor_text);
    });
  };

  useEffect(() => {
    pokemonTypes();
    pokemonDescription(moreDetails);
  }, []);

  return (
    <>
      {/* <Text style={styles.pokemonName}>{pokemonData.forms[0].name.toUpperCase()}</Text> */}
      {/* <Text style={styles.pokemonName}>{pokemonData.species.name.toUpperCase()}</Text> */}
      <Text style={styles.pokemonName}>{pokemonData.name.toUpperCase()}</Text>

      <View style={styles.containerImage}>
        <Image style={styles.image} source={{ uri: imgFrontDefault }} />
        <Image style={styles.image} source={{ uri: imgBackDefault }} />
      </View>

      <View style={styles.containerTypes}>
        <View style={styles.type}>
          <Text style={styles.type}>{pokeType1.toUpperCase()}</Text>
        </View>
        {pokeType2 ? (
          <View style={styles.type}>
            <Text style={styles.type}>{pokeType2.toUpperCase()}</Text>
          </View>
        ) : (
          <></>
        )}
      </View>

      <View style={styles.containerText}>
        <Text style={styles.pokeDescription}>
          Height : {pokemonData.height}"
        </Text>
        <Text style={styles.pokeDescription}>
          Weight : {pokemonData.weight} lbs
        </Text>
        <Text style={styles.pokeDescriptionText}>
          Description : {pokemonDesc.replace(/\n/, " ").replace(/\f/, " ")}{" "}
          {/* regex ! */}
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  pokemonName: {
    color: "#b00a00",
    fontSize: 25,
    margin: 20,
    height: 40,
    textAlign: "center",
  },
  containerText: {
    margin: 20,
  },
  pokeDescriptionText: {
    marginTop: 3,
    fontSize: 16,
  },
  pokeDescription: {
    fontSize: 16,
  },
  containerTypes: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  type: {
    backgroundColor: "yellow",
    margin: 3,
    padding: 6,
    borderRadius: 50,
  },
  containerImage: {
    height: "25%",
    width: "85%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 28,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowColor: "black",
    marginBottom: 20,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    width: "30%",
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 25,
    margin: 3,
  },
});
