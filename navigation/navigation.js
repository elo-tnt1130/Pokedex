import Home from "../screens/Home";
import Team from "../screens/Team";
import Search from "../screens/Search";
import Settings from "../screens/Settings";
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
      <Stack.Screen name="PokemonDetailsScreen" component={PokemonDetails} />
    </Stack.Navigator>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SearchScreen" component={Search} />
      <Stack.Screen name="PokemonDetailsScreen" component={PokemonDetails} />
    </Stack.Navigator>
  );
}

function TeamStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TeamScreen" component={Team} />
      <Stack.Screen name="PokemonDetailsScreen" component={PokemonDetails} />
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
            // title: "Home",
            headerTintColor: "white",
            headerStyle: { backgroundColor: "#b00a00" },
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchStack}
          options={{
            // title: "Search",
            headerTintColor: "white",
            headerStyle: { backgroundColor: "#b00a00" },
          }}
        />
        <Tab.Screen
          name="Team"
          component={TeamStack}
          options={{
            // title: "Team",
            headerTintColor: "white",
            headerStyle: { backgroundColor: "#b00a00" },
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            // title: "Réglages",
            headerTintColor: "white",
            headerStyle: { backgroundColor: "red" },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
