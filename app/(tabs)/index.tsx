import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { RectButton } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import useVideoStore from "../../hooks/useVideoStore";
import { Video } from "@/types/video";

const VideoListItem: React.FC<{ video: Video }> = ({ video }) => {
  const router = useRouter();
  const { deleteVideo } = useVideoStore();

  const handleVideoPress = () => {
    router.push(`/details/${video.id}`);
  };

  const handleDelete = () => {
    Alert.alert("Delete Video", "Are you sure you want to delete this video?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteVideo(video.id),
      },
    ]);
  };

  const renderRightActions = () => (
    <RectButton
      style={{
        backgroundColor: "red",
        width: 80,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={handleDelete}
    >
      <Ionicons name="trash" color="white" size={24} />
    </RectButton>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity
        onPress={handleVideoPress}
        className="flex-row items-center p-4 border-b border-gray-200 bg-white"
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
    </Swipeable>
  );
};

const VideoListScreen: React.FC = () => {
  const { videos } = useVideoStore();

  if (videos.length === 0) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-xl text-gray-500 text-center">
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
