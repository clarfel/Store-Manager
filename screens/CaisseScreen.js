import firebase from "firebase";
import React from "react";
import {
  ActivityIndicator,
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Alert,
} from "react-native";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from "react-native-table-component";

const firebaseConfig = {
  apiKey: "AIzaSyCMKfDkhDRNe34y752ZjSSfPqt0Lw_S8mg",
  authDomain: "store-manager-6259b.firebaseapp.com",
  databaseURL: "https://store-manager-6259b.firebaseio.com",
  projectId: "store-manager-6259b",
  storageBucket: "store-manager-6259b.appspot.com",
  messagingSenderId: "314628294939",
  appId: "1:314628294939:web:82d3dc7028e09438d72bbe",
  measurementId: "G-7Z8Z54E04Q",
};

app = firebase.initializeApp(firebaseConfig);
export const db = app.database();

export default class CaisseScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      HeadTable: ["ID", "Product", "Price"],
      DataTable: [],
      FooterTable: ["Total", 0],
      // total: [],
      profit: 0,
      date: "",
      loading: false,
      list: [],
    };
  }
  componentDidMount() {
    db.ref("/caisse").on("value", (snapshot) => {
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
      this.setState({ list: snapshot.val() });
    });
    // db.ref("/total").on("value", (snap) => {
    //   console.log(snap.val());
    //   this.setState({ total: snap.val() });
    // });
  }
  clearList() {
    db.ref("/caisse")
      .remove()
      .then((res) => {
        console.log("res", res);
        Alert.alert("Save your daily income before the new day");
      });
  }
  render() {
    state = this.state;
    console.log("list :", state.list);
    console.log("total :", state.total);
    arrData = Object.keys(state.list).map((key) => [
      key,
      state.list[key].name,
      state.list[key].price,
    ]);
    total = Object.keys(state.list).map((key) => state.list[key].price);
    var result = 0;
    for (var i = 0; i < total.length; i++) {
      result += parseInt(total[i]);
    }
    console.log("total: ", result);
    // let totalData = [];
    // totalData = Object.keys(state.total).map((key) => [state.total[key].total]);
    // console.log("totalData :", totalData);
    // const reducer = (accumulator, currentValue) => accumulator + currentValue;
    // let display = totalData.reduce(reducer);
    // console.log("display :", display);
    // totalData = Object.keys(state.list).map((key) => [
    //   key,
    //   state.list[key].name,
    //   state.list[key].price,
    // ]);
    // console.log("arrData :", arrData);
    return (
      <ScrollView style={styles.container}>
        <Button
          style={styles.homePage}
          title="Homepage"
          onPress={() => this.props.navigation.navigate("Profile")}
        />
        <ScrollView style={styles.container}>
          {state.list.length > 0 ? (
            <Table borderStyle={{ borderWidth: 1, borderColor: "#ffa1d2" }}>
              <Row
                data={["Caisse"]}
                style={styles.HeadStyle}
                textStyle={styles.TableText}
              />
              <Rows data={["Empty"]} textStyle={styles.TableText} />
              <Row
                data={["Total", 0]}
                style={styles.HeadStyle}
                textStyle={styles.TableText}
              />
            </Table>
          ) : (
            <Table borderStyle={{ borderWidth: 1, borderColor: "#ffa1d2" }}>
              <Row
                data={state.HeadTable}
                style={styles.HeadStyle}
                textStyle={styles.TableText}
              />
              <Rows data={arrData} textStyle={styles.TableText} />
              <Row
                data={["Total", result]}
                style={styles.HeadStyle}
                textStyle={styles.TableText}
              />
            </Table>
          )}

          <Button
            style={styles.clear}
            title="Clear List"
            onPress={this.clearList}
          />
        </ScrollView>
        <ScrollView>
          <Text style={styles.title}>Store your total and profit</Text>
          <Button onPress={this._saveValue} title="Save" />
          <TextInput
            onChangeText={(date) => {
              this.setState({ date });
            }}
            onSubmitEditing={this._saveValue}
            value={this.state.date}
            style={styles.textInput}
            placeholder="Date"
          />

          <TextInput
            onChangeText={(profit) => {
              this.setState({ profit });
            }}
            onSubmitEditing={this._saveValue}
            value={this.state.profit}
            style={styles.textInput}
            placeholder="Profit"
          />

          <TextInput
            onChangeText={(total) => {
              this.setState({ total });
            }}
            onSubmitEditing={this._saveValue}
            value={this.state.total}
            style={styles.textInput}
            placeholder="Total"
          />
        </ScrollView>
      </ScrollView>
    );
  }

  _saveValue = async () => {
    try {
      this.setState({ loading: true });
      await firebase.database().ref("/recette").push({
        total: this.state.total,
        profit: this.state.profit,
        date: this.state.date,
      });
    } catch (e) {
      // Error! oh no
    } finally {
      this.setState({ loading: false });
    }
  };
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
  homePage: {
    marginTop: 40,
  },
  clear: {
    height: 45,
    // width: 400,
    flexDirection: "row",
    backgroundColor: "red",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 50,
    alignSelf: "stretch",
    justifyContent: "center",
  },
});
