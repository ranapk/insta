import React, { Component } from 'react';
import { View, Image, FlatList, PermissionsAndroid, Platform } from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data:''
    };
  }

  async componentDidMount(){
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
        first: 50,
        assetType: 'Photos',
      })
      .then(res => {
        this.setState({ data: res.edges });
      })
      .catch((error) => {
         console.log(error);
      });
    
  }

  render() {
    return (
      <View>
        <FlatList
        data={this.state.data}
        numColumns={3}
        renderItem={({ item }) => <Image
           style={{
             width: '33%',
             height: 150,
           }}
           source={{ uri: item.node.image.uri }}
         />}
      />
      </View>
    );
  }
}