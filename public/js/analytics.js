// Vercel Analytics para aplicaciones web vanilla
import { inject } from '@vercel/analytics';

// Inicializar analíticas
export function initAnalytics() {
  // Solo en producción
  if (window.location.hostname !== 'localhost' && 
      window.location.hostname !== '127.0.0.1') {
    inject();
    console.log('📊 Vercel Analytics inicializado');
  }
}

// Función para trackear eventos personalizados
export function trackEvent(eventName, properties = {}) {
  if (window.va) {
    window.va('track', eventName, properties);
  }
}

// Eventos específicos de tu aplicación
export const analytics = {
  // Trackear login
  trackLogin: (method = 'email') => {
    trackEvent('Login', { method });
  },
  
  // Trackear registro
  trackSignup: (method = 'email') => {
    trackEvent('Signup', { method });
  },
  
  // Trackear creación de items
  trackItemCreated: (category) => {
    trackEvent('Item Created', { category });
  },
  
  // Trackear navegación
  trackPageView: (page) => {
    trackEvent('Page View', { page });
  },
  
  // Trackear acciones del dashboard
  trackDashboardAction: (action) => {
    trackEvent('Dashboard Action', { action });
  }
};
