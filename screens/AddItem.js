import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Alert,
} from "react-native";
import { addItem } from "../services/ItemService";

export default class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      error: false,
      price: 0,
      stock: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({
      name: e.nativeEvent.text,
    });
  }
  handleInputChange = (price) => {
    if (/^\d+$/.test(price)) {
      this.setState({
        price: price,
      });
    }
  };
  handleStockChange = (stock) => {
    if (/^\d+$/.test(stock)) {
      this.setState({
        stock: stock,
      });
    }
  };
  handleSubmit() {
    addItem(this.state.name, this.state.price, this.state.stock);
    Alert.alert("Item saved successfully");
  }
  render() {
    return (
      <View style={styles.main}>
        <Text style={styles.title}>Create your product list</Text>
        <TextInput
          style={styles.itemInput}
          onChange={this.handleChange}
          placeholder="Product Name"
        />
        <TextInput
          style={styles.itemInput}
          keyboardType="numeric"
          editable={true}
          onChangeText={this.handleInputChange}
          value={this.state.price}
          placeholder="Product Price"
        />
        <TextInput
          style={styles.itemInput}
          keyboardType="numeric"
          editable={true}
          onChangeText={this.handleStockChange}
          value={this.state.stock}
          placeholder="Product Stock"
        />
        <TouchableHighlight
          style={styles.button}
          underlayColor="white"
          onPress={this.handleSubmit}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 30,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#2a8ab7",
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: "center",
  },
  itemInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 8,
    color: "white",
  },
  buttonText: {
    fontSize: 18,
    color: "#111",
    alignSelf: "center",
  },
  button: {
    height: 45,
    flexDirection: "row",
    backgroundColor: "white",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: "stretch",
    justifyContent: "center",
  },
});
