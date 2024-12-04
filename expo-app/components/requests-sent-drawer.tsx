import React from 'react';
import { View, Text, TouchableOpacity, Modal, Animated, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SentRequest {
    id: string;
    name: string;
    username: string;
    avatar: string;
}

interface RequestsSentDrawerProps {
    isVisible: boolean;
    onClose: () => void;
}

const sampleSentRequests: SentRequest[] = [
    {
        id: '1',
        name: 'James Wilson',
        username: 'jameswilson',
        avatar: 'https://example.com/avatar1.jpg'
    },
    {
        id: '2',
        name: 'Emily Brown',
        username: 'emilybrown',
        avatar: 'https://example.com/avatar2.jpg'
    },
    {
        id: '3',
        name: 'David Lee',
        username: 'davidlee',
        avatar: 'https://example.com/avatar3.jpg'
    },
    {
        id: '4',
        name: 'Sophie Taylor',
        username: 'sophietaylor',
        avatar: 'https://example.com/avatar4.jpg'
    },
    {
        id: '5',
        name: 'Michael Chen',
        username: 'michaelchen',
        avatar: 'https://example.com/avatar5.jpg'
    }
];

export default function RequestsSentDrawer({ isVisible, onClose }: RequestsSentDrawerProps) {
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

    const handleWithdraw = (requestId: string) => {
        // Handle withdraw friend request logic here
        console.log('Withdraw friend request:', requestId);
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
                            <Text className="text-xl font-bold dark:text-white">Sent Requests</Text>
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
                            {sampleSentRequests.map((request) => (
                                <View 
                                    key={request.id}
                                    className="flex-row items-center justify-between py-4 border-b border-gray-700"
                                >
                                    <View className="flex-row items-center flex-1">
                                        <Image
                                            source={{ uri: request.avatar }}
                                            className="w-12 h-12 rounded-full bg-gray-300"
                                        />
                                        <View className="ml-3 flex-1">
                                            <Text className="text-white font-medium">{request.name}</Text>
                                            <Text className="text-gray-400">@{request.username}</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => handleWithdraw(request.id)}
                                        className="px-4 py-2 rounded-full bg-red-500 items-center justify-center"
                                    >
                                        <Text className="text-white font-medium">Withdraw</Text>
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