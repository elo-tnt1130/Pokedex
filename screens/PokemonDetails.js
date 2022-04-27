import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, Text, View, Image } from "react-native";
import { getPokemon } from "../API/PokeApi";
import {backgroundColors} from "../utils/backgroundColors"

export default function PokemonDetails(props) {
  const { route, navigation, ...restProps } = props;

  const pokemonData = route.params.datas;
  const imgFrontDefault = pokemonData.sprites.front_default;
  const imgBackDefault = pokemonData.sprites.back_default;
  const moreDetails = pokemonData.species.url;
  const [pokemonDesc, setPokemonDesc] = useState("");
  const typesPokemon = pokemonData.types;
  const [pokeType1, setPokeType1] = useState("");
  const [pokeType2, setPokeType2] = useState("");

  const hp = pokemonData.stats[0].stat.name;
  const hpStat = pokemonData.stats[0].base_stat;
  const defense = pokemonData.stats[1].stat.name;
  const defenseStat = pokemonData.stats[1].base_stat;
  const attack = pokemonData.stats[2].stat.name;
  const attackStat = pokemonData.stats[2].base_stat;
  const speed = pokemonData.stats[5].stat.name;
  const speedStat = pokemonData.stats[5].base_stat;

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

      <View style={styles.containerDimensions}>
        <Text style={styles.title}>Dimensions</Text>
        <Text style={styles.pokeDescription}>
          Height : {pokemonData.height}"
        </Text>
        <Text style={styles.pokeDescription}>
          Weight : {pokemonData.weight} lbs
        </Text>
      </View>

      <View style={styles.containerText}>
        <Text style={styles.title}>About</Text>
        <Text style={styles.pokeDescriptionText}>
          {pokemonDesc.replace(/(\n)/g, " ").replace(/\f/, " ")}{" "}
        </Text>
      </View>

      <View style={styles.containerText}>
        <Text style={styles.title}>Base specs</Text>
        <Text style={styles.pokeDescription}>
          {hp} : {hpStat}
        </Text>
        <Text style={styles.pokeDescription}>
          {defense} : {defenseStat}
        </Text>
        <Text style={styles.pokeDescription}>
          {attack} : {attackStat}
        </Text>
        <Text style={styles.pokeDescription}>
          {speed} : {speedStat}
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
    backgroundColor: "white",
    marginBottom: 10,
    marginHorizontal: 25,
    padding: 10,
    borderRadius: 15,
  },
  pokeDescriptionText: {
    marginTop: 3,
    fontSize: 15
  },
  pokeDescription: {
    fontSize: 15,
  },
  containerTypes: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  type: {
    // backgroundColor: "yellow",
    backgroundColor: "violet",
    margin: 3,
    padding: 3,
    borderRadius: 50,
  },
  containerImage: {
    height: "20%",
    width: "75%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 44,
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
  containerDimensions: {
    backgroundColor: "white",
    marginVertical: 10,
    marginHorizontal: 25,
    padding: 10,
    borderRadius: 15,
  },
  title: {
    fontWeight: 'bold',
    alignSelf: "center"
  }
});
