import React from "react";
import { View,Text,Image, Button,StyleSheet } from "react-native";

const ProductCard = ({ item, isFavorite, onToggleFavorite }:any) =>{
    return (
        <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text>{item.title}</Text>
      <Text>${item.price}</Text>
      <Button
        title={isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
        onPress={onToggleFavorite}
      />
    </View>
    )
}

export default ProductCard

const styles = StyleSheet.create({
    card: { padding: 10, margin: 10, borderWidth: 1 },
    image: { width: 100, height: 100, resizeMode: 'contain' }
  });