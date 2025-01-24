import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Button from '../Common/Button';
import { Ionicons } from '@expo/vector-icons';
import { capitalizeName, getInitials } from '@/utils/helper';
import { logoutUser } from '@/api';
import { showToast } from '@/utils/toast';

const UserDetails = ({ user, onEdit }: { user: any; onEdit: () => void }) => {
    const { firstName, lastName, userName, email } = user;

    const handleLogout = async () => {
        await logoutUser()
        showToast('info', 'Good Bye!', 'You have successfully logout')
    }
    return (
        <View className="px-5 py-3">
            {/* Profile Header */}
            <View className="mb-6">
                <Text className="text-2xl font-bold text-center">Profile</Text>
            </View>

            {/* Profile Info Section */}
            <View className="flex-row items-center mb-5 justify-between">
                <View className='flex flex-row items-center'>
                    <View className="w-20 h-20 rounded-full bg-blue-500 justify-center items-center mr-4">
                        <Text className="text-white text-5xl">{getInitials(firstName, lastName).toUpperCase()}</Text>
                    </View>
                    <Text className="text-xl font-semibold">
                        {capitalizeName(firstName)} {capitalizeName(lastName)}
                    </Text>
                </View>
                <View className="flex">
                    <Button onPress={onEdit} buttonText={'Edit'} variant={'primary'} iconLeft={<Ionicons name="pencil-sharp" size={10} color="#fff" />} />
                </View>
            </View>

            {/* First Name Section */}
            <View className="mb-4">
                <Text className="text-lg font-bold">First Name:</Text>
                <Text className="text-gray-500">
                    {firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()}
                </Text>
                <View className="border-b my-2"></View>
            </View>

            {/* Last Name Section */}
            <View className="mb-4">
                <Text className="text-lg font-bold">Last Name:</Text>
                <Text className="text-gray-500">
                    {lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase()}
                </Text>
                <View className="border-b my-2"></View>
            </View>

            {/* Email Section */}
            <View className="mb-4">
                <Text className="text-lg font-bold">Email:</Text>
                <Text className="text-gray-500">{email}</Text>
                <View className="border-b my-2"></View>
            </View>

            {/* Username Section */}
            <View className="mb-4">
                <Text className="text-lg font-bold">Username:</Text>
                <Text className="text-gray-500">{userName}</Text>
                <View className="border-b my-2"></View>
            </View>

            {/* Logout Section */}
            <View className="mt-auto mb-6">
                <Button
                    onPress={handleLogout}
                    buttonText="Log Out"
                    variant="primary"
                    iconLeft={<Ionicons name="log-out" size={18} color="#fff" />}
                />
            </View>
        </View>

    );
};

export default UserDetails;
