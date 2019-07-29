import React, {Component} from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View } from "react-native";
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from '../Screens/homeScreen';

export default class Filtermenu extends Component {



  render() {
    const { item } = this.props;
    return (
      <View>
        
      </View>

    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      flexDirection: 'row',
      width: "100%",
      height: 90,
      alignItems: "center",
      backgroundColor: '#ffffff',
      marginBottom: 5,
      paddingTop: 10,
      paddingLeft:5,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: "rgba(255,255,255,0.7)"
    },
    searchbar: {
        width: '100%',
    },
    text: {
      color: 'black',
      textAlign: "left",
      height: 20
    },
    textName: {
      color: 'black',
      textAlign: "left",
      height: 40
    },
    secondText: {
      paddingHorizontal: 20,
      color: 'black',
      height: 20
    },
    secondRow: {
      marginTop: -10,
      textAlign: "center",
      flex: 1, 
      flexDirection: 'row-reverse',
    },
    imageContainter: {
      flex: 1,
      width: 70, 
      height: "100%",
      alignItems: 'stretch',
    },
    textContainter: {
      paddingLeft: 20,
      flex: 6,
      height: "100%",
      alignItems: 'stretch',
    },
    canvas: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      height:"100%",
    },
  });
  
  