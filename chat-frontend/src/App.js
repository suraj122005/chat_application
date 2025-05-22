import React, { useEffect, useState, useRef } from 'react';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8080');

    
    
      ws.current.onmessage = (event) => {
  if (event.data instanceof Blob) {
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result; // converted text from Blob
      setMessages((prevMessages) => [...prevMessages, text]);
    };
    reader.readAsText(event.data);
  } else {
    setMessages((prevMessages) => [...prevMessages, event.data]);
  }
};

    

    return () => {
      ws.current.close();
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() !== '') {
      ws.current.send(input);
      setInput('');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '600px', margin: '0 auto' }}>
      <h2>💬 Real-Time Chat App</h2>
      <div style={{
        border: '1px solid #ccc', height: '300px', overflowY: 'scroll',
        padding: '10px', marginBottom: '10px'
      }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ margin: '5px 0' }}>{msg}</div>
        ))}
      </div>
      <input
        style={{ width: '80%', padding: '10px' }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        placeholder="Type a message"
      />
      <button style={{ padding: '10px', marginLeft: '5px' }} onClick={sendMessage}>
        Send
      </button>
    </div>
  );
}

export default App;
