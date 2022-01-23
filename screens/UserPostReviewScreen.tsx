import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { RootStackScreenProps } from "../types";

export default function UserPostReviewScreen({route}: RootStackScreenProps<'UserPostReview'>) {
  
  const trainerId = route.params.trainerId
  const trainerName = route.params.trainerName

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{trainerName} 트레이너</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: 8,
    paddingBottom: 0,
    marginHorizontal: 10,
    marginTop: 24
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginRight: 5,
  },
})