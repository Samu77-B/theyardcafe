/**
 * Event Filtering and Highlighting for The Yard Cafe
 * Handles both hardcoded events on homepage and dynamic events from localStorage
 * 
 * ⚠️ IMPORTANT: This is the SINGLE SOURCE OF TRUTH for homepage events.
 * 
 * All events displayed on the homepage (index.html) are managed in the 
 * hardcodedEvents array below. DO NOT add events directly to the HTML.
 * 
 * 📝 TO MANAGE EVENTS:
 * 1. Edit the hardcodedEvents array below
 * 2. To mark as sold out: Set soldOut: true
 * 3. To hide an event: Remove it from the array (or set date in the past)
 * 4. Past events are automatically filtered out
 * 
 * 🔍 TO FIND EVENTS:
 * - Search by id (e.g., 'november-21-champagne')
 * - Search by date (e.g., '2025-11-21')
 * - Search by title (e.g., 'Champagne Tasting')
 */

// ============================================================================
// HOMEPAGE EVENTS - SINGLE SOURCE OF TRUTH
// ============================================================================
// All events displayed on index.html are managed here.
// DO NOT add events to index.html - they will be overwritten!
// 
// Event Format:
// {
//   id: 'unique-id',                    // Unique identifier (required)
//   date: 'YYYY-MM-DD',                  // Event date (required)
//   title: 'Event Title',                // Display title (required)
//   link: 'evenings.html#anchor',        // Link to event details (required)
//   icon: 'events/IconName.png',         // Icon image path (required)
//   soldOut: false                        // Set to true if sold out (optional)
// }
// ============================================================================
const hardcodedEvents = [
  {
    id: 'november-1-live-music',
    date: '2025-11-01',
    title: 'Live Music - Maurice Judge',
    link: 'evenings.html#november-live-music',
    icon: 'events/LiveMusic.png',
    soldOut: false
  },
  {
    id: 'november-7-wine-tasting',
    date: '2025-11-07',
    title: 'French Wine Tasting',
    link: 'evenings.html#november-wine-tasting',
    icon: 'events/WineTasting.png',
    soldOut: true
  },
  {
    id: 'november-8-live-music',
    date: '2025-11-08',
    title: 'Live Music - Maurice Judge',
    link: 'evenings.html#november-live-music',
    icon: 'events/LiveMusic.png',
    soldOut: false
  },
  {
    id: 'november-21-champagne',
    date: '2025-11-21',
    title: 'Champagne Tasting',
    link: 'evenings.html#champagne-tasting-november',
    icon: 'events/WineTasting.png',
    soldOut: true
  },
  {
    id: 'december-6-live-music',
    date: '2025-12-06',
    title: 'Live Music - Maurice Judge',
    link: 'evenings.html#december-live-music',
    icon: 'events/LiveMusic.png',
    soldOut: false
  },
  {
    id: 'december-12-supper-club',
    date: '2025-12-12',
    title: 'Christmas Supper Club',
    link: 'evenings.html#christmas-supper-club',
    icon: 'events/Supper-club.png',
    soldOut: false
  },
  {
    id: 'december-20-live-music',
    date: '2025-12-20',
    title: 'Live Music - Maurice Judge',
    link: 'evenings.html#december-live-music',
    icon: 'events/LiveMusic.png',
    soldOut: false
  },
  {
    id: 'january-10-live-music',
    date: '2026-01-10',
    title: 'Live Music - Tom Benson',
    link: 'evenings.html#january-live-music',
    icon: 'events/LiveMusic.png',
    soldOut: false
  },
  {
    id: 'january-17-live-music',
    date: '2026-01-17',
    title: 'Live Music - Maurice Judge',
    link: 'evenings.html#january-live-music',
    icon: 'events/LiveMusic.png',
    soldOut: false
  },
  {
    id: 'january-31-live-music',
    date: '2026-01-31',
    title: 'Live Music - Maurice Judge',
    link: 'evenings.html#january-live-music',
    icon: 'events/LiveMusic.png',
    soldOut: false
  },
  {
    id: 'february-7-live-music',
    date: '2026-02-07',
    title: 'Live Music - Maurice Judge',
    link: 'evenings.html#february-live-music',
    icon: 'events/LiveMusic.png',
    soldOut: false
  },
  {
    id: 'february-14-live-music',
    date: '2026-02-14',
    title: 'Live Music - Tom Benson',
    link: 'evenings.html#february-live-music',
    icon: 'events/LiveMusic.png',
    soldOut: false
  },
  {
    id: 'february-21-live-music',
    date: '2026-02-21',
    title: 'Live Music - Maurice Judge',
    link: 'evenings.html#february-live-music',
    icon: 'events/LiveMusic.png',
    soldOut: false
  },
  {
    id: 'february-26-wine-tasting',
    date: '2026-02-26',
    title: 'Wine Tasting \'Tour de France\'',
    link: 'evenings.html#february-wine-tasting-tour-de-france',
    icon: 'events/WineTasting.png',
    soldOut: false
  },
  {
    id: 'february-28-live-music',
    date: '2026-02-28',
    title: 'Live Music - Maurice Judge',
    link: 'evenings.html#february-live-music',
    icon: 'events/LiveMusic.png',
    soldOut: false
  },
  {
    id: 'march-26-wine-tasting',
    date: '2026-03-26',
    title: 'Bordeaux vs Burgundy Wine Tasting',
    link: 'evenings.html#march-wine-tasting-bordeaux-burgundy',
    icon: 'events/WineTasting.png',
    soldOut: false
  }
  // Add new events above this line
  // Past events are automatically filtered out, so you can leave them here
  // or remove them for cleanliness
];
// ============================================================================
// END OF HOMEPAGE EVENTS CONFIGURATION
// ============================================================================

