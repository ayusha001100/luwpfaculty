'use client';
import { memo, useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

import { Users, Map, Briefcase, FileText, Sparkles, Download, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Country, State, City } from 'country-state-city';
import styles from './Hero.module.css';

const HERO_CARDS = [
  {
    icon: <Users size={24} />,
    title: "Community + Weekly Sessions",
    desc: "Together, stay consistent, faster."
  },
  {
    icon: <Map size={24} />,
    title: "Personalized Career Roadmap",
    desc: "A short diagnostic builds your path for promotion or switch."
  },
  {
    icon: <Briefcase size={24} />,
    title: "Proof-of-Work Projects",
    desc: "Real-world projects that become portfolio proof."
  },
  {
    icon: <FileText size={24} />,
    title: "Resume + LinkedIn Rebuild",
    desc: "Position your experience for better roles—updated as you grow."
  }
];



function Hero({ onFormSubmit }) {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formTitle, setFormTitle] = useState('Enquire Now');

  // Tracking UTM Parameters
  const [utmParams, setUtmParams] = useState({
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_content: '',
    utm_term: ''
  });

  useEffect(() => {
    // 1. Capture UTMs from URL
    const searchParams = new URLSearchParams(window.location.search);
    const params = {
      utm_source: searchParams.get('utm_source') || '',
      utm_medium: searchParams.get('utm_medium') || '',
      utm_campaign: searchParams.get('utm_campaign') || '',
      utm_content: searchParams.get('utm_content') || '',
      utm_term: searchParams.get('utm_term') || ''
    };

    // 2. Persist to sessionStorage if parameters exist (so they survive internal navigation)
    const hasParams = Object.values(params).some(val => val !== '');
    if (hasParams) {
      sessionStorage.setItem('lu_utm_data', JSON.stringify(params));
      setUtmParams(params);
    } else {
      // 3. Try to retrieve from session if not in current URL
      const saved = sessionStorage.getItem('lu_utm_data');
      if (saved) {
        setUtmParams(JSON.parse(saved));
      }
    }

    // Listen for custom event from Navbar
    const handleOpenModal = () => {
      setFormTitle('Apply Now');
      setIsModalOpen(true);
    };
    window.addEventListener('openEnquiryModal', handleOpenModal);

    return () => {
      window.removeEventListener('openEnquiryModal', handleOpenModal);
    };
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // Location State
  const [selectedCountry, setSelectedCountry] = useState('IN');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // Refs for click outside
  const countryRef = useRef(null);
  const stateRef = useRef(null);
  const cityRef = useRef(null);
  const ctcRef = useRef(null);

  // Custom Dropdown Open States
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isStateOpen, setIsStateOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [isCtcOpen, setIsCtcOpen] = useState(false);
  const [selectedCtc, setSelectedCtc] = useState('');

  const CTC_OPTIONS = [
    'Fresher',
    '0 - 3 LPA',
    '3.1 - 6 LPA',
    '6.1 - 10 LPA',
    '10.1 LPA+'
  ];

  // Data Fetching with useMemo
  const allCountries = useMemo(() => Country.getAllCountries(), []);
  const states = useMemo(() => State.getStatesOfCountry(selectedCountry), [selectedCountry]);
  const cities = useMemo(() => City.getCitiesOfState(selectedCountry, selectedState), [selectedCountry, selectedState]);

  const currentCountry = allCountries.find(c => c.isoCode === selectedCountry);



  // Click Outside Handler
  useEffect(() => {
    function handleClickOutside(event) {
      if (countryRef.current && !countryRef.current.contains(event.target)) {
        setIsCountryOpen(false);
      }
      if (stateRef.current && !stateRef.current.contains(event.target)) {
        setIsStateOpen(false);
      }
      if (cityRef.current && !cityRef.current.contains(event.target)) {
        setIsCityOpen(false);
      }
      if (ctcRef.current && !ctcRef.current.contains(event.target)) {
        setIsCtcOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Dynamically import Firebase modules
      const { db } = await import('../lib/firebase');
      const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');

      // Get form data
      const formData = new FormData(e.target);
      const name = formData.get('name');
      const email = formData.get('email');
      const designation = formData.get('designation');
      const organization = formData.get('organization');
      const phone = formData.get('phone');

      // --- VALIDATION START ---
      // 1. Validate Phone Number (Must be exactly 10 digits)
      const phoneRegex = /^\d{10}$/;
      if (!phone || !phoneRegex.test(phone)) {
        alert("Please enter a valid 10-digit mobile number.");
        setIsSubmitting(false);
        return;
      }

      // 2. Validate State and City (Must be selected)
      if (!selectedState) {
        alert("Please select your State.");
        setIsSubmitting(false);
        return;
      }
      if (!selectedCity) {
        alert("Please select your City.");
        setIsSubmitting(false);
        return;
      }

      // 3. Validate CTC
      if (!selectedCtc) {
        alert("Please select your Current CTC.");
        setIsSubmitting(false);
        return;
      }
      // --- VALIDATION END ---

      // Get selected country, state, and city names
      const countryName = allCountries.find(c => c.isoCode === selectedCountry)?.name || '';
      const stateName = states.find(s => s.isoCode === selectedState)?.name || '';
      const cityName = selectedCity;
      const ctcValue = selectedCtc; // Get CTC from state

      // Save to Firestore
      const docRef = await addDoc(collection(db, 'enquiries'), {
        name,
        email,
        designation,
        organization,
        phone,
        ctc: ctcValue,
        countryCode: currentCountry?.phonecode || '',
        country: countryName,
        state: stateName,
        city: cityName,
        timestamp: serverTimestamp(),
        status: 'new',
        formSource: formTitle, // Track which button was clicked
        // UTM Parameters for Attribution
        attribution: {
          source: utmParams.utm_source,
          medium: utmParams.utm_medium,
          campaign: utmParams.utm_campaign,
          content: utmParams.utm_content,
          term: utmParams.utm_term,
          full_path: window.location.href
        }
      });

      console.log('Document written with ID: ', docRef.id);

      // Persist submission state
      localStorage.setItem('enquirySubmitted', 'true');
      setIsFormSubmitted(true);

      if (onFormSubmit) {
        onFormSubmit();
      }

      router.push('/thank-you');
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.heroSection} id="hero-section">
      {/* Animated background elements */}
      <div className={styles.backgroundWrapper}>
        <div className={styles.gradientBg}></div>
        <div className={styles.gridOverlay}></div>
        <div className={styles.glowOrb}></div>
        <div className={styles.glowOrb2}></div>

        {/* Floating particles */}
        <div className={styles.particles}>
          {[...Array(12)].map((_, i) => (
            <div key={i} className={styles.particle}></div>
          ))}
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.heroMain}>
          <div className={styles.heroLeft}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Top Tagline */}
              <span className={styles.yellowEyebrow}>
                Build Your AI Advantage (Without Coding)
              </span>

              <div className={styles.headlineContainer}>
                <h1>
                  The <span className={styles.highlightYellow}>Generative AI</span> Masterclass
                </h1>
              </div>

              <div className={styles.subheadline}>
                <ul className={styles.heroBulletList}>
                  <li>A focused 3 hour, hands on workshop designed for ambitious professionals who want real, practical skills.</li>
                  <li>Learn proven AI workflows used by high performing teams to automate tasks, save time, and work smarter.</li>
                  <li>Build sharper thinking and improve the quality of your output to deliver stronger results at work.</li>
                </ul>
              </div>



              {/* CTA Button & Footer Text */}
              <div className={styles.ctaWrapper}>
                <p className={styles.limitSeats}>Limited seats • Enrolments closing soon</p>
                <button
                  className={styles.ctaButton}
                  onClick={() => {
                    setFormTitle('Secure Your Spot Now');
                    setIsModalOpen(true);
                  }}
                >
                  <Sparkles size={20} /> Secure Your Spot Now
                </button>
              </div>
            </motion.div>
          </div>

          <div className={styles.heroRight}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={styles.heroImageContainer}
            >
              <video
                src="/new%202026%20compressed.mp4"
                autoPlay
                loop
                muted
                playsInline
                className={styles.heroImage}
                width={720}
                height={600}
              />
            </motion.div>
          </div>
        </div>

        {/* Floating Feature Cards */}
        <div className={styles.featureGrid}>
          {HERO_CARDS.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{
                duration: 0.8,
                delay: 0.5 + index * 0.15,
                type: "spring",
                stiffness: 100
              }}
              className={`${styles.featureCard} ${styles[`float${index + 1}`]}`}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
              }}
            >
              <motion.div
                className={styles.cardIcon}
              >
                {card.icon}
              </motion.div>
              <div className={styles.cardContent}>
                <h4>{card.title}</h4>
                <p>{card.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MODAL POPUP */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className={styles.modalContent}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles.closeButton}
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>

              <div className={styles.enquireForm} id="enquire-form">
                <div className={styles.formHeader}>
                  <h3>{formTitle}</h3>
                  <p>Get a callback from our expert</p>
                </div>
                {isFormSubmitted ? (
                  <div className={styles.formBody} style={{ textAlign: 'center' }}>
                    <div style={{ marginBottom: '20px', color: '#4CAF50' }}>
                      <Sparkles size={48} style={{ margin: '0 auto' }} />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', color: '#1a1a1a' }}>You're all set!</h3>
                    <p style={{ color: '#666', marginBottom: '30px' }}>We have received your enquiry.</p>
                    <Link href="https://pro.letsupgrade.in" target="_blank" rel="noopener noreferrer">
                      <button className={styles.submitBtn} style={{ width: '100%' }}>
                        Go to Dashboard
                      </button>
                    </Link>
                  </div>
                ) : (
                  <form className={styles.formBody} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                      <input type="text" name="name" placeholder="Enter your Full Name *" required />
                    </div>
                    <div className={styles.inputGroup}>
                      <input type="email" name="email" placeholder="Enter your Email *" required />
                    </div>

                    <div className={styles.inputGroup}>
                      <div className={styles.phoneWrapper}>
                        {/* Custom Country Dropdown */}
                        <div ref={countryRef} className={styles.customSelectWrapper}>
                          <div
                            className={styles.customSelectTrigger}
                            onClick={() => setIsCountryOpen(!isCountryOpen)}
                          >
                            {currentCountry?.flag} +{currentCountry?.phonecode}
                            <ChevronDown size={14} color="#666" />
                          </div>
                          {isCountryOpen && (
                            <div
                              className={styles.customOptionsList}
                              onWheel={(e) => e.stopPropagation()}
                            >
                              {allCountries.map((c) => (
                                <div
                                  key={c.isoCode}
                                  className={styles.customOption}
                                  onClick={() => {
                                    setSelectedCountry(c.isoCode);
                                    setSelectedState('');
                                    setSelectedCity('');
                                    setIsCountryOpen(false);
                                  }}
                                >
                                  {c.flag} (+{c.phonecode}) {c.name}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <input type="tel" name="phone" placeholder="Mobile Number *" required />
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <input type="text" name="organization" placeholder="Organization *" required />
                    </div>

                    <div className={styles.inputGroup}>
                      <input type="text" name="designation" placeholder="Current Designation *" required />
                    </div>

                    <div className={styles.inputGroup}>
                      {/* Custom CTC Dropdown */}
                      <div ref={ctcRef} className={styles.customSelectContainer}>
                        <div
                          className={`${styles.customSelectInput} ${!selectedCtc ? styles.placeholderColor : ''}`}
                          onClick={() => setIsCtcOpen(!isCtcOpen)}
                          style={{ width: '100%' }}
                        >
                          {selectedCtc || "Current CTC *"}
                          <ChevronDown size={16} color="#666" style={{ marginLeft: 'auto' }} />
                        </div>
                        {isCtcOpen && (
                          <div
                            className={styles.customOptionsList}
                            style={{ width: '100%' }}
                            onWheel={(e) => e.stopPropagation()}
                          >
                            {CTC_OPTIONS.map((option) => (
                              <div
                                key={option}
                                className={styles.customOption}
                                onClick={() => {
                                  setSelectedCtc(option);
                                  setIsCtcOpen(false);
                                }}
                              >
                                {option}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <input type="hidden" name="ctc" value={selectedCtc} required />{/* Hidden input for validation if needed, though custom validation might be better */}
                    </div>

                    <div className={styles.formRow}>
                      {/* Custom State Dropdown */}
                      <div ref={stateRef} className={styles.customSelectContainer}>
                        <div
                          className={`${styles.customSelectInput} ${!selectedState ? styles.placeholderColor : ''}`}
                          onClick={() => setIsStateOpen(!isStateOpen)}
                        >
                          {selectedState
                            ? states.find(s => s.isoCode === selectedState)?.name
                            : "Select State"}
                          <ChevronDown size={16} color="#666" style={{ marginLeft: 'auto' }} />
                        </div>
                        {isStateOpen && (
                          <div
                            className={styles.customOptionsList}
                            style={{ width: '100%' }}
                            onWheel={(e) => e.stopPropagation()}
                          >
                            {states.length > 0 ? states.map((s) => (
                              <div
                                key={s.isoCode}
                                className={styles.customOption}
                                onClick={() => {
                                  setSelectedState(s.isoCode);
                                  setSelectedCity('');
                                  setIsStateOpen(false);
                                }}
                              >
                                {s.name}
                              </div>
                            )) : (
                              <div className={styles.customOption} style={{ color: '#999', cursor: 'default' }}>No states found</div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Custom City Dropdown */}
                      <div ref={cityRef} className={styles.customSelectContainer}>
                        <div
                          className={`${styles.customSelectInput} ${!selectedState ? styles.disabledInput : ''} ${!selectedCity ? styles.placeholderColor : ''}`}
                          onClick={() => selectedState && setIsCityOpen(!isCityOpen)}
                        >
                          {selectedCity || "Select City"}
                          <ChevronDown size={16} color="#666" style={{ marginLeft: 'auto' }} />
                        </div>
                        {isCityOpen && selectedState && (
                          <div
                            className={styles.customOptionsList}
                            style={{ width: '100%' }}
                            onWheel={(e) => e.stopPropagation()}
                          >
                            {cities.length > 0 ? cities.map((c) => (
                              <div
                                key={c.name}
                                className={styles.customOption}
                                onClick={() => {
                                  setSelectedCity(c.name);
                                  setIsCityOpen(false);
                                }}
                              >
                                {c.name}
                              </div>
                            )) : (
                              <div className={styles.customOption} style={{ color: '#999', cursor: 'default' }}>No cities found</div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={styles.checkboxGroup}>
                      <input type="checkbox" id="agree" required />
                      <label htmlFor="agree">I agree to receive updates &amp; accept T&amp;C</label>
                    </div>
                    <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                      {isSubmitting ? 'Submitting...' : formTitle}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Enquire Bar */}
      <div
        className={styles.stickyEnquireBar}
        onClick={() => {
          setFormTitle('Enquire Now');
          setIsModalOpen(true);
        }}
      >
        Enquire Now
      </div>


    </section>
  );
}

export default memo(Hero);
