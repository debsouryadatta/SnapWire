import { Text, View, TouchableOpacity, Switch, Image } from "react-native";
import { useColorScheme } from "nativewind";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileDrawer from '@/components/profile-drawer'; 
import FriendsDrawer from '@/components/friends-drawer'; 
import RequestsReceivedDrawer from '@/components/requests-received-drawer';
import RequestsSentDrawer from '@/components/requests-sent-drawer';

const THEME_KEY = '@theme_preference';

export default function ProfileScreen() {
    const { colorScheme, setColorScheme } = useColorScheme();
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [isFriendsDrawerVisible, setIsFriendsDrawerVisible] = useState(false);
    const [isRequestsReceivedDrawerVisible, setIsRequestsReceivedDrawerVisible] = useState(false);
    const [isRequestsSentDrawerVisible, setIsRequestsSentDrawerVisible] = useState(false);

    // Load saved theme preference
    useEffect(() => {
        loadThemePreference();
    }, []);

    const loadThemePreference = async () => {
        try {
            const savedTheme = await AsyncStorage.getItem(THEME_KEY);
            if (savedTheme) {
                setColorScheme(savedTheme as 'dark' | 'light');
            } else {
                // Set default theme to dark if no preference is saved
                setColorScheme('dark');
                await AsyncStorage.setItem(THEME_KEY, 'dark');
            }
        } catch (error) {
            console.error('Error loading theme preference:', error);
            setColorScheme('dark'); // Fallback to dark theme
        }
    };

    const toggleTheme = async () => {
        const newTheme = colorScheme === 'dark' ? 'light' : 'dark';
        try {
            await AsyncStorage.setItem(THEME_KEY, newTheme);
            setColorScheme(newTheme);
        } catch (error) {
            console.error('Error saving theme preference:', error);
        }
    };

    return (
        <View className="flex-1 bg-white dark:bg-zinc-900">
            <View className="flex-1 px-4 pt-12 pb-20">
                {/* Profile Header */}
                <View className="items-center mb-8">
                    <View className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-800 mb-4 items-center justify-center">
                        <Image 
                            source={{uri: "https://res.cloudinary.com/diyxwdtjd/image/upload/v1707936470/projects/1000057087-01-photoaidcom-cropped.jpeg_pybdcn.png"}}
                            className="w-20 h-20 rounded-full"
                        />
                    </View>
                    <Text className="text-xl font-bold mb-2 dark:text-white">John Doe</Text>
                    <Text className="text-gray-600 dark:text-gray-400 text-center mb-4">Passionate photographer capturing life's beautiful moments</Text>
                    <TouchableOpacity 
                        onPress={() => setIsDrawerVisible(true)}
                        className="bg-blue-500 px-6 py-2 rounded-full"
                    >
                        <Text className="text-white font-medium">Edit Profile</Text>
                    </TouchableOpacity>
                </View>

                {/* Friends Section */}
                <Text className="text-gray-500 dark:text-gray-400 mb-2 text-sm">
                    Friends and Requests
                </Text>
                <View className="bg-zinc-50 dark:bg-zinc-800 rounded-xl mb-6">
                    <TouchableOpacity 
                        className="flex-row items-center p-4 border-b border-gray-100 dark:border-gray-700"
                        onPress={() => setIsFriendsDrawerVisible(true)}
                    >
                        <Ionicons name="people-outline" size={24} className="text-gray-700 dark:text-gray-300" />
                        <Text className="flex-1 ml-3 text-gray-700 dark:text-gray-300">Friends</Text>
                        <View className="bg-green-600 w-6 h-6 rounded-full items-center justify-center">
                            <Text className="text-white text-sm">2</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} className="text-gray-400 ml-2" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        className="flex-row items-center p-4 border-b border-gray-100 dark:border-gray-700"
                        onPress={() => setIsRequestsSentDrawerVisible(true)}
                    >
                        <Ionicons name="paper-plane-outline" size={24} className="text-gray-700 dark:text-gray-300" />
                        <Text className="flex-1 ml-3 text-gray-700 dark:text-gray-300">Requests Sent</Text>
                        <View className="bg-green-600 w-6 h-6 rounded-full items-center justify-center">
                            <Text className="text-white text-sm">2</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} className="text-gray-400 ml-2" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        className="flex-row items-center p-4 border-b border-gray-100 dark:border-gray-700"
                        onPress={() => setIsRequestsReceivedDrawerVisible(true)}
                    >
                        <Ionicons name="mail-unread-outline" size={24} className="text-gray-700 dark:text-gray-300" />
                        <Text className="flex-1 ml-3 text-gray-700 dark:text-gray-300">Requests Received</Text>
                        <View className="bg-green-600 w-6 h-6 rounded-full items-center justify-center">
                            <Text className="text-white text-sm">2</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} className="text-gray-400 ml-2" />
                    </TouchableOpacity>
                    
                </View>

                {/* Settings Section */}
                <Text className="text-gray-500 dark:text-gray-400 mb-2 text-sm">
                    Settings
                </Text>
                <View className="bg-zinc-50 dark:bg-zinc-800 rounded-xl">
                    <View className="flex-row items-center p-4 border-b border-gray-100 dark:border-gray-700">
                        <Ionicons name="moon-outline" size={24} className="text-gray-700 dark:text-gray-300" />
                        <Text className="flex-1 ml-3 text-gray-700 dark:text-gray-300">Dark mode</Text>
                        <Switch 
                            value={colorScheme === 'dark'}
                            onValueChange={toggleTheme}
                            trackColor={{ false: "#767577", true: "#34D399" }}
                            thumbColor="#ffffff"
                        />
                    </View>

                    <TouchableOpacity className="flex-row items-center p-4">
                        <Ionicons name="log-out-outline" size={24} className="text-red-500" />
                        <Text className="ml-3 text-red-500">Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Bottom Navigation */}
            <View className="flex-row justify-between items-center py-4 px-12 bg-white dark:bg-zinc-900 absolute bottom-0 left-0 right-0 border-t border-gray-100 dark:border-gray-800">
            </View>

            {/* Profile Drawer */}
            <ProfileDrawer 
                isVisible={isDrawerVisible}
                onClose={() => setIsDrawerVisible(false)}
                currentName="John Doe"
                currentBio="Passionate photographer capturing life's beautiful moments"
                currentImage="https://res.cloudinary.com/diyxwdtjd/image/upload/v1707936470/projects/1000057087-01-photoaidcom-cropped.jpeg_pybdcn.png"
                onSave={(name, bio, image) => {
                    // Handle save logic here
                    console.log('Saving profile:', { name, bio, image });
                }}
            />

            {/* Friends Drawer */}
            <FriendsDrawer 
                isVisible={isFriendsDrawerVisible}
                onClose={() => setIsFriendsDrawerVisible(false)}
            />

            {/* Requests Received Drawer */}
            <RequestsReceivedDrawer 
                isVisible={isRequestsReceivedDrawerVisible}
                onClose={() => setIsRequestsReceivedDrawerVisible(false)}
            />

            {/* Requests Sent Drawer */}
            <RequestsSentDrawer 
                isVisible={isRequestsSentDrawerVisible}
                onClose={() => setIsRequestsSentDrawerVisible(false)}
            />
        </View>
    );
}