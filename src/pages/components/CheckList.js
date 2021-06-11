import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { HistoricContent } from "./HistoricContent";

export const CheckList = ({Historic, navigation}) => {
  return (
    <>
      {Historic?
        <View style={styles.container}>
          <FlatList
            data={Historic}
            renderItem={({item})=><HistoricContent Infos={item} navigation={navigation} />}
            keyExtractor={Historic=>Historic.code}
          />
        </View>
        :
        <View style={styles.notFind}>
          <Text style={{margin:0}}> Vous n'avez pas encore enregistré de produit !</Text>
        </View>
      }

    </>

  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'white',
    elevation:10,
    borderRadius:20,
    width:320,
    height:500,
    alignSelf:'center'
  },
  notFind:{
    flex:1,
    margin:0,
    fontSize:20,
    fontWeight:"bold"
  }
});


