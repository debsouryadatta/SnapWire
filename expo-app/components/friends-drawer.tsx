import React from 'react';
import { View, Text, TouchableOpacity, Modal, Animated, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Friend {
    id: string;
    name: string;
    username: string;
    avatar: string;
}

interface FriendsDrawerProps {
    isVisible: boolean;
    onClose: () => void;
}

const sampleFriends: Friend[] = [
    {
        id: '1',
        name: 'Hanna Carroll',
        username: 'hannacarroll',
        avatar: 'https://example.com/avatar1.jpg'
    },
    {
        id: '2',
        name: 'Gabriel Mendes',
        username: 'gabimendes',
        avatar: 'https://example.com/avatar2.jpg'
    },
    {
        id: '3',
        name: 'Frank Williamson',
        username: 'williamson24',
        avatar: 'https://example.com/avatar3.jpg'
    },
    {
        id: '4',
        name: 'Theresa Warren',
        username: 'theresa_warren',
        avatar: 'https://example.com/avatar4.jpg'
    },
    {
        id: '5',
        name: 'Wesley Stones',
        username: 'stoneswesley',
        avatar: 'https://example.com/avatar5.jpg'
    },
    {
        id: '5',
        name: 'Wesley Stones',
        username: 'stoneswesley',
        avatar: 'https://example.com/avatar5.jpg'
    },
    {
        id: '5',
        name: 'Wesley Stones',
        username: 'stoneswesley',
        avatar: 'https://example.com/avatar5.jpg'
    },
    {
        id: '5',
        name: 'Wesley Stones',
        username: 'stoneswesley',
        avatar: 'https://example.com/avatar5.jpg'
    },
    {
        id: '5',
        name: 'Wesley Stones',
        username: 'stoneswesley',
        avatar: 'https://example.com/avatar5.jpg'
    },
];

export default function FriendsDrawer({ isVisible, onClose }: FriendsDrawerProps) {
    const slideAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        if (isVisible) {
            Animated.spring(slideAnim, {
                toValue: 1,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.spring(slideAnim, {
                toValue: 0,
                useNativeDriver: true,
            }).start();
        }
    }, [isVisible]);

    const handleChat = (friendId: string) => {
        // Handle chat navigation here
        console.log('Navigate to chat with friend:', friendId);
    };

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View className="flex-1 bg-black/30 justify-end">
                <Animated.View
                    className="bg-white dark:bg-zinc-800 rounded-t-3xl mx-4 mb-8 shadow-lg"
                    style={{
                        transform: [{
                            translateY: slideAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1000, 0],
                            }),
                        }],
                    }}
                >
                    <View className="p-6 bg-zinc-50 dark:bg-zinc-800 rounded-2xl">
                        <View className="w-12 h-1 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4" />
                        <View className="flex-row justify-between items-center mb-6">
                            <Text className="text-xl font-bold dark:text-white">Friends</Text>
                            <TouchableOpacity 
                                onPress={onClose}
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-700"
                            >
                                <Ionicons name="close" size={24} className="text-gray-600 dark:text-gray-300" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView 
                            className="max-h-[600px]" 
                            showsVerticalScrollIndicator={false}
                        >
                            {sampleFriends.map((friend) => (
                                <View 
                                    key={friend.id}
                                    className="flex-row items-center justify-between py-4 border-b border-gray-700"
                                >
                                    <View className="flex-row items-center flex-1">
                                        <Image
                                            source={{ uri: friend.avatar }}
                                            className="w-12 h-12 rounded-full bg-gray-300"
                                        />
                                        <View className="ml-3 flex-1">
                                            <Text className="text-white font-medium">{friend.name}</Text>
                                            <Text className="text-gray-400">@{friend.username}</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => handleChat(friend.id)}
                                        className="p-3 rounded-full bg-blue-500 items-center justify-center"
                                    >
                                        <Ionicons name="chatbubble-outline" size={20} color="white" />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
}