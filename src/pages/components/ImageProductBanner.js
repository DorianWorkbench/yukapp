import React from 'react';
import { View, Text, Image, StyleSheet } from "react-native";

export const ImageProductBanner = ({image}) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{uri:image}}
      />
    </View>
  );
};
let styles = StyleSheet.create({
  container:{
    flexDirection:"row",
    justifyContent:"center",
  },
  image:{
    width:200,
    height:200
  }
})
