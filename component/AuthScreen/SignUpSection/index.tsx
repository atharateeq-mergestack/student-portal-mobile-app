import React from 'react'
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';

import Button from '@/component/Common/Button';
import { InputField } from '@/component/Common/InputField';
import { SignUpSchema } from '@/component/AuthScreen/SignUpSection/validation';
import { createUser } from '@/api';
import { IUserData } from '@/types/interface';
import { showToast } from '@/utils/toast';

interface ISignUpSection {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUpSection = ({ setIsLogin }: ISignUpSection) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignUpSchema),
  });

  const onSubmit = async (data: IUserData) => {
    try {
      const response = await createUser(data)
      if (response.success) {
        showToast('success', 'Congrats', response.message)
        setIsLogin(true)
      }
    } catch (error: any) {
      showToast('error', 'Opps', error.message || 'Something went wrong')
    }
  };

  return (
    <View className="p-4">
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
      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <View >
            <InputField
              label="Password"
              type="password"
              placeholder="Enter your password"
              error={errors.password?.message}
              {...field}
            />
          </View>
        )}
      />
      <Button
        onPress={handleSubmit(onSubmit)}
        buttonText="Sign Up"
        variant="primary"
        iconRight={<Ionicons name="person-add" size={20} color="#fff" />}
      />
    </View>
  )
}

export default SignUpSection