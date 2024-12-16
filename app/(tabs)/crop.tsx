import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import VideoSelectionModal from "../../components/VideoSelectionModal";
import { useVideoPlayer, VideoView } from "expo-video";

const CropScreen: React.FC = () => {
  const router = useRouter();
  const [selectedVideoUri, setSelectedVideoUri] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const videoRef = useRef<VideoView | null>(null);

  const handleVideoSelected = (videoUri: string) => {
    setSelectedVideoUri(videoUri);
  };
  const player = useVideoPlayer(selectedVideoUri, (player) => {
    player.loop = true;
    player.play();
  });
  const handleStartCropping = () => {
    if (selectedVideoUri) {
      router.push({
        pathname: "/video-cropper",
        params: { videoUri: selectedVideoUri },
      });
    }
  };

  return (
    <View className="flex-1 bg-white p-6 justify-center">
      <VideoSelectionModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onVideoSelected={handleVideoSelected}
      />

      {selectedVideoUri ? (
        <View className="items-center">
          <Text className="text-xl font-bold mb-4">Selected Video Preview</Text>
          <VideoView
            ref={videoRef}
            player={player}
            style={{ width: 300, height: 200 }}
            allowsFullscreen
            allowsPictureInPicture
          />
          <TouchableOpacity
            onPress={handleStartCropping}
            className="bg-blue-500 p-4 rounded-lg w-full mt-4"
          >
            <Text className="text-white text-center text-lg font-semibold">
              Start Cropping
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsModalVisible(true)}
            className="bg-gray-200 p-4 rounded-lg w-full mt-4"
          >
            <Text className="text-black text-center text-lg font-semibold">
              Select Different Video
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="items-center">
          <Text className="text-xl font-bold mb-6 text-center">
            Select a Video to Crop
          </Text>
          <TouchableOpacity
            onPress={() => setIsModalVisible(true)}
            className="bg-blue-500 p-4 rounded-lg w-full"
          >
            <Text className="text-white text-center text-lg font-semibold">
              Choose Video
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CropScreen;
