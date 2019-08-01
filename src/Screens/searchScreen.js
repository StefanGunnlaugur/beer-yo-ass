import React, {Component} from 'react';
import {TouchableOpacity, ScrollView, FlatList, Platform, ActivityIndicator, StyleSheet, Text, View, Image} from 'react-native';
import BeerItem from '../Components/BeerItem';
import { SearchBar } from 'react-native-elements';

const NAVBAR_HEIGHT = 64;
const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 24 });

const baseurl = Platform.select({
  ios: 'http://127.0.0.1:3000',
  android: 'http://10.0.2.2:3000',
});

export default class SearchScreen extends Component {

  _keyExtractor = (item, index) => String(item.id);

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch(baseurl+'/beers')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
          filterBeers: responseJson,
        }, function(){
          //console.log(this.state.dataSource)
        });
      })
      .catch((error) =>{
        console.error(error);
      });
  }

   alertItemName = (item) => {
      alert(item.name)
   }

   filterData = () => {
      this.setState({ dataSource: this.state.dataSource.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))});
  }

  searchFilterFunction = text => {    

    this.setState({
      value: text,
    });

    const newData = this.state.dataSource.filter(item => {      
      const itemData = `${item.name.toUpperCase()}   
      ${item.name.toUpperCase()} ${item.name.toUpperCase()}`;
      
       const textData = text.toUpperCase();
        
       return itemData.indexOf(textData) > -1;    
    });
    
    this.setState({ filterBeers: newData });  
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Leita..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };

  render(){
    const { navigation } = this.props;
    

    data = this.filterData
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, paddingTop: 150}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View>
        <FlatList
          onEndReached={this.endReached}
          onEndReachedThreshold={.7}
          data={this.state.filterBeers}
          keyExtractor={this._keyExtractor}
          renderItem={({item}) =>               
          <BeerItem
            key = {item.id}
            item = {item}
            navigation={navigation}
        />}
        />
        <View style={styles.navbar}>
          <Text style={styles.title}>
            PLACES
          </Text>
        </View>
      </View>
    );
  }
}

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
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
    height: NAVBAR_HEIGHT,
    justifyContent: 'center',
    paddingTop: STATUS_BAR_HEIGHT,
  },
  contentContainer: {
    paddingTop: NAVBAR_HEIGHT,
  },
});

/*
        <SearchBar        
          placeholder="Leit..."        
          lightTheme        
          round        
          onChangeText={text => this.searchFilterFunction(text)}
          autoCorrect={false}  
          value={this.state.value}           
        />    
        <TouchableOpacity
          style = {styles.container}
          onPress = {() => this.filterData()}>
          <Text style = {styles.welcome}>
            Press HERE
          </Text>
        </TouchableOpacity>

        
      <ScrollView>
        {
            this.state.dataSource.map((item, index) => (
              <BeerItem
                key = {item.id}
                item = {item}
              />
            ))
        }
      </ScrollView>

              <TouchableOpacity
                  item = {item}
                  style = {styles.container}
                  onPress = {() => this.alertItemName(item)}>
                  <Text style = {styles.text}>
                    {item.name}
                  </Text>
                  <Image
                    style={{width: 50, height: 50}}
                    source={{uri: "https://www.vinbudin.is/Portaldata/1/Resources/vorumyndir/medium/"+item.product_id+"_r.jpg"}}
                   />
              </TouchableOpacity>
*/
/*
var sort_by = function(field, reverse, primer){

   var key = primer ? 
       function(x) {return primer(x[field])} : 
       function(x) {return x[field]};

   reverse = !reverse ? 1 : -1;

   return function (a, b) {
       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
     } 
}

var homes = [{

   "h_id": "3",
   "city": "Dallas",
   "state": "TX",
   "zip": "75201",
   "price": "162500"

}, {

   "h_id": "4",
   "city": "Bevery Hills",
   "state": "CA",
   "zip": "90210",
   "price": "319250"

}, {

   "h_id": "5",
   "city": "New York",
   "state": "NY",
   "zip": "00010",
   "price": "962500"

}];

// Sort by price high to low
homes.sort(sort_by('price', true, parseInt));

// Sort by city, case-insensitive, A-Z
homes.sort(sort_by('city', false, function(a){return a.toUpperCase()}));
*/