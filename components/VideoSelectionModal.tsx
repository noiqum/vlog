import React from "react";
import { View, Text, TouchableOpacity, Modal, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Ionicons } from "@expo/vector-icons";

interface VideoSelectionModalProps {
  isVisible: boolean;
  onClose: () => void;
  onVideoSelected: (videoUri: string) => void;
}

const VideoSelectionModal: React.FC<VideoSelectionModalProps> = ({
  isVisible,
  onClose,
  onVideoSelected,
}) => {
  const pickVideoFromDocuments = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "video/*", // Filters to video files only
        copyToCacheDirectory: true,
      });
      console.log("Document Picker Result:", result);
      if (result.assets && result.assets.length > 0) {
        onVideoSelected(result.assets[0].uri);
        onClose();
      } else {
        console.log("Document picker cancelled.");
      }
    } catch (error) {
      console.error("Error picking document:", error);
      Alert.alert("Error", "Failed to select video. Please try again.");
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white w-[90%] rounded-lg p-6 items-center">
          <Text className="text-xl font-bold mb-6">Select Video</Text>

          <TouchableOpacity
            onPress={pickVideoFromDocuments}
            className="flex-row items-center bg-blue-500 p-4 rounded-lg w-full mb-4"
          >
            <Ionicons
              name="document"
              size={24}
              color="white"
              className="mr-3"
            />
            <Text className="text-white text-lg font-semibold">
              Pick Video File
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onClose}
            className="bg-gray-200 p-4 rounded-lg w-full"
          >
            <Text className="text-black text-lg font-semibold text-center">
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default VideoSelectionModal;
