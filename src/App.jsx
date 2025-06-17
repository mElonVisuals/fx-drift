import React, { useState, useEffect } from 'react';

// Custom CSS styles as a string to be injected
const globalStyles = `
/* Basic reset for better consistency */
html, body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Ensure no scrolling on the main page */
body {
    overflow: hidden; 
}

/* Keyframe Animations */
@keyframes pulse-subtle {
  0% { opacity: 0.05; }
  50% { opacity: 0.07; }
  100% { opacity: 0.05; }
}

@keyframes dash-line-right {
  0% { background-position: 0 0; }
  100% { background-position: -200px 0; }
}

@keyframes dash-line-left {
    0% { background-position: 0 0; }
    100% { background-position: 200px 0; }
}

@keyframes shine {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Animation Classes */
.animate-pulse-subtle {
  animation: pulse-subtle 10s infinite ease-in-out;
}

.animate-dash-line-right {
  animation: dash-line-right 5s infinite linear;
}

.animate-dash-line-left {
  animation: dash-line-left 5s infinite linear;
}

.animate-shine {
  animation: shine 1.5s infinite linear;
}

/* Neon Drop Shadows for Text */
.drop-shadow-neon-blue {
  text-shadow: 0 0 8px #6A66FF, 0 0 16px #6A66FF, 0 0 24px #6A66FF;
}

.drop-shadow-neon-white {
  text-shadow: 0 0 5px #FFFFFF, 0 0 10px #FFFFFF, 0 0 15px #FFFFFF;
}

/* Border Glow Effect */
.border-glow-blue {
    box-shadow: 0 0 8px #6A66FF;
}

/* Angled Borders for Header/Footer */
.angled-border-top {
    clip-path: polygon(0 0, 100% 0, 100% 80%, 0% 100%);
}

.angled-border-bottom {
    clip-path: polygon(0 20%, 100% 0, 100% 100%, 0% 100%);
}

/* Custom Scrollbar for themed overflow areas */
.custom-scrollbar::-webkit-scrollbar {
    width: 8px;
    background-color: #1A1A2E;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #6A66FF;
    border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background-color: #0A0A1A;
}

/* Background pattern for content cards */
.background-pattern {
  background-image: linear-gradient(45deg, rgba(0, 191, 255, 0.1) 25%, transparent 25%),
                    linear-gradient(-45deg, rgba(255, 69, 0, 0.1) 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, rgba(0, 191, 255, 0.1) 75%),
                    linear-gradient(-45deg, transparent 75%, rgba(255, 69, 0, 0.1) 75%);
  background-size: 40px 40px;
}
`;


