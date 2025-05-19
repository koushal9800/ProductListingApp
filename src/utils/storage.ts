import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = 'FAVORITES'

export const getFavorites = async(): Promise<number[]> => {
    const json = await AsyncStorage.getItem(FAVORITES_KEY)
    return json ? JSON.parse(json) : []
}

export const toggleFavorites = async (id: number) =>{
    const current = await getFavorites()
    const updated = current.includes(id)
    ? current.filter(i => i !== id )
    : [...current, id]
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated))
}