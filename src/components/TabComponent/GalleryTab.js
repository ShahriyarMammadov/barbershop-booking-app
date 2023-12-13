import React, { useState } from "react";
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from "react-native";

const GalleryTab = ({ item }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryRender = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedImage(item);
          setModalVisible(true);
        }}
        style={styles.thumbnailContainer}
      >
        <Image source={item} style={styles.thumbnail} />
      </TouchableOpacity>
    );
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={item}
        renderItem={galleryRender}
        keyExtractor={(_, index) => index.toString()}
      />
      <Modal
        animationType="slide"
        swipeDirection="down"
        onSwipeComplete={closeModal}
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalContainer}>
            <Image source={selectedImage} style={styles.modalImage} />
            <TouchableOpacity onPress={closeModal}>
              <View style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  thumbnailContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  thumbnail: {
    width: 150,
    height: 150,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: "90%",
    height: "60%",
  },
  closeButton: {
    backgroundColor: "black",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
  },
});

export default GalleryTab;
