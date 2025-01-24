import React, { useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EditUpSchema } from './validation';
import { getUserById, updateUser } from '@/api';
import { showToast } from '@/utils/toast';
import { IUser, IUserData } from '@/types/interface';
import Button from '@/component/Common/Button';
import { InputField } from '@/component/Common/InputField';


const EditUser = ({ userId, setIsEditing }: {
  userId: string; setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // Setup the form using react-hook-form and validation schema
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(EditUpSchema),
  });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await getUserById(userId)
        if (response.success) {
          setValue('firstName', response.data.firstName);
          setValue('lastName', response.data.lastName);
          setValue('userName', response.data.userName);
          setValue('email', response.data.email);
        }
      } catch (error: any) {
        showToast('error', 'Opps', error.message || 'Something went wrong.')
        console.error("Error checking token:", error);
      }
    };

    getUserData();

  }, [userId])

  // Handle the save button click
  const onSubmit = async (data: IUser) => {
    // onSave(data);
    // console.log(data, " data user");

    const response = await updateUser(userId, data)
    // showToast('success', 'Congrats', 'Profile updated successfully');
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <View className="p-5">
      <Text className="text-xl font-semibold mb-4">Edit User</Text>
      <Controller
        control={control}
        name="firstName"
        render={({ field }) => (
          <View >
            <InputField
              label="First name"
              type="text"
              placeholder="Enter your first name"
              error={errors.firstName?.message}
              {...field}
            />
          </View>
        )}
      />
      <Controller
        control={control}
        name="lastName"
        render={({ field }) => (
          <View >
            <InputField
              label="Last name"
              type="text"
              placeholder="Enter your last name"
              error={errors.lastName?.message}
              {...field}
            />
          </View>
        )}
      />
      <Controller
        control={control}
        name="userName"
        render={({ field }) => (
          <View >
            <InputField
              label="User name"
              type="text"
              placeholder="Enter your user name"
              error={errors.userName?.message}
              {...field}
            />
          </View>
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <View >
            <InputField
              label="Email"
              type="email"
              placeholder="Enter your email"
              error={errors.email?.message}
              {...field}
            />
          </View>
        )}
      />
      {/* Save and Cancel Buttons */}
      <View className="flex-row justify-between mt-4">
        <Button onPress={handleSubmit(onSubmit)} variant='primary' buttonText={'Save'} />
        <Button onPress={handleCancel} buttonText='Cancel' variant='secondary' />

      </View>
    </View>
  );
};

export default EditUser;
