#include <WiFiS3.h>
#include <HttpClient.h>

#define WIfI_SSID "Antons iPhone"
#define WIfI_PASSWORD "12345678"
#include "projectsecrets.h"

WiFiSSLClient wificlient;
//http://github.com/amcewen/HttpClient
HttpClient client = HttpClient(wificlient, serverAddress, port);

void setup() {
  // put your setup code here, to run once:

  Serial.begin(9600);

//Kopplar från föregående wifi och kopplar sedan till det nya. I detta fallet är det samma.
  WiFi.disconnect();
  Serial.println("Disconnecting from previous Wifi");
  delay(1000);

  Serial.println("Initializing!");

//Medan arduino håller på att ansluta till wifi, skriv ut meddelanden i serial.
  while (WiFi.begin(WIfI_SSID, WIfI_PASSWORD) != WL_CONNECTED) {
    Serial.println(String("Connecting to wifi ") + WIfI_SSID);
    delay(3000);
  }

  Serial.println(String("Connected to ") + WIfI_SSID);

}

void loop() {
  // put your main code here, to run repeatedly:
  //sendToFirestore();

  readFromFirestore("test", "demo1"); //i firebase, (collection, document)
  delay(10000); // skicka var 10 sek

}

void sendToFirestore() {
  String url = "/v1/projects/" + projectId + "/databases/(default)/documents/test/demo2?key=" + apiKey;

  String payload = R"(
  {
    "fields": {
      "led": { "integerValue": "3" },
      "date": { "stringValue": "arduino" }
    }
  }
  )";

  client.beginRequest();
  //.post skapar nytt, .patch uppdaterar befintligt.
  client.post(url);
  client.sendHeader("Content-Type", "application/json");
  client.sendHeader("Content-Length", payload.length());
  client.beginBody();
  client.print(payload);
  client.endRequest();

  int statusCode = client.responseStatusCode();
  String response = client.responseBody();

  Serial.print("Status: ");
  Serial.println(statusCode);
  Serial.println(response);
}

void readFromFirestore(String firebase_collection, String firebase_document) {
  String url = "/v1/projects/" + projectId + "/databases/(default)/documents/" + firebase_collection + "/" + firebase_document + "?key=" + apiKey;

//https://github.com/arduino-libraries/ArduinoHttpClient/blob/master/examples/SimpleGet/SimpleGet.ino
  Serial.println("making GET request");
  client.get(url);

  // read the status code and body of the response
  int statusCode = client.responseStatusCode();
  String response = client.responseBody();

  Serial.print("Status code: ");
  Serial.println(statusCode);
  Serial.print("Response: ");
  Serial.println(response);
  Serial.println("Wait five seconds");
  delay(5000);
}