import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';
import MaterialInput from '../components/ui/Input/MaterialInput';
import MaterialButton from '../components/ui/Button/MaterialButton';
import Notify from '../components/Notify/Notify';

function Auth({ chatService }) {
  const [usernameField, setUsernameField] = useState('');
  const navigate = useNavigate();

  const connectToChat = async () => {
    if (usernameField === '') {
      return; // Прекратить выполнение, если поле пустое
    }

    await chatService.connect(usernameField, navigate);
  };

  const auth = () => {
    connectToChat();
  };

  return (
    <div className="Auth">
      <MaterialInput
        type="text"
        placeholder="Имя"
        value={usernameField}
        onChange={(event) => setUsernameField(event.target.value)}
      />
      <MaterialButton onClick={auth}>Подключиться</MaterialButton>
    </div>
  );
}

export default Auth;
