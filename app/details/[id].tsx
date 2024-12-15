import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import useVideoStore from "../../hooks/useVideoStore";
import { Video as VideoType } from "../../types/video";

const VideoDetailsScreen: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { videos } = useVideoStore();

  // Find the specific video by ID
  const video = videos.find((v: VideoType) => v.id === id);

  if (!video) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-xl text-red-500">Video not found</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        <View className="mb-4 rounded-lg overflow-hidden">
          <Image
            source={{ uri: video.uri }}
            style={{ width: "100%", height: 300, resizeMode: "contain" }}
            className="rounded"
          />
        </View>

        <View className="bg-gray-100 p-4 rounded-lg">
          <Text className="text-2xl font-bold mb-2">{video.name}</Text>

          {video.description && (
            <Text className="text-gray-700 mb-2">{video.description}</Text>
          )}

          <View className="flex-row justify-between mt-2">
            <Text className="text-gray-500">
              Created on: {new Date(video.createdAt).toLocaleString()}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default VideoDetailsScreen;
