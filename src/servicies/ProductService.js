import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function fetchDetail(id) {
  let result = await axios.get(
  'https://world.openfoodfacts.org/api/v0/product/' + id + '.json'
  );
  return result.data;
}

export async function storeArticle(newArticle){
  let articleArray = [];
  try{
    let storedArticles = await AsyncStorage.getItem('@articles');
    if(storedArticles !== null){
      articleArray = JSON.parse(storedArticles);
    }
    if(articleArray.length === 0){
      await AsyncStorage.setItem('@articles', JSON.stringify([newArticle]));
    }
    else {
      let exist = false;
      for (const article of articleArray) {
        if(article.code !== undefined){
          if(article.code === newArticle.code){
            exist = true;
          }
        }
      }
      if(!exist){
        await AsyncStorage.setItem('@articles', JSON.stringify([...articleArray, newArticle]));
      }
    }
  }catch(e){
    console.error("Erreur lors de l'enregistrement du produit");
  }
}
