import React, {Component} from 'react';
import { Dimensions, TouchableOpacity, Image, StyleSheet, Text, AsyncStorage, View} from 'react-native';
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
      }
    } catch (e) {
      this.setState({ message: e.message });
    } finally {
      this.setState({ fetching: false });
    }
  };

  render() {
    const errors = this.state.message;
    return (
      <View style={styles.container}>
        <Image source={imageLogo} style={styles.logo} />
        <View style={styles.form}>
          <FormTextInput
            value={this.state.email}
            onChangeText={this.handleUsername}
            placeholder={"Username"}
          />
          <FormTextInput
            value={this.state.password}
            onChangeText={this.handlePasswordChange}
            placeholder={"Password"}
          />
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
    marginTop: 120,
    width: "50%",
    resizeMode: "contain",
    alignSelf: "center"
  },
  form: {
    flex: 1,
    justifyContent: "center",
    width: "80%"
  }
});

