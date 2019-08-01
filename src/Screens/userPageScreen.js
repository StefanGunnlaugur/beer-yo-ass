
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, AsyncStorage} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Button from "../Components/Button";



const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class UserPageScreen extends Component {

  state ={ 
    user: "",
  }

  async componentDidMount(){
    const logger = JSON.parse(await AsyncStorage.getItem('user'));
    
    this.setState({ user: logger.user.username });
  }
  
  handleLogoutPress = () => {
    this.logoutUser()
  };

  logoutUser = async () => {
    AsyncStorage.removeItem('user');
    this.setState({ user: null});

    this.props.updateUser(null);

  };

  render() {

    //const user = JSON.parse(AsyncStorage.getItem('user') || 'null');
    
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>UserScreen</Text>
        <Text style={styles.welcome}>{this.state.user}</Text>
        <Button label={"Logout"} onPress={this.handleLogoutPress} />
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
