import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import ItemComponent from "../components/ItemComponent";

import { db } from "../screens/CaisseScreen";

let itemsRef = firebase.database().ref("/items");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#B6A6BB",
  },
});

export default class ListItem extends Component {
  state = {
    items: [],
  };

  componentDidMount() {
    itemsRef.on("value", (snapshot) => {
      let data = snapshot.val();
      let items = Object.values(data);
      this.setState({ items });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.items.length > 0 ? (
          <ItemComponent items={this.state.items} />
        ) : (
          <Text>No Products</Text>
        )}
      </View>
    );
  }
}
