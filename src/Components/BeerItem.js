import React, {Component} from 'react';
import { StyleSheet, Text, TouchableOpacity, Animated, LayoutAnimation, Image, View } from "react-native";
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from '../Screens/homeScreen';
import ProgressiveImage from './ProgressiveImage';

const EXPANDED_HEIGHT = 80;


export default class BeerItem extends Component {

  constructor() {
    super();
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    });

    this.state = {
      expanded: false,
    };
  }

  expandButtonPressed = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded });
    this.flip_Animation();
  };

  flip_Animation = () => {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        tension: 10,
        friction: 8,
      }).start();
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        tension: 10,
        friction: 8,
      }).start();
    }
  };

  goToBeer = (id) => {
    this.props.navigation.navigate('Beer', {
      beerId: id,
    });
  } 

  render() {
    const { item } = this.props;

    this.SetInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    });
    const Rotate_Y_AnimatedStyle = {
      transform: [{ rotateZ: this.SetInterpolate }],
    };

    return (
      <View>
      <TouchableOpacity 
        style={styles.container} 
        onPress = {() => this.goToBeer(item.product_id)}>
          <View style={styles.imageContainter}>
          <ProgressiveImage
            source={{uri: "https://www.vinbudin.is/Portaldata/1/Resources/vorumyndir/medium/"+item.product_id+"_r.jpg"}} 
            thumbnail={require("../images/roundlogo.png")}
            style={{width:'100%',height:'100%'}} key={"pimg"}
            />
        </View>
        <View style={styles.textContainter}>
          <View style={styles.firstRow}>
            <View style = {styles.topText}>
              <Text style = {styles.textName}>
                {item.name}
              </Text>
              <Text style = {styles.text}>
                Magn: {item.volume}ml
              </Text>
            </View>
            <View style={styles.expandButtonContainter}>
              <TouchableOpacity 
                style={styles.expandButton}
                onPress={this.expandButtonPressed}
              >
                <Animated.Image
                resizeMode="contain"
                style={[Rotate_Y_AnimatedStyle, styles.buttonImage]}
                source={{uri: "https://cdn1.iconfinder.com/data/icons/basic-shaded-ui/256/down-512.png"}}
                transition="rotate"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style = {styles.secondRow}>
            <Text style = {styles.secondText}>
              Styrkur: {item.alcohol}%
            </Text>
            <Text style = {styles.secondText}>
              {item.price}kr.
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View>
        <View style={{ height: this.state.expanded ? EXPANDED_HEIGHT : 0, overflow: 'hidden' }}>
          <View style={styles.expandedContainer}>
            <Text style = {styles.secondText}>
              This is a description
            </Text>
            <Text style = {styles.secondText}>
              Demo 1
            </Text>
            <Text style = {styles.secondText}>
              Demo 2
            </Text>
            <Text style = {styles.secondText}>
              Demo 3
            </Text>
          </View>
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
    borderColor: "rgba(255,255,255,0.7)",
  },
  text: {
    color: 'black',
    textAlign: "left",
    height: 20
  },
  topText: {
    flex: 5,
  },
  expandButtonContainter: {
    flex: 1,
  },
  expandButton: {

  },
  firstRow: {
    flexDirection: 'row',
  },
  buttonImage: {
    height:"100%",
    width:"100%",
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
    flexDirection: 'column',
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

