import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { InputField } from '@/component/Common/InputField';
import Button from '@/component/Common/Button';
import { loginSchema } from '@/component/AuthScreen/LoginSection/validation';
import { getToken, loginUser } from '@/api';
import { router } from 'expo-router';
import { showToast } from '@/utils/toast';
import * as SplashScreen from "expo-splash-screen";

// Prevent the splash screen from hiding automatically
SplashScreen.preventAutoHideAsync();


const LoginSection = () => {
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(loginSchema),
    });


    const onSubmit = async (data: any) => {
        try {
            const response = await loginUser(data);
            // Show a success toast
            if (response.success) {
                showToast('success', 'Congrats', response.message);
                router.replace('/(main)/(tabs)')
            }
            // You can set the token here if required or rely on cookies
        } catch (error: any) {
            showToast('error', 'Error', error.message || 'Failed to fetch profile.');
        }
    };
    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = await getToken();
                if (token) {
                    router.replace('/(main)/(tabs)')
                }
            } catch (error) {
                console.error("Error checking token: 1", error);
            } finally {
                // Hide the splash screen after the token check is complete
                await SplashScreen.hideAsync();
            }
        };

        checkToken();
    }, []);


    return (
        <View className="p-4">
            <Controller
                control={control}
                name="email"
                render={({ field }) => (
                    <View >
                        <InputField
                            label="Email"
                            type="text"
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
                buttonText="Log In"
                variant="primary"
                iconRight={<Ionicons name="log-in-outline" size={20} color="#fff" />}
            />
        </View>
    );
};

export default LoginSection;
