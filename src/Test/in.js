// Import MQTT library
import mqtt from 'mqtt';

// MQTT broker URL and options (adjust according to your broker settings)
const brokerUrl = 'mqtt://good-moose.com'; // Adjust the protocol to ws or wss if using WebSockets
const client = mqtt.connect(brokerUrl, {
  port: 1883, // Adjust if your broker uses a different port for MQTT
  username: 'yourUsername', // Your MQTT username if authentication is required
  password: 'yourPassword'  // Your MQTT password if authentication is required
});

// When connected, publish a message
client.on('connect', () => {
  console.log('Connected to MQTT Broker');
  const topic = '/pap/001';
  const message = 'ON_1';

  client.publish(topic, message, (error) => {
    if (error) {
      console.error('Publish error:', error);
    }
  });
});

// Handling errors
client.on('error', (error) => {
  console.error('Connection error:', error);
});

// When the message is sent, close the connection
client.on('message', (topic, message) => {
  console.log(`Message received on ${topic}: ${message.toString()}`);
  client.end(); // Close the connection when done
});
