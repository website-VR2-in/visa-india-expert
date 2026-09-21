import React from 'react';
import { useNavigate } from 'react-router-dom';
import { COMPANY } from '../data/config';

export const FinalCTA: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="section bg-gradient-to-br from-navy-500 to-navy-700 text-white">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your India Visa Application?
          </h2>
          <p className="text-warmgray-300 text-lg mb-8">
            Get professional assistance from start to finish. One dedicated consultant, clear kickoff + success pricing, and a simple process.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <button
              onClick={() => navigate('/apply')}
              className="btn btn-primary w-full sm:w-auto"
            >
              Start My Application
            </button>
            <a
              href={COMPANY.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp w-full sm:w-auto"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.257-.13-1.553-.745-1.802-.831-.25-.085-.43-.128-.612.128-.183.257-.705.831-.862.998-.157.167-.316.189-.573.061-.257-.128-1.087-.494-2.065-1.564-.762-.831-1.269-1.86-.14-.242.127-.085.257-.17.385-.257.127-.085.074-.199-.03-.306-.104-.104-.762-1.088-1.07-1.504-.303-.408-.61-.444-.862-.454H9.77c-.25 0-.674.094-1.03.49-.356.395-1.358 1.337-1.358 3.252 0 1.914 1.392 3.77 1.598 4.052.205.282 2.896 4.544 7.034 6.36.985.454 1.745.733 2.348.944.994.342 1.91.288 2.614.176.788-.123 2.412-.984 2.76-1.933.348-.949.348-1.76.243-1.933-.104-.173-.388-.278-.647-.428z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
