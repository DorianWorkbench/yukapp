import React from 'react';
import {FlatList, ScrollView, StyleSheet} from "react-native";
import {IngredientElement} from'./IngredientElement';

export const ProductIngredientsList = ({ingredients})=>{

  return (
      <FlatList
        style={styles.list}
        data={ingredients}
        renderItem={
          ({ item }) =>
            (<IngredientElement ingredient={item} />)}
        keyExtractor={ingredients=>ingredients.text}
      />
  );
}

const styles = StyleSheet.create({
  list:{
    height:250,
    flexGrow:0
  }
});
