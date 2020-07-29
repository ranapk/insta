import React, {Component} from 'react';
import {
  View,
  Image,
  FlatList,
  PermissionsAndroid,
  Platform,
  TouchableHighlight,
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      selectedPhotos: '',
    };
  }

  async componentDidMount() {
    if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permission Explanation',
          message: 'ReactNativeForYou would like to access your photos!',
        },
      );
      if (result !== 'granted') {
        console.log('Access to pictures was denied');
        return;
      }
    }

    CameraRoll.getPhotos({
      first: 1000,
      assetType: 'Photos',
    })
      .then((res) => {
        this.setState({data: res.edges});
      })
      .catch((error) => {
        console.log(error);
      });
  }
  add = (item) => {
    console.log(item);
  };
  render() {
    return (
      <>
        <View style={{flex: 1}}></View>
        <View style={{flex: 1}}>
          <FlatList
            data={this.state.data}
            numColumns={3}
            renderItem={({item}) => (
              <Image
                resizeMode="contain"
                style={{
                  width: '33%',
                  aspectRatio: 1 / 1,
                }}
                source={{uri: item.node.image.uri}}
              />
            )}
          />
        </View>
      </>
    );
  }
}
