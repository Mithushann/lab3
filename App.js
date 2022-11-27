import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList, Pressable } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CONTINENT_QUERY, REPO_QUERY } from "./src/gql/Query";

// Integrating grapgql with react native
import { useQuery } from "@apollo/client";
import { AppRegistry } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const Stack = createNativeStackNavigator();

export default function App() {
  // Initialize Apollo Client
const client = new ApolloClient({
  // uri: 'https://countries.trevorblades.com/graphql',
  uri: 'https://api.github.com/graphql',
  cache: new InMemoryCache()
});

return (

    <ApolloProvider client={client}>
   
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Welcome' }}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
    </NavigationContainer>
    {/* <MyRootComponent /> */}
  </ApolloProvider>

  );
}
//------------------//

AppRegistry.registerComponent('MyApplication', () => App);
//------------------//

const HomeScreen = ({ navigation }) => {

  const { data, loading } = useQuery(REPO_QUERY); //execute query
  alert(JSON.stringify(data));

// const ContinentItem = ({ continent }) => {
//   const { name, code } = continent; //get the name of continent

// 
    const RepoItem = ({ repo }) => {
      const { name, description } = repo; //get the name of repo
  
  return (
    <View style={styles.item}>
    
    <Pressable
    title="Go to blas's profile"
    onPress={() =>
      navigation.navigate('Profile', { name: 'blas' })
    }
    >
    <Text>{name}</Text> 
    {/* //display name of continent */}
  </Pressable>
  </View>
  
  );
}
  if (loading) {
    return <Text>Fetching data...</Text> //while loading return this

  }
    return (
      <FlatList
        data={data.repo}
        renderItem={({ item }) => <RepoItem repo={item.node} />}
        keyExtractor={(item) => item.node.name}

      />
  );
  };

const ProfileScreen = ({ navigation, route }) => {
  return <Text>This is {route.params.name}'s profile</Text>;
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