/**
 * Check if an event is within the next 7 days
 */
function isEventWithinNext7Days(eventDate) {
  const today = new Date();
  const eventDateTime = new Date(eventDate);
  
  // Set time to start of day for accurate comparison
  today.setHours(0, 0, 0, 0);
  eventDateTime.setHours(0, 0, 0, 0);
  
  const daysDifference = Math.ceil((eventDateTime - today) / (1000 * 60 * 60 * 24));
  
  return daysDifference >= 0 && daysDifference <= 7;
}

/**
 * Check if an event is within the next 5 days
 */
function isEventWithinNext5Days(eventDate) {
  const today = new Date();
  const eventDateTime = new Date(eventDate);
  
  // Set time to start of day for accurate comparison
  today.setHours(0, 0, 0, 0);
  eventDateTime.setHours(0, 0, 0, 0);
  
  const daysDifference = Math.ceil((eventDateTime - today) / (1000 * 60 * 60 * 24));
  
  return daysDifference >= 0 && daysDifference <= 5;
}

/**
 * Get countdown text for events within 7 days
 */
function getEventCountdownText(eventDate) {
  const today = new Date();
  const eventDateTime = new Date(eventDate);
  
  // Set time to start of day for accurate comparison
  today.setHours(0, 0, 0, 0);
  eventDateTime.setHours(0, 0, 0, 0);
  
  const daysDifference = Math.ceil((eventDateTime - today) / (1000 * 60 * 60 * 24));
  
  if (daysDifference === 0) {
    return 'THIS EVENING AT THE YARD';
  } else if (daysDifference === 1) {
    return 'TOMORROW EVENING';
  } else if (daysDifference >= 2 && daysDifference <= 7) {
    return `${daysDifference} DAYS TO GO`;
  }
  
  return null; // No countdown for events beyond 7 days
}

/**
 * Check if an event is in the past
 */
function isEventInPast(eventDate) {
  const today = new Date();
  const eventDateTime = new Date(eventDate);
  
  // Set time to start of day for accurate comparison
  today.setHours(0, 0, 0, 0);
  eventDateTime.setHours(0, 0, 0, 0);
  
  return eventDateTime < today;
}

/**
 * Format date for display (e.g., "October 18th")
 */
function formatEventDate(dateString) {
  const eventDate = new Date(dateString);
  const options = { 
    month: 'long',
    day: 'numeric'
  };
  
  const formattedDate = eventDate.toLocaleDateString('en-GB', options);
  
  // Add ordinal suffix
  const day = eventDate.getDate();
  const suffix = day === 1 || day === 21 || day === 31 ? 'st' :
                 day === 2 || day === 22 ? 'nd' :
                 day === 3 || day === 23 ? 'rd' : 'th';
  
  return formattedDate.replace(/\d+/, day + suffix);
}

/**
 * Helper function to find an event by id, date, or title
 * Useful for debugging and finding events to edit
 * 
 * Usage: findEvent('november-21-champagne') or findEvent('2025-11-21')
 */
