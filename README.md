# XIAO nRF52840 RGB LED BLE Controller

A modern web interface for controlling the RGB LED on Seeed Studio XIAO nRF52840 boards via Bluetooth Low Energy (BLE).

![XIAO RGB Controller](https://img.shields.io/badge/XIAO-nRF52840-blue?style=for-the-badge&logo=arduino)
![Bluetooth](https://img.shields.io/badge/Bluetooth-BLE-blue?style=for-the-badge&logo=bluetooth)
![Next.js](https://img.shields.io/badge/Next.js-13-black?style=for-the-badge&logo=next.js)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## ✨ Features

- 🌈 **Individual RGB Control** - Control Red, Green, and Blue LEDs separately
- 📱 **Modern Web Interface** - Beautiful dark theme with smooth animations
- 🔗 **Web Bluetooth API** - No app installation required, works in modern browsers
- ⚡ **Real-time Control** - Instant LED response with visual feedback
- 🎨 **Color Mixing** - See combined colors in real-time
- 📊 **Status Monitoring** - Live LED state indicators

## 🛠 Hardware Requirements

- [Seeed Studio XIAO nRF52840](https://www.seeedstudio.com/XIAO-BLE-Sense-nRF52840-p-5253.html) or [XIAO nRF52840 Sense](https://www.seeedstudio.com/XIAO-BLE-Sense-nRF52840-p-5253.html)
- USB Type-C cable
- Computer with Bluetooth capability

## 🚀 Quick Start

### 1. Arduino Setup

1. **Install Arduino IDE** and add the Seeed nRF52 board package:
   - Go to `File > Preferences`
   - Add this URL to "Additional Boards Manager URLs":
     ```
     https://files.seeedstudio.com/arduino/package_seeeduino_boards_index.json
     ```
   - Go to `Tools > Board > Boards Manager`
   - Search for "seeed nrf52" and install "Seeed nRF52 mbed-enabled Boards"

2. **Select your board**:
   - `Tools > Board > Seeed XIAO nRF52840 Sense`

3. **Upload the Arduino code**:
   - Open `arduino/xiao_rgb_ble.ino`
   - Click Upload

### 2. Web Interface Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/xiao-rgb-ble-controller.git
   cd xiao-rgb-ble-controller
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

### 3. Connect and Control

1. **Click "Connect BLE"** on the web interface
2. **Select "XIAO_RGB"** from the Bluetooth device list
3. **Use the color buttons** to control individual LEDs
4. **Use "Turn All ON/OFF"** to control all LEDs at once

## 🎮 Usage

### Individual Color Control
- **Red Button**: Toggle red LED on/off
- **Green Button**: Toggle green LED on/off  
- **Blue Button**: Toggle blue LED on/off

### Combined Colors
The interface automatically shows combined colors:
- **Red + Green = Yellow**
- **Red + Blue = Magenta**
- **Green + Blue = Cyan**
- **All ON = White**

### Visual Feedback
- **Active buttons** glow with their respective colors
- **Large color circle** shows the current combined color
- **Status indicators** show ON/OFF state for each LED

## 🔧 Technical Details

### BLE Service & Characteristics
- **Service UUID**: `19B10000-E8F2-537E-4F6C-D104768A1214`
- **Red LED**: `19B10001-E8F2-537E-4F6C-D104768A1214`
- **Green LED**: `19B10002-E8F2-537E-4F6C-D104768A1214`
- **Blue LED**: `19B10003-E8F2-537E-4F6C-D104768A1214`

### Browser Compatibility
- ✅ Chrome (recommended)
- ✅ Edge
- ✅ Opera
- ⚠️ Safari (limited support)
- ❌ Firefox (no Web Bluetooth support)

## 📁 Project Structure

```
xiao-rgb-ble-controller/
├── arduino/
│   └── xiao_rgb_ble.ino          # Arduino sketch
├── src/
│   ├── app/
│   │   └── page.tsx              # Main web interface
│   └── types/
│       └── bluetooth.d.ts        # TypeScript definitions
├── README.md                     # This file
├── LICENSE                       # MIT License
└── package.json                  # Dependencies
```

## 🐛 Troubleshooting

### Arduino Issues
- **Board not detected**: Try pressing the reset button twice quickly
- **Upload fails**: Make sure you've selected the correct board and port
- **Serial not working**: Add `#include <Adafruit_TinyUSB.h>` to your code

### Web Interface Issues
- **"Web Bluetooth not supported"**: Use Chrome, Edge, or Opera
- **"Device not found"**: Make sure Arduino is powered and advertising
- **"Connection failed"**: Check that the device name is "XIAO_RGB"

### LED Issues
- **LEDs not responding**: Check that all LEDs are off initially (HIGH state)
- **Wrong colors**: Verify the common anode wiring (LOW = ON, HIGH = OFF)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Seeed Studio](https://www.seeedstudio.com/) for the XIAO nRF52840 boards
- [Nordic Semiconductor](https://www.nordicsemi.com/) for the nRF52840 chip
- [Arduino](https://www.arduino.cc/) for the development platform
- [Next.js](https://nextjs.org/) for the web framework

## 📞 Support

If you encounter any issues or have questions:
- Open an [Issue](https://github.com/yourusername/xiao-rgb-ble-controller/issues)
- Check the [Troubleshooting](#-troubleshooting) section
- Review the [Arduino documentation](https://docs.seeedstudio.com/xiao-ble-sense/)

---

**Made with ❤️ for the XIAO community**
