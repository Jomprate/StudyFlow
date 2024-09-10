import React, { useState } from 'react';
import { AiOutlineBold, AiOutlineItalic, AiOutlineUnderline } from 'react-icons/ai';
import './announcementBox_Create.css';

const AnnouncementBox_Create: React.FC = () => {
    const [text, setText] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const handleSubmit = () => {
        if (text.trim()) {
            console.log('Anuncio publicado:', text);
            setText('');
        }
    };

    const handleBold = () => document.execCommand('bold');
    const handleItalic = () => document.execCommand('italic');
    const handleUnderline = () => document.execCommand('underline');

    return (
        <div className="announcement-box" >
            <textarea
                className="announcement-input"
                placeholder="Anuncia algo a la clase"
                value={text}
                onChange={handleInputChange}
                style={{ fontSize: '16px', padding: '10px', width: '100%', height: '100px' }
                }
            />
            < div className="controls" >
                <button onClick={handleBold} className="bold-btn" > <AiOutlineBold /></button >
                <button onClick={handleItalic} className="italic-btn" > <AiOutlineItalic /></button >
                <button onClick={handleUnderline} className="underline-btn" > <AiOutlineUnderline /></button >
            </div>
            < div className="footer" >
                <button
                    onClick={handleSubmit}
                    className="submit-btn"
                    disabled={!text.trim()}
                >
                    Publicar
                </button>
            </div>
        </div>
    );
};

export default AnnouncementBox_Create;