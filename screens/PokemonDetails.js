import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native";
import { getPokemon } from "../API/PokeApi";
import { retrieveData, storeData } from "../utils/localStorage";

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

  const [team, setTeam] = useState([]);

  const hp = pokemonData.stats[0].stat.name;
  const hpStat = pokemonData.stats[0].base_stat;
  const defense = pokemonData.stats[2].stat.name;
  const defenseStat = pokemonData.stats[2].base_stat;
  const attack = pokemonData.stats[1].stat.name;
  const attackStat = pokemonData.stats[1].base_stat;
  const speed = pokemonData.stats[5].stat.name;
  const speedStat = pokemonData.stats[5].base_stat;

  const pokemonTypes = (url) => {
    getPokemon(url).then(() => {
      let count = 0;

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
        return styles.fairy;
        break;
      case "ground":
        return styles.ground;
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

  const addTitle = "Add to my team";
  const removeTitle = "Remove from my team";
  const addColor = "#00bf00";
  const removeColor = "red";

  const addToMyTeam = () => {
    let myTeam = [pokemonData, ...team];

    if (myTeam.length <= 6) {
      setTeam(myTeam); // set le tableau avec la team créée au dessus

      storeData("Team", JSON.stringify(myTeam)); // enregistre la data dans Team et la stringify (localStorage)
    }
  };

  const removeFromMyTeam = () => {
    let myTeam = team.filter((pokemon) => {
      //on passe un pokemon en entrée
      return pokemon.name != pokemonData.name; // on retourne les noms différents de celui du pokemon actuel
    });

    setTeam(myTeam); // on set myTeam sans le pokemon actuel

    storeData("Team", JSON.stringify(myTeam)); // on enregistre le changement dans Team (localStorage)
  };

  useEffect(() => {
    retrieveData("Team").then((res) => {
      // on récupère la donnée stockée en localStorage
      if (res) {
        // si la réponse contient des pokemons
        let datas = JSON.parse(res); // on set datas avec un parse de res (qui contient JSON.stringify(myTeam))
        setTeam(datas); // on set team avec datas
      }
    });

    pokemonTypes();
    pokemonDescription(moreDetails);
  }, []);

  return (
    <>
      <Text style={styles.pokemonName}>{pokemonData.name.toUpperCase()}</Text>
      <View style={styles.containerImage}>
        <Image style={styles.image} source={{ uri: imgFrontDefault }} />
        <Image style={styles.image} source={{ uri: imgBackDefault }} />
      </View>

      <View style={styles.containerTypes}>
        <View style={styles.type}>
          <Text style={[pokemonType(pokeType1, styles), styles.type]}>
            {pokeType1.toUpperCase()}
          </Text>
        </View>
        {pokeType2 ? (
          <View style={styles.type}>
            <Text style={[pokemonType(pokeType2, styles), styles.type]}>
              {pokeType2.toUpperCase()}
            </Text>
          </View>
        ) : (
          <></>
        )}
      </View>

      <ScrollView>
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
                {hp.charAt(0).toUpperCase() + hp.charAt(1).toUpperCase()} :{" "}
                {hpStat}
              </Text>{" "}
            </Text>
            <Text style={{ flex: 1 }}>
              <Text style={styles.pokeDescription}>
                {defense.charAt(0).toUpperCase() + defense.slice(1)} :{" "}
                {defenseStat}
              </Text>
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ flex: 1 }}>
              <Text style={styles.pokeDescription}>
                {attack.charAt(0).toUpperCase() + attack.slice(1)} :{" "}
                {attackStat}
              </Text>
            </Text>
            <Text style={{ flex: 1 }}>
              <Text style={styles.pokeDescription}>
                {speed.charAt(0).toUpperCase() + speed.slice(1)} : {speedStat}
              </Text>
            </Text>
          </View>
        </View>
        <View style={styles.containerButtons}>
          {team.find((pokemon) => pokemon.name == pokemonData.name) ==
          undefined ? (
            team.length >= 6 ? (
              <Text style={styles.warning}>
                You already have 6 Pokemons in your team. {"\n"} Please unset a
                Pokemon from your team to add a new one !
              </Text>
            ) : (
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  {
                    backgroundColor: addColor,
                    width: "45%",
                  },
                ]}
              >
                <Button
                  onPress={() => addToMyTeam()} // tj passer par une fonction anonyme quand on trigger un event
                  title={addTitle}
                  color="white"
                  accessibilityLabel="To add a pokemon to your team"
                />
              </TouchableOpacity>
            )
          ) : (
            <TouchableOpacity
              style={[
                styles.actionButton,
                {
                  backgroundColor: removeColor,
                  width: "60%",
                },
              ]}
            >
              <Button
                onPress={() => removeFromMyTeam()}
                title={removeTitle}
                color="white"
                accessibilityLabel="To remove a pokemon from your team"
              />
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  warning: {
    color: "red",
    fontWeight: "bold",
    marginHorizontal: 5,
    textAlign: "center",
  },
  actionButton: {
    borderRadius: 15,
  },
  pokemonName: {
    color: "#b00a00",
    fontSize: 25,
    margin: 10,
    marginTop: 20,
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
  containerButtons: {
    alignItems: "center",
    justifyContent: "center",
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
    margin: 1,
    padding: 7,
    borderRadius: 15,
    overflow: "hidden",
  },
  containerImage: {
    height: "20%",
    width: "75%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 46,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowColor: "black",
    marginBottom: 10,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    width: "30%",
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 25,
    margin: 2,
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
    marginBottom: 1,
  },

  grass: { backgroundColor: "#00BF00" },
  fire: { backgroundColor: "#FF9900" },
  water: { backgroundColor: "#1595F9" },
  bug: { backgroundColor: "#E7599F" },
  normal: { backgroundColor: "#A8A878" },
  poison: { backgroundColor: "#BF66E5" },
  electric: { backgroundColor: "#F8D030" },
  ground: { backgroundColor: "#E0C068" },
  fairy: { backgroundColor: "#FF8DE8" },
  fighting: { backgroundColor: "#C03028" },
  psychic: { backgroundColor: "#F85888" },
  rock: { backgroundColor: "#878373" },
  ghost: { backgroundColor: "#705898" },
  ice: { backgroundColor: "#98D8D8" },
  dragon: { backgroundColor: "#FFBF80" },
  steel: { backgroundColor: "#F8F9FA" },
  dark: { backgroundColor: "#808080" },
  flying: { backgroundColor: "#42FDDC" },
});
