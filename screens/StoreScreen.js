import * as firebase from "firebase";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Modal,
  TouchableHighlight,
  Button,
  Image,
  Alert,
} from "react-native";
import Data from "../Data";
import PropTypes from "prop-types";
import { db } from "./CaisseScreen";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
// import { Button } from "@material-ui/core";
import AddItem from "./AddItem";
// import ListItem from "./ListItem";

let itemsRef = db.ref("/items");
// const addToCart = () => {
//   db.ref("/caisse").push({
//     name: this.state.items.name,
//     price: this.state.items.pprice,
//   });
// };
export default class StoreScreen extends Component {
  constructor(props) {
    super(props);
    this.initData = Data;
    this.state = {
      HeadTable: ["Day"],
      FooterTable: ["Total", 0],
      data: this.initData,
      sold: 0,
      isModalVisible: false,
      inputText: "",
      editedItem: 0,
      price: 0,
      dataTable: [],
      loading: false,
      Products: [],
      items: [],
      name: "",
      selectedIndex: 0,
      stock: 0,
    };
  }
  componentDidMount() {
    itemsRef.on("value", (snapshot) => {
      let data = snapshot.val();
      items = Object.values(data);
      this.setState({ items });
    });
  }

  getItemsToCart = () => {
    db.ref("/caisse").on("value", (snapshot) => {
      let data = snapshot.val();
      let dataTable = Object.values(data);
      console.log("dataTable :", dataTable);
      this.setState({ dataTable });
    });
  };

  addItemsToCart = (item) => {
    db.ref("/caisse").push({
      name: item.name,
      price: item.price,
    });
    itemsRef.child("items").update({
      stock: (item.stock -= 1),
    });
    Alert.alert("Product sold");
  };
  totalCalcul = (item) => {
    this.state.FooterTable[1] = parseInt(this.state.FooterTable[1]);
    item.price = parseInt(item.price);
    this.setState({
      FooterTable: [
        this.state.FooterTable[0],
        (this.state.FooterTable[1] += item.price),
      ],
    });
    db.ref("/total").push({
      total: item.price,
    });
  };
  handleInputChange = (price) => {
    if (/^\d+$/.test(price)) {
      this.setState({
        price: price,
      });
    }
  };

  deleteItemsOfCart = (index) => {
    if (key === index) {
      itemsRef.remove().then((res) => {
        console.log("res", res);
        Alert.alert("Product deleted");
      });
    }
  };
  render() {
    console.log(this.state.dataTable);
    console.log(this.state.FooterTable[1]);

    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.contentContainer}>
        <AddItem />
        <Button
          style={styles.button}
          title="Homepage"
          onPress={() => this.props.navigation.navigate("Profile")}
        />
        <View>
          <View style={styles.itemsList}>
            {this.state.items.map((item, index) => {
              return (
                <View key={index}>
                  <Text style={styles.itemtext}>
                    Product: {item.name} Price: {item.price}$ Stock:
                    {item.stock}/u
                  </Text>
                  <Button
                    title="Sell"
                    onPress={() => {
                      this.addItemsToCart(item);
                      this.totalCalcul(item);
                      this._saveValue;
                      this.getItemsToCart;
                    }}
                  />
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    );
  }
  _saveValue = async () => {
    try {
      this.setState({ loading: true });
      await firebase
        .database()
        .ref("/total")
        .push({ total: this.state.FooterTable });
    } catch (e) {
      // Error! oh no
      console.log("e :", e);
    } finally {
      this.setState({ loading: false });
    }
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 18,
    // paddingTop: 35,
    backgroundColor: "#ffffff",
  },
  HeadStyle: {
    height: 50,
    alignContent: "center",
    backgroundColor: "#ffe0f0",
  },
  TableText: {
    margin: 10,
  },
  header: {
    height: 60,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  contentContainer: {
    backgroundColor: "white",
  },
  item: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    alignItems: "center",
    width: "100%",
  },
  marginLeft: {
    marginLeft: 5,
  },
  menu: {
    width: 20,
    height: 2,
    backgroundColor: "#111",
    margin: 2,
    borderRadius: 3,
  },
  text: {
    marginVertical: 30,
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },

  textInput: {
    width: "90%",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 30,
    borderColor: "gray",
    borderBottomWidth: 2,
    fontSize: 16,
  },
  modalView: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  touchableHighlight: {
    backgroundColor: "white",
    marginVertical: 10,
    alignSelf: "stretch",
    alignItems: "center",
  },
  button: {
    height: 45,
    // width: 400,
    flexDirection: "row",
    backgroundColor: "#DDDDDD",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 50,
    alignSelf: "stretch",
    justifyContent: "center",
  },
  homePage: {
    marginTop: 40,
  },
  itemsList: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  itemtext: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});
