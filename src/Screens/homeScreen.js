import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, AsyncStorage} from 'react-native';
import { createStackNavigator } from 'react-navigation';

let test;

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class HomeScreen extends Component {

  state ={ 
    user: "",
  }

  async componentDidMount(){
    const logger = JSON.parse(await AsyncStorage.getItem('user'));
    this.setState({ user: logger.user.username });
    console.log("AASDFASDFASDF " + logger);
    test = logger;

  }
  
  render() {
    console.log(test);
    
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}> {instructions} </Text>
        <Text style={styles.welcome}>This is the HOMEBOY screen</Text>
        <Text style={styles.welcome}>{this.state.user}</Text>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
