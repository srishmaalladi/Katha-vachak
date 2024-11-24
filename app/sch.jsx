import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const sch = () => {
  const [searchText, setSearchText] = useState('');
  const [wordCount, setWordCount] = useState(''); // Word count input
  const [qaList, setQaList] = useState([]); // List to hold scenes and generated images
  const [inputHeight, setInputHeight] = useState(50); // Initial height of the text box

  const API_URL = "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image";
  const HEADERS = {
    Authorization: "Bearer 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",
  };

  const generateImage = async (sceneText) => {
    console.log("imggen");
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({ inputs: sceneText }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate image for scene: ${sceneText}`);
      }

      const imageBlob = await response.blob();
      return URL.createObjectURL(imageBlob); // Return an object URL to display the image
    } catch (error) {
      console.error("Error generating image:", error);
      return null; // Return null in case of error
    }
  };

  const handleSearch = async () => {
    console.log(searchText+wordCount);
    if (searchText.trim()) {
      try {
        // const response = await fetch("https://bcc6-34-127-67-9.ngrok-free.app/", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     input: searchText,
        //     word_limit: wordCount ? parseInt(wordCount) : 0, // Send word count
        //   }),
        // });

        // if (!response.ok) {
        //   throw new Error(`Error: ${response.statusText}`);
        // }

        const data = [
          {
            "scene_no": 1,
            "scene_text": "The story of a young girl who is mistreated by her cruel stepmother and stepsisters, but who finds happiness and love through her kindness and hard work, is a timeless tale of perseverance and the power of love. In this article, we will explore the origins of the Cinderella story, the various adaptations and interpretations of the story, and the lessons that can be learned from the tale. The Origins of the Cinderella Story The origins of the Cinderella story can be traced back to ancient times. The earliest known version of the story is the Chinese tale of Yeh-Shen, which dates back to the 9th century."
          },
          {
            "scene_no": 2,
            "scene_text": "The story of Cinderella was also adapted into the English language in the 17th century, with the publication of the book “Cinderella; or, the Little Glass Slipper” by Charles Perrault. The Various Adaptations and Interpretations of the Story The story of Cinderella has been adapted and interpreted in numerous ways throughout history. The Lessons that Can be Learned from the Tale The Cinderella story is a timeless tale that teaches important lessons about perseverance, kindness, and the power of love. The various adaptations and interpretations of the story have added new layers of meaning and depth to the original tale, making it a story that continues to be relevant and meaningful to people of all ages."
          }
        ]
        const scenes = data; // Assuming the response is already formatted as [{ scene_no, scene_text }]

        const updatedQaList = [];
        for (const scene of scenes) {
          const imageUrl = await generateImage(scene.scene_text); // Generate image for each scene
          updatedQaList.push({
            scene_no: scene.scene_no,
            scene_text: scene.scene_text,
            image: imageUrl,
          });
        }

        setQaList((prev) => [...prev, ...updatedQaList]); // Update the QA list
        setSearchText(''); // Clear the text input
        setWordCount(''); // Clear the word count input
      } catch (error) {
        console.error("Failed to fetch story:", error);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#FFF1DB' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Q&A List Section */}
      <ScrollView
        contentContainerStyle={{ padding: 20 }}
        style={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        {qaList.map((qa, index) => (
          <View
            key={index}
            style={{
              marginBottom: 15,
              backgroundColor: '#FEF9F2',
              borderRadius: 10,
              padding: 15,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            {/* Scene No */}
            <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>
              Scene {qa.scene_no}:
            </Text>
            {/* Scene Text */}
            <Text style={{ fontSize: 16, color: '#000', marginTop: 5 }}>
              {qa.scene_text}
            </Text>
            {/* Image */}
            {qa.image && (
              <Image
                source={{ uri: qa.image }}
                style={{
                  width: '100%',
                  height: 200,
                  borderRadius: 10,
                  marginTop: 10,
                }}
                resizeMode="cover"
              />
            )}
          </View>
        ))}
      </ScrollView>

      {/* Input Section */}
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 20,
          padding: 20,
        }}
      >
        {/* Word Count Input */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <TextInput
            placeholder="Word count (optional)"
            value={wordCount}
            onChangeText={setWordCount}
            keyboardType="numeric" // Only allows numeric input
            style={{
              flex: 1,
              backgroundColor: '#FFFFFF',
              borderRadius: 10,
              padding: 10,
              fontSize: 16,
              elevation: 2,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            borderRadius: 25,
            paddingHorizontal: 15,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          {/* Magnifying Glass Icon */}
          <TouchableOpacity onPress={handleSearch}>
            <MaterialIcons name="search" size={24} color="#000" />
          </TouchableOpacity>

          {/* Text Input */}
          <TextInput
            placeholder="Type your query..."
            value={searchText}
            onChangeText={setSearchText}
            multiline={true} // Allows multiline input
            onContentSizeChange={(event) => {
              setInputHeight(event.nativeEvent.contentSize.height); // Adjust height dynamically
            }}
            style={{
              flex: 1,
              fontSize: 16,
              paddingVertical: 10,
              paddingHorizontal: 10,
              height: Math.max(50, inputHeight), // Ensure a minimum height
            }}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default sch;
