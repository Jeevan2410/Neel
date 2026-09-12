// Email Service for NEEL ENTERPRISES
// Centralized email generation and utilities

import { siteConfig } from '../config/site';
import { generateReferenceNumber } from '../utils';

export interface EmailOptions {
  to?: string;
  subject?: string;
  body?: string;
  cc?: string[];
  bcc?: string[];
}

export interface EnquiryEmailData {
  referenceNumber: string;
  customerName: string;
  customerCompany?: string;
  customerEmail: string;
  customerPhone: string;
  enquiryType: string;
  equipmentType?: string;
  equipmentBrand?: string;
  equipmentModel?: string;
  problemDescription?: string;
  location?: string;
  urgency?: string;
}

/**
 * Generate a mailto URL for contacting NEEL ENTERPRISES
 */
export function getEmailUrl(options: EmailOptions = {}): string {
  const {
    to = siteConfig.company.email,
    subject = 'Forklift Service Enquiry',
    body = '',
    cc = [],
    bcc = []
  } = options;
  
  const params = new URLSearchParams();
  params.set('subject', subject);
  if (body) params.set('body', body);
  if (cc.length > 0) params.set('cc', cc.join(','));
  if (bcc.length > 0) params.set('bcc', bcc.join(','));
  
  const queryString = params.toString();
  return `mailto:${to}${queryString ? '?' + queryString : ''}`;
}

/**
 * Generate a structured enquiry email body
 */
export function generateEnquiryEmailBody(data: EnquiryEmailData): string {
  const lines = [
    'Dear NEEL ENTERPRISES Team,',
    '',
    'I would like to request your services. Below are the details:',
    '',
    `Reference: ${data.referenceNumber}`,
    `Name: ${data.customerName}`,
    data.customerCompany ? `Company: ${data.customerCompany}` : '',
    `Email: ${data.customerEmail}`,
    `Phone: ${data.customerPhone}`,
    '',
    '--- Enquiry Details ---',
    `Type: ${data.enquiryType}`,
    data.equipmentType ? `Equipment Type: ${data.equipmentType}` : '',
    data.equipmentBrand ? `Brand: ${data.equipmentBrand}` : '',
    data.equipmentModel ? `Model: ${data.equipmentModel}` : '',
    data.location ? `Location: ${data.location}` : '',
    data.urgency ? `Urgency: ${data.urgency}` : '',
    '',
    data.problemDescription ? `Problem Description:\n${data.problemDescription}` : '',
    '',
    '---',
    'Thank you for your assistance.',
    'Best regards,',
    data.customerName
  ];
  
  return lines.filter(line => line !== '').join('\n');
}

/**
 * Generate an enquiry submission email
 */
export function getEnquiryEmailUrl(data: EnquiryEmailData): string {
  const subject = `${data.enquiryType.charAt(0).toUpperCase() + data.enquiryType.slice(1)} Enquiry - ${data.referenceNumber}`;
  const body = generateEnquiryEmailBody(data);
  
  return getEmailUrl({
    to: siteConfig.company.email,
    subject,
    body
  });
}

/**
 * Generate a breakdown emergency email
 */
export function getBreakdownEmailUrl(
  customerName: string,
  customerEmail: string,
  customerPhone: string,
  equipmentType: string,
  location?: string,
  problem?: string
): string {
  const referenceNumber = generateReferenceNumber();
  const subject = `🚨 BREAKDOWN ALERT - ${referenceNumber}`;
  
  const body = `BREAKDOWN EMERGENCY\n\nReference: ${referenceNumber}\nName: ${customerName}\nEmail: ${customerEmail}\nPhone: ${customerPhone}\n\nEquipment: ${equipmentType}\nLocation: ${location || 'Not specified'}\nProblem: ${problem || 'Not specified'}\n\nThis is an urgent breakdown. Please contact immediately.`;
  
  return getEmailUrl({
    to: siteConfig.company.email,
    subject,
    body
  });
}

/**
 * Generate a rental enquiry email
 */
export function getRentalEmailUrl(
  customerName: string,
  customerEmail: string,
  customerPhone: string,
  equipmentType: string,
  capacity?: string,
  duration?: string,
  location?: string
): string {
  const referenceNumber = generateReferenceNumber();
  const subject = `Rental Enquiry - ${referenceNumber}`;
  
  let body = `RENTAL ENQUIRY\n\nReference: ${referenceNumber}\nName: ${customerName}\nEmail: ${customerEmail}\nPhone: ${customerPhone}\n\n`;
  body += `Equipment Required: ${equipmentType}\n`;
  if (capacity) body += `Capacity: ${capacity}\n`;
  if (duration) body += `Duration: ${duration}\n`;
  if (location) body += `Location: ${location}\n`;
  body += `\nPlease share availability and pricing.`;
  
  return getEmailUrl({
    to: siteConfig.company.email,
    subject,
    body
  });
}

/**
 * Open email client in a new window/tab
 */
export function openEmailClient(url: string): void {
  if (typeof window === 'undefined') return;
  window.location.href = url;
}

/**
 * Get email click handler
 */
export function handleEmailClick(e: React.MouseEvent | MouseEvent, url: string): void {
  e.preventDefault();
  openEmailClient(url);
}

// Export convenience functions
export const email = {
  general: (subject?: string, body?: string) => getEmailUrl({ subject, body }),
  enquiry: (data: EnquiryEmailData) => getEnquiryEmailUrl(data),
  breakdown: (
    name: string,
    email: string,
    phone: string,
    equipment: string,
    location?: string,
    problem?: string
  ) => getBreakdownEmailUrl(name, email, phone, equipment, location, problem),
  rental: (
    name: string,
    email: string,
    phone: string,
    equipment: string,
    capacity?: string,
    duration?: string,
    location?: string
  ) => getRentalEmailUrl(name, email, phone, equipment, capacity, duration, location),
  send: (url: string) => openEmailClient(url)
};
