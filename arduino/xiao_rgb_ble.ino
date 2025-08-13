/*
 * XIAO nRF52840 RGB LED BLE Controller
 * 
 * This Arduino sketch enables Bluetooth Low Energy control of the RGB LED
 * on the Seeed Studio XIAO nRF52840 board.
 * 
 * Features:
 * - Individual control of Red, Green, and Blue LEDs
 * - Web interface control via Web Bluetooth API
 * - Simple on/off control for each color
 * 
 * Hardware:
 * - Seeed Studio XIAO nRF52840 or XIAO nRF52840 Sense
 * - Uses onboard 3-in-one RGB LED (common anode)
 * 
 * Author: Your Name
 * License: MIT
 */

#include <ArduinoBLE.h>

// BLE Service and Characteristics
BLEService ledService("19B10000-E8F2-537E-4F6C-D104768A1214");

// Three characteristics for individual RGB control
BLEByteCharacteristic redCharacteristic("19B10001-E8F2-537E-4F6C-D104768A1214", BLERead | BLEWrite);
BLEByteCharacteristic greenCharacteristic("19B10002-E8F2-537E-4F6C-D104768A1214", BLERead | BLEWrite);
BLEByteCharacteristic blueCharacteristic("19B10003-E8F2-537E-4F6C-D104768A1214", BLERead | BLEWrite);

void setup() {
  Serial.begin(9600);
  while (!Serial);

  // Set LED pins as outputs
  pinMode(LED_RED, OUTPUT);
  pinMode(LED_GREEN, OUTPUT);
  pinMode(LED_BLUE, OUTPUT);

  // Turn all LEDs off initially (HIGH for common anode)
  digitalWrite(LED_RED, HIGH);
  digitalWrite(LED_GREEN, HIGH);
  digitalWrite(LED_BLUE, HIGH);

  // Initialize BLE
  if (!BLE.begin()) {
    Serial.println("BLE initialization failed!");
    while (1);
  }

  // Configure BLE
  BLE.setLocalName("XIAO_RGB");
  BLE.setAdvertisedService(ledService);
  
  // Add characteristics to service
  ledService.addCharacteristic(redCharacteristic);
  ledService.addCharacteristic(greenCharacteristic);
  ledService.addCharacteristic(blueCharacteristic);
  
  // Add service to BLE
  BLE.addService(ledService);
  
  // Set initial values (all LEDs off)
  redCharacteristic.writeValue(0);
  greenCharacteristic.writeValue(0);
  blueCharacteristic.writeValue(0);

  // Start advertising
  BLE.advertise();
  
  Serial.println("BLE RGB LED Controller Ready!");
  Serial.println("Device name: XIAO_RGB");
  Serial.println("Waiting for connections...");
}

void loop() {
  // Listen for BLE central devices
  BLEDevice central = BLE.central();

  // If a central is connected
  if (central) {
    Serial.print("Connected to central: ");
    Serial.println(central.address());

    // While the central is still connected
    while (central.connected()) {
      
      // Check if red LED characteristic was written
      if (redCharacteristic.written()) {
        if (redCharacteristic.value()) {
          digitalWrite(LED_RED, LOW);  // Turn ON (LOW for common anode)
          Serial.println("Red LED ON");
        } else {
          digitalWrite(LED_RED, HIGH); // Turn OFF (HIGH for common anode)
          Serial.println("Red LED OFF");
        }
      }
      
      // Check if green LED characteristic was written
      if (greenCharacteristic.written()) {
        if (greenCharacteristic.value()) {
          digitalWrite(LED_GREEN, LOW);  // Turn ON
          Serial.println("Green LED ON");
        } else {
          digitalWrite(LED_GREEN, HIGH); // Turn OFF
          Serial.println("Green LED OFF");
        }
      }
      
      // Check if blue LED characteristic was written
      if (blueCharacteristic.written()) {
        if (blueCharacteristic.value()) {
          digitalWrite(LED_BLUE, LOW);  // Turn ON
          Serial.println("Blue LED ON");
        } else {
          digitalWrite(LED_BLUE, HIGH); // Turn OFF
          Serial.println("Blue LED OFF");
        }
      }
    }

    // When the central disconnects
    Serial.print("Disconnected from central: ");
    Serial.println(central.address());
  }
}
