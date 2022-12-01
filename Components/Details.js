import { StyleSheet, Text, View, Button, FlatList, Pressable } from 'react-native';

const DetailsScreen = ({ navigation, route }) => {
    return (
        <View style={styles.container}>
            <View >
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontWeight: "bold", fontSize: 15, marginTop: 10, marginLeft: 10 }}>Name:</Text>
                    <Text style={{ fontWeight: "normal", fontSize: 15, marginTop: 10, marginLeft: 5 }}> {route.params.name}</Text>
                </View>

                <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontWeight: "bold", fontSize: 15, marginTop: 10, marginLeft: 10 }}>Stars:</Text>
                    <Text style={{ fontWeight: "normal", fontSize: 15, marginTop: 10, marginLeft: 5 }}> {route.params.stars}</Text>
                </View>

                <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontWeight: "bold", fontSize: 15, marginTop: 10, marginLeft: 10 }}>Forks:</Text>
                    <Text style={{ fontWeight: "normal", fontSize: 15, marginTop: 10, marginLeft: 5 }}> {route.params.forkCount}</Text>
                </View>


                <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontWeight: "bold", fontSize: 15, marginTop: 10, marginLeft: 10 }}>Owner:</Text>
                    <Text style={{ fontWeight: "normal", fontSize: 15, marginTop: 10, marginLeft: 5 }}> {route.params.nameWithOwner.split("/")[0]}</Text>
                </View>


                {route.params.primaryLanguage ? (
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontWeight: "bold", fontSize: 15, marginTop: 10, marginLeft: 10 }}>Language:</Text>
                        <Text style={{ fontWeight: "normal", fontSize: 15, marginTop: 10, marginLeft: 5 }}> {route.params.primaryLanguage.name}</Text>
                    </View>
                ) : (
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontWeight: "bold", fontSize: 15, marginTop: 10, marginLeft: 10 }}>Language:</Text>
                        <Text style={{ fontWeight: "normal", fontSize: 15, marginTop: 10, marginLeft: 5 }}> No language detected</Text>
                    </View>
                )}



                <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontWeight: "bold", fontSize: 15, marginTop: 10, marginLeft: 10 }}>Created at:</Text>
                    <Text style={{ fontWeight: "normal", fontSize: 15, marginTop: 10, marginLeft: 5 }}> {route.params.createdAt}</Text>
                </View>

                <View style={{ flexDirection: "column" }}>
                    <Text style={{ fontWeight: "bold", fontSize: 15, marginTop: 10, marginLeft: 10 }}>Description:</Text>
                    <Text style={{ fontWeight: "normal", fontSize: 15, marginTop: 0, marginLeft: 10 }}> {route.params.description}</Text>
                </View>

                <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontWeight: "bold", fontSize: 15, marginTop: 10, marginLeft: 10 }}>URL:</Text>
                    <Text style={{ fontWeight: "normal", fontSize: 15, marginTop: 10, marginLeft: 5 }}> {route.params.url}</Text>
                </View>

                <View style={{ flexDirection: "column" }}>
                    <Text style={{ fontWeight: "bold", fontSize: 15, marginTop: 10, marginLeft: 10 }}>Topics:</Text>
                    <Text style={{ fontWeight: "normal", fontSize: 15, marginTop: 0, marginLeft: 10 }}> {route.params.repositoryTopics.edges.map((topic) => topic.node.topic.name).join(", ")}</Text>
                </View>



            </View>
            <Button style={{ marginTop: 10, width: 200, height: 50, backgroundColor: "red" }} title="GO BACK" onPress={() => navigation.goBack()}
            />
        </View>
    );
}
export default DetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 25,
    },

    element: {
        marginBottom: 10,
        border: 3,
        borderColor: "blue",
        borderRadius: 5
    }
});