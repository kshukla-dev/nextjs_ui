'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import GlobalCTA from '@/components/sections/GlobalCTA'
import about from '@/data/about-us.json'
import ghg from '@/data/global-hiring.json'

const worldValues = [
  { letter: 'W', title: 'Winners', description: 'We measure our success by our clients’ outcomes. If our clients win, we win.' },
  { letter: 'O', title: 'Ownership', description: 'We take responsibility from start to finish. Accountability is non-negotiable.' },
  { letter: 'R', title: 'Responsive', description: 'We are always available for our clients. We act fast and communicate clearly.' },
  { letter: 'L', title: 'Leading', description: 'We lead in workforce solutions, combining local expertise with a global perspective to keep our clients ahead.' },
  { letter: 'D', title: 'Down to Earth', description: 'We provide clear, practical advice. We explain what matters, what to do next, and why it works.' },
]

const milestones = [
  { year: '2013', description: "Founded Macee BV (Jackson & Frank's holding company) in the Netherlands, focusing on providing HR solutions to the Dutch market." },
  { year: '2014', description: 'Achieved a significant milestone of employing 100+ people, establishing a strong foundation.' },
  { year: '2015', description: 'Secured the prestigious NeN Staffing License, demonstrating our commitment to compliance and high standards.' },
  { year: '2016-2017', description: 'Expanded operations into Belgium and the Czech Republic, broadening our European presence and capabilities.' },
  { year: '2018', description: 'Reached 500+ employees by supporting 250+ companies globally, marking a new phase of growth and operational scale.' },
  { year: '2022', description: "Launched Jackson and Frank as Macee's sister company, opening entities in the Netherlands, Germany, and Italy." },
  { year: '2023', description: 'Extended our reach to Poland, France and UK, achieving a workforce of 1,400+ employees across multiple countries.' },
  { year: '2024', description: 'Worked with our 700th client while expanding into Belgium, Czech Republic, and Spain.' },
  { year: '2025', description: 'Expanded into China by launching our HR Boutique and opening offices in Shanghai and Hong Kong.' },
]

const team = [
  { name: 'Maarten Koekebakker', role: 'Partner', image: '/leadership/Maarten.webp', bio: 'With a wealth of experience in navigating the intricate landscapes of international expansion strategy and human resources, Maarten stands as a seasoned professional adept at driving organizational growth and success on a global scale.' },
  { name: 'Pawel Michalkiewicz', role: 'Managing partner', image: '/leadership/pawel2.webp', bio: 'Pawel brings over two decades of hands-on experience in international business development and human resource management, having held pivotal roles in multinational corporations across various industries.' },
]

const allCountries = (ghg as any).countries
const available = allCountries.filter((c: any) => c.status?.toLowerCase() !== 'coming soon')
const comingSoon = allCountries.filter((c: any) => c.status?.toLowerCase() === 'coming soon')

const getCountryImage = (name: string) => {
  const map: Record<string, string> = {
    'The Netherlands': '/countries/eor-netherlands.webp',
    'India': '/countries/eor-india.webp',
    'Poland': '/countries/eor-poland.webp',
    'United Kingdom': '/countries/eor-uk.webp',
    'Germany': '/countries/eor-germany.webp',
    'Italy': '/countries/eor-Italy.webp',
    'Czech Republic': '/countries/eor-czech.webp',
    'France': '/countries/eor-france.webp',
    'Belgium': '/countries/eor-belgium.webp',
    'Spain': '/countries/eor-spain.webp',
    'UAE': '/countries/eor-uae.webp',
    'Hong Kong': '/countries/eor-hong-kong.webp',
    'China': '/countries/eor-china.webp',
    'Portugal': '/countries/eor-spain.webp',
    'Sweden': '/countries/eor-uk.webp',
    'Hungary': '/countries/eor-czech.webp',
    'Romania': '/countries/eor-poland.webp',
  }
  return map[name] || '/countries/eor-spain.webp'
}

const getFlagUrl = (name: string) => {
  const map: Record<string, string> = {
    'The Netherlands': '/countries/flag/Flag_of_the_Netherlands.svg.webp',
    'India': '/countries/flag/Flag_of_India.svg.webp',
    'Poland': '/countries/flag/Flag_of_Poland.svg.png',
    'United Kingdom': '/countries/flag/Flag-United-Kingdom.webp',
    'Germany': '/countries/flag/Flag_of_Germany_(3-2).svg.png',
    'Italy': '/countries/flag/Flag_of_Italy.svg.png',
    'France': '/countries/flag/Flag_of_France.svg.webp'
  }
  return map[name] || ''
}

