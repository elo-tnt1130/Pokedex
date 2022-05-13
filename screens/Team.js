import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import { retrieveData, storeData } from "../utils/localStorage";
import PokemonCard from "../components/PokemonCard";

export default function Team(props) {
  const { route, navigation, ...restProps } = props;

  const [team, setTeam] = useState([]);

  const resetTeam = () => {
    let myTeam = [];

    setTeam(myTeam);

    storeData("Team", JSON.stringify(myTeam));
  };

  useEffect(() => {
    retrieveData("Team").then((res) => {
      if (res) {
        let datas = JSON.parse(res);
        setTeam(datas);
      }
    });
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.contains}>
          {team <= 0 ? (
            <View
              style={{
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Text style={styles.noPokemon}>
                  Vous n'avez aucun pokémon dans votre équipe.
                </Text>
              </View>
              <View
                style={{
                  borderRadius: 15,
                  marginBottom: 3,
                  marginHorizontal: 50,
                  height: 40,
                  alignItems: "center",
                  width: 300,
                }}
              >
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    {
                      backgroundColor: "#b00a00",
                      width: "60%",
                    },
                  ]}
                >
                  <Button
                    color="white"
                    title="Actualiser"
                    accessibilityLabel="To refresh the page"
                    onPress={() =>
                      retrieveData("Team").then((res) => {
                        if (res) {
                          let datas = JSON.parse(res);
                          setTeam(datas);
                        }
                      })
                    }
                  ></Button>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    {
                      backgroundColor: "#ff0000",
                      width: "60%",
                    },
                  ]}
                >
                  <Button
                    color="white"
                    title="Réinitialiser l'équipe"
                    accessibilityLabel="To reset the team"
                    onPress={() => resetTeam()}
                  ></Button>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <FlatList
              scrollEnabled={true}
              data={team}
              numColumns={3}
              renderItem={({ item }) => (
                <PokemonCard
                  name={item.name}
                  url={"https://pokeapi.co/api/v2/pokemon/" + item.id}
                  navigation={navigation}
                />
              )}
              keyExtractor={(item) => item.name}
              style={styles.list}
              ListFooterComponent={() => (
                <View
                  style={{
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      borderRadius: 15,
                      margin: 3,
                      height: 40,
                      flexDirection: "row",
                      width: 300,
                    }}
                  >
                    <TouchableOpacity
                      style={[
                        styles.actionButton,
                        {
                          backgroundColor: "#b00a00",
                          width: "60%",
                        },
                      ]}
                    >
                      <Button
                        color="white"
                        title="Actualiser"
                        accessibilityLabel="To refresh the page"
                        onPress={() =>
                          retrieveData("Team").then((res) => {
                            if (res) {
                              let datas = JSON.parse(res);
                              setTeam(datas);
                            }
                          })
                        }
                      ></Button>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.actionButton,
                        {
                          backgroundColor: "#ff0000",
                          width: "60%",
                        },
                      ]}
                    >
                      <Button
                        color="white"
                        title="Réinitialiser l'équipe"
                        accessibilityLabel="To reset the team"
                        onPress={() => resetTeam()}
                      ></Button>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          )}
        </View>
      </View>

      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contains: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  actionButton: {
    borderRadius: 15,
    margin: 3,
    height: 40,
  },
  noPokemon: {
    margin: 15,
  },
  list: {
    width: 375,
  },
});
