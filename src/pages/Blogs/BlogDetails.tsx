/* eslint-disable react-hooks/exhaustive-deps */
import { useParams, Link  } from 'react-router';
import { useState, useEffect } from 'react';

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

const BlogDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      slug: "future-digital-payments-bangladesh",
      title: "The Future of Digital Payments in Bangladesh",
      excerpt: "Exploring how digital wallets are revolutionizing financial transactions across Bangladesh and empowering millions of users.",
      content: "Digital payments have transformed the financial landscape in Bangladesh over the past decade. With the introduction of mobile financial services and digital wallets like PayWallet, millions of previously unbanked citizens now have access to secure, convenient financial services. This revolution has not only improved individual financial inclusion but has also contributed significantly to the country's economic growth.\n\nThe adoption of digital payment systems has streamlined business operations, reduced transaction costs, and enhanced transparency in financial dealings. Small businesses can now accept payments without the need for expensive point-of-sale systems, while consumers enjoy the convenience of cashless transactions.\n\nAs we look toward the future, emerging technologies like blockchain, artificial intelligence, and enhanced security protocols promise to make digital payments even more secure and efficient. The government's supportive regulatory framework and the increasing smartphone penetration rate suggest that Bangladesh is well-positioned to become a leader in digital financial services in South Asia.\n\nThe impact extends beyond urban areas, with rural communities gaining access to financial services for the first time. This democratization of financial access is driving economic growth and reducing poverty levels across the country.",
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
      content: "Security is paramount in digital finance, and protecting your digital wallet should be your top priority. With the increasing adoption of digital payment systems, cybercriminals are constantly developing new methods to exploit vulnerabilities and steal sensitive financial information.\n\nStart with strong authentication by using complex PINs that are not easily guessable. Avoid using birthdays, phone numbers, or sequential numbers. Enable biometric authentication when available, as fingerprints and facial recognition provide an additional layer of security that's difficult to replicate.\n\nNever share your login credentials or PINs with anyone, including family members or friends. Legitimate financial institutions will never ask for your PIN or password through email, phone calls, or text messages. Always log out of your account when using shared devices or public computers.\n\nRegularly monitor your transaction history and report any suspicious activities immediately. Most digital wallet providers offer real-time notifications for transactions, which can help you quickly identify unauthorized access to your account.\n\nKeep your app updated to the latest version to ensure you have the most recent security patches and features. Use secure networks and avoid conducting financial transactions on public Wi-Fi networks, which can be easily compromised by malicious actors.",
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
      content: "PayWallet offers numerous features designed to make your financial life easier and more efficient. Many users only scratch the surface of what's possible with their digital wallet, missing out on powerful tools that could significantly improve their financial management.\n\nStart by exploring the dashboard to understand your spending patterns and transaction history. The analytics provided can help you identify areas where you might be overspending and opportunities to save money. Use these insights to make more informed financial decisions.\n\nSet up automatic bill payments for recurring expenses like utilities, internet, and subscription services. This ensures you never miss a payment and helps maintain a good credit history. You can also set up automatic savings transfers to build your emergency fund without thinking about it.\n\nTake advantage of the budgeting tools to track your expenses and set financial goals. Create categories for different types of spending and set monthly limits to help control your expenses. The app will send notifications when you're approaching your limits.\n\nExplore merchant partnerships for exclusive discounts and cashback offers. Many digital wallets partner with retailers to provide special deals for their users. These can add up to significant savings over time.\n\nUse the QR code feature for quick and secure payments at supported merchants. This is not only faster than cash transactions but also provides a digital record of your purchases for better expense tracking.",
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
      content: "Understanding fees is crucial for users to make informed decisions about their financial transactions. PayWallet maintains a transparent fee structure designed to be competitive while ensuring service sustainability and regulatory compliance.\n\nBasic transactions like account-to-account transfers within the PayWallet network are typically free or carry minimal charges. This encourages users to stay within the ecosystem and makes everyday transactions more affordable.\n\nCash-in and cash-out services through agents may have small fees depending on the amount and location. These fees help maintain the agent network and ensure service availability across different regions, including rural areas.\n\nInternational transfers and currency conversions carry standard industry rates. These fees reflect the complexity and regulatory requirements of cross-border transactions, as well as the costs associated with currency exchange.\n\nDaily, weekly, and monthly transaction limits are in place for security purposes and regulatory compliance. These limits help prevent fraud and money laundering while ensuring that the service meets central bank requirements.\n\nBusiness accounts may have different fee structures and higher limits to accommodate commercial needs. If you're using PayWallet for business purposes, consider upgrading to a business account for better rates and higher transaction limits.\n\nAlways check the current fee schedule in your app as rates may change based on regulatory requirements or service improvements. The app provides detailed information about all applicable fees before you complete any transaction.",
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
      content: "The financial sector has evolved rapidly with the introduction of mobile banking and digital wallets, each serving different needs and preferences. Understanding the differences can help you choose the right solution for your financial needs.\n\nMobile banking typically extends traditional banking services to mobile platforms, allowing users to access their existing bank accounts, check balances, transfer funds between accounts, and pay bills. It's essentially your traditional bank in your pocket, with all the same features and limitations.\n\nDigital wallets, on the other hand, create a separate ecosystem for storing money electronically and conducting transactions. They often operate independently of traditional banks, though they may partner with banks for certain services.\n\nDigital wallets often offer faster transaction processing, especially for peer-to-peer transfers and small payments. They typically have lower fees for basic transactions and greater accessibility for unbanked populations who may not have traditional bank accounts.\n\nMobile banking provides more comprehensive financial services including loans, investments, detailed account management, and integration with other banking products like credit cards and mortgages.\n\nSecurity approaches differ significantly. Digital wallets often use tokenization, where your actual account information is replaced with a unique token for each transaction. Mobile banking relies on traditional banking security protocols, which are robust but may be less agile in adapting to new threats.\n\nThe choice between them depends on your financial needs, with many users finding value in using both services complementarily for different types of transactions.",
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
      content: "Financial literacy is essential in today's digital economy, and modern financial tools are making it easier than ever to develop good money management habits. Digital platforms are democratizing financial education by making it accessible, interactive, and personalized.\n\nDigital wallets provide real-time spending insights that help users understand their financial patterns and make informed decisions. Unlike traditional banking statements that arrive monthly, digital tools offer immediate feedback on spending behavior.\n\nTransaction categorization features automatically sort expenses into categories like food, transportation, entertainment, and utilities. This provides clear visibility into spending habits and helps identify areas where money might be wasted or better allocated.\n\nBudget tracking tools allow users to set spending limits for different categories and receive alerts when approaching those limits. This proactive approach helps prevent overspending and encourages more mindful financial behavior.\n\nMany digital financial platforms now include educational content, tips, and personalized recommendations based on individual spending behavior. This contextual learning is more effective than generic financial advice because it's relevant to the user's actual situation.\n\nSavings features like round-up programs automatically save small amounts from each transaction, making saving effortless and painless. These micro-savings can add up to significant amounts over time without impacting daily spending habits.\n\nGoal-setting tools help users work toward specific financial objectives with progress tracking and milestone celebrations. Whether saving for a vacation, emergency fund, or major purchase, these tools make abstract financial goals more concrete and achievable.\n\nThe gamification of financial management through achievements, badges, and rewards makes learning about money management engaging and motivating, especially for younger users who might otherwise find financial topics boring or intimidating.",
      author: "Dr. Karim Ali",
      date: "Dec 8, 2024",
      readTime: "10 min read",
      category: "Education",
      image: "📚",
      tags: ["education", "literacy", "finance"]
    }
  ];

  useEffect(() => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const foundPost = blogPosts.find(p => p.slug === slug);
      if (foundPost) {
        setPost(foundPost);
        // Get related posts from same category
        const related = blogPosts
          .filter(p => p.category === foundPost.category && p.id !== foundPost.id)
          .slice(0, 3);
        setRelatedPosts(related);
      }
      setIsLoading(false);
    }, 500);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📭</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Blog post not found</h1>
          <Link to="/blogs" className="text-blue-600 dark:text-blue-400 hover:underline">
            ← Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            to="/blogs"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-6 transition-colors"
          >
            <span className="mr-2">←</span>
            Back to Blogs
          </Link>

          <div className="mb-6">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-full">
              {post.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-fadeInUp">
            {post.title}
          </h1>

          <div className="flex items-center space-x-6 text-gray-600 dark:text-gray-300 animate-fadeInUp animation-delay-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">{post.author.charAt(0)}</span>
              </div>
              <span className="font-medium">{post.author}</span>
            </div>
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Image */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-64 rounded-2xl flex items-center justify-center mb-8 animate-fadeInUp animation-delay-400">
          <span className="text-8xl">{post.image}</span>
        </div>

        {/* Article Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none animate-fadeInUp animation-delay-600">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        {/* Tags */}
        <div className="mt-8 animate-fadeInUp animation-delay-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-sm rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 animate-fadeInUp animation-delay-1000">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.slug}`}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border border-gray-100 dark:border-gray-700"
                >
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-3xl">{relatedPost.image}</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {relatedPost.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-4 text-xs text-gray-500 dark:text-gray-400">
                    <span>{relatedPost.author}</span>
                    <span>{relatedPost.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Share Section */}
        <div className="mt-12 p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-center animate-fadeInUp animation-delay-1200">
          <h3 className="text-xl font-bold text-white mb-4">Enjoyed this article?</h3>
          <p className="text-blue-100 mb-6">Share it with your friends and colleagues</p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all">
              Share on Twitter
            </button>
            <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all">
              Share on LinkedIn
            </button>
            <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all">
              Copy Link
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-400 { animation-delay: 400ms; }
        .animation-delay-600 { animation-delay: 600ms; }
        .animation-delay-800 { animation-delay: 800ms; }
        .animation-delay-1000 { animation-delay: 1000ms; }
        .animation-delay-1200 { animation-delay: 1200ms; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default BlogDetails;
