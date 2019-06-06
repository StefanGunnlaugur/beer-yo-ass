import React, {Component} from 'react';
import {TouchableOpacity, ScrollView, FlatList, ActivityIndicator, StyleSheet, Text, View} from 'react-native';

export default class SearchScreen extends Component {
  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('https://beer-yo-ass-server.herokuapp.com/beers')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

   alertItemName = (item) => {
      alert(item.name)
   }

  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, paddingTop: 100}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <ScrollView>
        {
            this.state.dataSource.map((item, index) => (
              <TouchableOpacity
                  key = {item.beerId}
                  style = {styles.container}
                  onPress = {() => this.alertItemName(item)}>
                  <Text style = {styles.text}>
                    {item.name}
                  </Text>
              </TouchableOpacity>
            ))
        }
      </ScrollView>
    );
  }
}

/*
      <View style={{flex: 1, paddingTop:40, paddingLeft:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item.name}, {item.beerId}</Text>}
          keyExtractor={({beerId}, index) => beerId}
        />
      </View>
*/

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 3,
    backgroundColor: '#d9f9b1',
    alignItems: 'center',
  },
  text: {
    color: '#4f603c'
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
