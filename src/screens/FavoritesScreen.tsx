import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { getFavorites, toggleFavorites } from '../utils/storage';

const FavoritesScreen = () =>{
    const [favorites, setFavorites] = useState<number[]>([]);
    const [products, setProducts] = useState([]);


    useEffect(() => {
        loadFavorites();
      }, []);

      const loadFavorites = async () => {
        const ids = await getFavorites();
        const res = await axios.get('https://fakestoreapi.com/products');
        const filtered = res.data.filter((p: any) => ids.includes(p.id));
        setProducts(filtered);
        setFavorites(ids);
      };
    
      const onToggleFavorite = async (id: number) => {
        await toggleFavorites(id);
        loadFavorites();
      }

    return (
        <View style={{ flex:1,  }} >
             <FlatList
      data={products}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <ProductCard
          item={item}
          isFavorite={favorites.includes(item.id)}
          onToggleFavorite={() => onToggleFavorite(item.id)}
        />
      )}
    />
        </View>
    )
}

export default FavoritesScreen