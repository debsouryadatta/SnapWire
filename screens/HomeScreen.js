import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useEffect, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
// import "core-js/stable/atob"; // <- polyfill here
import { decode } from "base-64";
import User from "../components/User";
global.atob = decode;

const HomeScreen = () => {
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);
  const [users, setUsers] = useState([]);
  

  const logOut = async ()=> {
    await AsyncStorage.removeItem("authToken");
    navigation.replace("Login");
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Swift Chat</Text>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <Ionicons
            onPress={() => navigation.navigate("Chats")}
            name="chatbox-ellipses-outline"
            size={24}
            color="black"
          />
          <MaterialIcons
            onPress={() => navigation.navigate("Friends")}
            name="people-outline"
            size={24}
            color="black"
          />
          <AntDesign 
            onPress={logOut}
            name="logout" 
            size={24} 
            color="black" />
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);

      axios
        .get(`https://snapwire-backend.vercel.app/users/${userId}`)
        .then((response) => {
          console.log(response.data);
          setUsers(response.data);
        })
        .catch((error) => {
          console.log("error retrieving users", error);
        });
    };

    fetchUsers();
  }, []);

  return (
    <View>
      <View style={{padding: 10}}>
        {users.map((item, index) => {
          return <User key={index} item={item} />;
        })}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
