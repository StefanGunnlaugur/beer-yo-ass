import React, {Component} from 'react';
import { Dimensions, TouchableOpacity, Image, StyleSheet, Text, View} from 'react-native';
import imageLogo from "../images/roundlogo.png";
import Button from "../Components/Button";
import FormTextInput from "../Components/FormTextInput";

var width = Dimensions.get('window').width;


export default class LoginScreen extends Component{
  
  constructor(props){
    super(props);
    this.state ={
      email: "",
      password: ""
    }
  }

  handleEmailChange = (email) => {
    this.setState({ email: email });
  };

  handlePasswordChange = (password) => {
    this.setState({ password: password });
  };

  handleLoginPress = () => {
    alert("Nei félagi minn!")
    console.log("Login button pressed");
  };

  render() {
    return (
      <View style={styles.container}>
        <Image source={imageLogo} style={styles.logo} />
        <View style={styles.form}>
          <FormTextInput
            value={this.state.email}
            onChangeText={this.handleEmailChange}
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

