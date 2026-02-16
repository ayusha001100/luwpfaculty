'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle, ArrowRight, BookOpen, UserCheck, Calendar, MessageCircle } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Benefits from '../../components/Benefits';
import SneakPeek from '../../components/SneakPeek';
import Frameworks from '../../components/Frameworks';
import ToolsSection from '../../components/ToolsSection';
import Curriculum from '../../components/Curriculum';
import Mentor from '../../components/Mentor';
import FAQ from '../../components/FAQ';
import BottomCTA from '../../components/BottomCTA';

export default function ThankYouPage() {
  return (
    <>
      <Navbar />
      <div className="thank-you-container">
        {/* Background Elements */}
        <div className="gradient-bg"></div>
        <div className="grid-overlay"></div>

        <main className="main-content">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="heading"
          >
            Thank You for <span className="text-highlight">Registering!</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="contact-section"
          >
            <h2 className="contact-title">Want to skip the line? and get in touch ASAP</h2>

            <div className="contact-buttons">
              <a href="https://pro.letsupgrade.in" target="_blank" rel="noopener noreferrer" className="contact-btn call-btn" style={{ textTransform: 'uppercase' }}>
                ENROLL NOW FOR THE GEN AI FREE WORKSHOP OF 3 HR
              </a>
            </div>

            <div className="important-box">
              <h3 className="important-title">Important</h3>
              <p className="important-text">
                The masterclass is conducted every Saturday and is designed specifically for working professionals looking to apply Generative AI in real-world scenarios.
              </p>
              <p className="important-text">
                To receive important updates, session links, reminders, and workshop resources, please join the official WhatsApp group using the link below.
              </p>
              <a href="https://luc.to/workingprofessional" target="_blank" rel="noopener noreferrer" className="whatsapp-cta-btn">
                <MessageCircle size={20} strokeWidth={2.5} /> Click Here →
              </a>
              <p className="important-footer">
                We look forward to having you in the session.
              </p>
            </div>
          </motion.div>
        </main>
      </div>

      {/* Landing Page Sections */}
      <Benefits />
      <SneakPeek />
      <Frameworks />
      <ToolsSection />
      <Curriculum />
      <Mentor />
      <FAQ />
      <Footer />
      <BottomCTA isFormSubmitted={true} />

      <style jsx>{`
        .thank-you-container {
          min-height: 100vh;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #fdfdfd;
          overflow: hidden;
          padding-top: 80px;
        }

        .gradient-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 50% 30%, rgba(255, 107, 0, 0.05) 0%, transparent 70%);
          z-index: 0;
        }

        .grid-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image:
              linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          z-index: 0;
        }

        .main-content {
          position: relative;
          z-index: 10;
          max-width: 1200px;
          width: 100%;
          text-align: center;
          padding: 0 24px;
        }

        .success-icon-wrapper {
          position: relative;
          width: 100px;
          height: 100px;
          margin: 0 auto 40px auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .success-icon-bg {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #FF6B00 0%, #FF8C00 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(255, 107, 0, 0.3);
          position: relative;
          z-index: 2;
        }

        .success-ripple {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: rgba(255, 107, 0, 0.15);
          animation: ripple 2s infinite;
          z-index: 1;
        }

        @keyframes ripple {
          0% { width: 80px; height: 80px; opacity: 1; }
          100% { width: 140px; height: 140px; opacity: 0; }
        }

        .heading {
          font-family: var(--font-outfit);
          font-size: 5rem;
          color: var(--foreground);
          margin-bottom: 32px;
          line-height: 1.1;
          letter-spacing: -2px;
          text-align: center;
        }

        .text-highlight {
          color: var(--primary);
        }

        .contact-section {
          margin-top: 40px;
          padding: 0;
          background: transparent;
          border-radius: 0;
          box-shadow: none;
          border: none;
          text-align: center;
        }

        .contact-title {
          font-family: var(--font-outfit);
          font-size: 2.2rem;
          color: var(--foreground);
          margin-bottom: 20px;
          line-height: 1.3;
          font-weight: 600;
          text-align: center;
        }

        .contact-description {
          font-family: var(--font-inter);
          font-size: 1.25rem;
          color: var(--grey-text);
          line-height: 1.6;
          margin-bottom: 40px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
          font-weight: 500;
        }

        .contact-buttons {
          display: flex;
          flex-direction: column;
          gap: 20px;
          align-items: center;
          justify-content: center;
          margin-top: 40px;
        }

        .contact-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 12px;
          padding: 18px 48px;
          border-radius: 100px;
          font-weight: 700;
          font-size: 1.1rem;
          width: 100%;
          max-width: 650px;
          transition: all 0.3s ease;
          text-decoration: none;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .whatsapp-btn {
          background: #25D366;
          color: white;
        }

        .whatsapp-btn:hover {
          background: #20BA5A;
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(37, 211, 102, 0.3);
        }

        .call-btn {
          background: var(--primary);
          color: white;
        }

        .call-btn:hover {
          background: var(--primary-hover);
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(255, 107, 0, 0.3);
        }

        .contact-btn svg {
          flex-shrink: 0;
        }

        .important-box {
          background: #FFF8E7;
          border-radius: 16px;
          padding: 40px 48px;
          margin-top: 48px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
        }

        .important-title {
          font-family: var(--font-outfit);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--foreground);
          margin-bottom: 20px;
          text-align: center;
        }

        .important-text {
          font-family: var(--font-inter);
          font-size: 1rem;
          line-height: 1.7;
          color: #333;
          margin-bottom: 16px;
          text-align: center;
        }

        .important-text strong {
          font-weight: 700;
          color: var(--foreground);
        }

        .whatsapp-cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #FFC107;
          color: #000;
          padding: 12px 32px;
          border-radius: 100px;
          font-weight: 700;
          font-size: 1rem;
          margin: 24px auto 20px;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(255, 193, 7, 0.3);
        }

        .whatsapp-cta-btn:hover {
          background: #FFB300;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 193, 7, 0.4);
        }

        .important-footer {
          font-family: var(--font-inter);
          font-size: 0.95rem;
          color: #555;
          margin-top: 16px;
          text-align: center;
        }

        .subheading {
          font-family: var(--font-inter);
          font-size: 1.1rem;
          color: var(--grey-text);
          line-height: 1.6;
          margin-bottom: 48px;
        }

        .next-steps-container {
          margin-bottom: 48px;
          text-align: left;
          width: 100%;
        }

        .section-title {
          font-size: 1.3rem;
          margin-bottom: 24px;
          color: var(--foreground);
          text-align: center;
          font-weight: 700;
        }

        .cards-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .step-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(0, 0, 0, 0.03);
          display: flex;
          align-items: center;
          gap: 20px;
          transition: transform 0.2sease, box-shadow 0.2s ease;
        }

        .step-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(255, 107, 0, 0.1);
          border-color: rgba(255, 107, 0, 0.2);
        }

        .step-icon {
          width: 50px;
          height: 50px;
          background: #FFF5F0;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .step-info {
           text-align: left;
        }

        .step-info h4 {
          font-size: 1rem;
          color: var(--foreground);
          margin-bottom: 4px;
          font-weight: 600;
        }

        .step-info p {
          font-size: 0.9rem;
          color: #666;
          line-height: 1.4;
          margin: 0;
        }

        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--foreground);
          color: white;
          padding: 14px 32px;
          border-radius: 100px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .back-btn:hover {
          background: #333;
          transform: translateY(-2px);
          gap: 12px;
        }

        @media (max-width: 768px) {
          .heading {
            font-size: 3rem;
          }
          .main-content {
            padding: 32px 20px 60px;
          }
          .contact-section {
            padding: 24px;
            margin-top: 40px;
          }
          .contact-title {
            font-size: 1.3rem;
          }
          .contact-buttons {
            flex-direction: column;
          }
          .contact-btn {
            width: 100%;
            justify-content: center;
          }
          .important-box {
            padding: 32px 24px;
            margin-top: 32px;
          }
          .important-title {
            font-size: 1.3rem;
          }
          .important-text {
            font-size: 0.95rem;
          }
          .whatsapp-cta-btn {
            width: 100%;
            max-width: 280px;
          }
        }
      `}</style>
    </>
  );
}
