import React, {Component} from 'react';
import { Dimensions, TouchableOpacity, Image, StyleSheet, Text, AsyncStorage, View, TextInput} from 'react-native';
import imageLogo from "../images/roundlogo.png";
import Button from "../Components/Button";
import FormTextInput from "../Components/FormTextInput";
import { loginUser as apiLoginUser } from '../api';

var width = Dimensions.get('window').width;


export default class LoginScreen extends Component{
  
  constructor(props){
    super(props);
    this.state ={
      username: "",
      password: "",
      fetching: false,
      message: [" "],
    }
  }

  handleUsername = (username) => {
    this.setState({ username: username });
  };

  handlePasswordChange = (password) => {
    this.setState({ password: password });
  };

  handleLoginPress = () => {
    this.loginUser(this.state.username, this.state.password)
  };

  loginUser = async (username, password) => {
    this.setState({ fetching: true, message: '' });

    let result;
    try {
      result = await apiLoginUser(username, password);

      if (!result.ok) {
        this.setState({ message: result.data });
      } else {
        const user = result.data;
        await AsyncStorage.setItem('user', JSON.stringify(user));
        this.setState({ user, fetching: false, authenticated: true });

        console.log('user');
        console.log(user);
        

        this.props.updateUser(user);
        
        
      }
    } catch (e) {
      this.setState({ message: e.message });
    } finally {
      this.setState({ fetching: false });
    }
    console.log(this.state);
  };

  handleErrors = () => {
    const message = this.state.message;    
    
    if (typeof(message[0]) === 'object' || typeof(message.error) !== 'undefined') {
      console.log('hingað');
      
      return(
        <Text style={styles.errorText}>
          Username or password is incorrect
        </Text>
      );
    }
  };

  // onSubmitEditing={() => { this.Password.focus(); }}
  // blurOnSubmit={false}

  // ref={(input) => { this.Password = input; }}

  render() {
    console.log(this.state);
    
    return (
      <View style={styles.container}>

        <Image source={imageLogo} style={styles.logo} />
        <View style={styles.form}>
          <FormTextInput
            value={this.state.email}
            onChangeText={this.handleUsername}
            placeholder="Username"
          />
          <FormTextInput
            value={this.state.password}
            onChangeText={this.handlePasswordChange}
            placeholder="Password"
            onSubmitEditing={this.handleLoginPress}
          />

          { this.handleErrors() }

          <Text style={styles.bottomText}>
            <Text>{this.props.loginText}</Text>
            <Text style={{fontWeight: "bold"}} onPress={this.props.updateLogin}>{this.props.clickText}</Text>
            <Text>!</Text>
          </Text>

          <Button label={"Login"} onPress={this.handleLoginPress} />

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width,
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between"
  },
  logo: {
    flex: 1,
    marginTop: 1,
    width: "50%",
    resizeMode: "contain",
    alignSelf: "center"
  },
  form: {
    flex: 1,
    justifyContent: "center",
    width: "80%"
  },
  bottomText: {
    alignSelf: "center",
    marginBottom: 20,
  },
  errorText: {
    color: '#D8000C',
    alignSelf: 'center',
    marginBottom: 20,
  }
});

