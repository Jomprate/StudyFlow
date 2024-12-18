import React from 'react';
import './LinksList.css';

interface LinksListProps {
    links: string[];
    onRemove: (index: number) => void;
    CardComponent: React.FC<{ url: string }>;
}

const LinksList: React.FC<LinksListProps> = ({ links, onRemove, CardComponent }) => (
    <div className="links-list">
        {links.map((link, index) => (
            <div key={index} className="link-item">
                <CardComponent url={link} />
                <button className="remove-link-button" onClick={() => onRemove(index)}>
                    x
                </button>
            </div>
        ))}
    </div>
);

export default LinksList;