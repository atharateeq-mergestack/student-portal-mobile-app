import React, { useState, ForwardedRef } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Define the props type for the InputField
interface InputFieldProps {
    label: string;
    type: 'text' | 'password' | 'email' | 'number';
    placeholder: string;
    isDisabled?: boolean;
    error?: string;
    value: string;
    onChange: (value: string) => void;
}

// Forward ref to allow parent components to pass refs to TextInput
export const InputField = React.forwardRef<TextInput, InputFieldProps>(
    ({ label, type, placeholder, isDisabled = false, error, value, onChange }: InputFieldProps, ref: ForwardedRef<TextInput>) => {
        const [showPassword, setShowPassword] = useState(type !== 'password');

        return (
            <View className="mb-4">
                <Text className="text-gray-500">{label}</Text>
                <View className="relative mt-2">
                    <TextInput
                        ref={ref} // Pass ref to the TextInput
                        placeholder={placeholder}
                        secureTextEntry={type === 'password' && !showPassword}
                        editable={!isDisabled}
                        className={`border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md p-3 ${isDisabled ? 'bg-gray-100' : ''}`}
                        value={value}
                        onChangeText={onChange}
                    />
                    {type === 'password' && (
                        <TouchableOpacity
                            className="absolute right-3 top-3"
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <Ionicons
                                name={showPassword ? 'eye-off' : 'eye'}
                                size={20}
                                color="gray"
                            />
                        </TouchableOpacity>
                    )}
                </View>
                {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
            </View>
        );
    }
);
