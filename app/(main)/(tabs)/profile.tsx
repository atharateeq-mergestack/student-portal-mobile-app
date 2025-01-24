import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, ActivityIndicator, ScrollView, Alert, } from 'react-native';
import { getUserInfo } from '@/api';
import { showToast } from '@/utils/toast';
import EditUser from '@/component/Profile/EditUser/EditUser';
import UserDetails from '@/component/Profile/UserDetails';
import { IUser, IUserData } from '@/types/interface';

const Profile = () => {
  const [user, setUser] = useState<IUserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const fetchUserProfile = async () => {
    try {
      const response = await getUserInfo();
      setUser(response.data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      showToast('error', 'Error', error.message || 'Failed to load user data');
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
  };



  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView className="h-full px-4">
        <View>
          {isEditing && user ? (
            <EditUser userId={user._id ?? ''} setIsEditing={setIsEditing} />
          ) : (
            <>
              <UserDetails user={user} onEdit={handleEdit} />
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView >

  );
};

export default Profile;
