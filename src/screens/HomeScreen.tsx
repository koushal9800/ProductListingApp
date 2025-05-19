import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import ProductCard from '../components/ProductCard';
import {getFavorites, toggleFavorites} from '../utils/storage';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then(res => setProducts(res.data))
      .finally(() => setLoading(false));
      loadFavorites()
  }, []);

  const loadFavorites = async() =>{
const favs = await getFavorites()
setFavorites(favs)
  }

  const onToggleFavorite = async(id: number) => {
await toggleFavorites(id)
loadFavorites()
  }

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <View style={{flex: 1, }}>
      <FlatList 
      data={products}
      keyExtractor={item => item.id.toString()}
      renderItem={({item})=>(
        <ProductCard 
        item={item}
        isFavorite={favorites.includes(item.id)}
        onToggleFavorite={()=>onToggleFavorite(item.id)}
        />
      )}
      />
    </View>
  );
};

export default HomeScreen;
