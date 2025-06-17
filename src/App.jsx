import React, { useState } from 'react';

// Main App component
function App() {
  // State to manage which section is currently active for display
  const [activeSection, setActiveSection] = useState('home'); // Default to 'home'

  // Data for the different sections of the portal
  const sectionContent = {
    home: {
      title: "Embrace the Drift",
      description: "Experience the ultimate racing frontier. FX-Drift is an open-world racing MMO with high-octane action, stunning visuals, and endless vehicle customization."
    },
    gameInfo: {
      title: "The Track Awaits",
      features: [
        "Massive, dynamic city and open-road tracks",
        "Deep vehicle customization & performance tuning",
        "Intense drift and combat racing mechanics",
        "Rival gangs, police chases, & underground circuits",
        "Comprehensive garage building and parts crafting",
        "Adrenaline-pumping PvP and PvE racing events"
      ]
    },
    media: {
      title: "Visions of Velocity",
      images: [
        "https://district.melonvisuals.me/bmwe36event.png", // Black background, blue text
        "https://district.melonvisuals.me/eventwon.png",   // Dark grey, white text
        "https://district.melonvisuals.me/bmwheaven.png",// Blue background, black text
        "https://district.melonvisuals.me/bmweventfx.png"      // Very dark blue, blue text
      ],
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&controls=0&mute=1" // Placeholder, replace with actual trailer
    },
    news: {
      title: "Latest Race Updates",
      articles: [
        { headline: "New Track Revealed: Tokyo Neon!", snippet: "Prepare for high-speed street action in our latest update." },
        { headline: "Patch 2.0.1 Deployed", snippet: "Performance optimizations, new car models, and bug fixes are live." },
        { headline: "Community Race Event Announced", snippet: "Compete in the 'Apex Challenger' for exclusive rewards!" }
      ]
    },
    community: {
      title: "Join the Crew",
      links: [
        { name: "Official Forums", url: "#" },
        { name: "Discord Server", url: "#" },
        { name: "Twitter", url: "#" },
        { name: "Instagram", url: "#" }
      ]
    },
    support: {
      title: "Pit Crew Support",
      faq: [
        { q: "How do I report a bug?", a: "Visit our dedicated bug report page for assistance." },
        { q: "Where can I find system requirements?", a: "Check the game's official store page or our FAQ section." }
      ]
    }
  };

  return (
    // Main container for the entire application.
    // Uses flexbox to create a column layout for header, main content, and footer.
    // `h-screen` and `overflow-hidden` ensure no scrolling on the page.
    // Background changed to black.
    <div className="flex flex-col h-screen w-screen bg-[#000000] text-white font-inter">
      {/* Header Section */}
      <Header />

      {/* Main Content Area: Divided into Navigation, Central Display, and Sidebar */}
      <div className="flex flex-grow bg-opacity-70 backdrop-blur-sm p-4 relative overflow-hidden">
        {/* Background image for the main content area */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: 'url("https://placehold.co/1920x1080/000000/FFFFFF?text=FX-DRIFT+BACKGROUND")' }}
        ></div>

        {/* Navigation Bar (Left Side) */}
        <NavigationBar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        {/* Central Content Display Area */}
        <ContentDisplay
          activeSection={activeSection}
          sectionContent={sectionContent}
        />

        {/* Sidebar (Right Side) */}
        <Sidebar sectionContent={sectionContent} />
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

// Header Component
function Header() {
  return (
    // Header styling: Dark UI background, padding, flex for alignment, rounded corners
    <header className="bg-[#0A0A12] p-4 flex items-center justify-between shadow-lg rounded-b-lg relative z-10">
      {/* Game Title and Tagline */}
      <div className="flex flex-col">
        {/* Main title in white */}
        <h1 className="text-4xl font-bold text-white tracking-widest uppercase drop-shadow-md">
          FX-DRIFT
        </h1>
        {/* Tagline in light grey */}
        <span className="text-xs text-gray-300 italic mt-1 ml-1">
          Drift & Freeroam
        </span>
      </div>

      {/* Platforms and Join Us Button */}
      <div className="flex items-center space-x-6">
        <div className="text-lg text-gray-300 flex flex-col items-end">
          <span className="text-sm opacity-80">FiveM Server</span>
          {/* Platform text in light grey */}
          <span className="font-semibold text-gray-300">DRIVE | RACE | DRIFT</span>
        </div>
        {/* Button with vibrant blue background and white text */}
        <button className="bg-[#6A66FF] hover:bg-[#5A55EE] text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center space-x-2">
          {/* Star Icon (inline SVG for self-containment), now white */}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <span>JOIN US</span>
        </button>
      </div>
    </header>
  );
}

// Navigation Bar Component
function NavigationBar({ activeSection, setActiveSection }) {
  // Navigation items with their corresponding section IDs and display names
  const navItems = [
    { id: 'home', name: 'Home' },
    { id: 'gameInfo', name: 'Game Info' },
    { id: 'media', name: 'Media' },
    { id: 'news', name: 'News' },
    { id: 'community', name: 'Community' },
    { id: 'support', name: 'Support' },
  ];

  return (
    // Navigation bar styling: Dark UI background, rounded, shadow
    <nav className="flex flex-col bg-[#0A0A12] p-4 space-y-4 shadow-lg rounded-lg mr-4 relative z-10 w-48 flex-shrink-0">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveSection(item.id)}
          // Dynamic styling based on active section
          className={`
            py-3 px-4 rounded-md text-lg font-semibold transition duration-200 ease-in-out
            ${activeSection === item.id
              ? 'bg-[#6A66FF] text-white shadow-inner' // Active state: vibrant blue background, white text
              : 'bg-[#111111] text-gray-300 hover:bg-[#6A66FF] hover:text-white' // Inactive state: dark background, light text, hover with vibrant blue
            }
            transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#6A66FF]
          `}
        >
          {item.name}
        </button>
      ))}
    </nav>
  );
}

