import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, Text, View, Image } from "react-native";
import PokemonCard from "../components/PokemonCard";
import { getPokemon } from "../API/PokeApi";


export default function Home(props) {
  const {route, navigation, ...restProps } = props

  const image = {
    uri: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Forig07.deviantart.net%2F1e35%2Ff%2F2014%2F072%2Fa%2Ff%2Fumbreon_running__gif_animation__by_krazeeladee-d7a2fba.gif&f=1&nofb=1",
  };

  const [listPokemon, setListPokemon] = useState([]);
  const [nextPage, setNextPage] = useState("https://pokeapi.co/api/v2/pokemon");

  useEffect(() => {
    loadPokemon(nextPage);
  }, []); // [] pour éviter une requête à l'infini

  const loadPokemon = (url) => {
    getPokemon(url).then((datas) => {
      setListPokemon([...listPokemon, ...datas.results]);
      setNextPage(datas.next);
    });
  };

  // const [textParent, setTextParent] = useState("Default");

  useEffect(() => {
    console.log("Composant chargé en page d'accueil");
  }, []);

  return (
    <>
      <Image source={image} resizeMode="contain" style={styles.image}></Image>
      <View style={styles.container}>
        <Text style={styles.baseText}>POKEDEX</Text>

        <FlatList
          data={listPokemon}
          numColumns={3}
          renderItem={({ item }) => (
            <PokemonCard name={item.name} url={item.url} navigation={navigation}/>
          )}
          keyExtractor={(item) => item.name}
          style={styles.list}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            loadPokemon(nextPage);
            // console.log("end");
          }}
        />
      </View>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: "center",
    // justifyContent: 'center',
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
