import React from 'react';

const lessons = [
  'E-1 Visa: 8 months wait — agent\'s advice, not the right category',
  'FRRO: Exit India — told the E-1 was wrong, restart with B-1',
  'Family dependent visas — a separate parallel process nobody explained',
  'Police verification visits with no warning about requirements',
  'Agents who confidently gave instructions — and were wrong',
];

export const FounderStory: React.FC = () => {
  return (
    <section id="about" className="section bg-navy-500 text-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <div className="section-label text-saffron-400">Our Story</div>
          <div className="section-title text-white">Built on Real Experience</div>
          <div className="section-subtitle text-warmgray-300">
            Our founder navigated the Indian visa system the hard way — so you don't have to.
          </div>
          <blockquote className="text-xl md:text-2xl font-heading italic text-warmgray-200 mb-8 border-l-4 border-saffron-500 pl-6 text-left">
            "I came to India to build a business. I didn't come to spend years fighting a visa system that nobody — not the agents, not the embassies, not the internet — could explain properly."
          </blockquote>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div>
              <h3 className="text-lg font-bold text-saffron-400 mb-4">What He Faced</h3>
              {lessons.map((lesson, i) => (
                <div key={i} className="flex items-start gap-3 mb-3">
                  <span className="text-red-400 mt-1 flex-shrink-0">⚠</span>
                  <p className="text-warmgray-300 text-sm">{lesson}</p>
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-lg font-bold text-saffron-400 mb-4">What You Get</h3>
              <ul className="space-y-3">
                {[
                  'A consultant who has been through the process',
                  'Knowledge of every loophole and requirement',
                  'Clear guidance from day one',
                  'No surprise rejections or forced exits',
                  'Family visas handled alongside yours',
                  'WhatsApp access for real-time support',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-indiangreen-400 mt-1 flex-shrink-0">✓</span>
                    <span className="text-warmgray-200 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
