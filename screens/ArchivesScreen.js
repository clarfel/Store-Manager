import * as firebase from "firebase";
import React, { Component } from "react";
import { StyleSheet, View, Button, ScrollView } from "react-native";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from "react-native-table-component";

import { db } from "../screens/CaisseScreen";

// let recetteRef = db.ref("/recette");
// recetteRef.on("value"),
//   function (snapshot) {
//     snapshot.forEach(function (childSnapshot) {
//       var data = childSnapshot.val();
//       console.log(data);
//     });
//   };
export default class ArchivesScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      HeadTable: ["Day", "Caisse", "Profit"],
      Archives: [],
      loading: false,
      recette: [],
      DataTable: [
        ["1", "2", "3"],
        ["a", "b", "c"],
        ["1", "2", "3"],
        ["a", "b", "c"],
        ["1", "2", "3"],
      ],
    };
  }

  componentDidMount() {
    db.ref("/recette").on("value", (snapshot) => {
      ///////////////////
      ///////////////////
      //DO YOU STUFF HERE
      //EVERY TIME NEW DATA IN ADDED OR REMOVED TO/FROM CAISSE IN FIREBASE
      //THIS METHODE WILL BE CALLED WITH THE NEW DATA
      //SO UPDATE YOUR STATE HERE AND DONT USE COMPONENETWILLUPDATE OR ANY OTHER "...ref("/caisee").on("value", snap => {}) functions
      //BECAUSE YOU JUST DID IT IN THE COMPONENTDIDMOUNT FUNCTION
      ///////////////////
      //try console.log() the snapshot.val() here so you can see your data to better understand the problem
      ///////////////////
      ///////////////////
      console.log(snapshot.val());
      this.setState({ recette: snapshot.val() });
    });
  }

  render() {
    const state = this.state;
    archivesData = Object.keys(state.recette).map((key) => [
      // key,
      state.recette[key].date,
      state.recette[key].total,
      state.recette[key].profit,
    ]);
    console.log("Archives :" + state.Archives);

    return (
      <ScrollView style={styles.container}>
        <View>
          <Button
            title="Homepage"
            onPress={() => this.props.navigation.navigate("Profile")}
          />
          <Table borderStyle={{ borderWidth: 1, borderColor: "#ffa1d2" }}>
            <Row
              data={state.HeadTable}
              style={styles.HeadStyle}
              textStyle={styles.TableText}
            />
            <Rows data={archivesData} textStyle={styles.TableText} />
          </Table>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    paddingTop: 35,
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
});
