import { StatusBar } from 'expo-status-bar';
import { useState, useRef, useEffect } from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  ScrollView,
  Pressable,
  Image,
  Animated,
  Button,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
// import RNFS from 'react-native-fs';
import * as MediaLibrary from 'expo-media-library';
import mime from 'mime';
import * as FileSystem from 'expo-file-system';

// const images = [
//   require('./assets/banana.jpeg'),
//   require('./assets/grapes.jpeg'),
//   require('./assets/mango.jpeg'),
//   require('./assets/pineapple.jpeg'),
//   require('./assets/strawberry.jpeg'),
//   require('./assets/watermelon.jpeg'),
//   require('./assets/grapes.jpeg'),
//   require('./assets/mango.jpeg'),
//   require('./assets/pineapple.jpeg'),
//   require('./assets/strawberry.jpeg'),
//   require('./assets/watermelon.jpeg'),
//   require('./assets/grapes.jpeg'),
//   require('./assets/mango.jpeg'),
//   require('./assets/pineapple.jpeg'),
//   require('./assets/strawberry.jpeg'),
//   require('./assets/watermelon.jpeg'),
//   require('./assets/banana.jpeg'),
//   require('./assets/grapes.jpeg'),
//   require('./assets/mango.jpeg'),
//   require('./assets/pineapple.jpeg'),
//   require('./assets/strawberry.jpeg'),
//   require('./assets/watermelon.jpeg'),
//   require('./assets/grapes.jpeg'),
//   require('./assets/mango.jpeg'),
//   require('./assets/pineapple.jpeg'),
//   require('./assets/strawberry.jpeg'),
//   require('./assets/watermelon.jpeg'),
//   require('./assets/grapes.jpeg'),
//   require('./assets/mango.jpeg'),
//   require('./assets/pineapple.jpeg'),
//   require('./assets/strawberry.jpeg'),
//   require('./assets/watermelon.jpeg'),
//   require('./assets/banana.jpeg'),
//   require('./assets/grapes.jpeg'),
//   require('./assets/mango.jpeg'),
//   require('./assets/pineapple.jpeg'),
//   require('./assets/strawberry.jpeg'),
//   require('./assets/watermelon.jpeg'),
//   require('./assets/grapes.jpeg'),
//   require('./assets/mango.jpeg'),
//   require('./assets/pineapple.jpeg'),
//   require('./assets/strawberry.jpeg'),
//   require('./assets/watermelon.jpeg'),
//   require('./assets/grapes.jpeg'),
//   require('./assets/mango.jpeg'),
//   require('./assets/pineapple.jpeg'),
//   require('./assets/strawberry.jpeg'),
//   require('./assets/watermelon.jpeg'),
// ];

async function getImages() {
  // Request permission to access media library
  const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status === 'granted') {
    // Get all images from the media library
    const { assets } = await MediaLibrary.getAssetsAsync({
      mediaType: 'photo',
    });
    console.log(assets); // log the image assets
    return assets;
  } else {
    console.log('Media library access denied');
  }
}

async function saveImageToLibrary(imageUri) {
  // Request permission to access media library
  const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status === 'granted') {
    // Create an asset in the media library for the image file
    const asset = await MediaLibrary.createAssetAsync(imageUri);

    // (Optional) If you want to also add the image to an album
    const album = await MediaLibrary.getAlbumAsync('My Album');
    if (album == null) {
      await MediaLibrary.createAlbumAsync('My Album', asset, false);
    } else {
      await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
    }

    console.log('Image has been saved to media library!');
  } else {
    console.error('Permission to access media library was not granted.');
  }
}

