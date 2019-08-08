import React, {Component} from 'react';
import { Dimensions, TouchableOpacity, Image, StyleSheet, Text, AsyncStorage, View, ScrollView} from 'react-native';
import imageLogo from "../images/roundlogo.png";
import Button from "../Components/Button";
import FormTextInput from "../Components/FormTextInput";
import { registerUser as apiRegisterUser } from '../api';
// import { ScrollView } from 'react-native-gesture-handler';

var width = Dimensions.get('window').width;


export default class Signupcreen extends Component{
  
  constructor(props){
    super(props);
    this.state ={
      email: "",
      username: "",
      password: "",
      fetching: false,
      message: [" "],
    }
  }
  
  handleEmailChange = (email) => {
    this.setState({ email: email });
  };

  handleUsernameChange = (username) => {
    this.setState({ username: username });
  };

  handlePasswordChange = (password) => {
    this.setState({ password: password });
  };

  handleRegisterPress = () => {

      this.registerUser(this.state.username, this.state.password, this.state.email);
  };

  validateEmail = () => {
    const {email} = this.state;
    console.log(email);
    

    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if ( re.test(email) ) {
        // this is a valid email address
        // call setState({email: email}) to update the email
        // or update the data in redux store.
        console.log('Valid email');
        return true;
        
    }
    else {
      // invalid email, maybe show an error to the user.
      console.log('invalid email');
      return false;
      
    }
  }


  registerUser = async (username, password, email) => {
    this.setState({ fetching: true, message: '' });

    let result;
    try {
      result = await apiRegisterUser(username, password, email);

      if (!result.ok) {
        this.setState({ message: result.data });
      } else {
        const user = result.data;
        await AsyncStorage.setItem('user', JSON.stringify(user));
        this.setState({ user, fetching: false, authenticated: true });

        this.props.updateUser(user);
      }
    } catch (e) {
      this.setState({ message: e.message });
    } finally {
      this.setState({ fetching: false });
    }
    console.log(this.state);
  };


  handleErrors = (field) => {
    const message = this.state.message;
    console.log(this.state);
    
    if (typeof message.errors !== 'undefined') {
      console.log(message.errors);
      const msg = message.errors;

      return(
        <Text>
          {msg.map((e,index) => {
            if (e.field === field) {
              return (
                <Text style={styles.errorText} key={index}>{e.error}</Text>
              );
            }
          })}
        </Text>

      );
    }
  };


  render() {
    return (
      <View style={styles.container}>

          <Image source={imageLogo} style={styles.logo} />
          <View style={styles.form}>
            <FormTextInput
              value={this.state.email}
              keyboardType={'email-address'}
              onChangeText={this.handleEmailChange}
              placeholder={"Email"}
            />
            { this.handleErrors('email') }

            <FormTextInput
              value={this.state.username}
              onChangeText={this.handleUsernameChange}
              placeholder={"Username"}
              />
            { this.handleErrors('username') }


            <FormTextInput
              value={this.state.password}
              onChangeText={this.handlePasswordChange}
              placeholder={"Password"}
              />
            { this.handleErrors('password') }

            <Text style={styles.bottomText}>
              <Text>{this.props.loginText}</Text>
              <Text style={{fontWeight: "bold"}} onPress={this.props.updateLogin}>{this.props.clickText}</Text>
              <Text>!</Text>
            </Text>

            <Button label={"Sign up"} onPress={this.handleRegisterPress} onSubmitEditing={this.handleRegisterPress} />
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
    width: "80%",
    color: 'red'

  },
  bottomText: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  errorText: {
    color: '#D8000C',
    alignSelf: 'center',
    marginBottom: 20,
  }
});

