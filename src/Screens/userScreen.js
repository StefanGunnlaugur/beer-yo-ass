import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, AsyncStorage} from 'react-native';
import LoginScreen from './loginScreen';
import UserPageScreen from './userPageScreen';
import SignupScreen from './signupScreen';


let isLoggedIn;
export default class UserScreen extends Component {

  state ={ 
    user: undefined,
    login: true,
    
    loginText: 'Don\'t have an account? ',
    clickText: 'Sign up here',

  }

  updateUser = (user) => {
    this.setState({user});
    console.log(this.state);
  };

  updateLogin = () => {
    console.log('in here baby');
    

    if (this.state.login) {
      this.setState({ loginText: 'Already have an account? ', clickText: 'Log in'});
    } else {
      this.setState({loginText: 'Don\'t have an account? ', clickText: 'Sign up here'});
    }
    
    this.setState(state => ({
      login: !state.login
    }));

  };


  async componentDidMount(){
    isLoggedIn = JSON.parse(await AsyncStorage.getItem('user'));
    
    this.setState({ user: isLoggedIn.user.username });
  }


  render() {
    {/* isLoggedIn = JSON.parse(await AsyncStorage.getItem('user'));
    this.setState({ user: isLoggedIn.user.username }); */}     
  
    console.log("SDFASDFASDF" + this.state.user)
    return (
      <View style={styles.container}>
        {!this.state.user ? (
          (this.state.login ? (
            <LoginScreen
              updateUser={this.updateUser.bind(this)}
              loginText={this.state.loginText}
              clickText={this.state.clickText}
              updateLogin={this.updateLogin.bind(this)}
              />
            ) : (
            <SignupScreen
              loginText={this.state.loginText}
              clickText={this.state.clickText}
              updateLogin={this.updateLogin.bind(this)}
             />
            ))
        ) : (
          <UserPageScreen updateUser={this.updateUser.bind(this)} />
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
