'use client';
import { motion } from 'framer-motion';

const brands = [
  'Google', 'Amazon', 'Microsoft', 'Uber', 'TCS', 'Infosys', 'Wipro', 'Accenture'
];

export default function SocialProof() {
  return (
    <section className="social-proof-section">
      <div className="container">
        <div className="stats-container">
          <p className="stats-text"><span className="text-orange">10M+</span> Learners Upgraded Their Careers</p>
          <div className="avatar-group">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <img
                key={i}
                src={`https://i.pravatar.cc/150?u=lu${i}`}
                alt="Learner"
                className="avatar"
              />
            ))}
            <div className="avatar-plus">+10M</div>
          </div>
        </div>

        <div className="brand-logos">
          <p className="brand-title">Alumni working at top tech giants</p>
          <div className="logo-slider">
            <div className="logo-track">
              {[...brands, ...brands].map((brand, index) => (
                <div key={index} className="logo-item">
                  <span className="brand-name">{brand}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .social-proof-section {
          padding: 80px 0;
          background: #fff;
          border-bottom: 1px solid #eee;
        }
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 60px;
        }
        .stats-container {
          text-align: center;
        }
        .text-orange {
          color: var(--primary);
          font-weight: 800;
        }
        .avatar-group {
          display: flex;
          justify-content: center;
          margin-top: 24px;
        }
        .avatar {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: 4px solid white;
          margin-left: -16px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        .avatar:first-child {
          margin-left: 0;
        }
        .avatar-plus {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: var(--black);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 0.85rem;
          border: 4px solid white;
          margin-left: -16px;
        }
        .stats-text {
          font-weight: 700;
          color: #111;
          font-size: 1.5rem;
          font-family: var(--font-outfit);
        }
        .brand-logos {
          width: 100%;
          text-align: center;
        }
        .brand-title {
          font-size: 0.95rem;
          color: #999;
          text-transform: uppercase;
          letter-spacing: 3px;
          margin-bottom: 40px;
          font-weight: 700;
        }
        .logo-slider {
          overflow: hidden;
          width: 100%;
          position: relative;
        }
        .logo-track {
          display: flex;
          gap: 120px;
          width: max-content;
          animation: slide 40s linear infinite;
          padding: 20px 0;
        }
        .logo-item {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .brand-name {
          font-size: 2rem;
          font-weight: 900;
          color: #eee;
          filter: grayscale(1);
          opacity: 0.5;
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        .logo-item:hover .brand-name {
          filter: grayscale(0);
          opacity: 1;
          color: var(--primary);
          transform: scale(1.1);
        }
        @keyframes slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); } 
        }
      `}</style>
    </section>
  );
}