export default function App() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [computedImages, setComputedImages] = useState([]);
  const [images, setImages] = useState([]);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // have a new images array for computed images
  // when submitting we add to it
  // then we show added images below preincluded images

  const windowWidth = Dimensions.get('window').width;

  // so we need to make each animated view have its own animated value so it doesnt affect the border of every single one
  const borderValues = useRef({}).current;

  // sumeet -> waterfall more than planning and modularizing, spam print statements if not going according to what you want
  const handleImagePress = (index) => {
    // deselection (guard, early return)
    getImages();

    // using array because a lot of functions given to you and it works pretty well
    // if you do a giant if statement/net; using an array would allow you to select more
    if (selectedImages.includes(index)) {
      const posOfSelected = selectedImages.indexOf(index); // 0 or 1
      setSelectedImages(selectedImages.filter((i) => i !== index));
      Animated.timing(borderValues[selectedImages[posOfSelected]], {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
      return;
    }

    // update selected states
    if (selectedImages.length === 2) {
      Animated.timing(borderValues[selectedImages[0]], {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
      setSelectedImages([...selectedImages.slice(1), index]);
    } else {
      setSelectedImages([...selectedImages, index]);
    }

    // how should we solve this?
    /*
    how should we solve this?
    hold state
    when you press
      hold previous bottom of stack
      update the states
      animate in the new
      if updates states are not the held value
      animate out
    */
    borderValues[index] = new Animated.Value(0);
    Animated.timing(borderValues[index], {
      toValue: 6,
      duration: 300,
      useNativeDriver: false,
    }).start();

    // if you have 2, show an addition button
    // check array size of 2
    // update a state of like button shown?
    // you can do it within the view itself
    // this design decision should come after you add more code, let it be gross in the beginning
  };

  const sendImages = async (image1, imageUri2) => {
    // Create a new FormData instance
    const data = new FormData();

    let assetInfo1 = await MediaLibrary.getAssetInfoAsync(image1.id);
    let assetInfo2 = await MediaLibrary.getAssetInfoAsync(image1.id);

    // Append the image data
    data.append('image1', {
      uri: assetInfo1.localUri,
      // type: 'image/jpeg', // or 'image/png' if it's a png
      type: mime.getType(image1),
      name: 'image1.jpg', // or 'image1.png'
    });
    data.append('image2', {
      uri: assetInfo2.localUri,
      type: 'image/jpeg', // or 'image/png' if it's a png
      name: 'image2.jpg', // or 'image2.png'
    });

    // Send the POST request
    const response = await fetch('http://127.0.0.1:5000/combine', {
      method: 'POST',
      body: data,
    });

    if (response.ok) {
      // Get the image data
      const imageData = await response.json();
      const base64Image = imageData.image;

      // Write the data to a file
      const filePath = FileSystem.documentDirectory + 'temp.jpg';
      await FileSystem.writeAsStringAsync(filePath, base64Image, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Save the file to the photo library
      await saveImageToLibrary(filePath);
      await fetchImages();
    }

    // Log the response for debugging purposes
    // console.log(response);
  };

  const handleEvalPress = async () => {
    // grab the images in the state that are selected
    // read the files via however you store the images (index into a list of requires)
    // format an api call
    // execute it
    // you will receive a jpg bytes and you need to put that into your image array
    // but since ts, you might not be able to?

    computedImage = await sendImages(
      images[selectedImages[0]],
      images[selectedImages[1]]
    );
  };
  const fetchImages = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === 'granted') {
      const { assets } = await MediaLibrary.getAssetsAsync({
        mediaType: 'photo',
      });
      setImages(assets);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // let images = await getImages();
  return (
    <SafeAreaView style={backgroundStyle}>
      {/* this is probably what we need to use for our app */}
      {/* Questions
        what is safe area view
        what is contentInsetAdjustmentBehavior? Command click to investigate
        git gutter 
        substitution command in vim, select everything V jjj :/s/source/dest/g*/}
      {/* Approach:
      
       */}
      <ScrollView
        contentInsetAdjustmentBehavior='automatic'
        style={backgroundStyle}
        contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
      >
        {/* lets display an image */}

        {images.map((image, index) => (
          // for each image make a pressable
          <Pressable onPress={() => handleImagePress(index)} key={index}>
            <Animated.View
              style={{
                borderWidth: borderValues[index],
                borderColor: 'black',
                height: windowWidth / 3,
                width: windowWidth / 3,
                flex: 1,
              }}
            >
              <Image
                source={{ uri: image.uri }}
                style={{
                  height: windowWidth / 3,
                  width: windowWidth / 3,
                  flex: 1,
                }}
              />
            </Animated.View>
          </Pressable>
        ))}
        {selectedImages.length === 2 ? (
          <Button title={'evaluate'} onPress={handleEvalPress}>
            =
          </Button>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
