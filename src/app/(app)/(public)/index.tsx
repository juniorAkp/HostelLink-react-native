import { Linking, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import AuthButton from "../../components/auth/AuthButton";

export default function Index() {
  const openWebBrowser = () => {
    //change to privacy link
    Linking.openURL("https://google.com");
  };
  return (
    <View style={styles.container}>
      {/* image view section*/}
      <View style={styles.imageView}></View>
      {/* text view section*/}
      <View style={styles.contentView}>
        <Text style={styles.text}>Welcome to HostelLink</Text>
        <Animated.Text entering={FadeInDown}>
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
  },
  imageView: {
    flex: 0.8,
  },
  contentView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
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
