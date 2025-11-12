import { Link } from "expo-router";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthButton from "../../components/auth/AuthButton";
import { Colors, Fonts } from "../../constants/theme";

export default function Index() {
  const openWebBrowser = () => {
    //change to privacy link
    Linking.openURL("https://google.com");
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* skip button */}
      <Pressable style={styles.skip}>
        <Text style={styles.skipText}>Skip</Text>
      </Pressable>
      {/* image view section*/}
      <View style={styles.imageView}></View>
      {/* text view section*/}
      <View style={styles.contentView}>
        <Animated.Text style={styles.tagline} entering={FadeInDown}>
          HostelLink
        </Animated.Text>
        <Animated.Text style={styles.text} entering={FadeInDown}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skip: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
  },
  skipText: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.primary,
  },
  imageView: {
    flex: 0.8,
  },
  contentView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  text: {
    fontSize: 20,
    color: "#000",
    fontFamily: Fonts.brandBold,
    marginBottom: 30,
    lineHeight: 36,
  },
  tagline: {
    fontSize: 32,
    fontFamily: Fonts.brandBlack,
    textAlign: "center",
    lineHeight: 36,
  },
  buttonContainer: {
    gap: 12,
    width: "100%",
  },
  privacyContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
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
  },
});
