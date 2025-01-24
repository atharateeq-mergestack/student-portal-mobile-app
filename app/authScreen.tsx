import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import LoginSection from '@/component/AuthScreen/LoginSection';
import SignUpSection from '@/component/AuthScreen/SignUpSection';

const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);


  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView className="h-full px-4">
        {/* App Logo */}
        <View className="items-center mt-10">
          <Image source={require('../assets/images/icon.png')} className='w-20 h-20' />
        </View>

        {/* Heading */}
        <Text className="text-3xl font-bold text-center mt-6">Get Started now</Text>
        <Text className="text-gray-500 text-center mt-2">
          Create an account or log in to explore about our app
        </Text>

        {/* Toggle Tabs */}
        <View className="flex-row mt-6 bg-gray-300 p-1 rounded-xl">
          <TouchableOpacity
            className={`flex-1 items-center py-2 rounded-xl ${isLogin ? 'bg-gray-100' : ' bg-gray-300  '}`}
            onPress={() => setIsLogin(true)}
          >
            <Text className={`text-xl ${isLogin ? 'text-blue-500' : 'text-black'}`}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 items-center py-2 rounded-xl ${!isLogin ? 'bg-gray-100' : ' bg-gray-300  '}`}
            onPress={() => setIsLogin(false)}
          >
            <Text className={`text-lg ${!isLogin ? 'text-blue-500' : 'text-black'}`}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* Auth Form */}
        <View className="mt-8">{isLogin ? <LoginSection /> : <SignUpSection setIsLogin={setIsLogin} />}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AuthScreen;
