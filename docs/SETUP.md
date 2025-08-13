# Setup Guide - XIAO nRF52840 RGB BLE Controller

This guide will walk you through setting up the XIAO nRF52840 RGB LED BLE Controller from scratch.

## 📋 Prerequisites

Before you begin, make sure you have:

- [Seeed Studio XIAO nRF52840](https://www.seeedstudio.com/XIAO-BLE-Sense-nRF52840-p-5253.html) or [XIAO nRF52840 Sense](https://www.seeedstudio.com/XIAO-BLE-Sense-nRF52840-p-5253.html)
- USB Type-C cable
- Computer with Bluetooth capability
- [Arduino IDE](https://www.arduino.cc/en/software) (latest version)
- [Node.js](https://nodejs.org/) (version 16 or higher)
- Modern web browser (Chrome, Edge, or Opera recommended)

## 🔧 Arduino Setup

### Step 1: Install Arduino IDE

1. Download and install [Arduino IDE](https://www.arduino.cc/en/software)
2. Launch Arduino IDE

### Step 2: Add Seeed nRF52 Board Package

1. Go to `File > Preferences`
2. In the "Additional Boards Manager URLs" field, add:
   ```
   https://files.seeedstudio.com/arduino/package_seeeduino_boards_index.json
   ```
3. Click "OK"

### Step 3: Install Board Package

1. Go to `Tools > Board > Boards Manager`
2. Search for "seeed nrf52"
3. Find "Seeed nRF52 mbed-enabled Boards" and click "Install"
4. Wait for the installation to complete

### Step 4: Select Your Board

1. Go to `Tools > Board`
2. Select "Seeed XIAO nRF52840 Sense"

### Step 5: Upload the Code

1. Open the Arduino sketch: `arduino/xiao_rgb_ble.ino`
2. Connect your XIAO nRF52840 via USB
3. Select the correct port in `Tools > Port`
4. Click the Upload button (→)
5. Wait for the upload to complete

### Step 6: Verify Upload

1. Open the Serial Monitor (`Tools > Serial Monitor`)
2. Set baud rate to 9600
3. You should see:
   ```
   BLE RGB LED Controller Ready!
   Device name: XIAO_RGB
   Waiting for connections...
   ```

## 🌐 Web Interface Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/xiao-rgb-ble-controller.git
cd xiao-rgb-ble-controller
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Start Development Server

```bash
npm run dev
```

### Step 4: Open in Browser

Navigate to `http://localhost:3000` in your browser.

## 🔗 Connecting and Testing

### Step 1: Connect to Device

1. Click "Connect BLE" on the web interface
2. Select "XIAO_RGB" from the Bluetooth device list
3. Click "Connect"

### Step 2: Test Individual LEDs

1. Click the "Red" button - the red LED should turn on
2. Click "Red" again - the red LED should turn off
3. Repeat for "Green" and "Blue" buttons

### Step 3: Test Combined Colors

1. Turn on Red and Green - you should see yellow
2. Turn on Red and Blue - you should see magenta
3. Turn on Green and Blue - you should see cyan
4. Turn on all three - you should see white

### Step 4: Test All Control

1. Click "Turn All ON" - all LEDs should turn on
2. Click "Turn All OFF" - all LEDs should turn off

## 🐛 Troubleshooting

### Arduino Issues

**Board not detected:**
- Try pressing the reset button twice quickly
- Check USB cable connection
- Try a different USB port

**Upload fails:**
- Make sure you've selected the correct board
- Check that the correct port is selected
- Try pressing the reset button during upload

**Serial not working:**
- Add `#include <Adafruit_TinyUSB.h>` to your code
- Make sure baud rate is set to 9600

### Web Interface Issues

**"Web Bluetooth not supported":**
- Use Chrome, Edge, or Opera
- Make sure you're using HTTPS or localhost

**"Device not found":**
- Make sure Arduino is powered and connected
- Check that the device name is "XIAO_RGB"
- Try refreshing the page

**"Connection failed":**
- Check that the device name matches exactly
- Try disconnecting and reconnecting
- Check browser console for error messages

### LED Issues

**LEDs not responding:**
- Check that all LEDs are off initially (HIGH state)
- Verify the common anode wiring
- Check serial monitor for connection status

**Wrong colors:**
- Verify the common anode wiring (LOW = ON, HIGH = OFF)
- Check that the correct pins are being used

## 📱 Browser Compatibility

| Browser | Web Bluetooth Support | Status |
|---------|---------------------|--------|
| Chrome | ✅ Full support | Recommended |
| Edge | ✅ Full support | Recommended |
| Opera | ✅ Full support | Recommended |
| Safari | ⚠️ Limited support | May work |
| Firefox | ❌ No support | Not supported |

## 🔒 Security Notes

- Web Bluetooth requires HTTPS in production
- Local development works with HTTP on localhost
- The BLE service uses custom UUIDs for this project
- No sensitive data is transmitted

## 📞 Getting Help

If you encounter issues:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Review the [Arduino documentation](https://docs.seeedstudio.com/xiao-ble-sense/)
3. Open an [Issue](https://github.com/yourusername/xiao-rgb-ble-controller/issues)
4. Check the browser console for error messages

## 🎉 Success!

Once everything is working, you should be able to:
- Control individual RGB LEDs
- See real-time color mixing
- Use the modern web interface
- Control LEDs from any modern browser

Enjoy your XIAO nRF52840 RGB LED BLE Controller! 🎨
