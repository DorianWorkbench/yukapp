import React, { useEffect } from "react";
import { View, StyleSheet, Text, Image, TouchableHighlight, TouchableOpacity } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

export const HistoricContent = ({Infos, navigation}) => {
  return (
    <Pressable
      onPress={()=>navigation(Infos)}
    >
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{uri:Infos.product.image_front_small_url}}
        />
        <Text style={{maxWidth:100}}>{Infos.product.product_name}</Text>
        <View style={styles.nutriscore}>
          <Text style={{fontWeight:'bold'}}>Nutriscore: </Text>
          <Text >{Infos.product.nutriscore_score}</Text>
        </View>
      </View>
    </Pressable>

  );
}

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    padding:10,
    alignItems:'center',
    justifyContent:'space-between'
  },
  image:{
    height:50,
    width:50,
    borderRadius:20
  },
  nutriscore:{
    flexDirection: 'column',
    alignItems: 'center',
  }
});
