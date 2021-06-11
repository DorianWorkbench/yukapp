import React, { useState } from "react";
import {RNCamera} from "react-native-camera";
import { View, StyleSheet} from "react-native";

export const PickBarCode = ({navigation}) => {
  let camera = null;
  return (
    <View style={styles.container}>
      <RNCamera
        ref={ref => {
          camera = ref;
        }}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Accorder l\'accès à la caméra',
          message: 'Nous avons besoin de votre permission pour la caméra',
          buttonPositive: 'Accoder',
          buttonNegative: 'Decliner',
        }}
        onGoogleVisionBarcodesDetected={({ barcodes }) => {
          if(barcodes[0]){
            if(JSON.parse(barcodes[0].data).errorCode === undefined){
              navigation.navigate('Details', {data:barcodes[0].data, network:true});
            }
          }
        }}
        captureAudio={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  preview: {
    flex: 1
  },
  container:{
    flex:1
  }
});
