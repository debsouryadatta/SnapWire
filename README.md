<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://res.cloudinary.com/diyxwdtjd/image/upload/v1721799609/projects/icon_fpk4hr.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">SnapWire</h3>

  <p align="center">
    Connect instantly, chat effortlessly!
    <br />
    <br />
    <a href="https://github.com/debsouryadatta/snapwire-react-native">View Demo</a>
    ·
    <a href="https://github.com/debsouryadatta/snapwire-react-native/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/debsouryadatta/snapwire-react-native/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#key-features">Key Features</a></li>
        <li><a href="#snapwire-demo">SnapWire Demo</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#cloning-the-repository">Cloning the Repository</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#set-up-environment-variables">Set Up Environment Variables</a></li>
        <li><a href="#running-the-project">Running the Project</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

SnapWire is a feature-rich mobile chat application developed using React Native for the frontend and Express.js with MongoDB for the backend. This project showcases a comprehensive approach to modern mobile app development, incorporating essential chat functionalities along with advanced features. The app utilizes various technologies and libraries such as Expo, React Navigation, Axios, and JWT for authentication. SnapWire demonstrates proficiency in both frontend and backend development, including user authentication, real-time messaging, friend management, and media sharing capabilities. The development process involved tackling various challenges, from setting up the development environment to deploying the final product, making it an excellent example of a full-stack mobile application.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### SnapWire Demo
<img src="https://res.cloudinary.com/diyxwdtjd/image/upload/v1721882863/projects/1_hfectk.jpg" width="200" height="auto">
<img src="https://res.cloudinary.com/diyxwdtjd/image/upload/v1721882863/projects/2_gnkqja.jpg" width="200" height="auto">
<img src="https://res.cloudinary.com/diyxwdtjd/image/upload/v1721882863/projects/3_xvxk4j.jpg" width="200" height="auto">
<img src="https://res.cloudinary.com/diyxwdtjd/image/upload/v1721882863/projects/4_rzpzis.jpg" width="200" height="auto">
<img src="https://res.cloudinary.com/diyxwdtjd/image/upload/v1721882863/projects/5_hgsx3c.jpg" width="200" height="auto">
<img src="https://res.cloudinary.com/diyxwdtjd/image/upload/v1721882863/projects/6_llwyex.jpg" width="200" height="auto">

### Key Features
- User authentication (registration and login) with JWT token storage
- Friend request system (send, receive, and accept requests)
- Real-time chat functionality
- Image sharing in chats using device gallery
- Emoji selector for enhanced messaging experience
- User profile display with avatar images
- Friend list and chat history views
- Message deletion functionality
- Last message preview in chat list
- Automatic scroll to bottom in chat rooms
- Logout functionality
- Cross-platform compatibility (developed with React Native)
- Serverless backend deployment on Vercel
- Image storage using Cloudinary
- APK build for Android devices
- Over-the-air updates using Expo


### Built With

- React Native
- React Navigation
- Node.js
- Express.js
- MongoDB
- Cloudinary
- JWT
- Multer
- Passport.js
- Axios

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started
Follow these steps to set up the project locally on your machine.

### Prerequisites
Make sure you have the following installed on your machine:
  - Git
  - Node.js
  - npm(Node Package Manager)


### Cloning the Repository

```bash
git clone https://github.com/debsouryadatta/snapwire-react-native.git
cd snapwire-react-native
```

### Installation
Install the project dependencies using npm both for the frontend app and the backend:
```bash
npm install
cd api
npm install
```



<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- Set Up Environment Variables -->
### Set Up Environment Variables
Create a `.env` file in the api folder and add the following environment variables:
```env
MONGO_URI=

# Cloudinary Config
CLOUDINARY_UPLOAD_PRESET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```
Replace the placeholder values with your actual respective account credentials.


<!-- Running the Project -->
### Running the Project
Run the backend server:
```bash
cd api
npm start
```
Run the frontend app:
```bash
npm start
```
Open expo go app on your phone or emulator and scan the QR code shown in the terminal to run the app.


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>





<!-- CONTACT -->
## Contact

Debsourya Datta - [LinkedIn Profile](https://www.linkedin.com/in/debsourya-datta-177909225) - debsouryadatta@gmail.com

Project Link: [https://github.com/debsouryadatta/snapwire-react-native](https://github.com/debsouryadatta/snapwire-react-native)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

