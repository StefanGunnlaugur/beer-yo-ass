import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, AsyncStorage} from 'react-native';
import LoginScreen from './loginScreen';
import UserPageScreen from './userPageScreen';


let isLoggedIn;
export default class UserScreen extends Component {

  state ={ 
    user: undefined,
  }

  async componentDidMount(){
    isLoggedIn = JSON.parse(await AsyncStorage.getItem('user'));
    
    this.setState({ user: logger.user.username });
  }

  render() {
    isLoggedIn = JSON.parse(await AsyncStorage.getItem('user'));
    this.setState({ user: logger.user.username });
    console.log("SDFASDFASDF" + this.state.user)
    return (
      <View style={styles.container}>    
        {!this.state.user ? (
        <LoginScreen/>
      ) : (
        <UserPageScreen/>
      )}
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
