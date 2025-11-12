import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import {
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import AuthButton from "../../components/auth/AuthButton";
import { Colors, Fonts } from "../../constants/theme";

export default function Index() {
  const openWebBrowser = () => {
    //change to privacy link
    Linking.openURL("https://google.com");
  };
  return (
    <View style={styles.container}>
      {/* skip button */}
      <Pressable style={styles.skip}>
        <Text style={styles.skipText}>Skip</Text>
      </Pressable>

      {/* image view section*/}
      <View style={styles.imageContainer}>
        <Image
          source={require("@/assets/images/homepage_image.jpeg")}
          style={styles.image}
          resizeMode="cover"
        />
        <LinearGradient
          colors={["transparent", "rgba(255,255,255,0.7)", "#fff"]}
          style={styles.gradient}
        />
      </View>

      {/* text view section*/}
      <View style={styles.contentView}>
        <Animated.Text style={styles.tagline} entering={FadeInDown}>
          HostelLink
        </Animated.Text>
        <Animated.Text style={styles.text} entering={FadeInDown.delay(50)}>
          Find Hostels near you
        </Animated.Text>

        <View style={styles.buttonContainer}>
          <Animated.View entering={FadeInDown.delay(100)}>
            <AuthButton
              title="Continue with Google"
              onPress={() => {}}
              color="#fff"
              icon="logo-google"
              buttonColor="#000"
            />
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(200)}>
            <AuthButton
              title="Continue with Apple"
              onPress={() => {}}
              color="#fff"
              icon="logo-apple"
              buttonColor="#000"
            />
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(300)}>
            <Link href="/other-options" asChild>
              <AuthButton
                title="Continue with Email"
                onPress={() => {}}
                color="#fff"
                icon="mail"
                buttonColor="#4285F4"
              />
            </Link>
          </Animated.View>
        </View>

        <Animated.View
          style={styles.privacyContainer}
          entering={FadeInDown.delay(400)}
        >
          <Text style={styles.privacyText}>
            Please visit{" "}
            <Text style={styles.privacyLink} onPress={openWebBrowser}>
              HostelLink Privacy Statement
            </Text>{" "}
            to learn about personal data processing at HostelLink.
          </Text>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  skip: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 10,
    padding: 8,
  },
  skipText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary,
  },
  imageContainer: {
    width: "100%",
    height: "45%",
    position: "relative",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
  },
  contentView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 30,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  tagline: {
    fontSize: 36,
    fontFamily: Fonts.brandBlack,
    textAlign: "center",
    color: Colors.primary,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  text: {
    fontSize: 18,
    color: Colors.muted,
    fontFamily: Fonts.brandBold,
    marginBottom: 40,
    textAlign: "center",
    lineHeight: 24,
  },
  buttonContainer: {
    gap: 14,
    width: "100%",
    marginBottom: 20,
  },
  privacyContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
    width: "100%",
  },
  privacyText: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    lineHeight: 18,
  },
  privacyLink: {
    color: "#4285F4",
    textDecorationLine: "underline",
    fontWeight: "500",
  },
});
