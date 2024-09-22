import React, { useEffect, useState } from 'react';
import './ytvideoCard.css';

interface VideoCardProps {
    url: string;
}

const YTVideoCard: React.FC<VideoCardProps> = ({ url }) => {
    const [title, setTitle] = useState<string | null>(null);
    const [author, setAuthor] = useState<string | null>(null);

    useEffect(() => {
        if (url) {
            fetchYouTubeTitle(url);
        }
    }, [url]);

    const fetchYouTubeTitle = async (videoUrl: string) => {
        try {
            const response = await fetch(`https://www.youtube.com/oembed?url=${videoUrl}&format=json`);
            const data = await response.json();
            setTitle(data.title);
            setAuthor(data.author_name);
        } catch (error) {
            console.error('Error al obtener el título y el autor del video:', error);
            setTitle('No se pudo obtener el título');
            setAuthor('Desconocido');
        }
    };

    const getYouTubeVideoID = (videoUrl: string): string | null => {
        const regExp = /^.*(youtu.be\/|v\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = videoUrl.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoID = getYouTubeVideoID(url);
    const defaultThumbnail = videoID ? `https://img.youtube.com/vi/${videoID}/hqdefault.jpg` : '';

    return (
        <a href={url} className="video-card" target="_blank" rel="noopener noreferrer">
            <img src={defaultThumbnail} alt={title || "Video"} className="video-thumbnail" />
            <div className="video-details">
                <h3>{title || "Cargando título..."}</h3>
                <p>{author || "Autor desconocido"}</p>
            </div>
        </a>
    );
};

export default YTVideoCard;