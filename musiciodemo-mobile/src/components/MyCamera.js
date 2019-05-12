import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  View
} from 'react-native';
import Camera from 'react-native-camera';

class MyCamera extends Component {
  state = {
    cameraType: Camera.constants.Type.back
  }

  switchToFront() {
    console.log(this.state.cameraType);
    //var state = this.state;
    this.state.cameraType = this.state.cameraType === Camera.constants.Type.back ? Camera.constants.Type.front : Camera.constants.Type.back;
    this.setState(this.state);
  }

  takePicture() {
   this.camera.capture()
     .then((data) => console.log(data))
     .catch(err => console.error(err));
   }

  render() {
    return(
      <View style={styles.container}>
        <Camera
             ref={(cam) => {
               this.camera = cam;
             }}
             style={styles.preview}
             aspect={Camera.constants.Aspect.fill}
        >
        <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        <Text style={styles.capture} onPress={this.switchToFront.bind(this)}>[SWITCH]</Text>
        </Camera>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  preview: {
   flex: 1,
   justifyContent: 'flex-end',
   alignItems: 'center',
   height: Dimensions.get('window').height,
   width: Dimensions.get('window').width
 },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

export default MyCamera;
