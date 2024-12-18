import React, { useRef, useState } from 'react';
import './announcementBox_Create.css';
import '../../cards/YoutubeVideoCard/ytvideoCard.css';
import YTVideoAnnounceCard from '../../cards/Announces/YoutubeAnnounceCard/YTVideoAnnounceCard';
import GoogleDriveAnnounceCard from '../../cards/Announces/GoogleDriveAnnounceCard/GoogleDriveAnnounceCard';
import OtherLinksAnnounceCard from '../../cards/Announces/OtherLinksAnnounceCard/OtherLinksAnnounceCard';
import { useTheme } from '../../../ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faUnderline, faListUl, faListOl, faIndent, faLink } from '@fortawesome/free-solid-svg-icons';
import { faYoutube, faGoogleDrive } from '@fortawesome/free-brands-svg-icons';
import AnnouncementsYouTubeModal from './AnnouncementsModals/AnnouncementsYouTubeModal';
import AnnouncementsGoogleDriveModal from './AnnouncementsModals/AnnouncementsGoogleDriveModal';
import AnnouncementsOtherLinksModal from './AnnouncementsModals/AnnouncementsOtherLinksModal';
import { announceApi } from '../../../services/api';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import { useLinksManager } from '../announcementBox_Create/useLinksManager';

interface AnnouncementBoxCreateProps {
    onAnnounceCreated: (announcement: any) => void;
}

