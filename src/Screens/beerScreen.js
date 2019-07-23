import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';

let beerId;

export default class BeerScreen extends Component {

    
    constructor(props){
        super(props);
        this.state ={ isLoading: true, data:{}}
      }
    
    componentDidMount(){
        const { navigation } = this.props;
        beerId = navigation.getParam('beerId', 'NO-ID');
        const url = 'http://127.0.0.1:3000/beers/'+beerId;
        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
            this.setState({
                isLoading: false,
                beerId: beerId,
                data: responseJson,
            }, function(){
                //console.log(responseJson)
            });
            })
            .catch((error) =>{
            console.error(error);
            });
    }

    
    render() {
        return (
        <View style={styles.container}>
          <Image
            resizeMode="contain"
            style={styles.canvas}
            source={{uri: "https://www.vinbudin.is/Portaldata/1/Resources/vorumyndir/medium/"+this.state.beerId+"_r.jpg"}}
            />
            <Text style={styles.welcome}>This is the BEERBOY screen {this.state.beerId}</Text>
            <Text style={styles.welcome}> {this.state.data.name}</Text>

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
    height:50,
    width:50,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
