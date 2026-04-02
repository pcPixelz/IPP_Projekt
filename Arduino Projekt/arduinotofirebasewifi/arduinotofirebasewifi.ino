#include <WiFiS3.h>
#include <Firebase.h>

#define WIfI_SSID "Antons iPhone"
#define WIfI_PASSWORD "12345678"

#define REFERENCE_URL "bokningssystem-779e1-default-rtdb.europe-west1.firebasedatabase.app"

WiFiClient client;

Firebase fb(REFERENCE_URL);

void setup() {
  // put your setup code here, to run once:

  Serial.begin(9600);

  WiFi.disconnect();
  Serial.println("Disconnecting from previous Wifi");
  delay(1000);

  Serial.println("Initializing!");

  while (WiFi.begin(WIfI_SSID, WIfI_PASSWORD) != WL_CONNECTED) {
    Serial.println(String("Connecting to wifi ") + WIfI_SSID);
    delay(3000);
  }

  Serial.println(String("Connected to ") + WIfI_SSID);
}


//https://github.com/Rupakpoddar/FirebaseArduino/blob/main/examples/Basic/Basic.ino
void loop() {
  // put your main code here, to run repeatedly:
   int responseCode;

    // Example integer to send
    int myValue = 3;  // replace this with your variable or sensor reading

    // Push the integer to the "test" collection
    responseCode = fb.pushInt("test", myValue);

    Serial.print("Pushed integer: ");
    Serial.print(myValue);
    Serial.print(" - Response Code: ");
    Serial.println(responseCode);

    delay(2000); // Wait 2 seconds before sending the next value

}
