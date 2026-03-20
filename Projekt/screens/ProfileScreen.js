export default function Homescreen({navigation}) {
    return(
        <View style={styles.container}>
              <Text>Du är på "ProfileScreen"</Text>
              <Button
              title="Go to Home"
              onPress={() => navigation.navigate("Home")}
              />
              <StatusBar style="auto" />
            </View>
    );

}