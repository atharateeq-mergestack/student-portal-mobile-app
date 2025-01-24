import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { TabIcon } from '@/component/Common/TabIcon'

const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: 'white',
                    position: 'absolute',
                    borderTopColor: '£o0061FF1A',
                    borderTopWidth: 1,
                    minHeight: 70,

                }
            }}>
            <Tabs.Screen name='index' options={{
                title: 'Home',
                headerShown: false,
                tabBarIcon: ({ focused }) =>
                    <TabIcon isFocused={focused} icon={"home"} title={'Home'} />

            }} />
            <Tabs.Screen name='student' options={{
                title: 'Result',
                headerShown: false,
                tabBarIcon: ({ focused }) =>
                    <TabIcon isFocused={focused} icon={"person-add"} title={'Student'} />

            }} />
            <Tabs.Screen name='profile' options={{
                title: 'Profile',
                headerShown: false,
                tabBarIcon: ({ focused }) =>
                    <TabIcon isFocused={focused} icon={"person"} title={'profile'} />

            }} />

        </Tabs>
    )
}

export default TabsLayout