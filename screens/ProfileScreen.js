import React, { Component } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Button,
  Image,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class ProfileScreen extends Component {
  render() {
    return (
      <ScrollView style={styles.page}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Welcome, {this.props.navigation.getParam("username")} To store manager
        </Text>
        <View style={styles.container}>
          <Image
            source={require("../assets/Stor.jpg")}
            style={styles.welcomeImage}
          />
          <TouchableOpacity
            style={styles.button}
            title="Store"
            onPress={() => this.props.navigation.navigate("Store")}
          >
            <Text>Store</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Image
            source={require("../assets/Caisses.jpg")}
            style={styles.welcomeImage}
          />
          <TouchableOpacity
            style={styles.button}
            title="Caisse"
            onPress={() => this.props.navigation.navigate("Caisse")}
          >
            <Text>Caisse</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <Image
            source={require("../assets/Archive.jpg")}
            style={styles.welcomeImage}
          />
          <TouchableOpacity
            style={styles.button}
            title="Archives"
            onPress={() => this.props.navigation.navigate("Archives")}
          >
            <Text>Archives</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <Image
            source={require("../assets/Courbe.jpg")}
            style={styles.welcomeImage}
          />
          <TouchableOpacity
            style={styles.button}
            title="Courbes"
            onPress={() => this.props.navigation.navigate("Courbe")}
          >
            <Text>Chart</Text>
          </TouchableOpacity>
        </View>
        <Button
          style={styles.homePage}
          title="Sign out"
          onPress={() => this.props.navigation.navigate("Login")}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  page: {
    // display: flex,
  },
  homePage: {
    marginTop: 40,
  },
  welcomeImage: {
    height: 300,
    width: "100%",
  },
  buttonText: {
    fontSize: 18,
    color: "#111",
    alignSelf: "center",
  },
  button: {
    height: 45,
    width: 400,
    flexDirection: "row",
    backgroundColor: "#DDDDDD",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: "stretch",
    justifyContent: "center",
  },
  caisse: {
    width: 350,
  },
});