const getFlag = (name: string) => {
  const map: Record<string, string> = {
    'The Netherlands': '🇳🇱',
    'India': '🇮🇳',
    'Poland': '🇵🇱',
    'United Kingdom': '🇬🇧',
    'Germany': '🇩🇪',
    'Italy': '🇮🇹',
    'France': '🇫🇷',
    'Portugal': '🇵🇹',
    'Sweden': '🇸🇪',
    'Hungary': '🇭🇺',
    'Romania': '🇷🇴',
  }
  return map[name] || '🌍'
}

const getShortAddress = (name: string) => {
  const map: Record<string, string> = {
    'The Netherlands': 'Amsterdam, Netherlands',
    'India': 'Nagpur, Mumbai',
    'Poland': 'Warsaw',
    'United Kingdom': 'London',
    'Germany': 'Berlin',
    'Italy': 'Milan',
    'France': 'Paris'
  }
  return map[name] || name
}

const getOffices = (name: string) => {
  if (name === 'The Netherlands') {
    return [
      { city: 'Amsterdam', address: 'Nieuwe Stationsstraat 10, 6811 KS' },
      { city: 'Rotterdam', address: 'Business Center, 3011 WZ' },
      { city: 'The Hague', address: 'Central District 5, 2511 AB' },
      { city: 'Utrecht', address: 'Innovation Park, 3584 CH' }
    ]
  } else if (name === 'India') {
    return [
      { city: 'Nagpur', address: 'Tech Park, 440022' },
      { city: 'Mumbai', address: 'Bandra Kurla Complex, 400051' }
    ]
  } else if (name === 'Germany') {
    return [
      { city: 'Berlin', address: 'Kurfürstenstraße 15, 10785' },
      { city: 'Munich', address: 'Bavaria Towers, 80331' },
      { city: 'Hamburg', address: 'ABC-Straße 45, 20354' }
    ]
  }
  return [
    { city: getShortAddress(name).split(',')[0], address: 'Main Office Center' }
  ]
}

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState(0)
  const [activeMilestone, setActiveMilestone] = useState(0)
  const [activeCountryName, setActiveCountryName] = useState('The Netherlands')

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMilestone(prev => (prev + 1) % milestones.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const activeCountryData = useMemo(() => {
    return available.find((c: any) => c.name === activeCountryName) || available[0]
  }, [activeCountryName])

  function toggleFaq(i: number) {
    setOpenFaq(prev => prev === i ? -1 : i)
  }

  function nextMilestone() {
    setActiveMilestone(prev => (prev + 1) % milestones.length)
  }

  function prevMilestone() {
    setActiveMilestone(prev => (prev - 1 + milestones.length) % milestones.length)
  }

  function setMilestone(index: number) {
    setActiveMilestone(index)
  }

  const scrollOffices = (direction: number) => {
    const container = document.querySelector('.office-slides')
    if (container) {
      const scrollAmount = 260
      container.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <>
      <style>{`
@import '@/styles/service-page.css';

/* Offices Premium UI */
.offices-premium-section {
  background: #fdfdfd;
  padding: 40px 16px;
  border-radius: 24px;
  margin-bottom: 64px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.02);
}
@media (min-width: 768px) {
  .offices-premium-section {
    padding: 64px 40px;
  }
}
.offices-header-wrap {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 40px;
}
@media (min-width: 768px) {
  .offices-header-wrap {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
}
.offices-header-badge {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f1f5f9;
  padding: 12px 24px;
  border-radius: 999px;
}
.badge-icon {
  width: 32px;
  height: 32px;
  background: #dbeafe;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.map-and-featured {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  margin-bottom: 48px;
}
@media (min-width: 900px) {
  .map-and-featured {
    grid-template-columns: 1fr 340px;
  }
}
.dotted-map-area {
  position: relative;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
}
.dotted-map-bg {
  width: 100%;
  padding-bottom: 60%;
  background-size: cover;
  background-position: center;
  opacity: 1;
}
.map-pin {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 8px;
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 2;
}
.pin-marker {
  position: relative;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pin-dot {
  width: 10px;
  height: 10px;
  background: #0E59F2;
  border-radius: 50%;
  position: relative;
  z-index: 2;
  transition: transform 0.2s ease, background 0.2s ease;
}
.map-pin:hover .pin-dot, .map-pin.active .pin-dot {
  background: #0E0F3B;
  transform: scale(1.2);
}
.pin-pulse {
  position: absolute;
  inset: -6px;
  background: rgba(14, 89, 242, 0.4);
  border-radius: 50%;
  z-index: 1;
  opacity: 0;
  transform: scale(0.5);
  transition: all 0.3s ease;
}
.map-pin:hover .pin-pulse, .map-pin.active .pin-pulse {
  opacity: 1;
  transform: scale(1);
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(2); opacity: 0; }
}
.pin-label {
  font-size: 11px;
  font-weight: 700;
  color: #0E0F3B;
  background: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.2s ease;
  pointer-events: none;
  white-space: nowrap;
}
.map-pin:hover .pin-label, .map-pin.active .pin-label {
  opacity: 1;
  transform: translateX(0);
}

.featured-country-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 12px 32px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
}
.fcc-image {
  height: 180px;
  background-size: cover;
  background-position: center;
  position: relative;
}
.fcc-image-content {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  padding: 20px;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  display: flex;
  align-items: center;
  gap: 12px;
}
.fcc-flag {
  width: 36px;
  height: 24px;
  border-radius: 4px;
  object-fit: cover;
}
.fcc-details {
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex-grow: 1;
}
.fcc-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
.fcc-text strong {
  display: block;
  font-size: 13px;
  color: #0E0F3B;
  margin-bottom: 4px;
}
.fcc-text span {
  font-size: 12px;
  color: #64748b;
}
.fcc-view-all {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-top: 1px solid #e2e8f0;
  color: #0E59F2;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
}
.fcc-view-all:hover {
  background: #f8fafc;
}

.offices-stats-bar {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 48px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.02);
}
@media (min-width: 900px) {
  .offices-stats-bar {
    grid-template-columns: repeat(4, 1fr);
  }
}
.stat-item {
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: center;
}
.stat-item:last-child {
  border-right: none;
}
.stat-text {
  text-align: left;
}
.stat-icon-wrap {
  width: 48px;
  height: 48px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.stat-text strong {
  display: block;
  font-size: 18px;
  color: #0E0F3B;
}
.stat-text span {
  font-size: 13px;
  color: #64748b;
  line-height: 1.4;
  display: block;
}

.subsection-title {
  font-family: var(--serif);
  font-size: 22px;
  font-weight: 700;
  color: #0E0F3B;
  margin-bottom: 24px;
}

.carousel-container {
  display: flex;
  align-items: center;
  gap: 16px;
}
.nav-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  cursor: pointer;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}
.nav-btn:hover {
  background: #f1f5f9;
  color: #0E0F3B;
}

.office-slides {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 24px;
  scrollbar-width: none; /* hide scrollbar for Firefox */
}
.office-slides::-webkit-scrollbar {
  display: none; /* hide scrollbar for Chrome/Safari */
}
.office-slide {
  flex: 0 0 240px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.office-slide:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.06);
}
.slide-img {
  height: 140px;
  background-size: cover;
  background-position: center;
  position: relative;
}
.slide-flag, .slide-flag-emoji {
  position: absolute;
  top: 12px;
  left: 12px;
  width: 32px;
  height: 24px;
  border-radius: 4px;
  object-fit: cover;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  border: 1px solid rgba(255,255,255,0.8);
}
.slide-content {
  padding: 20px;
}
.slide-content h4 {
  font-size: 15px;
  font-weight: 700;
  color: #0E0F3B;
  margin-bottom: 4px;
}
.slide-address {
  font-size: 11px;
  color: #64748b;
  margin-bottom: 20px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 30px;
}
.slide-link {
  font-size: 13px;
  color: #0E59F2;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.coming-soon-wrap {
  margin-top: 40px;
}
.office-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}
@media (max-width: 1200px) {
  .office-grid { grid-template-columns: repeat(4, 1fr); }
}
@media (max-width: 900px) {
  .office-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 640px) {
  .office-grid { grid-template-columns: repeat(2, 1fr); }
}
.office-card {
  position: relative;
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  overflow: hidden;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.3s ease;
}
.office-card:hover {
  transform: translateY(-4px);
}
.office-card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(14, 15, 59, 0.4), rgba(14, 15, 59, 0.9));
  z-index: 1;
}
.office-card-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;
}
.office-card-header {
  display: flex;
  align-items: center;
  gap: 10px;
}
.office-icon-wrap {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
.office-country-name {
  font-size: 15px;
  font-weight: 700;
  color: white;
}
.office-card-address {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.85);
  margin-top: 12px;
  margin-bottom: 24px;
  line-height: 1.4;
  flex-grow: 1;
}
.office-learn-more {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
  font-weight: 700;
  color: white;
}
.blur-card .office-card-overlay {
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  transition: all 0.4s ease;
}
.blur-card:hover .office-card-overlay {
  backdrop-filter: blur(0);
  -webkit-backdrop-filter: blur(0);
}
.coming-soon-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-family: var(--sans);
  font-size: 15px;
  font-weight: 700;
  text-align: center;
  z-index: 5;
  transition: opacity 0.4s ease;
  pointer-events: none;
  background: rgba(14, 15, 59, 0.7);
  padding: 15px 4px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.2);
}
.blur-card:hover .coming-soon-label {
  opacity: 0;
}

@media (max-width: 1024px) {
  .map-and-featured {
    grid-template-columns: 1fr;
  }
  .offices-stats-bar {
    grid-template-columns: 1fr 1fr;
  }
  .stat-item {
    border-right: none;
    padding-bottom: 16px;
  }
}

/* Timeline */
.timeline {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.timeline-item {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 28px;
  position: relative;
}
.timeline-year {
  display: inline-block;
  font-family: var(--serif);
  font-style: italic;
  font-size: clamp(22px, 4vw, 30px);
  color: var(--accent);
  margin-bottom: 12px;
}
.timeline-item p {
  font-size: 14px;
  color: var(--ink-soft);
  line-height: 1.6;
}

/* Values */
.values-strip {
  background: #0E0F3B;
  color: var(--bg);
  padding: 60px 0;
}
@media (min-width: 768px) {
  .values-strip {
    padding: 100px 0;
  }
}
.values-strip .tag { color: var(--accent-warm); }
.values-strip .section-title { color: var(--bg); }
.values-strip .section-title em { color: var(--accent-warm); }
.values-strip .section-lead { color: rgba(255, 255, 255, 0.7); }
.values-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}
.value-card {
  background: var(--dark-soft);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius);
  padding: 28px 24px;
}
.value-letter {
  display: flex;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: var(--accent);
  color: white;
  font-family: var(--serif);
  font-style: italic;
  font-size: 22px;
  margin-bottom: 18px;
}
.value-card h3 {
  font-family: var(--serif);
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 10px;
  color: var(--bg);
}
.value-card p {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.55;
}

/* Vision / Mission */
.vm-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
.vm-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 32px 24px;
}
@media (min-width: 768px) {
  .vm-card {
    padding: 56px 48px;
  }
}
.vm-card .tag { margin-bottom: 20px; }
.vm-card p {
  font-family: var(--serif);
  font-size: clamp(26px, 3vw, 38px);
  font-weight: 400;
  line-height: 1.2;
  color: var(--ink);
}
.vm-card-dark {
  background: var(--accent);
  color: white;
  border-color: var(--accent);
}
.vm-card-dark .tag { color: rgba(255, 255, 255, 0.7); }
.vm-card-dark p { color: white; }

@media (max-width: 1024px) {
  .timeline { grid-template-columns: repeat(2, 1fr); }
  .values-grid { grid-template-columns: repeat(2, 1fr); }
  .vm-grid, .team-grid { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .timeline { grid-template-columns: 1fr; }
  .values-grid { grid-template-columns: 1fr; }
  .team-card { grid-template-columns: 1fr; }
  .team-photo { aspect-ratio: 16 / 10; }
}

/* =======================================
   About Us Premium Hero
   ======================================= */
.about-premium-hero {
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  width: 100vw;
  box-sizing: border-box;
  padding: 100px 0 120px;
  display: block;
  background-color: #0E0F3B;
  background-image: linear-gradient(90deg, #0e0f3b 0%, rgb(14 15 59 / 0%) 40%, rgb(14 15 59 / 0%) 70%, transparent 100%), url(/services/service-page/about2.png);
  background-size: 55% auto;
  background-position: right 0% center;
  background-repeat: no-repeat;
  color: #ffffff;
  min-height: 700px;
  overflow: hidden;
}

.about-premium-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(9, 64, 123, 0.3), transparent 60%);
  pointer-events: none;
}

.about-premium-hero > * {
  position: relative;
  z-index: 1;
}

.about-premium-hero-inner {
  max-width: 1240px;
  margin: 0 auto;
  padding-inline: clamp(32px, 8vw, 96px);
}

.about-premium-hero .service-hero-copy {
  max-width: 640px;
  animation: fade-slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fade-slide-up {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

.about-premium-hero h1 {
  font-family: var(--serif);
  font-size: clamp(48px, 5.5vw, 86px);
  line-height: 1.05;
  margin-bottom: 24px;
  font-weight: 400;
  letter-spacing: -0.02em;
}

.about-premium-hero h1 em {
  font-style: italic;
  color: #F7931E;
}

.about-premium-hero .service-hero-lede {
  font-size: 19px;
  color: rgba(255,255,255,0.82);
  line-height: 1.6;
  max-width: 520px;
}

.about-premium-hero .tag {
  color: var(--accent);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 12px;
}

@media (max-width: 1440px) {
  .about-premium-hero {
    background-size: 60% auto;
    background-position: right -2% center;
  }
}

@media (max-width: 1280px) {
  .about-premium-hero {
    background-size: 85% auto;
    background-position: right -5% center;
  }
}

@media (max-width: 1024px) {
  .about-premium-hero {
    background-size: 80% auto;
    background-position: right -10% center;
  }
}

@media (max-width: 960px) {
  .about-premium-hero {
    background-size: 70% auto;
    background-position: right -50px center;
    padding: 72px 0;
  }
  .about-premium-hero-inner {
    padding: 0 20px;
  }
}

@media (max-width: 640px) {
  .about-premium-hero {
    min-height: auto;
    padding: 160px 20px 60px;
    background-image: none;
    background-color: #0E0F3B;
  }
  .about-premium-hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 280px;
    background-image: url(/services/service-page/about2.png);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    -webkit-mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
    mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
    pointer-events: none;
  }
  .about-premium-hero .cta-row {
    flex-direction: column;
    gap: 12px;
  }
  .about-premium-hero .cta-row > * {
    width: 100%;
  }
}

.about-premium-hero .btn-primary {
  padding: 14px 28px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 999px;
  background: #F7931E;
  color: #ffffff;
  border: none;
  box-shadow: 0 8px 24px rgba(247, 147, 30, 0.4);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.about-premium-hero .btn-primary:hover {
  background: #e07d10;
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(247, 147, 30, 0.5);
}

.about-premium-hero .btn-secondary {
  padding: 14px 28px;
  font-size: 15px;
  border-radius: 999px;
  background: transparent;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.4);
  transition: all 0.2s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.about-premium-hero .btn-secondary:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255,255,255,0.7);
}

/* Milestone Carousel */
.milestone-carousel {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  background: #0E0F3B;
  padding: 60px 40px;
  color: white;
  min-height: 520px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 40px;
  box-shadow: 0 24px 48px rgba(0,0,0,0.2);
}

.mc-bg {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-size: cover;
  background-position: center;
  opacity: 0.15;
  z-index: 1;
}

.milestone-carousel::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, transparent 0%, #0E0F3B 100%);
  z-index: 2;
  pointer-events: none;
}

.mc-progress {
  position: absolute;
  top: 32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 5;
  width: 90%;
  max-width: 600px;
}

.mc-dot {
  flex: 1;
  height: 4px;
  background: rgba(255,255,255,0.2);
  border: none;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.3s;
  padding: 0;
}

.mc-dot:hover {
  background: rgba(255,255,255,0.4);
}

.mc-dot.active {
  background: white;
  box-shadow: 0 0 8px rgba(255,255,255,0.5);
}

.mc-content-wrapper {
  position: relative;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.mc-nav-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.2);
  background: transparent;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}

.mc-nav-btn:hover {
  background: rgba(255,255,255,0.1);
  border-color: rgba(255,255,255,0.4);
}

.mc-content {
  flex: 1;
  text-align: center;
  padding: 0 40px;
  max-width: 800px;
  margin: 0 auto;
}

.mc-slide {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mc-badge {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 12px 32px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.8);
  background: var(--accent);
  font-size: 24px;
  font-weight: 800;
  color: white;
  margin-bottom: 32px;
  box-shadow: 0 8px 24px var(--accent-soft);
}

.mc-desc {
  font-size: clamp(20px, 3vw, 28px);
  line-height: 1.4;
  font-weight: 600;
  color: white;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

@media (max-width: 640px) {
  .milestone-carousel {
    padding: 50px 16px 36px;
    min-height: auto;
  }
  .mc-content-wrapper {
    gap: 20px;
  }
  .mc-nav-btn {
    width: 38px;
    height: 38px;
  }
  .mc-content {
    padding: 0 8px;
  }
  .mc-badge {
    font-size: 18px;
    padding: 8px 20px;
    margin-bottom: 20px;
  }
  .mc-desc {
    font-size: 18px;
  }
}

/* =======================================
   Premium Vision / Mission Cards
   ======================================= */
.vm-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin-top: 40px;
}

.vm-card-premium {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  min-height: 480px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-shadow: 0 20px 40px rgba(0,0,0,0.06);
  cursor: pointer;
  background: white;
}

.vm-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1;
}

.vm-card-premium:hover .vm-bg {
  transform: scale(1.05);
}

/* Vision uses a light overlay so text is dark */
.vm-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 40%, rgba(255,255,255,0) 100%);
  z-index: 2;
  transition: opacity 0.4s ease;
}

.vm-content {
  position: relative;
  z-index: 3;
  padding: 28px 24px;
  color: var(--ink);
  transform: translateY(16px);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
@media (min-width: 768px) {
  .vm-content {
    padding: 48px;
  }
}

.vm-card-premium:hover .vm-content {
  transform: translateY(0);
}

.vm-badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 24px;
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid rgba(0,0,0,0.1);
  background: rgba(255,255,255,0.4);
  backdrop-filter: blur(8px);
  color: var(--ink);
}

.vm-content p {
  font-family: var(--serif);
  font-size: clamp(28px, 3.5vw, 42px);
  line-height: 1.25;
  font-weight: 400;
  margin: 0;
}

/* Mission uses a rich golden overlay so text is white */
.vm-card-premium.vm-mission .vm-overlay {
  background: linear-gradient(to top, rgba(9, 64, 123,1) 0%, rgba(9, 64, 123,0.8) 40%, rgba(9, 64, 123,0) 100%);
}

.vm-card-premium.vm-mission .vm-content {
  color: white;
}

.vm-card-premium.vm-mission .vm-badge {
  border-color: rgba(255,255,255,0.3);
  background: rgba(255,255,255,0.15);
  color: white;
}

@media (max-width: 960px) {
  .vm-grid {
    grid-template-columns: 1fr;
  }
  .vm-card-premium {
    min-height: 400px;
  }
}


/* =======================================
   Premium Leadership Team (Horizontal)
   ======================================= */
.team-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  margin-top: 48px;
}
.team-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  box-shadow: 0 12px 36px rgba(0,0,0,0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(0,0,0,0.03);
  align-items: stretch;
}
.team-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 48px rgba(9, 64, 123, 0.15);
}
.team-photo {
  width: 260px;
  flex-shrink: 0;
  position: relative;
}
.team-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.team-body {
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.team-body h3 {
  font-family: var(--serif);
  font-size: 28px;
  margin-bottom: 6px;
  color: var(--ink);
}
.team-role {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 20px;
}
.team-body p {
  font-size: 15px;
  color: var(--ink-soft);
  line-height: 1.65;
}

@media (max-width: 1100px) {
  .team-grid {
    grid-template-columns: 1fr;
    max-width: 800px;
    margin: 48px auto 0;
  }
}
@media (max-width: 640px) {
  .team-card {
    flex-direction: column;
  }
  .team-photo {
    width: 100%;
    height: 300px;
  }
  .team-body {
    padding: 32px 24px;
  }
}


`}</style>

      <header className="service-hero about-premium-hero">
        <div className="about-premium-hero-inner">
          <div className="service-hero-copy">
            <h1>Global hiring,<br />made <em>human</em></h1>
            <p className="service-hero-lede">{about.definition.description}</p>

            <div className="service-hero-features" style={{ display: 'flex', gap: '24px', marginTop: '32px', flexWrap: 'wrap' }}>
              {about.definition.keyFeatures.map((f: string, i: number) => (
                <div key={i} className="hero-feature" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500, fontSize: '15px', color: 'rgba(255,255,255,0.85)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: '#7FCDEE' }}><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" /><path d="M2 12H22" /><path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" /></svg>
                  {f}
                </div>
              ))}
            </div>

            <div className="cta-row" style={{ marginTop: '40px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn-primary">
                {about.definition.primaryButtonText} <span className="arrow">→</span>
              </Link>
              <a href="https://calendly.com/jacksonandfrank/discover-us" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                {about.definition.secondaryButtonText}
              </a>
            </div>

          </div>
        </div>
      </header>

      <section className="stats-strip">
        <div className="container stats-strip-inner">
          {about.definition.trustSignals.stats.map((s: any, i: number) => (
            <div key={i} className="stat-item">
              <strong>{s.value}</strong>
              {s.label && <span className="stat-label">{s.label}</span>}
              <span className="stat-desc">{s.description}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <h2 className="section-title">From Arnhem to <em>160+ countries</em></h2>
          <p className="section-lead">
            The milestones that shaped Jackson &amp; Frank into a global workforce solutions
            provider, from our founding in the Netherlands to our expansion worldwide.
          </p>
        </div>
        <div className="milestone-carousel">
          <div className="mc-bg" style={{ backgroundImage: "url('/world-map-dark.png')" }}></div>

          <div className="mc-progress">
            {milestones.map((m, i) => (
              <button
                key={`dot-${i}`}
                className={`mc-dot ${i === activeMilestone ? 'active' : ''}`}
                onClick={() => setMilestone(i)}
                aria-label={`Go to milestone ${m.year}`}
              ></button>
            ))}
          </div>

          <div className="mc-content-wrapper">
            <button className="mc-nav-btn prev" onClick={prevMilestone} aria-label="Previous milestone">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
            </button>

            <div className="mc-content">
              <div key={activeMilestone} className="mc-slide fade-slide-enter-active">
                <div className="mc-badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><circle cx="12" cy="12" r="3" /></svg>
                  {milestones[activeMilestone].year}
                </div>
                <p className="mc-desc">{milestones[activeMilestone].description}</p>
              </div>
            </div>

            <button className="mc-nav-btn next" onClick={nextMilestone} aria-label="Next milestone">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        </div>
      </section>

      <section className="values-strip">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">We operate by <em>W.O.R.L.D</em></h2>
            <p className="section-lead">
              At Jackson &amp; Frank, We operate by the values that make us and our clients successful, represented by W.O.R.L.D:
            </p>
          </div>
          <div className="values-grid">
            {worldValues.map(v => (
              <div key={v.title} className="value-card">
                <span className="value-letter">{v.letter}</span>
                <h3>{v.title}</h3>
                <p>{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="vm-grid">
          <div className="vm-card-premium">
            <div className="vm-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80')" }}></div>
            <div className="vm-overlay"></div>
            <div className="vm-content">
              <span className="vm-badge">Vision</span>
              <p>A world in which international employability has no barriers.</p>
            </div>
          </div>

          <div className="vm-card-premium vm-mission">
            <div className="vm-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80')" }}></div>
            <div className="vm-overlay"></div>
            <div className="vm-content">
              <span className="vm-badge">Mission</span>
              <p>Enabling international labour mobility for organizations and people.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section container offices-premium-section">
        <div className="offices-header-wrap">
          <div className="offices-header-left">
            <h2 className="section-title" style={{ marginTop: '12px', marginBottom: '16px', fontSize: 'clamp(28px, 4vw, 48px)', color: '#0E0F3B' }}>Our offices</h2>
            <p className="section-lead" style={{ maxWidth: '400px', color: '#64748b', fontSize: '15px', margin: 0 }}>Our global network spans multiple continents, bringing you local expertise wherever you need it.</p>
          </div>
        </div>

        <div className="map-and-featured">
          <div className="dotted-map-area">
            <div className="dotted-map-bg" style={{ backgroundImage: "url('/case-study/allOffice.png')" }}></div>
          </div>

          <div className="featured-country-card">
            <div className="fcc-image" style={{ backgroundImage: `url(${getCountryImage(activeCountryData?.name || 'The Netherlands')})` }}>
              <div className="fcc-image-content">
                {getFlagUrl(activeCountryData?.name || 'The Netherlands') ? (
                  <img src={getFlagUrl(activeCountryData?.name || 'The Netherlands')} className="fcc-flag" alt={activeCountryData?.name || 'The Netherlands'} />
                ) : (
                  <span className="fcc-flag-emoji" style={{ fontSize: '24px', marginRight: '8px' }}>{getFlag(activeCountryData?.name || 'The Netherlands')}</span>
                )}
                <div className="fcc-title-wrap">
                  <h3 style={{ color: 'white', fontSize: '18px', margin: 0, fontFamily: 'var(--sans)' }}>{activeCountryData?.name || 'The Netherlands'}</h3>
                  <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '11px' }}>{getOffices(activeCountryData?.name || 'The Netherlands').length} Office{getOffices(activeCountryData?.name || 'The Netherlands').length > 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>
            <div className="fcc-details">
              {getOffices(activeCountryData?.name || 'The Netherlands').map((office, i) => (
                <div key={i} className="fcc-row">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0E59F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  <div className="fcc-text">
                    <strong>{office.city}</strong>
                    <span>{office.address}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link href={activeCountryData?.href || '/contact'} className="fcc-view-all">View all offices <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 'auto' }}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></Link>
          </div>
        </div>

        <div className="all-offices-carousel-wrap">
          <h3 className="subsection-title">All offices</h3>
          <div className="carousel-container">
            <div className="nav-btn prev" onClick={() => scrollOffices(-1)}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></div>
            <div className="office-slides">
              {available.map((c: any) => (
                <Link key={c.name} href={c.href || '/'} className="office-slide">
                  <div className="slide-img" style={{ backgroundImage: `url(${getCountryImage(c.name)})` }}>
                    {getFlagUrl(c.name) ? (
                      <img src={getFlagUrl(c.name)} className="slide-flag" alt="" />
                    ) : (
                      <span className="slide-flag-emoji">{getFlag(c.name)}</span>
                    )}
                  </div>
                  <div className="slide-content">
                    <h4>{c.name}</h4>
                    <p className="slide-address" title={c.address}>{c.address}</p>
                    <div className="slide-link">View office <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="nav-btn next" onClick={() => scrollOffices(1)}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
          </div>
        </div>

        <div className="coming-soon-wrap">
          <h3 className="subsection-title">Coming soon</h3>
          <div className="office-grid">
            {comingSoon.map((c: any) => (
              <div key={c.name} className="office-card blur-card" style={{ backgroundImage: `url(${getCountryImage(c.name)})` }}>
                <div className="office-card-overlay"></div>
                <div className="coming-soon-label">Coming soon</div>
                <div className="office-card-content">
                  <div className="office-card-header">
                    <div className="office-icon-wrap">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </div>
                    <span className="office-country-name">{c.name}</span>
                  </div>
                  <p className="office-card-address" dangerouslySetInnerHTML={{ __html: c.address.replace('Launch', '<br>Launch') }}></p>
                  <div className="office-learn-more">
                    Contact us to plan ahead
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <h2 className="section-title">Meet our <em>leadership team</em></h2>
          <p className="section-lead">
            The visionary leaders behind our mission to make global hiring simple and accessible.
          </p>
        </div>
        <div className="team-grid">
          {team.map((member) => (
            <div key={member.name} className="team-card">
              <div className="team-photo">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="team-body">
                <h3>{member.name}</h3>
                <span className="team-role">{member.role}</span>
                <p>{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="faq-block">
          <div className="faq-head">
            <h2 className="section-title">{about.faqs.title}</h2>
            <p className="section-lead">{about.faqs.subtitle}</p>
          </div>
          <div className="faq-list">
            {about.faqs.items.map((item: any, i: number) => (
              <button
                key={i}
                className={`faq-item ${openFaq === i ? 'open' : ''}`}
                onClick={() => toggleFaq(i)}
                aria-expanded={openFaq === i}
              >
                <span className="faq-q">{item.question}</span>
                <span className="faq-toggle" aria-hidden>{openFaq === i ? '−' : '+'}</span>
                <p style={{ display: openFaq === i ? 'block' : 'none' }} className="faq-a">{item.answer}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <GlobalCTA title="Let's build your team" />
    </>
  )
}
