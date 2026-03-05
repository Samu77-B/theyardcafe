/**
 * Local Events Integration for The Yard Cafe
 * Displays events from local storage that have Stripe payment links
 * Supports both the main events page and the evenings page
 */

/** Escape text for safe use in HTML to prevent XSS (e.g. from localStorage) */
function escapeHtml(text) {
  if (text == null) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/** Allow only https URLs for links to prevent javascript: or other schemes */
function safeHref(url) {
  if (typeof url !== 'string' || !/^https:\/\//i.test(url)) return '#';
  return url;
}

// Get events data from localStorage with filtering options
function getLocalEvents(venueFilter = null, limit = null, eveningEventsOnly = false) {
  const eventsData = JSON.parse(localStorage.getItem('yardCafeEvents')) || [];
  
  // Filter events that have a Stripe payment link, are published, and in the future
  let eventsWithStripe = eventsData.filter(event => 
    event.stripeLink && 
    event.status === 'published' && 
    new Date(`${event.date}T${event.startTime}`) >= new Date() && 
    (event.showOnEventsPage !== false) // Include if not explicitly set to false
  );
  
  // Apply venue filter if specified
  if (venueFilter) {
    eventsWithStripe = eventsWithStripe.filter(event => event.venue === venueFilter);
  }
  
  // Apply evening events filter if specified
  if (eveningEventsOnly) {
    eventsWithStripe = eventsWithStripe.filter(event => event.isEveningEvent === true);
  }
  
  // Sort by date (closest first)
  eventsWithStripe.sort((a, b) => {
    return new Date(`${a.date}T${a.startTime}`) - new Date(`${b.date}T${b.startTime}`);
  });
  
  // Apply limit if specified
  if (limit && eventsWithStripe.length > limit) {
    eventsWithStripe = eventsWithStripe.slice(0, limit);
  }
  
  // If no events with Stripe links found, return demo data for display purposes
  if (eventsWithStripe.length === 0) {
    let demoEvents = [
      {
        id: 'demo-1',
        name: 'Summer Jazz Evening',
        date: '2025-07-25',
        startTime: '19:30',
        endTime: '22:00',
        venue: 'alexandra-palace',
        description: 'Join us for a delightful evening of jazz with our house band and special guests.',
        price: '15.00',
        isFree: false,
        status: 'published',
        isEveningEvent: false,
        showOnEventsPage: true,
        stripeLink: 'https://checkout.stripe.com/c/pay/cs_test_a1pJRnKj3AEpqk0IQAbWv3S7QBLV3kJzZR1RuKQliqLbnsYgIKZnEARQI3#fidkdWxOYHwnPyd1blpxYHZxWjA0Sm9LNGBPRzFAQ3VRbTBxb083RldHQldWMTNnUVFKXTJrcWNiPVxnQ0BPVXxpcm9MbTxVNV9dTmZSMGhVNTVmNTU8Vk9Jd0JrQScpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl' // Test Stripe payment link
      },
      {
        id: 'demo-2',
        name: 'Poetry Night',
        date: '2025-06-15',
        startTime: '18:30',
        endTime: '20:30',
        venue: 'palmers-green',
        description: 'Local poets share their work in our intimate cafe setting. Light refreshments included.',
        price: '8.50',
        isFree: false,
        status: 'published',
        isEveningEvent: true,
        showOnEventsPage: true,
        stripeLink: 'https://checkout.stripe.com/c/pay/cs_test_b1DXC5WfN0r3MdshQx1K8CxDPUUENy3i7H35wbFAkfWQTbBkrSflWQbAoD#fidkdWxOYHwnPyd1blpxYHZxWjA0Sm9LNGBPRzFAQ3VRbTBxb083RldHQldWMTNnUVFKXTJrcWNiPVxnQ0BPVXxpcm9MbTxVNV9dTmZSMGhVNTVmNTU8Vk9Jd0JrQScpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl' // Test Stripe payment link for Poetry Night
      }
    ];
    
    // Apply venue filter to demo events if specified
    if (venueFilter) {
      demoEvents = demoEvents.filter(event => event.venue === venueFilter);
    }
    
    // Apply limit to demo events if specified
    if (limit && demoEvents.length > limit) {
      demoEvents = demoEvents.slice(0, limit);
    }
    
    return demoEvents;
  }
  
  return eventsWithStripe;
}

/**
 * Check if an event is within the next 7 days
 */
function isEventWithinNext7Days(dateString) {
  const today = new Date();
  const eventDate = new Date(dateString);
  
  // Set time to start of day for accurate comparison
  today.setHours(0, 0, 0, 0);
  eventDate.setHours(0, 0, 0, 0);
  
  const daysDifference = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
  
  return daysDifference >= 0 && daysDifference <= 7;
}

/**
 * Check if an event is within the next 5 days
 */
function isEventWithinNext5Days(dateString) {
  const today = new Date();
  const eventDate = new Date(dateString);
  
  // Set time to start of day for accurate comparison
  today.setHours(0, 0, 0, 0);
  eventDate.setHours(0, 0, 0, 0);
  
  const daysDifference = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
  
  return daysDifference >= 0 && daysDifference <= 5;
}

/**
 * Get countdown text for events within 7 days
 */
function getEventCountdownText(dateString) {
  const today = new Date();
  const eventDate = new Date(dateString);
  
  // Set time to start of day for accurate comparison
  today.setHours(0, 0, 0, 0);
  eventDate.setHours(0, 0, 0, 0);
  
  const daysDifference = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
  
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
 * Format date for display
 */
function formatLocalDate(dateString, startTime, endTime) {
  const eventDate = new Date(`${dateString}T${startTime}`);
  
  const options = { 
    weekday: 'long',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  };
  
  const formattedDate = eventDate.toLocaleDateString('en-GB', options);
  return `${formattedDate}<br>${startTime} - ${endTime}`;
}

/**
 * Get venue name by ID
 */
function getVenueNameById(venueId) {
  const venues = {
    'alexandra-palace': 'Alexandra Palace',
    'palmers-green': 'Palmers Green'
  };
  return venues[venueId] || 'Unknown Venue';
}

/**
 * Display local events on the events page
 */
function displayLocalEvents() {
  console.log('Starting displayLocalEvents function');
  const localEventsContainer = document.getElementById('local-events');
  if (!localEventsContainer) {
    console.log('Local events container not found (may not be on events page)');
    return;
  }
  
  const events = getLocalEvents();
  console.log('Retrieved events for main page:', events);
  
  // Always show the section for demo purposes
  const eventsSection = document.getElementById('local-events-section');
  if (eventsSection) {
    eventsSection.style.display = 'block';
  } else {
    console.log('Events section container not found (may not be on events page)');
    return;
  }
  
  // Clear any existing events
  localEventsContainer.innerHTML = '';
  
  // Create and append event elements
  events.forEach(event => {
    const eventElement = document.createElement('div');
    const isUpcoming7Days = isEventWithinNext7Days(event.date);
    const countdownText = getEventCountdownText(event.date);
    
    // Add special styling for upcoming events
    eventElement.className = isUpcoming7Days ? 'event-listing upcoming-event' : 'event-listing';
    
    if (isUpcoming7Days) {
      eventElement.style.cssText = `
        border: 2px solid #ffd700;
        background-color: rgba(255, 215, 0, 0.1);
        position: relative;
        padding: 20px;
        margin-bottom: 20px;
        border-radius: 8px;
      `;
    }
    
    const venueName = getVenueNameById(event.venue);
    const priceDisplay = event.isFree ? 'Free Entry' : `Tickets from £${parseFloat(event.price).toFixed(2)}`;
    
    // Add countdown badge if within 7 days
    let badgeHtml = '';
    if (countdownText) {
      const isToday = countdownText === 'THIS EVENING AT THE YARD';
      const isTomorrow = countdownText === 'TOMORROW EVENING';
      
      badgeHtml = `
        <div style="position: absolute; top: -12px; right: -12px; background-color: ${isToday ? '#d32f2f' : isTomorrow ? '#ff6b35' : '#ffd700'}; color: ${isToday || isTomorrow ? '#fff' : '#000'}; padding: 8px 14px; border-radius: 18px; font-size: 1em; font-weight: bold; z-index: 10; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">
          ${countdownText}
        </div>
      `;
    }
    
    const safeName = escapeHtml(event.name);
    const safeStripe = safeHref(event.stripeLink);
    eventElement.innerHTML = `
      ${badgeHtml}
      <h2 class="menuheading" style="text-align: left; ${isUpcoming7Days ? 'color: #ffd700;' : ''}">${safeName}</h2>
      <div style="text-align: left;">
        <p style="text-align: left; margin: 0;">${formatLocalDate(event.date, event.startTime, event.endTime)}</p>
        <p style="text-align: left; margin: 0;">${escapeHtml(venueName)}</p>
        <p style="text-align: left; margin-bottom: 15px;">${priceDisplay}</p>
      </div>
      <div class="payment-options">
        <a href="${safeStripe}" target="_blank" rel="noopener noreferrer" class="stripe-button">
          <span class="payment-icon"><i class="fa fa-credit-card"></i></span>
          Book via Stripe
        </a>
      </div>
    `;
    
    localEventsContainer.appendChild(eventElement);
  });
}

/**
 * Display evening events on the evenings page
 */
function displayEveningEvents() {
  console.log('Starting displayEveningEvents function');
  const eveningsContainer = document.getElementById('evenings-events');
  if (!eveningsContainer) {
    console.log('Evenings events container not found (may not be on evenings page)');
    return;
  }
  
  // For the evenings page, filter by evening events and Palmers Green venue
  const events = getLocalEvents('palmers-green', 4, true); // Filter for Palmers Green venue, limit to 4, and evening events only
  console.log('Retrieved events for evenings page:', events);
  
  // Always show the section for demo purposes
  const eventsSection = document.getElementById('evenings-events-section');
  if (eventsSection) {
    eventsSection.style.display = 'block';
  } else {
    console.log('Evenings section container not found (may not be on evenings page)');
    return;
  }
  
  // Clear any existing events
  eveningsContainer.innerHTML = '';
  
  // Create and append event elements
  events.forEach(event => {
    const eventElement = document.createElement('div');
    const isUpcoming7Days = isEventWithinNext7Days(event.date);
    const countdownText = getEventCountdownText(event.date);
    
    // Add special styling for upcoming events
    eventElement.className = isUpcoming7Days ? 'event-listing upcoming-event' : 'event-listing';
    
    if (isUpcoming7Days) {
      eventElement.style.cssText = `
        border: 2px solid #ffd700;
        background-color: rgba(255, 215, 0, 0.1);
        position: relative;
        padding: 20px;
        margin-bottom: 20px;
        border-radius: 8px;
      `;
    }
    
    const priceDisplay = event.isFree ? 'Free Entry' : `Tickets from £${parseFloat(event.price).toFixed(2)}`;
    
    // Add countdown badge if within 7 days
    let badgeHtml = '';
    if (countdownText) {
      const isToday = countdownText === 'THIS EVENING AT THE YARD';
      const isTomorrow = countdownText === 'TOMORROW EVENING';
      
      badgeHtml = `
        <div style="position: absolute; top: -12px; right: -12px; background-color: ${isToday ? '#d32f2f' : isTomorrow ? '#ff6b35' : '#ffd700'}; color: ${isToday || isTomorrow ? '#fff' : '#000'}; padding: 8px 14px; border-radius: 18px; font-size: 1em; font-weight: bold; z-index: 10; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">
          ${countdownText}
        </div>
      `;
    }
    
    const safeName = escapeHtml(event.name);
    const safeStripe = safeHref(event.stripeLink);
    eventElement.innerHTML = `
      ${badgeHtml}
      <h2 class="menuheading" style="text-align: left; ${isUpcoming7Days ? 'color: #ffd700;' : ''}">${safeName}</h2>
      <div style="text-align: left;">
        <p style="text-align: left; margin: 0;">${formatLocalDate(event.date, event.startTime, event.endTime)}</p>
        <p style="text-align: left; margin-bottom: 15px;">${priceDisplay}</p>
      </div>
      <div class="payment-options">
        <a href="${safeStripe}" target="_blank" rel="noopener noreferrer" class="stripe-button">
          <span class="payment-icon"><i class="fa fa-credit-card"></i></span>
          Book via Stripe
        </a>
      </div>
    `;
    
    eveningsContainer.appendChild(eventElement);
  });
}

// Run when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Run both display functions - they'll only take effect if the relevant containers exist
  displayLocalEvents();
  displayEveningEvents();
});