function findEvent(searchTerm) {
  return hardcodedEvents.find(event => 
    event.id === searchTerm || 
    event.date === searchTerm || 
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

/**
 * Filter and display events on homepage
 * 
 * ⚠️ IMPORTANT: This function REPLACES all content in .events-grid
 * Any hardcoded HTML events will be removed and replaced with events from
 * the hardcodedEvents array. This is why events must be managed in JS, not HTML.
 */
function filterAndDisplayHomepageEvents() {
  const eventsGrid = document.querySelector('.events-grid');
  
  if (!eventsGrid) {
    console.log('Events grid not found on homepage');
    return;
  }
  
  // Check if there are hardcoded events in HTML (shouldn't be any!)
  const existingEventItems = eventsGrid.querySelectorAll('.event-item');
  if (existingEventItems.length > 0) {
    console.warn('⚠️ WARNING: Found hardcoded events in HTML. These will be removed!');
    console.warn('   All events should be managed in js/event-filtering.js, not in index.html');
    console.warn(`   Found ${existingEventItems.length} hardcoded event(s) that will be replaced.`);
    console.warn('   To manage events, edit the hardcodedEvents array in js/event-filtering.js');
  }
  
  // Filter out past events
  const upcomingEvents = hardcodedEvents.filter(event => !isEventInPast(event.date));
  
  // Clear existing events - this removes any hardcoded HTML
  eventsGrid.innerHTML = '';
  
  if (upcomingEvents.length === 0) {
    eventsGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 20px; color: white;">
        <p style="font-size: 1.5em;">No upcoming events scheduled. Check back soon!</p>
      </div>
    `;
    return;
  }
  
  // Create event elements
  upcomingEvents.forEach(event => {
    const isUpcoming7Days = isEventWithinNext7Days(event.date);
    const countdownText = getEventCountdownText(event.date);
    const eventElement = document.createElement('div');
    
    // Don't apply yellow highlight to sold-out events
    const shouldHighlight = isUpcoming7Days && !event.soldOut;
    
    eventElement.className = 'event-item';
    eventElement.style.cssText = `
      padding: 12px; 
      background-color: ${shouldHighlight ? 'rgba(255, 215, 0, 0.2)' : 'rgba(255, 255, 255, 0.1)'}; 
      border-radius: 4px; 
      transition: all 0.3s ease;
      border: ${shouldHighlight ? '2px solid #ffd700' : 'none'};
      position: relative;
    `;
    
    // Add countdown badge if within 7 days (but not if sold out)
    let badgeHtml = '';
    if (countdownText && !event.soldOut) {
      const isToday = countdownText === 'THIS EVENING AT THE YARD';
      const isTomorrow = countdownText === 'TOMORROW EVENING';
      
      badgeHtml = `
        <div style="position: absolute; top: -10px; right: -10px; background-color: ${isToday ? '#d32f2f' : isTomorrow ? '#ff6b35' : '#ffd700'}; color: ${isToday || isTomorrow ? '#fff' : '#000'}; padding: 8px 12px; border-radius: 15px; font-size: 1em; font-weight: bold; z-index: 10; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">
          ${countdownText}
        </div>
      `;
    }
    
    eventElement.innerHTML = `
      ${badgeHtml}
      <a href="${event.link}" style="color: white; text-decoration: none; display: block; font-size: 1.5em; line-height: 1.2em;">
        <img src="${event.icon}" alt="Event Icon" style="width: 40px; height: 40px; margin-bottom: 8px; display: block; margin-left: auto; margin-right: auto;">
        <strong>${formatEventDate(event.date)}:</strong><br>${event.title}
        ${event.soldOut ? '<br><span style="font-size: 1.2em; font-weight: bold; color: #d32f2f;">SOLD OUT</span>' : ''}
      </a>
    `;
    
    eventsGrid.appendChild(eventElement);
  });
  
  // Adjust grid layout based on number of events
  const eventCount = upcomingEvents.length;
  if (eventCount <= 3) {
    eventsGrid.style.gridTemplateColumns = `repeat(${eventCount}, 1fr)`;
  } else if (eventCount <= 6) {
    eventsGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
  } else {
    eventsGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
  }
}

/**
 * Enhanced filtering for localStorage events (used on events.html)
 */
function enhanceLocalEventsFiltering() {
  // Override the existing getLocalEvents function to add 7-day highlighting
  const originalGetLocalEvents = window.getLocalEvents;
  
  if (originalGetLocalEvents) {
    window.getLocalEvents = function(venueFilter = null, limit = null, eveningEventsOnly = false) {
      const events = originalGetLocalEvents.call(this, venueFilter, limit, eveningEventsOnly);
      
      // Add upcoming flag to events within 7 days
      return events.map(event => ({
        ...event,
        isUpcoming: isEventWithinNext7Days(event.date)
      }));
    };
  }
}

/**
 * Initialize event filtering on page load
 */
function initEventFiltering() {
  // Check if we're on the homepage
  if (document.querySelector('.events-grid')) {
    filterAndDisplayHomepageEvents();
  }
  
  // Enhance localStorage events filtering
  enhanceLocalEventsFiltering();
  
  console.log('Event filtering initialized');
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', initEventFiltering);

// Also run if DOM is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEventFiltering);
} else {
  initEventFiltering();
}
