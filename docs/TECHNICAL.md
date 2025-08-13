# Technical Documentation - XIAO nRF52840 RGB BLE Controller

This document provides detailed technical information about the BLE implementation, architecture, and development details.

## 🏗 Architecture Overview

The project consists of two main components:

1. **Arduino Firmware** - Runs on XIAO nRF52840, provides BLE service
2. **Web Interface** - Next.js application, connects via Web Bluetooth API

```
┌─────────────────┐    BLE    ┌─────────────────┐
│   Web Browser   │ ◄────────► │  XIAO nRF52840  │
│   (Next.js)     │            │   (Arduino)     │
└─────────────────┘            └─────────────────┘
```

## 🔧 BLE Implementation

### Service Structure

The BLE service follows the standard GATT (Generic Attribute Profile) structure:

```
LED Control Service (19B10000-E8F2-537E-4F6C-D104768A1214)
├── Red LED Characteristic (19B10001-E8F2-537E-4F6C-D104768A1214)
├── Green LED Characteristic (19B10002-E8F2-537E-4F6C-D104768A1214)
└── Blue LED Characteristic (19B10003-E8F2-537E-4F6C-D104768A1214)
```

### UUID Design

All UUIDs are custom 128-bit UUIDs following this pattern:
- **Base UUID**: `19B10000-E8F2-537E-4F6C-D104768A1214`
- **Service**: Uses base UUID
- **Characteristics**: Increment the first part (19B10001, 19B10002, 19B10003)

### Characteristic Properties

Each LED characteristic has the following properties:
- **Read**: Can read current LED state
- **Write**: Can change LED state
- **Size**: 1 byte (0 = OFF, 1 = ON)

## 💻 Arduino Implementation

### Pin Configuration

```cpp
const int redPin = LED_RED;    // Built-in red LED pin
const int greenPin = LED_GREEN; // Built-in green LED pin
const int bluePin = LED_BLUE;   // Built-in blue LED pin
```

### LED Control Logic

The XIAO nRF52840 uses **common anode** RGB LEDs:
- **LOW** (0V) = LED ON
- **HIGH** (3.3V) = LED OFF

```cpp
// Turn LED ON
digitalWrite(LED_RED, LOW);

// Turn LED OFF
digitalWrite(LED_RED, HIGH);
```

### BLE Event Handling

The Arduino continuously monitors for characteristic writes:

```cpp
if (redCharacteristic.written()) {
  if (redCharacteristic.value()) {
    digitalWrite(LED_RED, LOW);  // ON
  } else {
    digitalWrite(LED_RED, HIGH); // OFF
  }
}
```

## 🌐 Web Interface Implementation

### Web Bluetooth API

The web interface uses the Web Bluetooth API to connect to the Arduino:

```javascript
const device = await navigator.bluetooth.requestDevice({
  filters: [
    { name: 'XIAO_RGB' },
    { namePrefix: 'XIAO_RGB' }
  ],
  optionalServices: ['19b10000-e8f2-537e-4f6c-d104768a1214']
});
```

### Connection Flow

1. **Device Discovery**: Scan for "XIAO_RGB" device
2. **Service Discovery**: Find LED control service
3. **Characteristic Discovery**: Get all three LED characteristics
4. **Connection Management**: Maintain connection and handle disconnections

### State Management

The web interface maintains LED state using React hooks:

```typescript
const [ledState, setLedState] = useState({ 
  red: false, 
  green: false, 
  blue: false 
});
```

### Error Handling

Comprehensive error handling for:
- Web Bluetooth not supported
- Device not found
- Connection failures
- Characteristic write errors

## 🔒 Security Considerations

### BLE Security

- **No Pairing Required**: Uses unauthenticated connections
- **Custom UUIDs**: Reduces interference with other devices
- **Local Control Only**: No internet connectivity required

### Web Security

- **HTTPS Required**: Web Bluetooth requires secure context
- **User Permission**: Browser prompts for Bluetooth access
- **Origin Isolation**: Only works from same origin

## 📊 Performance Characteristics

### Latency

- **BLE Connection**: ~100-500ms
- **LED Response**: <50ms
- **UI Updates**: <16ms (60fps)

### Power Consumption

- **BLE Advertising**: ~1-2mA
- **BLE Connected**: ~3-5mA
- **LED ON**: +5-10mA per LED
- **Sleep Mode**: <1μA

### Range

- **Indoor**: 5-10 meters
- **Outdoor**: 10-30 meters
- **Obstacles**: Reduces range significantly

## 🔧 Development Details

### Arduino Libraries Used

- **ArduinoBLE**: Core BLE functionality
- **Arduino**: Standard Arduino functions

### Web Technologies Used

- **Next.js 13**: React framework with App Router
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Web Bluetooth API**: BLE communication

### Build Process

```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

## 🧪 Testing

### Arduino Testing

1. **Serial Monitor**: Check connection status
2. **LED Verification**: Visual confirmation of LED states
3. **BLE Scanner**: Use nRF Connect app to test BLE

### Web Interface Testing

1. **Browser Compatibility**: Test in Chrome, Edge, Opera
2. **Connection Testing**: Verify device discovery and connection
3. **UI Testing**: Test all button interactions
4. **Error Handling**: Test error scenarios

### Integration Testing

1. **End-to-End**: Complete workflow from connection to LED control
2. **Stress Testing**: Rapid button presses
3. **Disconnection Testing**: Handle connection drops

## 🔄 Future Enhancements

### Potential Improvements

1. **Brightness Control**: PWM dimming for each LED
2. **Color Presets**: Save and recall color combinations
3. **Animation Support**: Smooth color transitions
4. **Multiple Devices**: Control multiple XIAO boards
5. **Mobile App**: Native mobile application

### Technical Enhancements

1. **BLE Notifications**: Real-time LED state updates
2. **Security**: Add pairing and encryption
3. **Power Management**: Implement sleep modes
4. **OTA Updates**: Over-the-air firmware updates

## 📚 References

- [Web Bluetooth API Specification](https://webbluetoothcg.github.io/web-bluetooth/)
- [ArduinoBLE Library Documentation](https://www.arduino.cc/reference/en/libraries/arduinoble/)
- [Nordic nRF52840 Datasheet](https://www.nordicsemi.com/Products/nRF52840)
- [Seeed Studio XIAO Documentation](https://docs.seeedstudio.com/xiao-ble-sense/)

## 🤝 Contributing

When contributing to the technical implementation:

1. **Follow BLE Standards**: Use proper GATT structure
2. **Error Handling**: Implement comprehensive error handling
3. **Documentation**: Update technical docs for changes
4. **Testing**: Add tests for new features
5. **Performance**: Consider power and latency impact

---

For more information, see the [Setup Guide](SETUP.md) and [README](../README.md).
