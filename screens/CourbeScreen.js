import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { Dimensions } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { db } from "./CaisseScreen";
export default class CourbeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profit: [],
      date: [],
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
      this.setState({ profit: snapshot.val() });
    });
  }
  render() {
    const option = {
      title: {
        text: "ECharts demo",
      },
      tooltip: {},
      legend: {
        data: ["销量"],
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    };
    const state = this.state;
    profitData = Object.keys(state.profit).map((key) => [
      // key,
      // state.profit[key].date,
      // state.profit[key].total,
      state.profit[key].profit,
    ]);
    labelsData = Object.keys(state.profit).map((key) => [
      // key,
      state.profit[key].date,
      // state.profit[key].total,
      // state.profit[key].profit,
    ]);
    console.log("profit :" + profitData + "date :" + labelsData);
    // let chartProfit = profitData.toArray();
    // console.log(chartProfit);
    let daysData = ["0"].concat(labelsData);
    let myData = [0].concat(profitData);
    console.log("myData :", myData);
    return (
      <View>
        <View>
          <LineChart
            data={{
              labels: daysData,
              datasets: [
                {
                  data: myData,
                },
              ],
            }}
            width={Dimensions.get("window").width} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            // yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              // decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
        <Text>This is your Profit Line Chart</Text>
        <Button
          title="Go Back"
          onPress={() => this.props.navigation.navigate("Profile")}
        />
      </View>
    );
  }
}
