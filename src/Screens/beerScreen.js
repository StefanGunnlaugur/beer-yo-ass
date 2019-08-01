import React, {Component} from 'react';
import {Platform, FlatList, StyleSheet, Text, View, TextInput, Image, TouchableOpacity} from 'react-native';
import Comment from '../Components/Comment';
import ProgressiveImage from '../Components/ProgressiveImage';


let beerId;

const baseurl = Platform.select({
  ios: 'http://127.0.0.1:3000',
  android: 'http://10.0.2.2:3000',
});

export default class BeerScreen extends Component {
    
    constructor(props){
        super(props);

        this.state ={ 
          isLoading: true,
          data:{},
          info:{},
          comments:{}
        }
      }
    
    componentDidMount(){
        const { navigation } = this.props;
        beerId = navigation.getParam('beerId', 'NO-ID');
        const url = baseurl+'/beers/'+beerId;
        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
            this.setState({
                isLoading: false,
                beerId: beerId,
                data: responseJson,
                info: responseJson.info,
                comments: responseJson.comments
            }, function(){
                //console.log(responseJson)
            });
            })
            .catch((error) =>{
            console.error(error);
            });
    }

    _keyExtractor = (item, index) => String(item.id);

    render() {
        return (
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <View style={styles.imageContainter}>
              <ProgressiveImage
                source={{uri: "https://www.vinbudin.is/Portaldata/1/Resources/vorumyndir/medium/"+this.state.beerId+"_r.jpg"}} 
                thumbnail={require("../images/roundlogo.png")}
                style={{width:'100%',height:'100%'}} 
                key={"pimg"}
                />
            </View>
              <View style={styles.topText}>
                <View style={styles.beerInfo}>
                  <Text style={styles.text}> {this.state.info.name}</Text>
                  <Text style={styles.text}> Magn: {this.state.info.volume}ml</Text>
                  <Text style={styles.text}> Styrkur: {this.state.info.alcohol}</Text>
                  <Text style={styles.text}> Verð: {this.state.info.price}kr</Text>
                  <Text style={styles.text}> Einkunn: {this.state.info.stars}</Text>
                  <Text style={styles.text}> Tegund: {this.state.info.taste}</Text>
                </View>
                <View style={styles.beerButtonsContainer}>
                  <TouchableOpacity style={styles.button}>
                    <Image
                    resizeMode="contain"
                    style={styles.buttonImage}
                    source={{uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Love_Heart_symbol.svg/651px-Love_Heart_symbol.svg.png"}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button}>
                    <Image
                    resizeMode="contain"
                    style={styles.buttonImage}
                    source={{uri: "http://pluspng.com/img-png/free-png-plus-sign-plus-icon-512.png"}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button}>
                    <Image
                    resizeMode="contain"
                    style={styles.buttonImage}
                    source={{uri: "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/star-512.png"}}
                    />
                  </TouchableOpacity>
                </View>

              </View>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.commentInput}
              onChangeText={(text) => this.setState({underPrice:text})}
              value={this.state.underPrice}
              placeholder = 'Segðu hvað þér finnst'
              multiline={true}
            />
            <View style={styles.commentButtonContainer}>
              <TouchableOpacity style={styles.commentButton}>
                <Image
                resizeMode="contain"
                style={styles.buttonImage}
                source={{uri: "https://cdn2.iconfinder.com/data/icons/arrows-vol-1-1/32/right2-512.png"}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.beerCommentContainer}>
            <FlatList
            onEndReached={this.endReached}
            onEndReachedThreshold={.7}
            data={this.state.data.comments}
            keyExtractor={this._keyExtractor}
            renderItem={({item}) =>               
              <Comment
                key = {item.name}
                name = {item.username}
                comment={item.comment}
            />}
            />
          </View>
        </View>
        );
    }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff7e6',
  },
  topContainer: {
    flex:3,
    flexDirection: 'row',
    width: '100%',
  },
  inputContainer: {
    flex: 2,
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  beerCommentContainer: {
    flex:3,
  },
  topText: {
    flexDirection: 'column',
    paddingTop: 5,
  },
  commentInput: {
    flex: 7,
    backgroundColor: '#f2f2f2',
    height: '70%',
    borderColor: '#000000',
    borderWidth: 1,
    paddingHorizontal: 5,
    textAlignVertical: 'top',
  },
  commentButtonContainer: {
    height: '70%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentButton: {
    height:"100%",
    width:"100%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    padding: 2,
  },
  imageContainter: {
    flex: 1,
    backgroundColor: '#fff7e6',
  },
  beerButtonsContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
  },
  button: {
    flex: 1,
  },
  buttonImage: {
    height:"100%",
    width:"100%",
  },
  beerInfo: {
    flex: 1,
  },
  textContainter: {
    paddingLeft: 20,
    flex: 1,
    height: "100%",
    alignItems: 'stretch',
  },
  canvas: {
    height:"100%",
    width:"100%",
  }
});
