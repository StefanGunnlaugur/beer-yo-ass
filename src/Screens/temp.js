import React, { Component } from 'react';
import { TextInput, Animated, Image, Platform, StyleSheet,FlatList, View, Text, LayoutAnimation, UIManager, TouchableOpacity  } from 'react-native';
import { SegmentedControls } from 'react-native-radio-buttons'

import BeerItem from '../Components/BeerItem';
import Filtermenu from '../Components/BeerItem';
import { SearchBar } from 'react-native-elements';


const NAVBAR_HEIGHT = 58;
const STATUS_BAR_HEIGHT = Platform.select({ ios: 0, android: 24 });
const EXPANDED_HEIGHT = 150;

const AnimatedListView = Animated.createAnimatedComponent(FlatList);

const dataSource = {};

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);

    const scrollAnim = new Animated.Value(0);
    const offsetAnim = new Animated.Value(0);

    this.state = {
        orderby: '',
        underPrice: '',
        overPrice: '',
        expanded: false,
        dataSource: dataSource,
        scrollAnim,
        offsetAnim,
        clampedScroll: Animated.diffClamp(
            Animated.add(
            scrollAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                extrapolateLeft: 'clamp',
            }),
            offsetAnim,
            ),
            0,
            NAVBAR_HEIGHT - STATUS_BAR_HEIGHT,
        ),
    };

        if(Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
          }
  }

  _clampedScrollValue = 0;
  _offsetValue = 0;
  _scrollValue = 0;

  changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded });
  }

  closeFilters = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded });
  }

  getData = () => {
    fetch('http://127.0.0.1:3000/beers')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
          dataBeers: responseJson,
          filterBeers: responseJson,
        }, function(){
          //console.log(this.state.dataSource)
        });
      })
      .catch((error) =>{
        console.error(error);
      });
    };

  async componentDidMount() {
    await this.getData();
    this.state.scrollAnim.addListener(({ value }) => {
      const diff = value - this._scrollValue;
      this._scrollValue = value;
      this._clampedScrollValue = Math.min(
        Math.max(this._clampedScrollValue + diff, 0),
        NAVBAR_HEIGHT - STATUS_BAR_HEIGHT,
      );
    });
    this.state.offsetAnim.addListener(({ value }) => {
      this._offsetValue = value;
    });
  }

  componentWillUnmount() {
    this.state.scrollAnim.removeAllListeners();
    this.state.offsetAnim.removeAllListeners();
  }

  _onScrollEndDrag = () => {
    this._scrollEndTimer = setTimeout(this._onMomentumScrollEnd, 250);
  };

  _onMomentumScrollBegin = () => {
    if(this.state.expanded){
      this.closeFilters();
    }
    clearTimeout(this._scrollEndTimer);
  };

  _onMomentumScrollEnd = () => {
    const toValue = this._scrollValue > NAVBAR_HEIGHT &&
      this._clampedScrollValue > (NAVBAR_HEIGHT - STATUS_BAR_HEIGHT) / 2
      ? this._offsetValue + NAVBAR_HEIGHT
      : this._offsetValue - NAVBAR_HEIGHT;

    Animated.timing(this.state.offsetAnim, {
      toValue,
      duration: 350,
      useNativeDriver: true,
    }).start();
  };

  _renderRow = (rowData, sectionId, rowId) => {
    const { navigation } = this.props;
    return (
        <BeerItem
            key = {rowData.id}
            item = {rowData}
            navigation={navigation}
        />
    );
  };

  searchFilterFunction = text => {    
    this.setState({
      value: text,
    });

    const newData = this.state.dataBeers.filter(item => {      
      const itemData = `${item.name.toUpperCase()}   
      ${item.name.toUpperCase()} ${item.name.toUpperCase()}`;
      
       const textData = text.toUpperCase();
        
       return itemData.indexOf(textData) > -1;    
    });
    
    this.setState({ 
        filterBeers: newData,
        dataSource: newData,
    });  
  };

  render() {

    var sort_by = function(field, reverse, primer){

      var key = primer ? 
          function(x) {return primer(x[field])} : 
          function(x) {return x[field]};
   
      reverse = !reverse ? 1 : -1;
   
      return function (a, b) {
          return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        } 
   }

    function setSelectedOption(selectedOption){
      let sorted = this.state.dataSource;
      switch(selectedOption) {
        case "Verð":
          sorted.sort(sort_by('price', false, parseInt));
            break;
        case "Áfengismagn":
          sorted.sort(sort_by('alcohol', true, parseFloat));
            break;
        case "Stafrófsröð":
          sorted.sort(sort_by('name', false, function(a){return a.toUpperCase()}));          
          break;
        //case "Book":
        //  sorted.sort(sort_by('name', false, function(a){return a.toUpperCase()}));          break;
        default:
          // code block
      }
      this.setState({
        selectedOption,
        dataSource:sorted
      });
    }

    const options = [
      "Áfengismagn",
      "Verð",
      "Stafrófsröð"
      //"Book"
    ];

    const { navigation } = this.props;

    const { clampedScroll } = this.state;

    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
      outputRange: [0, -(NAVBAR_HEIGHT - STATUS_BAR_HEIGHT)],
      extrapolate: 'clamp',
    });
    const navbarOpacity = clampedScroll.interpolate({
      inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
        
      <View style={styles.fill}>
        <View style={{ paddingTop: this.state.expanded ? EXPANDED_HEIGHT : 0}}>
            <AnimatedListView
            onEndReached={this.endReached}
            onEndReachedThreshold={.7}
            data={this.state.filterBeers}
            keyExtractor={this._keyExtractor}
            renderItem={({item}) =>               
              <BeerItem
                key = {item.id}
                item = {item}
                navigation={navigation}
              />
            }
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.contentContainer}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
            scrollEventThrottle={1}
            onMomentumScrollBegin={this._onMomentumScrollBegin}
            onMomentumScrollEnd={this._onMomentumScrollEnd}
            onScrollEndDrag={this._onScrollEndDrag}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }],
                { useNativeDriver: true },
            )}
            />
        </View>
        <Animated.View style={[styles.navbar, { transform: [{ translateY: navbarTranslate }] }]}>
            <View style={styles.searchRow}>
                <View style={styles.searchBarContainer}>
                    <SearchBar        
                        placeholder="Leit..."        
                        darkTheme        
                        round        
                        onChangeText={text => this.searchFilterFunction(text)}
                        autoCorrect={false}  
                        value={this.state.value}
                    /> 
                </View>
                <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayout} style={styles.Btn}>
                    <Image
                        style={styles.image}
                        source={{uri: 'https://reddingdesigns.com/images/icons/icon-expand-white.png'}}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                <View style={{ height: this.state.expanded ? EXPANDED_HEIGHT : 0, overflow: 'hidden' }}>
                  <View style={styles.expandedContainer}>
                    <SegmentedControls
                      tint={'#fff3e6'}
                      selectedTint= {'#cc6900'}
                      backTint= {'#ff9933'}
                      options={ options }
                      allowFontScaling={ true } // default: true
                      onSelection={ setSelectedOption.bind(this) }
                      selectedOption={ this.state.selectedOption }
                      optionStyle={{fontFamily: 'AvenirNext-Medium'}}
                      optionContainerStyle={{flex: 1}}
                    />
                    <TextInput
                      style={styles.priceInput}
                      onChangeText={(text) => this.setState({underPrice:text})}
                      value={this.state.underPrice}
                      placeholder = 'Verð undir'
                    />
                    <TextInput
                      style={styles.priceInput}
                      onChangeText={(text) => this.setState({overPrice:text})}
                      value={this.state.overPrice}
                      placeholder = 'Verð yfir'
                    />
                  </View>
                </View>
            </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  priceInput:{
    height: 40, 
    width: 100,
  },
  expandedContainer:{
    paddingTop: 10,
  },
  navbar: {
    backgroundColor: '#393e42',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
  },
  searchBarContainer: {
    flex: 6, 
  },
  searchRow: {
    flex: 1, 
    flexDirection: 'row',
  },
  searchbar: {
    width: 100,
  },
  contentContainer: {
    paddingTop: NAVBAR_HEIGHT,
  },
  title: {
    color: '#333333',
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: '#ffe6cc',
  },
 
  text: {
    fontSize: 17,
    color: 'black',
  },
 
  btnText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20
  },
  image: {
    height: '100%',
    width: '100%',
  },
  Btn: {
    flex:1,
  }
});

