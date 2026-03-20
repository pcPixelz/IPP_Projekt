export default function Homescreen({navigation}) {
    return(
        <View style={styles.container}>
              <Text>Du är på "Homescreen"</Text>
              <Button
              title="Go to Profile"
              onPress={() => navigation.navigate("Profile")}
              />
              <StatusBar style="auto" />
            </View>
    );

}