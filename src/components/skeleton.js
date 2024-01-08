import React, { useEffect, useRef } from "react";
import { View, Text, Animated, Easing, StyleSheet } from "react-native";

const AnimatedSkeletonComponent = ({ isLoading, screenName }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isLoading) {
      startAnimation();
    }
  }, [isLoading]);

  const startAnimation = () => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const opacityInterpolate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  const skeletonStyle = {
    opacity: opacityInterpolate,
    backgroundColor: "lightgray",
    marginBottom: 15,
  };

  return (
    <View
      style={{
        paddingHorizontal: 10,
        marginTop: screenName === "home" ? 10 : 20,
      }}
    >
      {screenName === "profile" ? (
        <>
          <Animated.View style={[styles.imageSkeleton, skeletonStyle]} />
          <Animated.View style={[styles.skeletonRow, skeletonStyle]} />
          <Animated.View style={[styles.skeletonRow, skeletonStyle]} />
        </>
      ) : screenName === "home" ? (
        <>
          <Animated.View style={[styles.homeWelcomeName, skeletonStyle]} />
          <Animated.View style={[styles.searchInputSkeleton, skeletonStyle]} />
          <Animated.View style={[styles.reclamsSkeleton, skeletonStyle]} />
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              gap: 5,
              paddingHorizontal: 10,
              marginTop: 20,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Animated.View
                style={[styles.categorieSkeleton, skeletonStyle]}
              />
              <Animated.View
                style={[styles.categorieNameSkeleton, skeletonStyle]}
              />
            </View>

            <View style={{ alignItems: "center" }}>
              <Animated.View
                style={[styles.categorieSkeleton, skeletonStyle]}
              />
              <Animated.View
                style={[styles.categorieNameSkeleton, skeletonStyle]}
              />
            </View>

            <View style={{ alignItems: "center" }}>
              <Animated.View
                style={[styles.categorieSkeleton, skeletonStyle]}
              />
              <Animated.View
                style={[styles.categorieNameSkeleton, skeletonStyle]}
              />
            </View>

            <View style={{ alignItems: "center" }}>
              <Animated.View
                style={[styles.categorieSkeleton, skeletonStyle]}
              />
              <Animated.View
                style={[styles.categorieNameSkeleton, skeletonStyle]}
              />
            </View>
          </View>

          <Animated.View style={[styles.recommendentItem, skeletonStyle]} />
          <Animated.View
            style={[styles.recommendentItemImage, skeletonStyle]}
          />
        </>
      ) : (
        <>
          <Animated.View style={[styles.imageSkeleton, skeletonStyle]} />
          <Animated.View style={[styles.skeletonRow, skeletonStyle]} />
          <Animated.View style={[styles.skeletonRow, skeletonStyle]} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  skeletonRow: {
    height: 35,
  },
  imageSkeleton: {
    width: 130,
    height: 130,
    alignSelf: "center",
    borderRadius: 70,
  },
  specialCarouselStyle: {
    width: "100",
    height: 180,
    alignSelf: "center",
    borderRadius: 70,
  },

  // HOME
  homeWelcomeName: {
    height: 35,
    borderRadius: 70,
  },
  searchInputSkeleton: {
    height: 60,
    borderRadius: 10,
    marginTop: 3,
  },
  reclamsSkeleton: {
    width: "100",
    height: 180,
    borderRadius: 10,
  },
  categorieSkeleton: {
    height: 80,
    width: 80,
    borderRadius: 70,
  },
  categorieNameSkeleton: {
    width: 70,
    height: 15,
  },
  recommendentItem: {
    height: 40,
    borderRadius: 50,
    marginTop: 5,
  },
  recommendentItemImage: {
    height: 230,
    borderRadius: 10,
  },
});

export default AnimatedSkeletonComponent;
