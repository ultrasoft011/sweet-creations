import React, { useEffect } from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  runOnJS,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  const navigateToHome = () => {
    router.replace('/(tabs)');
  };

  useEffect(() => {
    // Animación de entrada del logo
    opacity.value = withTiming(1, { duration: 1000 });
    scale.value = withSequence(
      withTiming(1.1, { duration: 800 }),
      withTiming(1, { duration: 200 }),
      withTiming(1, { duration: 1000 }, () => {
        // Después de 3 segundos total, navegar a la pantalla principal
        runOnJS(navigateToHome)();
      })
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, animatedStyle]}>
        <Image
          source={require('@/assets/images/logo-sweet.png')}
          style={styles.logo}
          resizeMode="cover"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  logoContainer: {
    flex: 1,
    width: width,
    height: height,
  },
  logo: {
    width: width,
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
