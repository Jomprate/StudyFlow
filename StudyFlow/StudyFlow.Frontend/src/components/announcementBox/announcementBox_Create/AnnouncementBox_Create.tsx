import React, { useEffect, useRef, useState } from 'react';
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
import { createAnnounce } from '../../../services/api';
import { useTranslation } from 'react-i18next';

const AnnouncementBox_Create: React.FC = () => {
    const { t } = useTranslation();
    const editorRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();
    const [title, setTitle] = useState<string>('');
    const [isPublishDisabled, setIsPublishDisabled] = useState(true);
    const [activeFormats, setActiveFormats] = useState({
        bold: false,
        italic: false,
        underline: false,
    });

    const [isYouTubeModalOpen, setIsYouTubeModalOpen] = useState(false);
    const [isGoogleDriveModalOpen, setIsGoogleDriveModalOpen] = useState(false);
    const [isOtherLinksModalOpen, setIsOtherLinksModalOpen] = useState(false);

    // Lists to store links temporarily
    const [youtubeLinks, setYouTubeLinks] = useState<string[]>([]);
    const [googleDriveLinks, setGoogleDriveLinks] = useState<string[]>([]);
    const [otherLinks, setOtherLinks] = useState<string[]>([]);

    useEffect(() => {
        // Load links from session storage on component mount
        const storedYouTubeLinks = sessionStorage.getItem('youtubeLinks');
        const storedGoogleDriveLinks = sessionStorage.getItem('googleDriveLinks');
        const storedOtherLinks = sessionStorage.getItem('otherLinks');

        if (storedYouTubeLinks) setYouTubeLinks(JSON.parse(storedYouTubeLinks));
        if (storedGoogleDriveLinks) setGoogleDriveLinks(JSON.parse(storedGoogleDriveLinks));
        if (storedOtherLinks) setOtherLinks(JSON.parse(storedOtherLinks));
    }, []);

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
        if (editorRef.current) {
            const content = editorRef.current.innerHTML;

            const defaultUserId = "6fe44fdc-cac4-4d08-82d6-8a672b6960c0"; // UserId quemado
            const defaultCourseId = "3c8825f3-f903-45c9-8dac-0a87a51ef37e"; // CourseId quemado

            // Crear objeto DTO con valores quemados
            const addAnnounceDTO = {
                title: title,
                htmlContent: content,
                userId: defaultUserId,
                courseId: defaultCourseId,
                youTubeVideos: youtubeLinks,
                googleDriveLinks: googleDriveLinks,
                alternateLinks: otherLinks,
            };

            try {
                const response = await createAnnounce(addAnnounceDTO);
                console.log('Anuncio creado con éxito:', response);
            } catch (error: any) {
                console.error('Error creando el anuncio:', error);
            }
        }
    };

    const addYouTubeLink = (link: string) => {
        const updatedLinks = [...youtubeLinks, link];
        setYouTubeLinks(updatedLinks);
        sessionStorage.setItem('youtubeLinks', JSON.stringify(updatedLinks));
    };

    const addGoogleDriveLink = (link: string) => {
        const updatedLinks = [...googleDriveLinks, link];
        setGoogleDriveLinks(updatedLinks);
        sessionStorage.setItem('googleDriveLinks', JSON.stringify(updatedLinks));
    };

    const addOtherLink = (link: string) => {
        const updatedLinks = [...otherLinks, link];
        setOtherLinks(updatedLinks);
        sessionStorage.setItem('otherLinks', JSON.stringify(updatedLinks));
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

            {/* YouTube Video List */}
            <div className="youtube-video-list">
                {youtubeLinks.map((link, index) => (
                    <div key={index} className="youtube-video-item">
                        <YTVideoAnnounceCard url={link} />
                        <button
                            className="remove-video-button"
                            onClick={() => {
                                const updatedLinks = youtubeLinks.filter((_, i) => i !== index);
                                setYouTubeLinks(updatedLinks);
                                sessionStorage.setItem('youtubeLinks', JSON.stringify(updatedLinks));
                            }}
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>

            {/* Google Drive Links List */}
            <div className="googledrive-links-list">
                {googleDriveLinks.map((link, index) => (
                    <div key={index} className="googledrive-link-item">
                        <GoogleDriveAnnounceCard url={link} />
                        <button
                            className="remove-link-button"
                            onClick={() => {
                                const updatedLinks = googleDriveLinks.filter((_, i) => i !== index);
                                setGoogleDriveLinks(updatedLinks);
                                sessionStorage.setItem('googleDriveLinks', JSON.stringify(updatedLinks));
                            }}
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>

            {/* Other Links List */}
            <div className="other-links-list">
                {otherLinks.map((link, index) => (
                    <div key={index} className="other-link-item">
                        <OtherLinksAnnounceCard url={link} />
                        <button
                            className="remove-link-button"
                            onClick={() => {
                                const updatedLinks = otherLinks.filter((_, i) => i !== index);
                                setOtherLinks(updatedLinks);
                                sessionStorage.setItem('otherLinks', JSON.stringify(updatedLinks));
                            }}
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>

            <div className="announcementBox_Create_footer-container">
                <div className="announcementBox_Create_external-data-links">
                    <button
                        className="announcementBox_Create_external-data-link-button"
                        onClick={() => setIsYouTubeModalOpen(true)}
                    >
                        <FontAwesomeIcon icon={faYoutube} className="icon-large" />
                    </button>
                    <button
                        className="announcementBox_Create_external-data-link-button"
                        onClick={() => setIsGoogleDriveModalOpen(true)}
                    >
                        <FontAwesomeIcon icon={faGoogleDrive} className="icon-large" />
                    </button>
                    <button
                        className="announcementBox_Create_external-data-link-button"
                        onClick={() => setIsOtherLinksModalOpen(true)}
                    >
                        <FontAwesomeIcon icon={faLink} className="icon-large" />
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

            <AnnouncementsYouTubeModal
                isOpen={isYouTubeModalOpen}
                onClose={() => setIsYouTubeModalOpen(false)}
                onSave={addYouTubeLink}
            />
            <AnnouncementsGoogleDriveModal
                isOpen={isGoogleDriveModalOpen}
                onClose={() => setIsGoogleDriveModalOpen(false)}
                onSave={addGoogleDriveLink}
            />
            <AnnouncementsOtherLinksModal
                isOpen={isOtherLinksModalOpen}
                onClose={() => setIsOtherLinksModalOpen(false)}
                onSave={addOtherLink}
            />
        </div>
    );
};

export default AnnouncementBox_Create;