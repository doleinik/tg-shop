import React, {useCallback, useEffect, useState} from 'react';
import './Message.css';
import {useTelegram} from "../../hooks/useTelegram";

const Message = () => {
    const [message, setMessage] = useState('');
    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            message
        }
        tg.sendData(JSON.stringify(data));
    }, [message])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить данные'
        })
    }, [])

    useEffect(() => {
        if(!message) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [message])

    const onChangeMessage = (e) => {
        setMessage(e.target.value)
    }

    return (
        <div className={"form"}>
            <h3>Введите ваши данные</h3>
            <textarea
                className={'input'}
                placeholder={'Страна'}
                value={message}
                onChange={onChangeMessage}
            />
        </div>
    );
};

export default Message;
