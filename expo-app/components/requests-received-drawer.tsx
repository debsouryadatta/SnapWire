import React from 'react';
import { View, Text, TouchableOpacity, Modal, Animated, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FriendRequest {
    id: string;
    name: string;
    username: string;
    avatar: string;
}

interface RequestsReceivedDrawerProps {
    isVisible: boolean;
    onClose: () => void;
}

const sampleRequests: FriendRequest[] = [
    {
        id: '1',
        name: 'Sarah Johnson',
        username: 'sarahj',
        avatar: 'https://example.com/avatar1.jpg'
    },
    {
        id: '2',
        name: 'Mike Chen',
        username: 'mikechen',
        avatar: 'https://example.com/avatar2.jpg'
    },
    {
        id: '3',
        name: 'Emma Davis',
        username: 'emmad',
        avatar: 'https://example.com/avatar3.jpg'
    },
    {
        id: '4',
        name: 'Alex Turner',
        username: 'alexturner',
        avatar: 'https://example.com/avatar4.jpg'
    },
    {
        id: '5',
        name: 'Lisa Wang',
        username: 'lisawang',
        avatar: 'https://example.com/avatar5.jpg'
    }
];

export default function RequestsReceivedDrawer({ isVisible, onClose }: RequestsReceivedDrawerProps) {
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

    const handleAccept = (requestId: string) => {
        // Handle accept friend request logic here
        console.log('Accept friend request:', requestId);
    };

    const handleReject = (requestId: string) => {
        // Handle reject friend request logic here
        console.log('Reject friend request:', requestId);
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
                            <Text className="text-xl font-bold dark:text-white">Friend Requests</Text>
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
                            {sampleRequests.map((request) => (
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
                                    <View className="flex-row space-x-2">
                                        <TouchableOpacity
                                            onPress={() => handleAccept(request.id)}
                                            className="p-3 rounded-full bg-green-500 items-center justify-center"
                                        >
                                            <Ionicons name="checkmark-outline" size={20} color="white" />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => handleReject(request.id)}
                                            className="p-3 rounded-full bg-red-500 items-center justify-center"
                                        >
                                            <Ionicons name="close-outline" size={20} color="white" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
}