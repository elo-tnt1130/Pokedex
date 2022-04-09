//* results : pokemon(s) or error
//* search by name and by type

import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, Text, View } from "react-native";
import PokemonCard from "./PokemonCard";
import PokemonCardSearch from "./PokemonCardSearch";
import { getPokemon, getSearchedPokemon } from "../API/PokeApi";

const searchPokemonInput = (props) => {
  const [text, setText] = React.useState(null);
  const [searchedPokemon, setSearchedPokemon] = useState(null);

  const { route, navigation, ...restProps } = props;

  const handleSearchedText = (text) => {
    setText(text);
    if (text) {
      getSearchedPokemon(text).then((res) => {
        setSearchedPokemon(res);
      });
    }
  };

  // useEffect(()=>{console.log('test ' + searchedPokemon);}, [])

  return (
    <>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={handleSearchedText}
          value={text}
          placeholder="Rechercher un pokemon"
        />
      </View>
      <View>
        {searchedPokemon ? (
          <PokemonCardSearch
            data={searchedPokemon}
            // url={}
            navigation={navigation}
          />
        ) : (
          <Text>Aucun résultat</Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 15,
    borderRadius: 25,
  },
});

export default searchPokemonInput;
