import React from 'react';
import { View, ImageBackground, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import MaterialCommunityIcons

const image = require('../assets/images/working.png');

const index = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={image}
      style={{ flex: 1, width: '100%', height: '100%' }}
    >
      <View style={{ flex: 1, justifyContent: 'flex-start', marginTop: 50 }}>
        {/* View for Button at the top */}
        <View style={{ alignItems: 'flex-end', paddingRight: 20 }}>
          {/* Button with Icon */}
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Sch')}
            style={{
              backgroundColor: 'transparent', // Button background color
              borderRadius: 30, // Rounded button
              paddingVertical: 20, // Increased vertical padding for a larger button
              paddingHorizontal: 40, // Increased horizontal padding for a larger button
              elevation: 4, // Shadow effect
            }}
            labelStyle={{
              fontSize: 20, // Larger text size
              color: 'black', // Text color
            }}
            contentStyle={{
              flexDirection: 'row-reverse', // Icon appears to the right of text
              alignItems: 'center',
            }}
          >
            <MaterialCommunityIcons
              name="arrow-right-circle" // Icon name
              size={50} // Increased icon size
              color="black" // Icon color
              style={{ marginLeft: 10 }} // Space between text and icon
            />
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
};

export default index;
