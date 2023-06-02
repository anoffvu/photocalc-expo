import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
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
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function App() {
  const [firstSelectedIndex, setFirstSelectedIndex] = useState(-1);
  const [secondSelectedIndex, setSecondSelectedIndex] = useState(-1);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const images = [
    require('./assets/banana.jpeg'),
    require('./assets/grapes.jpeg'),
    require('./assets/mango.jpeg'),
    require('./assets/pineapple.jpeg'),
    require('./assets/strawberry.jpeg'),
    require('./assets/watermelon.jpeg'),
    require('./assets/grapes.jpeg'),
    require('./assets/mango.jpeg'),
    require('./assets/pineapple.jpeg'),
    require('./assets/strawberry.jpeg'),
    require('./assets/watermelon.jpeg'),
    require('./assets/grapes.jpeg'),
    require('./assets/mango.jpeg'),
    require('./assets/pineapple.jpeg'),
    require('./assets/strawberry.jpeg'),
    require('./assets/watermelon.jpeg'),
    require('./assets/banana.jpeg'),
    require('./assets/grapes.jpeg'),
    require('./assets/mango.jpeg'),
    require('./assets/pineapple.jpeg'),
    require('./assets/strawberry.jpeg'),
    require('./assets/watermelon.jpeg'),
    require('./assets/grapes.jpeg'),
    require('./assets/mango.jpeg'),
    require('./assets/pineapple.jpeg'),
    require('./assets/strawberry.jpeg'),
    require('./assets/watermelon.jpeg'),
    require('./assets/grapes.jpeg'),
    require('./assets/mango.jpeg'),
    require('./assets/pineapple.jpeg'),
    require('./assets/strawberry.jpeg'),
    require('./assets/watermelon.jpeg'),
    require('./assets/banana.jpeg'),
    require('./assets/grapes.jpeg'),
    require('./assets/mango.jpeg'),
    require('./assets/pineapple.jpeg'),
    require('./assets/strawberry.jpeg'),
    require('./assets/watermelon.jpeg'),
    require('./assets/grapes.jpeg'),
    require('./assets/mango.jpeg'),
    require('./assets/pineapple.jpeg'),
    require('./assets/strawberry.jpeg'),
    require('./assets/watermelon.jpeg'),
    require('./assets/grapes.jpeg'),
    require('./assets/mango.jpeg'),
    require('./assets/pineapple.jpeg'),
    require('./assets/strawberry.jpeg'),
    require('./assets/watermelon.jpeg'),
  ];

  const windowWidth = Dimensions.get('window').width;

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
          <Pressable
            onPress={() => {
              // can abstract this out and check for things like, deselecting, doing nothing on double press etc.
              setFirstSelectedIndex(secondSelectedIndex);
              setSecondSelectedIndex(index);
              console.log(index);
              console.log(secondSelectedIndex);
            }}
            key={index}
          >
            <View>
              <Image
                source={image}
                style={{
                  height: windowWidth / 3,
                  width: windowWidth / 3,
                  flex: 1,
                  borderWidth:
                    index === firstSelectedIndex ||
                    index === secondSelectedIndex
                      ? 3
                      : 0,
                  transition: 'border-width 1s ease-in-out',
                }}
              />
            </View>
          </Pressable>
        ))}
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
