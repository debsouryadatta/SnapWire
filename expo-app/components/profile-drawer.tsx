import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated, Image, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

interface ProfileDrawerProps {
    isVisible: boolean;
    onClose: () => void;
    currentName: string;
    currentBio: string;
    currentImage: string;
    onSave: (name: string, bio: string, image: string) => void;
}

export default function ProfileDrawer({
    isVisible,
    onClose,
    currentName,
    currentBio,
    currentImage,
    onSave
}: ProfileDrawerProps) {
    const [name, setName] = useState(currentName);
    const [bio, setBio] = useState(currentBio);
    const [image, setImage] = useState(currentImage);
    const slideAnim = useRef(new Animated.Value(0)).current;

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

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleSave = () => {
        onSave(name, bio, image);
        onClose();
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
                    className="bg-white dark:bg-zinc-800 rounded-t-3xl mx-4 mb-20 shadow-lg"
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
                            <Text className="text-xl font-bold dark:text-white">Edit Profile</Text>
                            <TouchableOpacity 
                                onPress={onClose}
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-700"
                            >
                                <Ionicons name="close" size={24} className="text-gray-600 dark:text-gray-300" />
                            </TouchableOpacity>
                        </View>

                        {/* Profile Picture Section */}
                        <View className="items-center mb-6">
                            <TouchableOpacity onPress={pickImage} className="relative">
                                <Image
                                    source={{ uri: image }}
                                    className="w-24 h-24 rounded-full"
                                />
                                <View className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full">
                                    <Ionicons name="camera" size={16} color="white" />
                                </View>
                            </TouchableOpacity>
                        </View>

                        {/* Name Input */}
                        <View className="mb-4">
                            <Text className="text-sm font-medium mb-2 dark:text-gray-300">Name</Text>
                            <TextInput
                                value={name}
                                onChangeText={setName}
                                className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-zinc-700 dark:text-white"
                                placeholder="Enter your name"
                                placeholderTextColor="#9CA3AF"
                            />
                        </View>

                        {/* Bio Input */}
                        <View className="mb-6">
                            <Text className="text-sm font-medium mb-2 dark:text-gray-300">Bio</Text>
                            <TextInput
                                value={bio}
                                onChangeText={setBio}
                                className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-zinc-700 dark:text-white"
                                placeholder="Write something about yourself"
                                placeholderTextColor="#9CA3AF"
                                multiline
                                numberOfLines={3}
                            />
                        </View>

                        {/* Save Button */}
                        <TouchableOpacity
                            onPress={handleSave}
                            className="w-full bg-blue-500 p-4 rounded-lg items-center"
                        >
                            <Text className="text-white font-semibold">Save Changes</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
}