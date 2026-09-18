import React from 'react';
import { COMPANY } from '../data/config';
import { useFormStore } from '../store';

export const StickyCTA: React.FC = () => {
  const showForm = useFormStore((s) => s.showForm);

  return (
    <div className="sticky-cta safe-bottom">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        <button
          onClick={() => {
            showForm();
            setTimeout(() => {
              document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
          className="btn btn-primary !flex-1 !px-4 !py-3 !text-sm !rounded-xl"
        >
          Start My Visa
        </button>
        <a
          href={COMPANY.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-whatsapp !flex-1 !px-4 !py-3 !text-sm !rounded-xl"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.257-.13-1.553-.745-1.802-.831-.25-.085-.43-.128-.612.128-.183.257-.705.831-.862.998-.157.167-.316.189-.573.061-.257-.128-1.087-.494-2.065-1.564-.762-.831-1.269-1.86-.14-.242.127-.085.257-.17.385-.257.127-.085.074-.199-.03-.306-.104-.104-.762-1.088-1.07-1.504-.303-.408-.61-.444-.862-.454H9.77c-.25 0-.674.094-1.03.49-.356.395-1.358 1.337-1.358 3.252 0 1.914 1.392 3.77 1.598 4.052.205.282 2.896 4.544 7.034 6.36.985.454 1.745.733 2.348.944.994.342 1.91.288 2.614.176.788-.123 2.412-.984 2.76-1.933.348-.949.348-1.76.243-1.933-.104-.173-.388-.278-.647-.428z"/>
          </svg>
          WhatsApp
        </a>
      </div>
    </div>
  );
};
