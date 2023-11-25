import { Tabs } from 'expo-router'
import Colors from '../../constants/Colors'
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

interface TabBarIcon {
    color: string
    size: number
}

export default function TabLayout() {
    const tabList = [
        {
            name: 'index',
            tabBarLabel: 'Explore',
            tabBarIcon: ({ color, size }: TabBarIcon) => <FontAwesome5 name="search" color={color} size={size} />,
        },
        {
            name: 'wishlists',
            tabBarLabel: 'Wishlists',
            tabBarIcon: ({ color, size }: TabBarIcon) => <Ionicons name="heart-outline" color={color} size={size} />,
        },
        {
            name: 'trips',
            tabBarLabel: 'Trips',
            tabBarIcon: ({ color, size }: TabBarIcon) => <FontAwesome5 name="airbnb" color={color} size={size} />,
        },
        {
            name: 'inbox',
            tabBarLabel: 'Inbox',
            tabBarIcon: ({ color, size }: TabBarIcon) => (
                <MaterialCommunityIcons name="message-outline" color={color} size={size} />
            ),
        },
        {
            name: 'profile',
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }: TabBarIcon) => (
                <Ionicons name="person-circle-outline" color={color} size={size} />
            ),
        },
    ]

    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: Colors.primary, tabBarLabelStyle: { fontFamily: 'mon-sb' } }}>
            {tabList.map((tab, index) => {
                const { name, tabBarLabel, tabBarIcon } = tab
                return (
                    <Tabs.Screen
                        key={tab.name + index}
                        name={name}
                        options={{ tabBarLabel, tabBarIcon, headerTitleAlign: 'center', headerTitle: tabBarLabel }}
                    />
                )
            })}
        </Tabs>
    )
}