// Central Content Display Component
function ContentDisplay({ activeSection, sectionContent }) {
  // Retrieve content for the active section
  const content = sectionContent[activeSection];

  // Helper function to render common card style for content
  const Card = ({ children }) => (
    <div className="bg-[#0A0A12] bg-opacity-80 p-6 rounded-lg shadow-xl text-center w-full h-full overflow-hidden flex flex-col justify-center items-center">
      {children}
    </div>
  );

  return (
    // Content display styling: Dark background, padding, rounded
    <main className="flex-grow bg-[#000000] bg-opacity-70 p-6 rounded-lg shadow-xl flex items-center justify-center relative overflow-hidden">
      {/* Conditionally render content based on activeSection */}
      {activeSection === 'home' && (
        <Card>
          {/* Title in white */}
          <h2 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            {content.title}
          </h2>
          {/* Description in light grey */}
          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
            {content.description}
          </p>
          <img
            src="https://placehold.co/600x300/000000/6A66FF?text=FX-Drift+Race+Scene"
            alt="FX-Drift Key Art"
            className="mt-8 rounded-lg shadow-lg max-w-full h-auto"
          />
        </Card>
      )}

      {activeSection === 'gameInfo' && (
        <Card>
          {/* Title in white */}
          <h2 className="text-4xl font-bold text-white mb-6">
            {content.title}
          </h2>
          {/* List items in light grey */}
          <ul className="list-disc list-inside text-left text-lg space-y-2 max-w-md mx-auto text-gray-300">
            {content.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </Card>
      )}

      {activeSection === 'media' && (
        <Card>
          {/* Title in vibrant blue */}
          <h2 className="text-4xl font-bold text-[#6A66FF] mb-6">
            {content.title}
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {content.images.map((imgSrc, index) => (
              <img
                key={index}
                src={imgSrc}
                alt={`Media ${index + 1}`}
                className="w-full h-auto rounded-md shadow-md object-cover aspect-video"
              />
            ))}
          </div>
          {/* Placeholder for embedded video with vibrant blue border */}
          <div className="w-full aspect-video rounded-md overflow-hidden shadow-lg border-2 border-[#6A66FF]">
            <iframe
              width="100%"
              height="100%"
              src={content.videoUrl}
              title="FX-Drift Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </Card>
      )}

      {activeSection === 'news' && (
        <Card>
          {/* Title in white */}
          <h2 className="text-4xl font-bold text-white mb-6">
            {content.title}
          </h2>
          <div className="space-y-6 max-w-xl mx-auto">
            {content.articles.map((article, index) => (
              <div key={index} className="bg-[#111111] bg-opacity-70 p-4 rounded-md shadow-md border border-[#6A66FF]">
                {/* Headline in white */}
                <h3 className="text-2xl font-semibold text-white mb-2">{article.headline}</h3>
                {/* Snippet in light grey */}
                <p className="text-gray-300">{article.snippet}</p>
                {/* Read More button in vibrant blue */}
                <button className="mt-2 text-[#6A66FF] hover:underline text-sm">Read More (External)</button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeSection === 'community' && (
        <Card>
          {/* Title in white */}
          <h2 className="text-4xl font-bold text-white mb-6">
            {content.title}
          </h2>
          <div className="flex flex-col space-y-4">
            {content.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                // Link background dark, hover vibrant blue, text white
                className="bg-[#111111] hover:bg-[#6A66FF] text-white py-3 px-6 rounded-full text-lg font-semibold shadow-md transition duration-300 ease-in-out transform hover:scale-105"
              >
                {link.name}
              </a>
            ))}
          </div>
        </Card>
      )}

      {activeSection === 'support' && (
        <Card>
          {/* Title in vibrant blue */}
          <h2 className="text-4xl font-bold text-[#6A66FF] mb-6">
            {content.title}
          </h2>
          <div className="space-y-4 max-w-xl mx-auto text-left">
            {content.faq.map((item, index) => (
              <div key={index} className="bg-[#111111] bg-opacity-70 p-4 rounded-md shadow-md border border-[#6A66FF]">
                {/* Question in white */}
                <h3 className="text-xl font-semibold text-white mb-1">{item.q}</h3>
                {/* Answer in light grey */}
                <p className="text-gray-300">{item.a}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </main>
  );
}

// Sidebar Component
function Sidebar({ sectionContent }) {
  return (
    // Sidebar styling: Dark UI background, rounded, shadow
    <aside className="flex flex-col bg-[#0A0A12] p-4 space-y-6 shadow-lg rounded-lg ml-4 w-64 flex-shrink-0 relative z-10">
      {/* Transmission Log (Latest News) */}
      <div className="bg-[#111111] bg-opacity-80 p-4 rounded-md shadow-inner border border-[#6A66FF]">
        {/* Title in white */}
        <h3 className="text-xl font-bold text-white mb-3">Transmission Log</h3>
        <ul className="space-y-3">
          {sectionContent.news.articles.slice(0, 2).map((article, index) => (
            <li key={index} className="text-sm text-gray-300">
              {/* Headline in white */}
              <span className="font-semibold text-white">{article.headline}:</span> {article.snippet.slice(0, 40)}...
            </li>
          ))}
        </ul>
      </div>

      {/* Media Spotlight */}
      <div className="bg-[#111111] bg-opacity-80 p-4 rounded-md shadow-inner border border-[#6A66FF]">
        {/* Title in white */}
        <h3 className="text-xl font-bold text-white mb-3">Media Spotlight</h3>
        <img
          src="https://placehold.co/250x150/000000/6A66FF?text=Racing+Action"
          alt="Media Spotlight"
          className="w-full h-auto rounded-md shadow-md object-cover mb-3"
        />
        <p className="text-sm text-gray-300 mb-2">
          "A glimpse into the high-speed world..."
        </p>
        {/* Button with vibrant blue background and white text */}
        <button className="bg-[#6A66FF] text-white text-sm py-1 px-3 rounded-full hover:bg-[#5A55EE] transition duration-200">
          View Gallery
        </button>
      </div>
    </aside>
  );
}

// Footer Component
function Footer() {
  return (
    // Footer styling: Dark UI background, padding, flex for alignment, rounded corners
    <footer className="bg-[#0A0A12] p-4 flex items-center justify-between text-xs text-gray-400 shadow-lg rounded-t-lg relative z-10">
      {/* Legal Text and links in light grey */}
      <div className="flex space-x-4">
        <span>© 2025 FX-Drift. All rights reserved.</span>
        <a href="#" className="hover:underline text-gray-300">Privacy Policy</a>
        <a href="#" className="hover:underline text-gray-300">Terms of Use</a>
      </div>
    </footer>
  );
}

export default App;
