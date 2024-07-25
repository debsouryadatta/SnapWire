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

48. Using the useLayoutEffect hook to design the header of the ChatMessagesScreen to show the recipient user's image and name(using useEffect hook for fetching the recipient details using the endpoint we just created) -> There is a catch, useLayoutEffect hook runs before the useEffect hook, so we have to give a recipientData in the dependency array of the useLayoutEffect hook to make it run after the recipientData is filled in the useEffect hook
49. Creating the fetchMessages function and calling it inside the useEffect hook to fetch the messages between the two users
50. Showing all the messages on the screen, if the message.sender == currentUserId, then show the message on the right side, else show it on the left side, also using the formatTime function to format the time of the message
51. npx expo install expo-image-picker, adding the code in the docs to the app.json
52. Creating the pickImage function to pick the image from the gallery, calling the handleSend function at the end of pickImage func to send the image to the server, calling the fetchMessages function at the end of the handleSend function
53. Error: There was an error in sending the image to the server, the fix was - The Image picker element in expo had a little change which caused the error, fixed it by changing the code in the pickImage function

54. The way to show the images in the ChatMessagesScreen was not working, so I shared all the static files in the api folder using express.static middleware and then fetched those images in the frontend through the api
55. Creating the endpoint to delete the messages!
56. Creating the handleSelectMessage func on long press on the messages, also doing the ui changes for selected messages, also adding the icons on the screenheader when messages are selected.
57. Creating the deleteMessages func to delete the selected messages, calling the deleteMessages func on the delete icon press
58. Creating the lastmessage functionality by using fetchMessages func, showing the last message on the UserChat component of the ChatsScreen
59. There was an error in the vector icons pf undo & redo, fixed it by updating the new code for vector icons
60. Adding the scrollToBottom feature in the ChatMessagesScreen, adding it to useEffect and also in the handleContentSizeChange func, handleContentSizeChange func is called when the content of ScrollView changes
61. Creating the endpoint to get the sent friend requests of a user
62. Creating the endpoint to get the ids of friends of a user
63. Creating the fetchFriendRequests func & the fetchUserFriends func in the User.js(HomeScreen) 
64. Showing all the users according to whether the user is a friend(Friends) or friend request is sent to that user(Request sent) or the user is not a friend(Add friend Option)
65. Thats all from the tutorial, now comes the Deployment part
66. Self -> Creating the logOut func in the HomeScreen, just removing the token from the async storage and navigation.replace("Login")

### Deployment
1. Building the apk file, following expo docs - https://docs.expo.dev/build/setup/ (Create your first build) -> It created the aab file but I wanted the apk file
2. To get the apk file -> 
3. Changing the eas.json according to the expo docs(link - https://docs.expo.dev/build-reference/apk/), then "eas build -p android --profile preview" to build the apk file
4. eas update (same as expo publish) -> It gives us a link through which we can run our application in the expo app, for running this you first need to follow the above steps of building the apk file
5. Apk file link - https://drive.google.com/file/d/1FT1tb7-ak-UUsKpM_SBWgdLJif9hzrmp/view?usp=drive_link
6. Expo app open link - https://expo.dev/preview/update?message=Image%20upload%20to%20cloudinary%20feature&updateRuntimeVersion=1.0.0&createdAt=2024-05-26T09%3A02%3A26.423Z&slug=exp&projectId=5ecb9c0d-6217-4c2b-b9e3-654922adeb67&group=d68465a8-bfeb-463c-8868-630a6ae747ce  (New link updated above)

7. I forgot to deploy the backend, deploying the backend to Vercel, updating the local links to the vercel links in the frontend, rebuilding the frontend following the above steps

### Changing Image uploading approach
1. From now - The images which will be stored in files folder using multer, will get uploaded to cloudinary, getting back the imageUrl which will be stored in our DB
2. npm i cloudinary, implemented cloudinary using their docs and older projects