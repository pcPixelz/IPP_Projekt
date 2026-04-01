#include <WiFiS3.h>

#define Wifi_SSID "Antons iPhone"
#define Wifi_Password "12345678"

#define server "bokningssystem-779e1-default-rtdb.europe-west1.firebasedatabase.app"

WiFiClient client;

void setup() {
  // put your setup code here, to run once:

  Serial.begin(9600);

  Serial.println("Initializing!");

  while (WiFi.begin(Wifi_SSID, Wifi_Password) != WL_CONNECTED) {
    Serial.println(String("Connecting to wifi ") + Wifi_SSID);
    delay(3000);
  }

  Serial.println(String("Connected to ") + Wifi_SSID);
}

void loop() {
  // put your main code here, to run repeatedly:
/*
  if (client.connect(server, 443)) {

    Serial.println("Connected to Firebase");
  }
  */

}
