import { useState } from 'react';
import { Link } from 'react-router';

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
}

const Blogs = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      slug: "future-digital-payments-bangladesh",
      title: "The Future of Digital Payments in Bangladesh",
      excerpt: "Exploring how digital wallets are revolutionizing financial transactions across Bangladesh and empowering millions of users.",
      content: "Digital payments have transformed the financial landscape in Bangladesh over the past decade. With the introduction of mobile financial services and digital wallets like PayWallet, millions of previously unbanked citizens now have access to secure, convenient financial services. This revolution has not only improved individual financial inclusion but has also contributed significantly to the country's economic growth. The adoption of digital payment systems has streamlined business operations, reduced transaction costs, and enhanced transparency in financial dealings. As we look toward the future, emerging technologies like blockchain, artificial intelligence, and enhanced security protocols promise to make digital payments even more secure and efficient. The government's supportive regulatory framework and the increasing smartphone penetration rate suggest that Bangladesh is well-positioned to become a leader in digital financial services in South Asia.",
      author: "Sarah Ahmed",
      date: "Dec 20, 2024",
      readTime: "5 min read",
      category: "Technology",
      image: "💳",
      tags: ["fintech", "digital-payments", "bangladesh"]
    },
    {
      id: 2,
      slug: "security-best-practices-digital-wallets",
      title: "Security Best Practices for Digital Wallets",
      excerpt: "Learn essential security measures to protect your digital wallet and keep your financial information safe from cyber threats.",
      content: "Security is paramount in digital finance, and protecting your digital wallet should be your top priority. Start with strong authentication by using complex PINs and enabling biometric authentication when available. Never share your login credentials or PINs with anyone, and always log out of your account when using shared devices. Regularly monitor your transaction history and report any suspicious activities immediately. Keep your app updated to the latest version to ensure you have the most recent security patches. Use secure networks and avoid conducting financial transactions on public Wi-Fi. Enable transaction notifications to stay informed about all account activities. Consider setting transaction limits to minimize potential losses. Always verify recipient details before sending money, and be cautious of phishing attempts through fake emails or messages. Remember, legitimate financial institutions will never ask for your PIN or password through email or phone calls.",
      author: "Mohammad Rahman",
      date: "Dec 18, 2024",
      readTime: "7 min read",
      category: "Security",
      image: "🔐",
      tags: ["security", "safety", "tips"]
    },
    {
      id: 3,
      slug: "maximize-paywallet-experience",
      title: "How to Maximize Your PayWallet Experience",
      excerpt: "Discover advanced features and tips to get the most out of your PayWallet account for seamless financial management.",
      content: "PayWallet offers numerous features designed to make your financial life easier and more efficient. Start by exploring the dashboard to understand your spending patterns and transaction history. Set up automatic bill payments for recurring expenses like utilities and subscriptions to never miss a payment. Use the budgeting tools to track your expenses and set financial goals. Take advantage of the quick transfer feature for instant money transfers to friends and family. Explore merchant partnerships for exclusive discounts and cashback offers. Enable push notifications to stay updated on your account activities and promotional offers. Use the QR code feature for quick and secure payments at supported merchants. Consider upgrading to premium features if you're a frequent user to access additional benefits like higher transaction limits and priority customer support. Regularly review your account settings and update your profile information to ensure optimal service delivery.",
      author: "Fatima Khan",
      date: "Dec 15, 2024",
      readTime: "4 min read",
      category: "Tutorial",
      image: "📱",
      tags: ["tutorial", "features", "guide"]
    },
    {
      id: 4,
      slug: "understanding-transaction-fees-limits",
      title: "Understanding Transaction Fees and Limits",
      excerpt: "A comprehensive guide to PayWallet's fee structure and transaction limits to help you plan your financial activities.",
      content: "Understanding fees is crucial for users to make informed decisions about their financial transactions. PayWallet maintains a transparent fee structure designed to be competitive while ensuring service sustainability. Basic transactions like account-to-account transfers within the PayWallet network are typically free or carry minimal charges. Cash-in and cash-out services through agents may have small fees depending on the amount and location. International transfers and currency conversions carry standard industry rates. Daily, weekly, and monthly transaction limits are in place for security purposes and regulatory compliance. These limits can often be increased by completing additional verification steps. Business accounts may have different fee structures and higher limits to accommodate commercial needs. Always check the current fee schedule in your app as rates may change based on regulatory requirements or service improvements. Consider consolidating smaller transactions to minimize fee impact, and take advantage of promotional periods when fees may be reduced or waived.",
      author: "Ahmed Hassan",
      date: "Dec 12, 2024",
      readTime: "6 min read",
      category: "Finance",
      image: "💰",
      tags: ["fees", "limits", "finance"]
    },
    {
      id: 5,
      slug: "mobile-banking-vs-digital-wallets",
      title: "Mobile Banking vs Digital Wallets: What's the Difference?",
      excerpt: "Comparing traditional mobile banking with modern digital wallet solutions and their unique advantages.",
      content: "The financial sector has evolved rapidly with the introduction of mobile banking and digital wallets, each serving different needs and preferences. Mobile banking typically extends traditional banking services to mobile platforms, allowing users to access their existing bank accounts, check balances, transfer funds, and pay bills. Digital wallets, on the other hand, create a separate ecosystem for storing money electronically and conducting transactions. Digital wallets often offer faster transaction processing, lower fees, and greater accessibility for unbanked populations. They excel in peer-to-peer transfers, small merchant payments, and micro-transactions. Mobile banking provides more comprehensive financial services including loans, investments, and detailed account management. Security approaches differ, with digital wallets often using tokenization and mobile banking relying on traditional banking security protocols. The choice between them depends on your financial needs, with many users finding value in using both services complementarily for different types of transactions.",
      author: "Rashida Begum",
      date: "Dec 10, 2024",
      readTime: "8 min read",
      category: "Technology",
      image: "🏦",
      tags: ["comparison", "banking", "technology"]
    },
    {
      id: 6,
      slug: "building-financial-literacy-digital-tools",
      title: "Building Financial Literacy Through Digital Tools",
      excerpt: "How digital wallets and financial apps are helping users develop better money management skills and financial awareness.",
      content: "Financial literacy is essential in today's digital economy, and modern financial tools are making it easier than ever to develop good money management habits. Digital wallets provide real-time spending insights, helping users understand their financial patterns and make informed decisions. Transaction categorization features automatically sort expenses into categories like food, transportation, and entertainment, providing clear visibility into spending habits. Budget tracking tools allow users to set spending limits and receive alerts when approaching those limits. Many digital financial platforms now include educational content, tips, and personalized recommendations based on spending behavior. Savings features like round-up programs automatically save small amounts from each transaction, making saving effortless. Goal-setting tools help users work toward specific financial objectives with progress tracking and milestone celebrations. The gamification of financial management through achievements and rewards makes learning about money management engaging and motivating. These tools are particularly valuable for young adults and first-time financial service users who can develop healthy financial habits from the start.",
      author: "Dr. Karim Ali",
      date: "Dec 8, 2024",
      readTime: "10 min read",
      category: "Education",
      image: "📚",
      tags: ["education", "literacy", "finance"]
    }
  ];

  const categories = ['All', 'Technology', 'Security', 'Tutorial', 'Finance', 'Education'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter Section */}
        <div className="mb-12 animate-fadeInUp animation-delay-400">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">🔍</span>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <article
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100 dark:border-gray-700 animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Post Image/Icon */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-48 rounded-t-2xl flex items-center justify-center">
                <span className="text-6xl">{post.image}</span>
              </div>

              <div className="p-6">
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
                    {post.category}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">{post.readTime}</span>
                </div>

                {/* Title */}
                <Link to={`/blog/${post.slug}`}>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                    {post.title}
                  </h2>
                </Link>

                {/* Excerpt */}
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Author and Date */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">{post.author.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{post.author}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{post.date}</p>
                    </div>
                  </div>

                  <Link to={`/blog/${post.slug}`} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                    <span className="text-lg">→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16 animate-fadeIn">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No articles found</h3>
            <p className="text-gray-600 dark:text-gray-300">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Blogs;