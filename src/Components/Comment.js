import React, {Component} from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View } from "react-native";

export default class Comment extends Component {

  render() {
    const { name, comment, date } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.imageContainter}>
          <Image
            resizeMode="contain"
            style={styles.canvas}
            source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtFgaLOi0Xi0nipOtsBo3ikZMdx7VW7hsJsISbhUUUaFNKjDAW"}}
            />
        </View>
        <View style={styles.textContainter}>
          <Text style = {styles.textName}>
            {name}
          </Text>
          <Text style = {styles.text}>
            {comment}
          </Text>
          <View style = {styles.secondRow}>
            <Text style = {styles.textName}>
              {date}
            </Text>
          </View>
        </View>
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
  textContainter: {

  },
  imageContainter: {

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

