import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import ShootingStyle from "./styles/ShootingStyle";
import facescan from "../../assets/image/face-scan.png";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import Row from "../../components/Row/RowHome/Row";
import UserInfo from "../../components/UserInfo/UserInfo.js";

const Shooting = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params;
  const [selectedFile, setSelectedFile] = useState(null);
  const [isOpenCamera, setIsOpenCamera] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);


  let cameraRef = useRef(null);

  const handleStartTesting = () => {
    if (!selectedFile || !selectedFile.type) {
      alert("Please upload or capture an image before testing.");
      return;
    }
  
    const fileExtension = selectedFile.uri.split(".").pop(); // Lấy phần mở rộng của file từ uri
  
    const formData = new FormData();
    formData.append("image", {
      uri: selectedFile.uri,
      name: "image." + fileExtension,
      type: selectedFile.type,
    });
  
    axios
      .post("http://192.168.100.6:5000/process", formData)  // Replace with your Flask API host and port
      .then((response) => {
        let result = response.data.predicted_class;
        console.log('Result: ', result);
        navigation.navigate("Result", { imageUrl: selectedFile.uri, result: result, user: route.params.user });
      })
      .catch((error) => {
        console.log(error);
      });
  };  

  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      // Check if already capturing a photo
      if (isCapturing) {
        return;
      }

      // Set capturing flag
      setIsCapturing(true);

      try {
        let photo = await cameraRef.current.takePictureAsync({ base64: true });
        setSelectedFile({
          uri: `data:image/jpg;base64,${photo.base64}`,  // Set the uri with the base64 image data
          type: 'image/jpg',  // Set the image type
        });
        setIsOpenCamera(false);
      } catch (error) {
        console.log(error);
      } finally {
        // Reset capturing flag
        setIsCapturing(false);
      }
    }
  };

  const handleChooseFromGallery = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedFile(result.assets[0]);
        setIsOpenCamera(false);
        setIsCameraReady(false);
      } else {
        alert("No image selected.");
      }
    } catch (error) {
      console.log("Error selecting image from gallery:", error);
      alert("An error occurred while selecting an image from the gallery.");
    }
  };

  const handleCameraReady = () => {
    setIsCameraReady(true);
  };

  useEffect(() => {
    const getCameraPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access the camera was denied.");
      }
    };

    getCameraPermission();
  }, []);

  const toggleCamera = () => {
    setIsOpenCamera((prevState) => !prevState);
  };

  const handleToggleCameraAndTakePhoto = () => {
    if (!isOpenCamera) {
      toggleCamera();
    } else {
      handleTakePhoto();
      setIsCameraReady(!isCameraReady);
    }
  };

  const toggleCameraType = () => {
    setCameraType(prevCameraType =>
      prevCameraType === Camera.Constants.Type.front
        ? Camera.Constants.Type.back
        : Camera.Constants.Type.front
    );
  };
  

  const handleSignOut = () => { 
    navigation.navigate("Login");
  };

  const handleHome = () => { 
    navigation.navigate("Home", { user: route.params.user });
  };

  return (
    <View style={ShootingStyle.container}>
      <View style={ShootingStyle.topinfo}>
        <View style={ShootingStyle.info}>
          <Row handleHome={handleHome}/>
          <UserInfo userName={user.name} handleSignOut={handleSignOut} />     
        </View>
        <View style={ShootingStyle.mainphoto}>
          <View style={ShootingStyle.content}>
            <View style={ShootingStyle.elipse2}>
              <View style={ShootingStyle.elipse}>
              {isOpenCamera ? (
                  <Camera
                    style={ShootingStyle.camera}
                    type={cameraType}
                    ref={cameraRef}
                    onCameraReady={handleCameraReady}
                  />
                ) : selectedFile ? (
                  <Image
                    source={{ uri: selectedFile.uri }}
                    style={ShootingStyle.selectedImage}
                  />
                ) : (
                  <Image
                    source={facescan}
                    style={ShootingStyle.defaultImage}
                  />
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={ShootingStyle.bottominfo}>
        <View style={ShootingStyle.buttonmenu}>
          <View style={ShootingStyle.upload}>
            <TouchableOpacity
              onPress={handleToggleCameraAndTakePhoto}
              style={ShootingStyle.rectangleB}
            >
              <FontAwesomeIcon icon="camera" size={30} color="#5C6A7E" />
            </TouchableOpacity>
            {isCameraReady ? (
            <TouchableOpacity
              onPress={toggleCameraType}
              style={ShootingStyle.rectangleB}
            >
              <FontAwesomeIcon icon="camera-rotate" size={30} color="#5C6A7E" />
            </TouchableOpacity>
          )
          :
          (
            <TouchableOpacity
              onPress={handleChooseFromGallery}
              style={ShootingStyle.rectangleB}
            >
              <FontAwesomeIcon icon="image" size={30} color="#5C6A7E" />
            </TouchableOpacity>
          )}
          </View>
          <View style={ShootingStyle.test}>
            <TouchableOpacity
              onPress={handleStartTesting}
              style={ShootingStyle.rectangleC}
            >
              <Text style={ShootingStyle.testText}>Start Testing</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Shooting;
