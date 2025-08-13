'use client';

import { useState } from 'react';

interface LEDCharacteristics {
  red: BluetoothRemoteGATTCharacteristic | null;
  green: BluetoothRemoteGATTCharacteristic | null;
  blue: BluetoothRemoteGATTCharacteristic | null;
}

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [ledState, setLedState] = useState({ red: false, green: false, blue: false });
  const [error, setError] = useState<string | null>(null);
  const [characteristics, setCharacteristics] = useState<LEDCharacteristics>({
    red: null,
    green: null,
    blue: null
  });

  const connectBLE = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [
          { name: 'XIAO_RGB' },
          { namePrefix: 'XIAO_RGB' }
        ],
        optionalServices: ['19b10000-e8f2-537e-4f6c-d104768a1214']
      });

      if (device.gatt) {
        const server = await device.gatt.connect();
        const service = await server.getPrimaryService('19b10000-e8f2-537e-4f6c-d104768a1214');
        
        // Get all three characteristics
        const redChar = await service.getCharacteristic('19b10001-e8f2-537e-4f6c-d104768a1214');
        const greenChar = await service.getCharacteristic('19b10002-e8f2-537e-4f6c-d104768a1214');
        const blueChar = await service.getCharacteristic('19b10003-e8f2-537e-4f6c-d104768a1214');
        
        setCharacteristics({
          red: redChar,
          green: greenChar,
          blue: blueChar
        });
        
        setIsConnected(true);
        setError(null);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const toggleLED = async (color: 'red' | 'green' | 'blue') => {
    const characteristic = characteristics[color];
    if (!characteristic) {
      setError('Not connected');
      return;
    }

    try {
      const newState = { ...ledState, [color]: !ledState[color] };
      const newValue = newState[color] ? 1 : 0;
      await characteristic.writeValue(new Uint8Array([newValue]));
      setLedState(newState);
      setError(null);
    } catch (err: any) {
      setError(`Failed to toggle ${color} LED: ${err.message}`);
    }
  };

  const toggleAll = async () => {
    if (!characteristics.red || !characteristics.green || !characteristics.blue) {
      setError('Not connected');
      return;
    }

    try {
      const allOn = !ledState.red && !ledState.green && !ledState.blue;
      const newState = { red: allOn, green: allOn, blue: allOn };
      const newValue = allOn ? 1 : 0;
      
      await characteristics.red.writeValue(new Uint8Array([newValue]));
      await characteristics.green.writeValue(new Uint8Array([newValue]));
      await characteristics.blue.writeValue(new Uint8Array([newValue]));
      
      setLedState(newState);
      setError(null);
    } catch (err: any) {
      setError(`Failed to toggle all LEDs: ${err.message}`);
    }
  };

  const getLEDColor = () => {
    if (ledState.red && ledState.green && ledState.blue) return 'white';
    if (ledState.red && ledState.green) return 'yellow';
    if (ledState.red && ledState.blue) return 'magenta';
    if (ledState.green && ledState.blue) return 'cyan';
    if (ledState.red) return 'red';
    if (ledState.green) return 'green';
    if (ledState.blue) return 'blue';
    return 'gray';
  };

  const getLEDColorClass = () => {
    const color = getLEDColor();
    switch (color) {
      case 'red': return 'bg-red-500 shadow-red-500/50';
      case 'green': return 'bg-green-500 shadow-green-500/50';
      case 'blue': return 'bg-blue-500 shadow-blue-500/50';
      case 'yellow': return 'bg-yellow-500 shadow-yellow-500/50';
      case 'magenta': return 'bg-purple-500 shadow-purple-500/50';
      case 'cyan': return 'bg-cyan-500 shadow-cyan-500/50';
      case 'white': return 'bg-white shadow-white/50';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-md w-full border border-gray-800">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">XIAO RGB</h1>
          <p className="text-gray-400 text-sm">Bluetooth LED Controller</p>
        </div>
        
        {!isConnected ? (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
              </div>
              <p className="text-gray-400 mb-6">Connect to your XIAO nRF52840</p>
            </div>
            <button
              onClick={connectBLE}
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium text-lg shadow-lg hover:shadow-blue-600/25"
            >
              Connect BLE
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Connection Status */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-medium">Connected</span>
            </div>
            
            {/* LED Status Display */}
            <div className="text-center mb-8">
              <div className="text-gray-400 text-sm mb-3">Current Color</div>
              <div className={`w-24 h-24 rounded-full mx-auto border-4 border-gray-700 ${getLEDColorClass()} shadow-2xl transition-all duration-300`}></div>
            </div>

            {/* Individual Color Controls */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <button
                onClick={() => toggleLED('red')}
                className={`py-4 px-3 rounded-xl transition-all duration-200 font-medium ${
                  ledState.red 
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/25' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                }`}
              >
                Red
              </button>
              <button
                onClick={() => toggleLED('green')}
                className={`py-4 px-3 rounded-xl transition-all duration-200 font-medium ${
                  ledState.green 
                    ? 'bg-green-600 text-white shadow-lg shadow-green-600/25' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                }`}
              >
                Green
              </button>
              <button
                onClick={() => toggleLED('blue')}
                className={`py-4 px-3 rounded-xl transition-all duration-200 font-medium ${
                  ledState.blue 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                }`}
              >
                Blue
              </button>
            </div>

            {/* All On/Off Button */}
            <button
              onClick={toggleAll}
              className={`w-full py-4 px-6 rounded-xl transition-all duration-200 font-medium text-lg ${
                ledState.red || ledState.green || ledState.blue
                  ? 'bg-yellow-600 hover:bg-yellow-700 text-white shadow-lg shadow-yellow-600/25' 
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700'
              }`}
            >
              {ledState.red || ledState.green || ledState.blue ? 'Turn All OFF' : 'Turn All ON'}
            </button>
          </div>
        )}
        
        {error && (
          <div className="mt-6 p-4 bg-red-900/50 border border-red-800 text-red-300 rounded-xl">
            <div className="font-medium">Error:</div>
            <div className="text-sm">{error}</div>
          </div>
        )}

        {/* Status Info */}
        {isConnected && (
          <div className="mt-6 p-4 bg-gray-800/50 border border-gray-700 rounded-xl">
            <div className="text-gray-300 font-medium mb-2">LED Status:</div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className={`px-2 py-1 rounded ${ledState.red ? 'bg-red-900/50 text-red-300' : 'bg-gray-700/50 text-gray-400'}`}>
                Red: {ledState.red ? 'ON' : 'OFF'}
              </div>
              <div className={`px-2 py-1 rounded ${ledState.green ? 'bg-green-900/50 text-green-300' : 'bg-gray-700/50 text-gray-400'}`}>
                Green: {ledState.green ? 'ON' : 'OFF'}
              </div>
              <div className={`px-2 py-1 rounded ${ledState.blue ? 'bg-blue-900/50 text-blue-300' : 'bg-gray-700/50 text-gray-400'}`}>
                Blue: {ledState.blue ? 'ON' : 'OFF'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
