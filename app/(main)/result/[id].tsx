import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const Result = () => {
    const { id } = useLocalSearchParams()
    return (
        <View>
            <Text>Result</Text>
        </View>
    )
}

export default Result