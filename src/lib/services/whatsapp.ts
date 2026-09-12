// WhatsApp Service for NEEL ENTERPRISES
// Centralized WhatsApp message generation and utilities

import { siteConfig, whatsappMessages } from '../config/site';

export interface WhatsAppMessageOptions {
  type?: 'general' | 'breakdown' | 'service' | 'rental' | 'parts';
  customMessage?: string;
  customerName?: string;
  equipmentType?: string;
  location?: string;
}

/**
 * Generate a WhatsApp message URL for contacting NEEL ENTERPRISES
 */
export function getWhatsAppUrl(options: WhatsAppMessageOptions = {}): string {
  const { type = 'general', customMessage, customerName, equipmentType, location } = options;
  
  let message = customMessage || whatsappMessages[type];
  
  // Add context if provided
  const contextParts: string[] = [];
  if (customerName) contextParts.push(`Name: ${customerName}`);
  if (equipmentType) contextParts.push(`Equipment: ${equipmentType}`);
  if (location) contextParts.push(`Location: ${location}`);
  
  if (contextParts.length > 0) {
    message += '\n\n' + contextParts.join('\n');
  }
  
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.company.whatsapp.replace(/\D/g, '')}?text=${encodedMessage}`;
}

/**
 * Generate a service-specific WhatsApp message
 */
export function getServiceWhatsAppUrl(serviceName: string): string {
  const message = `Hello NEEL ENTERPRISES, I need help with ${serviceName}.`;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.company.whatsapp.replace(/\D/g, '')}?text=${encodedMessage}`;
}

/**
 * Generate a breakdown emergency WhatsApp message
 */
export function getBreakdownWhatsAppUrl(
  equipmentType: string,
  brand?: string,
  location?: string,
  problem?: string
): string {
  let message = `🚨 BREAKDOWN ALERT 🚨\n\n`;
  message += `Hello NEEL ENTERPRISES, I need urgent help with a forklift breakdown.\n\n`;
  message += `Equipment: ${equipmentType}`;
  if (brand) message += ` (${brand})`;
  message += `\n`;
  if (location) message += `Location: ${location}\n`;
  if (problem) message += `Problem: ${problem}\n`;
  message += `\nPlease contact me urgently.`;
  
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.company.whatsapp.replace(/\D/g, '')}?text=${encodedMessage}`;
}

/**
 * Generate a rental enquiry WhatsApp message
 */
export function getRentalWhatsAppUrl(
  equipmentType: string,
  capacity?: string,
  duration?: string,
  location?: string
): string {
  let message = `Hello NEEL ENTERPRISES, I am interested in forklift rental.\n\n`;
  message += `Equipment Required: ${equipmentType}\n`;
  if (capacity) message += `Capacity: ${capacity}\n`;
  if (duration) message += `Duration: ${duration}\n`;
  if (location) message += `Location: ${location}\n`;
  message += `\nPlease share availability and pricing.`;
  
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.company.whatsapp.replace(/\D/g, '')}?text=${encodedMessage}`;
}

/**
 * Generate a spare parts enquiry WhatsApp message
 */
export function getPartsWhatsAppUrl(
  partName: string,
  brand?: string,
  model?: string,
  quantity: number = 1
): string {
  let message = `Hello NEEL ENTERPRISES, I need to enquire about spare parts.\n\n`;
  message += `Part: ${partName}\n`;
  if (brand) message += `Brand: ${brand}\n`;
  if (model) message += `Model: ${model}\n`;
  message += `Quantity: ${quantity}\n`;
  message += `\nPlease share availability and pricing.`;
  
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.company.whatsapp.replace(/\D/g, '')}?text=${encodedMessage}`;
}

/**
 * Open WhatsApp in a new window/tab
 */
export function openWhatsApp(options: WhatsAppMessageOptions = {}): void {
  if (typeof window === 'undefined') return;
  const url = getWhatsAppUrl(options);
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Check if WhatsApp is available (basic check)
 */
export function isWhatsAppAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  return true; // WhatsApp Web is generally available
}

/**
 * Get WhatsApp click handler
 */
export function handleWhatsAppClick(
  e: React.MouseEvent | MouseEvent,
  options: WhatsAppMessageOptions = {}
): void {
  e.preventDefault();
  openWhatsApp(options);
}

// Export convenience functions for common use cases
export const whatsapp = {
  general: () => getWhatsAppUrl({ type: 'general' }),
  breakdown: () => getWhatsAppUrl({ type: 'breakdown' }),
  service: (serviceName: string) => getServiceWhatsAppUrl(serviceName),
  rental: (equipmentType: string) => getRentalWhatsAppUrl(equipmentType),
  parts: (partName: string) => getPartsWhatsAppUrl(partName),
  open: (options?: WhatsAppMessageOptions) => openWhatsApp(options)
};
