#include <WiFiS3.h>
#include <HttpClient.h>
#include "Arduino_LED_Matrix.h"
//https://arduinojson.org/
#include <ArduinoJson.h>

#include "projectsecrets.h"

WiFiSSLClient wificlient;
//http://github.com/amcewen/HttpClient
HttpClient client = HttpClient(wificlient, serverAddress, port);

ArduinoLEDMatrix matrix;

byte frameOpen[8][12] = {
  { 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 },
  { 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 },
  { 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1 },
  { 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1 },
  { 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1 },
  { 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1 },
  { 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 },
  { 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 }
};

byte frameClose[8][12] = {
  { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
  { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
  { 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0 },
  { 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0 },
  { 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0 },
  { 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0 },
  { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
  { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 }
};

byte frameStandard[8][12] = {
  { 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 },
  { 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 },
  { 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 },
  { 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 },
  { 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 },
  { 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 },
  { 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 },
  { 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 }
};

byte frameWifiConnecting[8][12] = {
  { 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0 },
  { 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0 },
  { 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0 },
  { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
  { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
  { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
  { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
  { 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0 }
};

byte frameWifiConnected[8][12] = {
  { 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1 },
  { 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1 },
  { 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1 },
  { 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 },
  { 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 },
  { 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 },
  { 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 },
  { 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1 }
};

void setup() {
  // put your setup code here, to run once:
  pinMode(13, OUTPUT);

  Serial.begin(9600);

//Kopplar från föregående wifi och kopplar sedan till det nya. I detta fallet är det samma.
  WiFi.disconnect();
  Serial.println("Disconnecting from previous Wifi");
  delay(1000);

  matrix.begin();

  Serial.println("Initializing!");

//Medan arduino håller på att ansluta till wifi, skriv ut meddelanden i serial.
  while (WiFi.begin(WIfI_SSID, WIfI_PASSWORD) != WL_CONNECTED) {
    Serial.println(String("Connecting to wifi ") + WIfI_SSID);
    matrix.renderBitmap(frameWifiConnecting, 8, 12);
    delay(3000);
  }

  Serial.println(String("Connected to ") + WIfI_SSID);
  matrix.renderBitmap(frameWifiConnected, 8, 12);

}

void loop() {
  // put your main code here, to run repeatedly:
  //sendToFirestore();
  bool value = readBoolFromFirestore("islocked", "Reservations", "demo1"); //i firebase, (field, collection, document)
  if(value == true)
  {
      matrix.renderBitmap(frameOpen, 8, 12);
      digitalWrite(13, LOW);
  }
  else if (value == false)
  {
      matrix.renderBitmap(frameClose, 8, 12);
      digitalWrite(13, HIGH);
  }
  else
  {
    matrix.renderBitmap(frameStandard, 8, 12);
  }
  delay(3000); // vänta x/1000 sek mellan skicka/läsa

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

bool readBoolFromFirestore(String field, String firebase_collection, String firebase_document) {
  String url = "/v1/projects/" + projectId + "/databases/(default)/documents/" + firebase_collection + "/" + firebase_document + "?key=" + apiKey;

//https://github.com/arduino-libraries/ArduinoHttpClient/blob/master/examples/SimpleGet/SimpleGet.ino
  Serial.println("making GET request");
  client.get(url);

  // read the status code and body of the response
  int statusCode = client.responseStatusCode();
  String response = client.responseBody();

//https://arduinojson.org/v7/example/parser/ json dserialization
  JsonDocument doc;

  DeserializationError error = deserializeJson(doc, response);

    if (error) {
    Serial.print(F("deserializeJson() failed: "));
    Serial.println(error.f_str());
    return -1;
  }

  bool field_value = doc["fields"][field]["booleanValue"];
  field_value = !field_value;

  Serial.println("field_value:" + String(field_value));

  Serial.print("Status code: ");
  Serial.println(statusCode);
  Serial.print("Response: ");
  Serial.println(response);

  return field_value;
}