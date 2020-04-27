import React, { Component } from "react";
import { Text, View, StyleSheet, Button, Image } from "react-native";

import * as Google from "expo-google-app-auth";

// const IOS_CLIENT_ID =
//   "your-ios-client-id";
const ANDROID_CLIENT_ID = "300251460069-qthvf0hpa34kprh1nsdfi3mk8egrml2m";

export default class LoginScreen extends Component {
  signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        // iosClientId: IOS_CLIENT_ID,
        androidClientId: ANDROID_CLIENT_ID,
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        console.log("LoginScreen.js.js 21 | ", result.user.givenName);
        this.props.navigation.navigate("Profile", {
          username: result.user.givenName,
        }); //after Google login redirect to Profile
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log("LoginScreen.js.js 30 | Error with login", e);
      return { error: true };
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to Store-Management</Text>
        <Text>Get Started, Login to manage your store</Text>
        <Image
          source={require("../assets/Store-management.jpg")}
          style={styles.welcomeImage}
        />
        <Text style={styles.getStartedText}>
          Add the product list, Store manager add sold products to your caisse
          update your stock, By the end of the day save daily results, and your
          Store manager will automatically make your progress graphic.
        </Text>
        <Button title="Login with Google" onPress={this.signInWithGoogle} />
      </View>
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
  welcomeImage: {
    width: 400,
    height: 200,
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center",
  },
});
