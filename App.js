//import react
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { REPO_QUERY } from "./src/gql/Query";
import DetailsScreen from "./Components/Details"
// Integrating grapgql with react native
import { useQuery } from "@apollo/client";
import { AppRegistry } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, gql } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { SelectList } from 'react-native-dropdown-select-list'


const Stack = createNativeStackNavigator();

export default function App() {
  const token = process.env.GITHUB_TOKEN;
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Token ${token}` : null,
      },
    };
  });
  const client = new ApolloClient({
    link: authLink.concat(
      new HttpLink({ uri: "https://api.github.com/graphql" })
    ),
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'GitHub repos' }}
          />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

AppRegistry.registerComponent('MyApplication', () => App);

const HomeScreen = ({ navigation }) => {

  const [selected, setSelected] = React.useState("0");
  const languages = [
    // C, C++, C#, Go, Java, JavaScript, PHP, Python, Ruby, Scala, and TypeScript.
    { key: "0", value: "all languages" },
    { key: '1', value: 'C' },
    { key: '2', value: 'C++' },
    { key: '3', value: 'C#' },
    { key: '4', value: 'Go' },
    { key: '5', value: 'Java' },
    { key: '6', value: 'JavaScript' },
    { key: '7', value: 'PHP' },
    { key: '8', value: 'Python' },
    { key: '9', value: 'Ruby' },
    { key: '10', value: 'Scala' },
    { key: '11', value: 'TypeScript' },
  ];

  // Cut the name of the repo to 20 characters
  const cutName = (name) => {
    if (name.length > 20) {
      return name.substring(0, 20) + "...";
    } else {
      return name;
    }
  };

   // Cut the description of the repo to 20 characters
   const cutDescription = (des) => {
    if (des && des.length > 250) {
      return des.substring(0, 250) + "...";
    } else {
      return des;
    }
  };

 //when slected language changes, update the query

  const REPO_QUERY = gql `
  {
    search(query: "stars:>10000 language:${languages[selected].value}", type: REPOSITORY, first: 100) {
      edges {
        node {
          ... on Repository {
            id
            name
            description
            url
            stars: stargazerCount
            createdAt
            primaryLanguage {
              color
              id
              name
            }
            forkCount
            nameWithOwner
            repositoryTopics(first: 10) {
              edges {
                node {
                  topic {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
    `;

  const { data, loading } = useQuery(REPO_QUERY); //execute query
  const RepoItem = ({ repo }) => {
    const { name, description, url, stars, forkCount, primaryLanguage, createdAt, nameWithOwner, repositoryTopics } = repo; //get the name of repo

    return (
      <Pressable
        title={name}
        onPress={(repo) =>
          navigation.navigate('Details', {
            name: name, url: url, stars: stars, forkCount: forkCount,
            primaryLanguage: primaryLanguage, createdAt: createdAt, description: description, nameWithOwner: nameWithOwner,
            repositoryTopics: repositoryTopics
          })
        }
      >
        <View style={{ backgroundColor: "white", padding: 10, margin: 5, borderRadius: 5, elevation: 5 }}>
          <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }} >🗃️ {cutName(name)}</Text>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}> {stars.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} &#x2605;</Text>
          </View>
          <Text>{cutDescription(description)}</Text>

          <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontSize: 12, color: "grey" }}>🍴 {forkCount}</Text>
            {primaryLanguage ? (
              <Text style={{ fontSize: 10, color: "grey" }}>🌐 {primaryLanguage.name}</Text>
            ) : (
              <Text style={{ fontSize: 10, color: "grey" }}>🌐 No language</Text>
            )}
            <Text style={{ fontSize: 10, color: "grey" }}>📅 {createdAt.toString().split("T")[0]}</Text>
          </View>
        </View>
      </Pressable>
    );

  }
  if (loading) {
    return <Text>Fetching data...</Text> //while loading return this
  }
  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "space-between" }}>
        <SelectList
             style={{ width: 200, height: 50, backgroundColor: "white", borderRadius: 5, elevation: 5, padding: 10 }}
             setSelected={setSelected} 
             data={languages}  
             search={false} 
             boxStyles={{borderRadius:0}} //override default styles
            //  defaultOption={{ key:'0', value:'all languages' }} 
        />
       
        <FlatList style={{ width: 400, padding: 25 }}
          data={data.search.edges}
          renderItem={({ item }) => <RepoItem repo={item.node} />}
          keyExtractor={(item) => item.node.name+item.node.id}
        />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  element: {
    marginBottom: 10,
    border: 3,
    borderColor: "blue",
    borderRadius: 5
  }
});