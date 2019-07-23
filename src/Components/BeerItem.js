import React, {Component} from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View } from "react-native";
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from '../Screens/homeScreen';

export default class BeerItem extends Component {

  goToBeer = (id) => {
    this.props.navigation.navigate('Beer', {
      beerId: id,
    });
  } 

  render() {
    const { item } = this.props;
    return (
      <View>
      <TouchableOpacity style={styles.container} onPress = {() => this.goToBeer(item.product_id)}>
        <View style={styles.imageContainter}>
          <Image
            resizeMode="contain"
            style={styles.canvas}
            source={{uri: "https://www.vinbudin.is/Portaldata/1/Resources/vorumyndir/medium/"+item.product_id+"_r.jpg"}}
            />
        </View>
        <View style={styles.textContainter}>
          <Text style = {styles.textName}>
            {item.name}
          </Text>
          <Text style = {styles.text}>
            Magn: {item.volume}ml
          </Text>
          <View style = {styles.secondRow}>
            <Text style = {styles.secondText}>
              Alkóhól: {item.alcohol}%
            </Text>
            <Text style = {styles.secondText}>
              {item.price}kr.
            </Text>
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

