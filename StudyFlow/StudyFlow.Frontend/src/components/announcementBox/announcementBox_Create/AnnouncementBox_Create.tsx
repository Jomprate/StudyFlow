import React, { useRef, useState } from 'react';
import '../announcementBox_Create/announcementBox_Create.css';
import '../../cards/YoutubeVideoCard/ytvideoCard.css';
import YTVideoAnnounceCard from '../../cards/Announces/YoutubeAnnounceCard/YTVideoAnnounceCard';
import GoogleDriveAnnounceCard from '../../cards/Announces/GoogleDriveAnnounceCard/GoogleDriveAnnounceCard';
import OtherLinksAnnounceCard from '../../cards/Announces/OtherLinksAnnounceCard/OtherLinksAnnounceCard';
import { useTheme } from '../../../ThemeContext';
import { AnnouncementsYouTubeModal, AnnouncementsGoogleDriveModal, AnnouncementsOtherLinksModal } from '../announcementBox_Create/AnnouncementsModals';
import { announceApi } from '../../../services/api';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import { useLinksManager } from '../../../helpers/hooks/useLinksManager';
import { useTextFormatting } from '../../../helpers/hooks/useTextFormatting';
import { useSublistManagement } from '../../../helpers/hooks/useSublistManagement';
import LinksList from '../announcementBox_Create/linksList/LinksList';
import FormattingControls from '../announcementBox_Create/FormattingControls';
import ExternalDataLinks from '../../../helpers/hooks/ExternalDataLinks';

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
    const { activeFormats, applyFormatting, updateActiveFormats } = useTextFormatting(editorRef);
    const { createSublist } = useSublistManagement(editorRef);

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

    const validateForm = () => {
        if (!editorRef.current || !courseId) {
            console.error("Editor or courseId is missing.");
            return false;
        }
        if (!state.userName) {
            console.error("UserID is missing.");
            return false;
        }
        return true;
    };

    const buildAnnounceDTO = () => {
        return {
            title,
            htmlContent: editorRef.current!.innerHTML,
            userId: state.userName!.toString(),
            courseId: courseId!,
            youTubeVideos: youtubeLinksManager.links,
            googleDriveLinks: googleDriveLinksManager.links,
            alternateLinks: otherLinksManager.links,
        };
    };

    const resetForm = () => {
        setTitle('');
        if (editorRef.current) editorRef.current.innerHTML = '';
        setIsPublishDisabled(true);
        youtubeLinksManager.clearLinks();
        googleDriveLinksManager.clearLinks();
        otherLinksManager.clearLinks();
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        const addAnnounceDTO = buildAnnounceDTO();

        try {
            const response = await announceApi.createAnnounce(addAnnounceDTO);

            if (response.data) {
                onAnnounceCreated({
                    ...response.data,
                    title,
                    description: addAnnounceDTO.htmlContent,
                    creationDate: new Date().toISOString(),
                    userName: state.fullName || "Unknown User",
                    youTubeVideos: youtubeLinksManager.links,
                    googleDriveLinks: googleDriveLinksManager.links,
                    alternateLinks: otherLinksManager.links,
                });

                console.log("Anuncio creado con éxito:", response.data);
                resetForm();
            }
        } catch (error) {
            console.error("Error creando el anuncio:", error);
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
            <hr className="announcementBox_Create_separator" />
            <div className="announcementBox_Create_controls">
                <FormattingControls
                    activeFormats={activeFormats}
                    applyFormatting={applyFormatting}
                    createSublist={createSublist}
                />

            </div>

            <hr className="announcementBox_Create_separator" />

            <LinksList
                links={youtubeLinksManager.links}
                onRemove={youtubeLinksManager.removeLink}
                CardComponent={YTVideoAnnounceCard}
            />

            <LinksList
                links={googleDriveLinksManager.links}
                onRemove={googleDriveLinksManager.removeLink}
                CardComponent={GoogleDriveAnnounceCard}
            />

            <LinksList
                links={otherLinksManager.links}
                onRemove={otherLinksManager.removeLink}
                CardComponent={OtherLinksAnnounceCard}
            />

            <div className="announcementBox_Create_footer-container">
                <ExternalDataLinks onOpenModal={setActiveModal} />

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