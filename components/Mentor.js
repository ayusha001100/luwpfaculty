'use client';
import { motion } from 'framer-motion';
import { Plus, User } from 'lucide-react';

export default function Mentor() {
  const mentors = [
    { id: 1, image: '/images/mentors/mentor-1.jpeg' },
    { id: 2, image: '/images/mentors/mentor-2.jpeg' },
    { id: 3, image: '/images/mentors/mentor-3.jpeg' },
    { id: 4, image: '/images/mentors/mentor-4.jpeg' },
    { id: 5, image: '/images/mentors/mentor-5.jpeg' },
    { id: 6, image: '/images/mentors/mentor-6.jpeg' },
    { id: 7, image: '/images/mentors/mentor-7.jpeg' },
    { id: 8, image: '/images/mentors/mentor-8.jpeg' }, // Filler
    { id: 9, image: '/images/mentors/mentor-9.jpeg' }, // Filler
  ];

  return (
    <section className="mentor-section section-padding">
      <div className="container">
        <div className="mentor-layout">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            className="mentor-image-container"
          >
            <div className="mentor-placeholders-grid">
              {mentors.map((mentor) => (
                <div key={mentor.id} className="mentor-placeholder">
                  <div className="placeholder-avatar">
                    {mentor.image ? (
                      <img src={mentor.image} alt="Mentor" className="avatar-img" />
                    ) : (
                      <User size={32} className="avatar-icon" />
                    )}
                  </div>
                </div>
              ))}
              <div className="experience-badge">Top 1% Mentors</div>
            </div>
          </motion.div>

          <div className="mentor-info">
            <span className="subtitle">Learn from Industry Leaders</span>
            <h2>Get Coached by <span className="text-secondary">Experts</span></h2>
            <p className="mentor-desc">
              At LetsUpgrade, we believe in learning by doing. Our mentors are professionals working at top-tier tech companies like Google, Amazon, and Uber, bringing real-world experience directly to you.
            </p>

            <div className="mentor-stats">
              <div className="stat-item">
                <span className="stat-number">75+</span>
                <span className="stat-label">Expert Mentors</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">10M+</span>
                <span className="stat-label">Passionate Learners</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">4.8/5</span>
                <span className="stat-label">Learning Quality</span>
              </div>
            </div>

            <div className="mentor-trust">
              <span className="trust-label">Our mentors come from:</span>
              <div className="brand-grid">
                <div className="brand-item"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="brand-logo" /></div>
                <div className="brand-item"><img src="https://cdn.simpleicons.org/meta" alt="Meta" className="brand-logo" /></div>
                <div className="brand-item"><img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" alt="Microsoft" className="brand-logo" /></div>
                <div className="brand-item"><img src="https://cdn.simpleicons.org/netflix" alt="Netflix" className="brand-logo" /></div>
                <div className="brand-item"><img src="https://cdn.simpleicons.org/airbnb" alt="Airbnb" className="brand-logo" /></div>
                <div className="more-indicator">+ 100 More</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .mentor-section {
          background-color: white;
          overflow: hidden;
        }
        .mentor-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 100px;
          align-items: center;
        }
        .mentor-placeholders-grid {
          position: relative;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          background: #f8fafc;
          padding: 40px;
          border-radius: 40px;
          border: 1px solid #e2e8f0;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
        }
        .mentor-placeholder {
          aspect-ratio: 1/1;
          background: white;
          border-radius: 24px;
          border: 1px solid #edf2f7;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          overflow: hidden;
          cursor: pointer;
        }
        .mentor-placeholder:hover {
          transform: translateY(-8px) scale(1.05);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          border-color: var(--primary);
        }
        .placeholder-avatar {
          width: 100%;
          height: 100%;
          background: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #94a3b8;
          overflow: hidden;
        }
        .avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .mentor-placeholder:hover .avatar-img {
          transform: scale(1.1);
        }
        .skeleton-line.short {
          width: 60%;
        }
        .experience-badge {
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--primary);
          color: #000;
          padding: 12px 24px;
          border-radius: 100px;
          font-weight: 800;
          font-size: 0.9rem;
          box-shadow: 0 10px 20px rgba(255, 204, 0, 0.4);
          z-index: 2;
          white-space: nowrap;
        }
        .subtitle {
          color: var(--primary);
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 4px;
          display: block;
          margin-bottom: 20px;
          font-size: 0.9rem;
        }
        h2 {
          font-size: 3.5rem;
          line-height: 1.1;
          margin-bottom: 32px;
          color: #111;
          letter-spacing: -2px;
        }
        .text-secondary {
          color: var(--primary);
        }
        .mentor-desc {
          font-size: 1.3rem;
          color: #555;
          line-height: 1.6;
          margin-bottom: 48px;
        }
        .mentor-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 48px;
          border-top: 1px solid #eee;
          padding-top: 48px;
        }
        .stat-item {
          display: flex;
          flex-direction: column;
        }
        .stat-number {
          font-size: 2.5rem;
          font-weight: 900;
          color: var(--black);
          line-height: 1;
          margin-bottom: 10px;
        }
        .stat-label {
          color: #888;
          font-size: 1rem;
          font-weight: 600;
        }
        .mentor-trust {
          margin-top: 20px;
        }
        .trust-label {
          font-size: 0.85rem;
          color: #94A3B8;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 24px;
          display: block;
        }
        .brand-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 24px 32px;
          align-items: center;
        }
        .brand-item {
          display: flex;
          align-items: center;
          height: 32px;
        }
        .brand-logo {
          height: 100%;
          width: auto;
          max-width: 100px;
          opacity: 1;
          filter: none;
          transition: all 0.3s ease;
        }
        .brand-logo:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
        }
        .more-indicator {
          font-size: 0.9rem;
          font-weight: 700;
          color: #64748B;
          opacity: 0.7;
          white-space: nowrap;
          margin-left: 8px;
        }
        @media (max-width: 992px) {
          .mentor-layout {
            grid-template-columns: 1fr;
            gap: 60px;
          }
          h2 {
            font-size: 3rem;
          }
          .mentor-image-wrapper {
            max-width: 600px;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
}