const AnnouncementBox_Create: React.FC<AnnouncementBoxCreateProps> = ({ onAnnounceCreated }) => {
    const { t } = useTranslation();
    const editorRef = useRef<HTMLDivElement>(null);
    const { state } = useAuth();
    const { theme } = useTheme();
    const { courseId } = useParams<{ courseId: string }>();
    const [title, setTitle] = useState<string>('');
    const [isPublishDisabled, setIsPublishDisabled] = useState(true);
    const [activeFormats, setActiveFormats] = useState({
        bold: false,
        italic: false,
        underline: false,
    });

    const [activeModal, setActiveModal] = useState<'youtube' | 'googleDrive' | 'otherLinks' | null>(null);

    const youtubeLinksManager = useLinksManager('youtubeLinks');
    const googleDriveLinksManager = useLinksManager('googleDriveLinks');
    const otherLinksManager = useLinksManager('otherLinks');

    const handleInput = () => {
        if (editorRef.current) {
            const content = editorRef.current.innerHTML;
            setIsPublishDisabled(content.trim() === '' || title.trim() === '');
            updateActiveFormats();
        }
    };

    const updateActiveFormats = () => {
        setActiveFormats({
            bold: document.queryCommandState('bold'),
            italic: document.queryCommandState('italic'),
            underline: document.queryCommandState('underline'),
        });
    };

    const applyFormatting = (command: string) => {
        if (editorRef.current) {
            document.execCommand(command, false);
            handleInput();
        }
    };

    const createSublist = (ordered: boolean) => {
        if (editorRef.current) {
            const selection = window.getSelection();
            if (selection && selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                const selectedElement = range.startContainer.parentElement;

                if (selectedElement && selectedElement.tagName === 'LI') {
                    const liElement = selectedElement as HTMLLIElement;

                    let sublist = liElement.querySelector('ul, ol') as HTMLElement | null;
                    if (!sublist) {
                        sublist = document.createElement(ordered ? 'ol' : 'ul');
                        sublist.style.listStyleType = ordered ? 'decimal' : 'disc';
                        sublist.style.marginLeft = '20px';
                        liElement.appendChild(sublist);
                    }

                    const newSubItem = document.createElement('li');
                    newSubItem.textContent = t('announce_newSubitem');
                    sublist.appendChild(newSubItem);
                }
            }
        }
    };

    const handleSubmit = async () => {
        if (editorRef.current && courseId) {
            const content = editorRef.current.innerHTML;
            const userID = state.userName?.toString();

            if (!userID) {
                console.error("UserID is missing. Cannot create announce.");
                return;
            }

            const addAnnounceDTO = {
                title: title,
                htmlContent: content,
                userId: userID,
                courseId: courseId,
                youTubeVideos: youtubeLinksManager.links,
                googleDriveLinks: googleDriveLinksManager.links,
                alternateLinks: otherLinksManager.links,
            };

            try {
                const response = await announceApi.createAnnounce(addAnnounceDTO);

                if (response.data) {
                    onAnnounceCreated({
                        ...response.data,
                        title: title,
                        description: content,
                        creationDate: new Date().toISOString(),
                        userName: state.fullName || "Unknown User",
                        youTubeVideos: youtubeLinksManager.links,
                        googleDriveLinks: googleDriveLinksManager.links,
                        alternateLinks: otherLinksManager.links,
                    });

                    console.log('Anuncio creado con éxito:', response.data);

                    // Reiniciar el formulario
                    setTitle('');
                    if (editorRef.current) editorRef.current.innerHTML = '';
                    setIsPublishDisabled(true);

                    // Limpiar enlaces
                    youtubeLinksManager.clearLinks();
                    googleDriveLinksManager.clearLinks();
                    otherLinksManager.clearLinks();
                }
            } catch (error) {
                console.error('Error creando el anuncio:', error);
            }
        }
    };

    return (
        <div className={`announcementBox_Create_announcement-box ${theme}`}>
            <input
                type="text"
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value);
                    setIsPublishDisabled(
                        e.target.value.trim() === '' || (editorRef.current?.innerHTML.trim() ?? '') === ''
                    );
                }}
                className="announcementBox_Create_title-input"
                placeholder={t('announce_title')}
            />
            <div
                ref={editorRef}
                className="announcementBox_Create_announcement-editor"
                contentEditable={true}
                onInput={handleInput}
                onMouseUp={updateActiveFormats}
            ></div>

            <div className="announcementBox_Create_controls">
                <button
                    onClick={() => applyFormatting('bold')}
                    className={`announcementBox_Create_control-button ${activeFormats.bold ? 'active' : ''}`}
                >
                    <FontAwesomeIcon icon={faBold} />
                </button>
                <button
                    onClick={() => applyFormatting('italic')}
                    className={`announcementBox_Create_control-button ${activeFormats.italic ? 'active' : ''}`}
                >
                    <FontAwesomeIcon icon={faItalic} />
                </button>
                <button
                    onClick={() => applyFormatting('underline')}
                    className={`announcementBox_Create_control-button ${activeFormats.underline ? 'active' : ''}`}
                >
                    <FontAwesomeIcon icon={faUnderline} />
                </button>
                <button onClick={() => applyFormatting('insertUnorderedList')} className="announcementBox_Create_control-button">
                    <FontAwesomeIcon icon={faListUl} />
                </button>
                <button onClick={() => applyFormatting('insertOrderedList')} className="announcementBox_Create_control-button">
                    <FontAwesomeIcon icon={faListOl} />
                </button>
                <button onClick={() => createSublist(false)} className="announcementBox_Create_control-button">
                    <FontAwesomeIcon icon={faIndent} />
                </button>
                <button onClick={() => createSublist(true)} className="announcementBox_Create_control-button">
                    <FontAwesomeIcon icon={faIndent} />
                </button>
            </div>

            <hr className="announcementBox_Create_separator" />

            <div className="youtube-video-list">
                {youtubeLinksManager.links.map((link, index) => (
                    <div key={index} className="youtube-video-item">
                        <YTVideoAnnounceCard url={link} />
                        <button
                            className="remove-video-button"
                            onClick={() => youtubeLinksManager.removeLink(index)}
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>

            <div className="googledrive-links-list">
                {googleDriveLinksManager.links.map((link, index) => (
                    <div key={index} className="googledrive-link-item">
                        <GoogleDriveAnnounceCard url={link} />
                        <button
                            className="remove-link-button"
                            onClick={() => googleDriveLinksManager.removeLink(index)}
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>

            <div className="other-links-list">
                {otherLinksManager.links.map((link, index) => (
                    <div key={index} className="other-link-item">
                        <OtherLinksAnnounceCard url={link} />
                        <button
                            className="remove-link-button"
                            onClick={() => otherLinksManager.removeLink(index)}
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>

            <div className="announcementBox_Create_footer-container">
                <div className="classworkBox_Create_external-data-links">
                    <button
                        className="classworkBox_Create_control-button youtube"
                        onClick={() => setActiveModal('youtube')}
                    >
                        <FontAwesomeIcon icon={faYoutube} />
                    </button>
                    <button
                        className="classworkBox_Create_control-button google-drive"
                        onClick={() => setActiveModal('googleDrive')}
                    >
                        <FontAwesomeIcon icon={faGoogleDrive} />
                    </button>
                    <button
                        className="classworkBox_Create_control-button links"
                        onClick={() => setActiveModal('otherLinks')}
                    >
                        <FontAwesomeIcon icon={faLink} />
                    </button>
                </div>

                <div className="announcementBox_Create_action-buttons">
                    <button className="announcementBox_Create_footer-button announcementBox_Create_cancel-button">
                        {t('announce_Cancel')}
                    </button>
                    <button
                        className="announcementBox_Create_footer-button announcementBox_Create_publish-button"
                        onClick={handleSubmit}
                        disabled={isPublishDisabled}
                    >
                        {t('announce_Publish')}
                    </button>
                </div>
            </div>

            {activeModal === 'youtube' && (
                <AnnouncementsYouTubeModal
                    isOpen
                    onClose={() => setActiveModal(null)}
                    onSave={(link: string) => {
                        youtubeLinksManager.addLink(link);
                        console.log('YouTube Link Added:', link);
                    }}
                />

            )}

            {activeModal === 'googleDrive' && (
                <AnnouncementsGoogleDriveModal
                    isOpen
                    onClose={() => setActiveModal(null)}
                    onSave={(link: string) => {
                        googleDriveLinksManager.addLink(link);
                        console.log('Google Drive Link Added:', link);
                    }}
                />
            )}

            {activeModal === 'otherLinks' && (
                <AnnouncementsOtherLinksModal
                    isOpen
                    onClose={() => setActiveModal(null)}
                    onSave={(link: string) => {
                        otherLinksManager.addLink(link);
                        console.log('Other Link Added:', link);
                    }}
                />

            )}

        </div>
    );
};

export default AnnouncementBox_Create;