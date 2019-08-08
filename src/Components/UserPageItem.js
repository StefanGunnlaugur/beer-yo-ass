import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, Animated, LayoutAnimation, Image, View } from "react-native";
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from '../Screens/homeScreen';
import ProgressiveImage from './ProgressiveImage';



export default class UserPageItem extends Component {

  render() {
    const { text, image } = this.props;


    return (
      <View>
        <TouchableOpacity
          style={styles.container}
        >
          <View style={styles.contentContainter} >
            <View style={styles.textContainter}>
              <Text style={styles.text}>
                {text}
              </Text>
            </View>
            <View style={styles.imageContainter}>
              <Image
                source={image}
                style={{ width: '100%', height: '100%' }}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: 90,
    backgroundColor: '#ff3366',
    marginBottom: 5,
    paddingTop: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.7)",
  },
  contentContainter: {
    flex: 1,
    flexDirection: "row",
  },
  textContainter: {
    flex: 5,
    height: '100%',
  },
  text: {
    paddingTop: 5,
    paddingLeft: 15,
    color: 'black',
    textAlign: "left",
    fontSize: 24,
  },
  imageContainter: {
    flex: 1,
    height: "100%",
    alignItems: 'stretch',
  },

});