// Main App component
function App() {
  // State to manage which section is currently active for display
  const [activeSection, setActiveSection] = useState('home'); // Default to 'home'

  // Effect to inject custom styles once on component mount
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = globalStyles;
    document.head.appendChild(styleSheet);
  }, []);

  // Data for the different sections of the portal
  const sectionContent = {
    home: {
      title: "Ignite the Asphalt",
      description: "Dive into FX-Drift: an open-world racing MMO. Master the streets, customize your ride, and dominate the competition in a neon-drenched metropolis."
    },
    gameInfo: {
      title: "The Ultimate Ride",
      features: [
        "Vast, interconnected cityscapes and challenging tracks",
        "Unrivaled vehicle customization: performance, aesthetics, and handling",
        "Precision drifting mechanics and combat racing dynamics",
        "Underground racing circuits, police pursuits, and rival crews",
        "Deep garage management, parts crafting, and upgrades",
        "Intense PvP and PvE events, leaderboards, and championships"
      ]
    },
    media: {
      title: "Adrenaline Visuals",
      images: [
        "https://placehold.co/800x450/0F0F1A/00BFFF?text=Night+Race+Lights",
        "https://placehold.co/800x450/1A1A3A/FF4500?text=Custom+Build+Showcase",
        "https://placehold.co/800x450/222244/00CCFF?text=Speed+Blur+Effect",
        "https://placehold.co/800x450/080812/FF0066?text=Drift+Smoke+Action"
      ],
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&controls=0&mute=1" // Placeholder, replace with actual trailer
    },
    news: {
      title: "Breaking News: Checkered Flag!",
      articles: [
        { headline: "Tokyo Streets Unleashed!", snippet: "New district and challenge series available now." },
        { headline: "Performance Patch v3.1", snippet: "Engine re-tuning and balance adjustments deployed." },
        { headline: "Global Drift Championship Starts!", snippet: "Compete for exclusive legendary vehicle skins." }
      ]
    },
    community: {
      title: "Join the Pit Crew",
      links: [
        { name: "Official Forums", url: "#" },
        { name: "Discord Server", url: "#" },
        { name: "Twitter", url: "#" },
        { name: "Instagram", url: "#" }
      ]
    },
    support: {
      title: "Technical Assistance",
      faq: [
        { q: "How do I report a bug?", a: "Access our dedicated in-game bug submission portal." },
        { q: "What are the minimum system requirements?", a: "Find detailed specs on our store page or FAQ section." }
      ]
    }
  };

  return (
    // Main container for the entire application.
    // Darker, high-contrast background for racing theme.
    <div className="flex flex-col h-screen w-screen bg-[#000000] text-white font-inter overflow-hidden relative">
      {/* Background layer 1: Subtle pattern */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 animate-pulse-subtle"
        style={{ backgroundImage: 'url("https://placehold.co/1920x1080/0A0A1A/FFFFFF?text=RACING+BACKGROUND+TEXTURE")' }}
      ></div>
      {/* Background layer 2: Overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A1A] via-transparent to-[#0A0A1A] opacity-80 z-0"></div>

      {/* Header Section (top bar) */}
      <Header />

      {/* Main Content Area: Split into a larger content section and a narrower sidebar/nav section */}
      <div className="flex flex-grow p-6 relative z-10 gap-6">
        {/* Central Content Display Area (Main "Screen") */}
        <ContentDisplay
          activeSection={activeSection}
          sectionContent={sectionContent}
        />

        {/* Sidebar & Navigation Section (Right-hand control panel) */}
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          sectionContent={sectionContent}
        />
      </div>

      {/* Footer Section (bottom bar) */}
      <Footer />
    </div>
  );
}

