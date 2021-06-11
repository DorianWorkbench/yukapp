import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import {ImageProductBanner} from './components/ImageProductBanner';
import { fetchDetail, storeArticle } from "../servicies/ProductService";
import { ProductIngredientsList } from './components/ProductIngredientsList';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Details = ({route})=>{
  let [detail, setDetails] = useState();
  let {data, network} = route.params;

  // Important, useEffect est non bloquant du coup
  // la view se charge sans avoir terminé la requête ce qui peut entrainer des erreurs.
  // écoute data.code pour refaire le check de données.
  useEffect(()=>{
    console.log("data network");
    console.log(network);
    if(network === true){
      let details = async ()=>{
        let detailR = await fetchDetail(data);
        setDetails(detailR)
      }
      details();
    }else if(!network){
      console.log("test network");
      let detailsInt = async () => {
        try{
          const result = JSON.parse(await AsyncStorage.getItem('@articles')).filter(e=>e.code === data.code)[0];
          setDetails(result);
          console.log("detail.product.product_name");
          console.log(result.product.product_name);
        }catch(e){
          console.error("Erreur lors de la recherche du produit");
        }
      };
      detailsInt();
    }
  }, [data.code]);
  // Obligation de faire 2 useEffect, on ne peut pas utiliser la valeur de changement du state dans le meme useEffect.
  // Je fais écouter celui-ci sur detail pour avec la valeur dès qu'elle change.
  // j'évite de faire passer undefined à ma superbe fonction sinon on se retrouve avec undefined dans les conditions et c'est pas fou.
  useEffect(()=>{
    if(detail !== undefined){
      storeArticle(detail);
    }
  }, [detail])

  return (
    <>
      {detail ?
        <View style={styles.container}>
          <ImageProductBanner image={detail.product.image_front_url} />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{detail.product.product_name}</Text>
            <Text style={styles.title}>Score: {detail.product.nutriscore_score}</Text>
          </View>
          <ProductIngredientsList ingredients={detail.product.ingredients}/>
        </View>
        :
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" style={styles.loading}/>
        </View>
      }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop:30,
    paddingLeft:20,
    paddingRight:20
  },
  image:{
    marginBottom:500
  },
  title:{
    fontWeight:"bold",
    fontSize:20,
  },
  titleContainer:{
    paddingTop: 30,
    paddingBottom:30,
    height:20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent:"center"
  },
  loading:{
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
