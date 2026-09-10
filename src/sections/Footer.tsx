import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY } from '../data/config';
import { Logo } from '../components/Logo';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-navy-500 text-warmgray-300">
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Logo size="md" />
            <p className="text-sm mt-4 max-w-xs">
              Professional India visa assistance. From application to approval — expert help when you need it.
            </p>
          </div>
          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={`mailto:${COMPANY.email}`} className="hover:text-white transition-colors">
                  ✉ {COMPANY.email}
                </a>
              </li>
              <li>
                <a href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  💬 WhatsApp: {COMPANY.phone}
                </a>
              </li>
              <li>
                <a href={`tel:${COMPANY.phone}`} className="hover:text-white transition-colors">
                  📞 {COMPANY.phone}
                </a>
              </li>
            </ul>
          </div>
          {/* Legal */}
          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Refund Policy</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Visa Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-navy-400/30 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm">© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</p>
            <p className="text-xs text-warmgray-400 max-w-lg text-center md:text-right">
              Disclaimer: We are a visa assistance service, not a government agency. Visa approval is solely at the discretion of the Indian government. We do not guarantee visa approval.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
