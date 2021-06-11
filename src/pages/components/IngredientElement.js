import React from 'react';
import { View, StyleSheet, Text } from "react-native";

export const IngredientElement = ({ingredient})=>{
  return (
    <View style={styles.container}>
      <Text style={styles.item}>{ingredient.text}</Text>
      <Text style={styles.item}>{parseFloat(ingredient.percent_estimate).toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flexDirection:"row",
    justifyContent:"space-between"
  },
  item:{
    fontSize:18,
    maxWidth:150
  }
})