// Header Component
function Header() {
  return (
    // Header styling: Angular, dark background, strong border/glow
    <header className="bg-[#111111] p-4 flex items-center justify-between shadow-lg relative z-20 border-b-2 border-[#6A66FF] angled-border-top pb-6">
      {/* Dynamic line effect */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#6A66FF] via-[#FFFFFF] to-[#6A66FF] opacity-70 animate-dash-line-left"></div>

      {/* Game Title and Tagline */}
      <div className="flex flex-col pl-4">
        <h1 className="text-6xl font-extrabold text-white tracking-widest uppercase drop-shadow-neon-white transition-colors duration-300 hover:text-[#6A66FF]">
          FX-DRIFT
        </h1>
        <span className="text-lg text-gray-400 italic mt-2 ml-1 font-mono tracking-wider">
          THE RACING EXPERIENCE
        </span>
      </div>

      {/* Platforms and Join Us Button */}
      <div className="flex items-center space-x-8 pr-4">
        <div className="text-xl text-gray-300 flex flex-col items-end font-bold">
          <span className="text-base opacity-80 font-mono tracking-wide">ULTIMATE STREET RACING MMO</span>
          <span className="font-extrabold text-[#FF4500] uppercase tracking-widest">DRIVE // RACE // DRIFT</span>
        </div>
        <button className="bg-[#FF4500] hover:bg-[#FF0066] text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center space-x-3 text-lg relative overflow-hidden group border border-[#FF4500]">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-all duration-300 animate-shine"></div>
          {/* Car icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-car"><path d="M19 17H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2Z"/><circle cx="7" cy="15" r="2"/><circle cx="17" cy="15" r="2"/></svg>
          <span>JOIN US</span>
        </button>
      </div>
    </header>
  );
}

// Navigation Bar & Sidebar Combined Component
function Sidebar({ activeSection, setActiveSection, sectionContent }) {
  // Navigation items with their corresponding section IDs and display names
  const navItems = [
    { id: 'home', name: 'HOME' },
    { id: 'gameInfo', name: 'GAME INFO' },
    { id: 'media', name: 'MEDIA' },
    { id: 'news', name: 'NEWS FEED' },
    { id: 'community', name: 'COMMUNITY' },
    { id: 'support', name: 'PIT STOP' },
  ];

  return (
    // Sidebar styling: Semi-transparent dark background, sharp edges, narrow
    <aside className="flex flex-col bg-[#111111] bg-opacity-80 p-6 space-y-6 shadow-xl rounded-lg w-72 flex-shrink-0 relative z-10 border border-[#222244] border-glow-blue">
      {/* Navigation section within sidebar */}
      <nav className="flex flex-col space-y-3 pb-6 border-b border-gray-700 border-opacity-50">
        <h3 className="text-xl font-bold text-[#6A66FF] uppercase mb-4 tracking-wider">Navigation</h3>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`
              py-3 px-4 rounded-md text-base font-bold uppercase tracking-wider transition duration-200 ease-in-out
              relative overflow-hidden group
              text-left border border-transparent
              ${activeSection === item.id
                ? 'bg-[#6A66FF] text-white shadow-inner-neon border-[#6A66FF]' // Active: vibrant blue, white text, glowing border
                : 'bg-transparent text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-5 border-transparent hover:border-[#FF4500]' // Inactive: transparent, light text, subtle hover
              }
              transform hover:scale-102 focus:outline-none focus:ring-2 focus:ring-[#6A66FF]
            `}
          >
            <span className="relative z-10 flex items-center">
                {/* Dynamic icon based on nav item */}
                {item.id === 'home' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-gauge mr-2"><path d="M3.34 19.16a7 7 0 0 1 14.82 0"/><path d="M8.5 2.5 12 6l3.5-3.5"/><path d="M4 11h9"/><path d="M12 10a7 7 0 0 0 6.64 6.64"/><path d="m12 14 4-4"/></svg>}
                {item.id === 'gameInfo' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings mr-2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2.73l-.15.1a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1 0-2.73l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>}
                {item.id === 'media' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image mr-2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>}
                {item.id === 'news' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-megaphone mr-2"><path d="m3 11 18-8-2 13L3 11Z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>}
                {item.id === 'community' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users mr-2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87C16 13.1 15.1 12 14 12h-3a8 8 0 0 1-3 3.87C7 13.1 6.1 12 5 12h-3"/></svg>}
                {item.id === 'support' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wrench mr-2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z"/></svg>}
                {item.name}
            </span>
          </button>
        ))}
      </nav>

      {/* Transmission Log (Latest News) */}
      <div className="bg-[#0A0A1A] p-5 rounded-md shadow-inner border border-[#FF4500]">
        <h3 className="text-xl font-bold text-[#6A66FF] mb-4 uppercase tracking-wider">Telemetry Data</h3>
        <ul className="space-y-3 text-gray-300 font-mono text-sm custom-scrollbar max-h-40 overflow-y-auto">
          {sectionContent.news.articles.slice(0, 3).map((article, index) => (
            <li key={index} className="border-b border-gray-700 border-opacity-30 pb-2 last:border-b-0">
              <span className="font-semibold text-white block mb-1">{article.headline}</span>
              <span className="block opacity-80">{article.snippet.slice(0, 60)}...</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Media Spotlight */}
      <div className="bg-[#0A0A1A] p-5 rounded-md shadow-inner border border-[#00BFFF]">
        <h3 className="text-xl font-bold text-[#FF4500] mb-4 uppercase tracking-wider">Race Replay</h3>
        <img
          src="https://placehold.co/280x180/0A0A1A/00BFFF?text=Speed+Car+Concept"
          alt="Media Spotlight"
          className="w-full h-auto rounded-lg shadow-md object-cover mb-4 border border-[#111111]"
        />
        <p className="text-sm text-gray-300 font-light mb-3">
          "Witness the raw power and precision on the track."
        </p>
        <button className="bg-[#00BFFF] text-[#111111] text-sm py-2 px-4 rounded-full font-bold hover:bg-[#00CCFF] transition duration-200 shadow-md uppercase">
          VIEW GALLERY
        </button>
      </div>
    </aside>
  );
}

// Central Content Display Component
function ContentDisplay({ activeSection, sectionContent }) {
  // Retrieve content for the active section
  const content = sectionContent[activeSection];

  // Helper function to render common card style for content
  const Card = ({ children }) => (
    // Main content panel, slightly inset with angular design and glow
    <div className="bg-[#111111] bg-opacity-80 p-8 rounded-lg shadow-2xl text-center w-full h-full flex flex-col justify-center items-center relative overflow-hidden border border-[#222244] border-glow-blue">
      {/* Background pattern for visual interest */}
      <div className="absolute inset-0 opacity-10 background-pattern"></div>
      {children}
    </div>
  );

  return (
    // Content display styling: Flex-grow to take available space, padding, rounded
    <main className="flex-grow rounded-lg shadow-xl flex items-center justify-center relative overflow-hidden">
      {/* Conditionally render content based on activeSection */}
      {activeSection === 'home' && (
        <Card>
          <h2 className="text-7xl font-extrabold text-white mb-8 drop-shadow-neon-white uppercase">
            {content.title}
          </h2>
          <p className="text-2xl text-gray-300 leading-relaxed max-w-4xl font-light tracking-wide">
            {content.description}
          </p>
          <img
            src="https://placehold.co/900x500/0A0A1A/FF4500?text=FX-Drift+Epic+Race+Shot"
            alt="FX-Drift Key Art"
            className="mt-12 rounded-xl shadow-lg border-4 border-[#FF4500] max-w-full h-auto animate-fade-in"
          />
        </Card>
      )}

      {activeSection === 'gameInfo' && (
        <Card>
          <h2 className="text-5xl font-bold text-[#FF4500] mb-8 uppercase">
            {content.title}
          </h2>
          <ul className="list-disc list-inside text-left text-xl space-y-4 max-w-3xl mx-auto text-gray-200 font-light">
            {content.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-3 text-[#6A66FF] text-2xl">•</span> {feature}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {activeSection === 'media' && (
        <Card>
          <h2 className="text-5xl font-bold text-[#6A66FF] mb-8 uppercase">
            {content.title}
          </h2>
          <div className="grid grid-cols-2 gap-8 mb-8 w-full">
            {content.images.map((imgSrc, index) => (
              <img
                key={index}
                src={imgSrc}
                alt={`Media ${index + 1}`}
                className="w-full h-auto rounded-lg shadow-xl object-cover aspect-video border-2 border-[#1A1A2E] transform hover:scale-102 transition-transform duration-200"
              />
            ))}
          </div>
          {/* Embedded video with subtle glow */}
          <div className="w-full aspect-video rounded-lg overflow-hidden shadow-2xl border-4 border-[#FF4500] relative group">
            <iframe
              width="100%"
              height="100%"
              src={content.videoUrl}
              title="FX-Drift Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-emedia; gyroscope; picture-in-picture"
              allowFullScreen
              className="group-hover:opacity-80 transition-opacity duration-200"
            ></iframe>
            <div className="absolute inset-0 border-4 border-transparent group-hover:border-[#FF4500] transition-colors duration-200 pointer-events-none"></div>
          </div>
        </Card>
      )}

      {activeSection === 'news' && (
        <Card>
          <h2 className="text-5xl font-bold text-[#FF4500] mb-8 uppercase">
            {content.title}
          </h2>
          <div className="space-y-6 max-w-4xl mx-auto w-full custom-scrollbar max-h-[calc(100vh-250px)] overflow-y-auto pr-4">
            {content.articles.map((article, index) => (
              <div key={index} className="bg-[#0A0A1A] bg-opacity-70 p-6 rounded-lg shadow-lg border border-[#222244] transform hover:scale-102 transition-transform duration-200 cursor-pointer">
                <h3 className="text-3xl font-bold text-white mb-3">{article.headline}</h3>
                <p className="text-gray-300 font-light text-lg leading-relaxed">{article.snippet}</p>
                <button className="mt-4 text-[#6A66FF] hover:underline text-base font-semibold uppercase">Read More (External Link)</button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeSection === 'community' && (
        <Card>
          <h2 className="text-5xl font-bold text-[#6A66FF] mb-8 uppercase">
            {content.title}
          </h2>
          <div className="grid grid-cols-2 gap-6 max-w-3xl mx-auto w-full">
            {content.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0A0A1A] hover:bg-[#FF4500] text-white py-5 px-8 rounded-full text-2xl font-bold uppercase shadow-lg transition duration-300 ease-in-out transform hover:scale-110 text-center relative overflow-hidden group border border-[#222244]"
              >
                 <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transition-all duration-300 animate-shine"></span>
                <span className="relative z-10 flex items-center justify-center">
                    {link.name === 'Official Forums' && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square mr-2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>}
                    {link.name === 'Discord Server' && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle mr-2"><path d="M7.9 20A9.9 9.9 0 0 1 12 4c4.4 0 8 3.6 8 8 0 2.2-1.1 4.2-2.9 5.5L20 22l-2-6.2A9.9 9.9 0 0 1 7.9 20Z"/></svg>}
                    {link.name === 'Twitter' && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter mr-2"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17-19 11.6 1.1.9 4.3 2.1 6 2.1 6.5 0 12-5.7 12-12V4Z"/></svg>}
                    {link.name === 'Instagram' && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram mr-2"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.5" y1="6.5" y2="6.5"/></svg>}
                    {link.name}
                </span>
              </a>
            ))}
          </div>
        </Card>
      )}

      {activeSection === 'support' && (
        <Card>
          <h2 className="text-5xl font-bold text-[#FF4500] mb-8 uppercase">
            {content.title}
          </h2>
          <div className="space-y-6 max-w-4xl mx-auto w-full text-left custom-scrollbar max-h-[calc(100vh-250px)] overflow-y-auto pr-4">
            {content.faq.map((item, index) => (
              <div key={index} className="bg-[#0A0A1A] bg-opacity-70 p-6 rounded-lg shadow-lg border border-[#222244] cursor-pointer">
                <h3 className="text-2xl font-bold text-white mb-3">{item.q}</h3>
                <p className="text-gray-300 font-light text-lg leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </main>
  );
}


// Footer Component
function Footer() {
  return (
    // Footer styling: Dark, angular background, vibrant accent line
    <footer className="bg-[#111111] p-4 flex items-center justify-between text-xs text-gray-500 shadow-lg relative z-20 border-t-2 border-[#6A66FF] angled-border-bottom pt-6">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6A66FF] via-[#FFFFFF] to-[#6A66FF] opacity-70 animate-dash-line-right"></div>
      {/* Legal Text */}
      <div className="flex space-x-6 font-mono text-base pl-4">
        <span className="text-gray-400">© 2025 FX-DRIFT. ALL RIGHTS RESERVED.</span>
        <a href="#" className="hover:underline text-gray-300 transition-colors duration-200">PRIVACY POLICY</a>
        <a href="#" className="hover:underline text-gray-300 transition-colors duration-200">TERMS OF USE</a>
      </div>

      {/* Developer/Publisher Logos (Placeholder) */}
      <div className="flex items-center space-x-6 pr-4">
        <img src="https://placehold.co/50x25/0A0A1A/FF4500?text=DEVCO" alt="Developer Logo" className="h-6 opacity-80" />
        <img src="https://placehold.co/50x25/0A0A1A/00BFFF?text=PUBCORP" alt="Publisher Logo" className="h-6 opacity-80" />
      </div>

      {/* Social Media Icons with racing-themed colors and hover */}
      <div className="flex items-center space-x-4">
        <a href="#" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#00BFFF] transition duration-200 transform hover:scale-125">
          {/* Twitter Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17-19 11.6 1.1.9 4.3 2.1 6 2.1 6.5 0 12-5.7 12-12V4Z"/></svg>
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#FF4500] transition duration-200 transform hover:scale-125">
          {/* YouTube Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube"><path d="M2.5 17a2.5 2.5 0 0 1 0-4h20a2.5 2.5 0 0 1 0 4Z"/><path d="m14.5 17 2-2 2 2"/><path d="m10.5 17-2-2-2 2"/></svg>
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#00BFFF] transition duration-200 transform hover:scale-125">
          {/* Discord Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle"><path d="M7.9 20A9.9 9.9 0 0 1 12 4c4.4 0 8 3.6 8 8 0 2.2-1.1 4.2-2.9 5.5L20 22l-2-6.2A9.9 9.9 0 0 1 7.9 20Z"/></svg>
        </a>
      </div>
    </footer>
  );
}

export default App;