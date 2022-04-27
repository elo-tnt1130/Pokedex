import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, Text, View, Image } from "react-native";
import { getPokemon } from "../API/PokeApi";
// import {backgroundColors} from "../utils/backgroundColors"


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

  const pokemonType = (type, styles) => {
    switch (type) {
      case "grass":
        return styles.grass;
        break;
      case "water":
        return styles.water;
        break;
      case "fire":
        return styles.fire;
        break;
      case "bug":
        return styles.bug;
        break;
      case "normal":
        return styles.normal;
        break;
      case "poison":
        return styles.poison;
        break;
      case "flying":
        return styles.flying;
        break;
      case "steel":
        return styles.steel;
        break;
      case "dark":
        return styles.dark;
        break;
      case "ice":
        return styles.ice;
        break;
      case "dragon":
        return styles.dragon;
        break;
      case "fighting":
        return styles.fighting;
        break;
      case "psychic":
        return styles.psychic;
        break;
      case "fairy":
        return styles.typeFee;
        break;
      case "ground":
        return styles.typeSol;
        break;
      case "rock":
        return styles.rock;
        break;
      case "ghost":
        return styles.ghost;
        break;
      case "electric":
        return styles.electric;
        break;
    }
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
          <Text style={[pokemonType(pokeType1, styles), styles.type]}>{pokeType1.toUpperCase()}</Text>
        </View>
        {pokeType2 ? (
          <View style={styles.type}>
            <Text style={[pokemonType(pokeType2, styles), styles.type]}>{pokeType2.toUpperCase()}</Text>
          </View>
        ) : (
          <></>
        )}
      </View>

      <View style={styles.containerDimensions}>
        <Text style={styles.title}>Dimensions</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ flex: 1 }}>
            <Text style={styles.pokeDescription}>
              Height : {pokemonData.height}"
            </Text>
          </Text>
          <Text style={{ flex: 1 }}>
            <Text style={styles.pokeDescription}>
              Weight : {pokemonData.weight} lbs
            </Text>
          </Text>
        </View>
      </View>

      <View style={styles.containerText}>
        <Text style={styles.title}>About</Text>
        <Text style={styles.pokeDescriptionText}>
          {pokemonDesc.replace(/(\n)/g, " ").replace(/\f/, " ")}{" "}
        </Text>
      </View>

      <View style={styles.containerText}>
        <Text style={styles.title}>Base stats</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ flex: 1 }}>
            <Text style={styles.pokeDescription}>
              {hp} : {hpStat}
            </Text>{" "}
          </Text>
          <Text style={{ flex: 1 }}>
            <Text style={styles.pokeDescription}>
              {defense} : {defenseStat}
            </Text>
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ flex: 1 }}>
            <Text style={styles.pokeDescription}>
              {attack} : {attackStat}
            </Text>
          </Text>
          <Text style={{ flex: 1 }}>
            <Text style={styles.pokeDescription}>
              {speed} : {speedStat}
            </Text>
          </Text>
        </View>
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
  containerSpecs: {
    backgroundColor: "white",
    marginBottom: 10,
    marginHorizontal: 25,
    padding: 10,
    borderRadius: 15,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  pokeDescriptionText: {
    marginTop: 3,
    fontSize: 15,
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
    margin: 3,
    padding: 4,
    borderRadius: 10, 
    overflow: "hidden"
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
    marginBottom: 13,
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
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: "1%",
  },

  grass: { backgroundColor: "#78C850" },
  fire: { backgroundColor: "#F08030" },
  water: { backgroundColor: "#6890F0" },
  bug: { backgroundColor: "#A8B820" },
  normal: { backgroundColor: "#A8A878" },
  poison: { backgroundColor: "#A040A0" },
  electric: { backgroundColor: "#F8D030" },
  typeSol: { backgroundColor: "#E0C068" },
  typeFee: { backgroundColor: "#EE99AC" },
  fighting: { backgroundColor: "#C03028" },
  psychic: { backgroundColor: "#F85888" },
  rock: { backgroundColor: "#B8A038" },
  ghost: { backgroundColor: "#705898" },
  ice: { backgroundColor: "#98D8D8" },
  dragon: { backgroundColor: "#7038F8" },
  steel: { backgroundColor: "#F8F9FA" },
  dark: { backgroundColor: "#705848" },
  flying: { backgroundColor: "#A890F0" },
});
