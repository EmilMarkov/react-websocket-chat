import React, { useState } from 'react';
import Draggable from 'react-draggable';
import './FloatingChat.css';
import Icon from '@mdi/react';
import { mdiCloseThick } from '@mdi/js';
import MaterialButton from '../ui/Button/MaterialButton';

const FloatingChat = ({ isContainerOpen, closeFloatChat, children }) => {
    const [activeDrags, setActiveDrags] = useState(0);
    const [deltaPosition, setDeltaPosition] = useState({ x: 0, y: 0 });
    const [controlledPosition, setControlledPosition] = useState({
        x: -400,
        y: 200,
    });

    const onStart = () => {
        setActiveDrags(activeDrags + 1);
    };

    const onStop = () => {
        setActiveDrags(activeDrags - 1);
    };

    const dragHandlers = { onStart: onStart, onStop: onStop };

    if (!isContainerOpen) {
        return null; // Если контейнер закрыт, вернуть null для скрытия компонента
    }

    return (
        <Draggable {...dragHandlers} handle=".title" bounds="body">
            <div
                className="floating-window"
                style={{ position: 'absolute', zIndex: '100', width: '300px', height: '400px' }}
            >
                <div className="title">
                    <p>Сообщения</p>
                    <MaterialButton style={{ padding: '0' }} onClick={closeFloatChat}>
                        <Icon path={mdiCloseThick} size={1} />
                    </MaterialButton>
                </div>
                {children}
            </div>
        </Draggable>
    );
};

export default FloatingChat;
