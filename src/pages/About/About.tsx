import { useState } from 'react';

const About = () => {
  const [activeTab, setActiveTab] = useState('mission');

  // Mission Section Component
  const MissionSection = () => (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Our Mission
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Empowering millions with secure, instant, and accessible digital financial services
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white ml-4">Secure Transactions</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">Bank-level security with end-to-end encryption for all your financial transactions.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white ml-4">Instant Transfers</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">Send money instantly to anyone, anywhere, anytime with just a few taps.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">50M+</div>
              <div className="text-gray-600 dark:text-gray-300">Active Users</div>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">$2B+</div>
              <div className="text-gray-600 dark:text-gray-300">Transactions</div>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">99.9%</div>
              <div className="text-gray-600 dark:text-gray-300">Uptime</div>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">24/7</div>
              <div className="text-gray-600 dark:text-gray-300">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // Story Section Component
  const StorySection = () => (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Our Story
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            From a simple idea to revolutionizing digital payments in Bangladesh
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-green-500 rounded-full"></div>
          
          <div className="space-y-12">
            {[
              { year: '2018', title: 'Foundation', desc: 'Started with a vision to make digital payments accessible to everyone', icon: '🚀' },
              { year: '2019', title: 'First Million', desc: 'Reached 1 million users within the first year of operation', icon: '👥' },
              { year: '2021', title: 'Banking Partnership', desc: 'Partnered with major banks to expand our service network', icon: '🏦' },
              { year: '2023', title: 'International Expansion', desc: 'Launched services in neighboring countries', icon: '🌍' },
              { year: '2024', title: 'AI Integration', desc: 'Introduced AI-powered fraud detection and customer support', icon: '🤖' }
            ].map((milestone, index) => (
              <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl shadow-lg">
                    <div className="text-2xl mb-2">{milestone.icon}</div>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{milestone.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{milestone.desc}</p>
                  </div>
                </div>
                <div className="w-4 h-4 bg-blue-500 rounded-full border-4 border-white dark:border-gray-900 shadow-lg z-10"></div>
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  // Team Section Component
  const TeamSection = () => {
    const teamMembers = [
      { name: 'Ahmed Rahman', role: 'CEO & Founder', image: '👨‍💼', desc: 'Visionary leader with 15+ years in fintech' },
      { name: 'Fatima Khan', role: 'CTO', image: '👩‍💻', desc: 'Tech expert specializing in secure payment systems' },
      { name: 'Rashid Ali', role: 'Head of Security', image: '👨‍🔒', desc: 'Cybersecurity specialist ensuring transaction safety' },
      { name: 'Nasreen Begum', role: 'Head of Operations', image: '👩‍💼', desc: 'Operations expert streamlining user experience' },
      { name: 'Karim Hassan', role: 'Head of Marketing', image: '👨‍🎨', desc: 'Marketing strategist driving user growth' },
      { name: 'Salma Ahmed', role: 'Head of Customer Success', image: '👩‍🎓', desc: 'Customer advocate ensuring user satisfaction' }
    ];

    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              The brilliant minds behind Bangladesh's leading digital wallet platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-center">
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{member.name}</h3>
                  <div className="text-blue-600 dark:text-blue-400 font-semibold mb-4">{member.role}</div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{member.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 shadow-sm sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'mission', label: 'Mission' },
              { id: 'story', label: 'Our Story' },
              { id: 'team', label: 'Team' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="pt-0">
        {activeTab === 'mission' && <MissionSection />}
        {activeTab === 'story' && <StorySection />}
        {activeTab === 'team' && <TeamSection />}
      </div>
    </div>
  );
};

export default About;