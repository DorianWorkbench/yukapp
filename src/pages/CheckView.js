import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import {CheckList} from "./components/CheckList";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CheckView = ({navigation})=>{
  let [historic, setHistorique] = useState();

  useEffect(() => {
      const histo = async () => {
        try{
          let result = JSON.parse(await AsyncStorage.getItem('@articles'));
          setHistorique(result);
        }catch(e){
          console.error("Erreur lors du chargement de l'historique");
        }
      }
      histo();
  }, []);

  const checkDetails = (DetailsR) =>{
    console.log("check Details");
    console.log(DetailsR.product.product_name);
    navigation.navigate("Details", {network:false, data:DetailsR})
  };

  return (
    <>
      {historic?
        <View style={styles.container}>
          <Text style={{fontSize:20, fontWeight:'bold', padding:20}}>Bonjour Dorian Peyrache</Text>
          <CheckList Historic={historic} navigation={checkDetails} />
        </View>
        :
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" style={styles.loading}/>
        </View>
      }
    </>
  );
};

const styles = StyleSheet.create({
  container:{
    flexDirection:'column'
  }
});
