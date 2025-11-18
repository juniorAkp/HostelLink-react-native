import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import AuthButton from "../../components/auth/AuthButton";
import RegularButton from "../../components/common/RegularButtont";
import { blurhash } from "../../constants/blurhash";
import { Colors, Fonts } from "../../constants/theme";
import useUserStore from "../../hooks/use-userStore";

export default function Index() {
  const { setIsGuest } = useUserStore();
  const insets = useSafeAreaInsets();

  const skip = () => {
    setIsGuest(true);
  };
  const openWebBrowser = () => {
    //change to privacy link
    Linking.openURL("https://google.com");
  };
  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom,
        },
      ]}
    >
      {/* skip button */}
      <Pressable style={styles.skip} onPress={skip}>
        <Text style={styles.skipText}>Skip</Text>
      </Pressable>

      {/* image view section*/}
      <View style={styles.imageContainer}>
        <Image
          source={require("@/assets/images/homepage_image.jpeg")}
          style={styles.image}
          placeholder={{ blurhash: blurhash }}
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
              <RegularButton
                title="Continue with Email"
                onPress={() => {}}
                color="#fff"
                buttonColor={Colors.primary}
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
    top: verticalScale(50),
    right: scale(20),
    zIndex: 10,
    padding: scale(8),
  },
  skipText: {
    fontSize: moderateScale(16),
    fontWeight: "600",
    color: Colors.light,
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
    height: verticalScale(150),
  },
  contentView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: verticalScale(30),
    paddingHorizontal: scale(24),
    paddingBottom: verticalScale(20),
  },
  tagline: {
    fontSize: moderateScale(36),
    fontFamily: Fonts.brandBlack,
    textAlign: "center",
    color: Colors.primary,
    marginBottom: verticalScale(8),
    letterSpacing: -0.5,
  },
  text: {
    fontSize: moderateScale(18),
    color: Colors.muted,
    fontFamily: Fonts.brandBold,
    marginBottom: verticalScale(40),
    textAlign: "center",
    lineHeight: verticalScale(24),
  },
  buttonContainer: {
    gap: verticalScale(14),
    width: "100%",
    marginBottom: verticalScale(20),
  },
  privacyContainer: {
    marginTop: verticalScale(4),
    paddingHorizontal: scale(10),
    width: "100%",
  },
  privacyText: {
    fontSize: moderateScale(12),
    color: "#999",
    textAlign: "center",
    lineHeight: verticalScale(16),
  },
  privacyLink: {
    color: "#4285F4",
    textDecorationLine: "underline",
    fontWeight: "500",
  },
});
