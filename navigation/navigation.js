import Home from "../screens/Home";
import PokemonDetails from "../screens/PokemonDetails";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function PokemonStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={Home} />
      {/* <Stack.Screen name="PokemonDetailsScreen" component={PokemonDetails} /> */}
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={PokemonStack}
          options={{
            title: "Pokedex",
            headerTintColor: "white",
            headerStyle: { backgroundColor: "red" },
          }}
        />
        {/* <Tab.Screen
          name="PokemonDetails"
          component={PokemonStack}
          options={{
            headerTintColor: "white",
            headerStyle: { backgroundColor: "red" },
          }}
        /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
