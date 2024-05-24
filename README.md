### Steps of Developing the APP
1. npx create-expo-app SnapWire, cd SnapWire, npm expo start
2. Creating screens & components & api folder
3. Working inside api folder, npm i express cors body-parser mongoose multer nodemon passport passport-local jsonwebtoken
4. passport -> Authentication middleware for Node.js
5. Initialising the index.js with the basic setup of express, cors, body-parser, mongoose, multer, nodemon, passport, passport-local, jsonwebtoken
6. npm install @react-navigation/native , npx expo install react-native-screens react-native-safe-area-context , npm install @react-navigation/native-stack
7. Setting up the StackNavigator
8. Creating the LoginScreen, useState hooks for input, useNavigation hook for navigation
9. Creating the RegisterScreen similarly
10. Creating the user model & the message model in the models folder
11. Creating the endpoint for registration of user
12. Creating the handleRegister function in the RegisterScreen, npm i axios to make the post request
13. Fixing the bug: Axios error: Network Error, after a lot of research, got to know that we have to use the IP address of the expo server instead of localhost during axios post request
14. Then creating the endpoint for login of user
15. Creating the handleLogin function in the LoginScreen, npx expo install @react-native-async-storage/async-storage -> To store the token in the AsyncStorage(local storage)
16. Creating the HomeScreen, navigating to the HomeScreen after successful login
17. Creating the useEffect hook in the LoginScreen to get the authToken from the AsyncStorage, if its there redirect to the HomeScreen, or else let the user login
18. Creating the createToken function in our backend index.js to create the jwt token for the user
19. Using useLayoutEffect hook to design the header in the HomeScreen
20. npm i @expo/vector-icons, using the Ionicons in the header of the HomeScreen
21. Creating a UserContext to store the user data, wrapping the StackNavigator with the UserContext(in App.js), using the useContext hook in the HomeScreen to get the user data
22. Creating the endpoint to access all the users except the user who's is currently logged in!
23. Creating the useEffect hook in the HomeScreen to fetch the users data, npm i jwt-decode to decode the jwt token
24. Again faced an error of jwt-decode, then fixed it by npm i base-64, import { decode } from "base-64"; global.atob = decode; in the HomeScreen.js(Stack Overflow Soln)
25. Creating the User.js component to display the user data, passing the data as a prop from the HomeScreen
26. Designing the UI of the User.js component
27. Creating the endpoint to send a request to a user, adding the currentUserId to the selectedUserId friendRequests array & adding the selectedUserId to the sentFriendRequests array of the currentUserId
28. Creating the sendFriendRequest function in the User component to send the friend request
29. Creating the endpoint to show all the friend-requests of a particular user, populating only the "name email image" from the "freindRequests" field of the user
30. Creating the FriendsScreen, adding it to the StackNavigator and using it in the HomeScreen on the header friends icon
31. Designing the FriendsScreen, using the useEffect hook to fetch the friend-requests of the user
32. Creating the FriendRequest Component to display each of the friend-requests of the user, accepting props - item, friendRequests, setFriendRequests
33. Creating the endpoint to accept a friend-request of a particular person
34. Creating the acceptRequest function in the FriendRequest component to accept the friend-request
35. Creating the ChatsScreen, adding it to the StackNavigator and using it in the FriendRequest component to navigate to the ChatsScreen
36. Adding navigation to the ChatsScreen from the HomeScreen header
37. Creating the endpoint to access all the friends of the logged in user!
38. Designing the ChatsScreen, using the useEffect hook to fetch the friends of the user
39. Creating the UserChat component to display each of the friends of the user, accepting props - item
40. Designing the UserChat component.
41. Creating the ChatMessagesScreen to display the messages between the logged in user and the recipient user, adding it to the StackNavigator
42. Designing the ChatMessagesScreen, npm i react-native-emoji-selector -> To get the emoji picker, using icons from @expo/vector-icons
43. Configuring multer for indicating file uploads on the server
44. Creating the endpoint to post Messages/Images and store it in the backend
45. Creating the endpoint to get the userDetails to design the chat Room header
46. Creating the endpoint to fetch the messages between two users in the chatRoom
47. Creating the handleSend function in the ChatMessagesScreen to send the message/images to the server

48. Using the useLayoutEffect hook to design the header of the ChatMessagesScreen to show the recipient user's image and name(using useEffect hook for fetching the recipient details using the endpoint we just created) -> There is a catch, useLayoutEffect hook runs before the useEffect hook, so we have to give a recipientData in the dependency array of the useLayoutEffect hook to make it run after the useEffect hook
49. f

<!-- Invalid token specified: invalid base64, error using jwt-decode -->