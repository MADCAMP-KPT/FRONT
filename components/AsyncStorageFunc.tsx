import AsyncStorage from '@react-native-async-storage/async-storage'

export const storeId = async (userId) => {
  try {
    console.log(`saved ${userId}`);
    await AsyncStorage.setItem('Id', String(userId))
  }
  catch(e) {
    console.log(e);
  }
}