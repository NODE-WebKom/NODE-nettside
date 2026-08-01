import Image from "next/image"
import React from 'react';

interface ListItem {
  id: string;
  title: string;
  date: string;
  url: string;
}

// This component represents a post-it note style calendar with clickable items and a folded corner effect
const calendarNote: React.FC = () => {
  // Sample data for the list items
  const listedItems: ListItem[] = [
    { id: '1', title: 'News', date: 'Oct 1', url: '#' },
    { id: '2', title: 'Update', date: 'Oct 5', url: '#' },
    { id: '3', title: 'Event', date: 'Oct 12', url: '#' },
  ];

  // Styles for the post-it note container itself
  const containerStyle: React.CSSProperties = {
    width: '300px',
    height: '350px',
    backgroundColor: '#eae6a8', // Background for the post-it note
    padding: '12px',
    boxSizing: 'border-box',
    overflowY: 'auto',
    border: '0px solid #e6e6ad',
    position: 'relative', // Necessary for absolute positioning of the corner
  };

  // Styles for the clickable elements (links)
  const clickableElementStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    textDecoration: 'none',
    color: '#333', 
    padding: '8px 0',
    borderBottom: '1px solid rgba(0,0,0,0.05)',
    fontSize: '0.9rem'
  };

  // Styles for the clickable corner: an invisible area that matches the background color, allowing users to click on it to navigate back.
  const clickableCornerStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '0',
    height: '0',
    // The "Fold" triangle: darker yellow color
    borderStyle: 'solid',
    borderWidth: '0 0 50px 50px',
    borderColor: 'transparent transparent #8799b3 transparent', 
    cursor: 'pointer',
    zIndex: 10,
  };

  // Styles for the folded cornereffect: a triangle that matches the rest of the note, creating the illusion of a folded corner
  const foldedCornerStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '0',
    height: '0',
    // The "Cutout": matches the page background (assumed white here)
    borderStyle: 'solid',
    borderWidth: '50px 50px 0 0',
    borderColor: '#f6f1b0 transparent transparent transparent',
    boxShadow: '0 0 5px rgba(0,0,0,0.2)', // Optional: adds a subtle shadow for depth
    pointerEvents: 'none', // Allows clicks to pass through to the fold link
  };

  return (
    <div style={containerStyle}>
      {listedItems.map((item) => (
        <a key={item.id} href={item.url} style={clickableElementStyle}>
          <span style={{ fontWeight: 'bold' }}>{item.title}</span>
          <span style={{ color: '#666' }}>{item.date}</span>
        </a>
      ))}

      {/* This creates the appearance of the folded corner */}
      <div style={foldedCornerStyle} />
      
      {/* This is the actual clickable part with the color of the background */}
      <a 
        href="/" 
        title="Go to more details"
        style={clickableCornerStyle} 
      />
    </div>
  );
};

export default calendarNote;