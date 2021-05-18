import React from 'react';
import CookieNotification from './cookie-notification.js';

export const Default = () => <CookieNotification forceShow />;
export const WithReadMore = () => <CookieNotification forceShow readMore />;
export const DarkMode = () => <CookieNotification inverted forceShow readMore />;

export default {
  title: 'Components/Cookie Notification',
};
