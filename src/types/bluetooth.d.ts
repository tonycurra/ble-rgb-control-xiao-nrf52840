// Web Bluetooth API TypeScript declarations
declare global {
  interface Navigator {
    bluetooth: Bluetooth;
  }

  interface Bluetooth {
    requestDevice(options: RequestDeviceOptions): Promise<BluetoothDevice>;
  }

  interface RequestDeviceOptions {
    filters: BluetoothRequestDeviceFilter[];
    optionalServices?: string[];
  }

  interface BluetoothRequestDeviceFilter {
    name?: string;
    namePrefix?: string;
    services?: string[];
    manufacturerData?: BluetoothManufacturerDataFilter[];
  }

  interface BluetoothManufacturerDataFilter {
    companyIdentifier: number;
    dataPrefix?: BufferSource;
    mask?: BufferSource;
  }

  interface BluetoothDevice extends EventTarget {
    id: string;
    name?: string;
    gatt?: BluetoothRemoteGATTServer;
  }

  interface BluetoothRemoteGATTServer {
    connected: boolean;
    connect(): Promise<BluetoothRemoteGATTServer>;
    disconnect(): void;
    getPrimaryService(service: string | BluetoothUUID): Promise<BluetoothRemoteGATTService>;
    getPrimaryServices(service?: string | BluetoothUUID): Promise<BluetoothRemoteGATTService[]>;
  }

  interface BluetoothRemoteGATTService {
    uuid: string;
    isPrimary: boolean;
    device: BluetoothDevice;
    getCharacteristic(characteristic: string | BluetoothUUID): Promise<BluetoothRemoteGATTCharacteristic>;
    getCharacteristics(characteristic?: string | BluetoothUUID): Promise<BluetoothRemoteGATTCharacteristic[]>;
  }

  interface BluetoothRemoteGATTCharacteristic extends EventTarget {
    uuid: string;
    properties: BluetoothCharacteristicProperties;
    value?: DataView;
    service: BluetoothRemoteGATTService;
    getDescriptor(descriptor: string | BluetoothUUID): Promise<BluetoothRemoteGATTDescriptor>;
    getDescriptors(descriptor?: string | BluetoothUUID): Promise<BluetoothRemoteGATTDescriptor[]>;
    readValue(): Promise<DataView>;
    writeValue(value: BufferSource): Promise<void>;
    writeValueWithResponse(value: BufferSource): Promise<void>;
    writeValueWithoutResponse(value: BufferSource): Promise<void>;
    startNotifications(): Promise<BluetoothRemoteGATTCharacteristic>;
    stopNotifications(): Promise<BluetoothRemoteGATTCharacteristic>;
  }

  interface BluetoothCharacteristicProperties {
    read: boolean;
    write: boolean;
    writeWithoutResponse: boolean;
    notify: boolean;
    indicate: boolean;
    authenticatedSignedWrites: boolean;
    reliableWrite: boolean;
    writableAuxiliaries: boolean;
  }

  interface BluetoothRemoteGATTDescriptor {
    uuid: string;
    value?: DataView;
    characteristic: BluetoothRemoteGATTCharacteristic;
    readValue(): Promise<DataView>;
    writeValue(value: BufferSource): Promise<void>;
  }

  type BluetoothUUID = string;

  interface CharacteristicValueChangedEvent extends Event {
    target: BluetoothRemoteGATTCharacteristic;
  }
}

export {};
