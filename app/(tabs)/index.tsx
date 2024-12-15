import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { Video as VideoType } from "../../types/video";
import useVideoStore from "../../hooks/useVideoStore";

const VideoListItem: React.FC<{ video: VideoType }> = ({ video }) => {
  const router = useRouter();

  const handleVideoPress = () => {
    router.push(`/details/${video.id}`);
  };

  return (
    <TouchableOpacity
      onPress={handleVideoPress}
      className="flex-row items-center p-4 border-b border-gray-200"
    >
      <View className="mr-4 w-20 h-20">
        <Image
          source={{ uri: video.uri }}
          style={{ width: 80, height: 80, resizeMode: "cover" }}
          className="rounded"
        />
      </View>
      <View className="flex-1">
        <Text className="text-lg font-bold">{video.name}</Text>
        <Text className="text-gray-600 text-sm">
          {new Date(video.createdAt).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const VideoListScreen: React.FC = () => {
  const { videos } = useVideoStore();

  if (videos.length === 0) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-xl text-gray-500">
          No videos cropped yet. Start creating your video diary!
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <VideoListItem video={item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default VideoListScreen;
