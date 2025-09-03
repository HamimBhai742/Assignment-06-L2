// FAQ Data
export const faqData = [
  {
    id: 1,
    category: 'account',
    question: 'How do I create a PayWallet account?',
    answer:
      'To create a PayWallet account: 1) Download the app from Play Store/App Store, 2) Enter your mobile number, 3) Verify with OTP, 4) Set your PIN, 5) Complete KYC verification with your NID/Passport.',
    popular: true,
  },
  {
    id: 2,
    category: 'account',
    question: 'How do I reset my PayWallet PIN?',
    answer:
      "Go to Settings > Security > Reset PIN. You'll need to verify your identity using your registered mobile number and answer security questions or use biometric verification.",
    popular: true,
  },
  {
    id: 3,
    category: 'account',
    question: 'Is my money safe with PayWallet?',
    answer:
      'Yes, PayWallet is regulated by Bangladesh Bank and uses bank-level security. Your funds are protected by 256-bit encryption, two-factor authentication, and are kept in segregated accounts.',
    popular: true,
  },
  {
    id: 4,
    category: 'account',
    question: 'How do I enable two-factor authentication?',
    answer:
      'Go to Settings > Security > Two-Factor Authentication. You can enable SMS OTP, email verification, or use an authenticator app like Google Authenticator.',
    popular: false,
  },

  {
    id: 5,
    category: 'payments',
    question: 'How do I send money to another PayWallet user?',
    answer:
      'Open the app > Tap "Send Money" > Enter recipient\'s mobile number or scan QR code > Enter amount > Add note (optional) > Enter PIN to confirm.',
    popular: true,
  },
  {
    id: 6,
    category: 'payments',
    question: 'How long do bank transfers take?',
    answer:
      'Instant transfers within PayWallet network are immediate. Bank transfers typically take 1-2 business days. RTGS transfers are processed within 30 minutes during banking hours.',
    popular: true,
  },
  {
    id: 7,
    category: 'payments',
    question: 'Can I cancel a money transfer?',
    answer:
      "Once a transfer is completed, it cannot be cancelled. However, if the recipient hasn't accepted the money within 72 hours, it will be automatically refunded to your account.",
    popular: false,
  },
  {
    id: 8,
    category: 'payments',
    question: 'How do I pay bills using PayWallet?',
    answer:
      'Go to "Pay Bills" section > Select utility (electricity, gas, water, mobile) > Enter your account number > Verify details > Enter amount > Confirm with PIN.',
    popular: false,
  },

  {
    id: 9,
    category: 'verification',
    question: 'What documents do I need for KYC verification?',
    answer:
      'You need: 1) National ID (NID) or Passport, 2) A clear selfie, 3) Proof of address (utility bill/bank statement). All documents should be clear and valid.',
    popular: true,
  },
  {
    id: 10,
    category: 'verification',
    question: 'How long does verification take?',
    answer:
      "Basic verification is instant. Full KYC verification typically takes 24-48 hours. You'll receive a notification once your account is verified.",
    popular: false,
  },
  {
    id: 11,
    category: 'verification',
    question: 'Why was my verification rejected?',
    answer:
      'Common reasons: blurry documents, expired ID, mismatched information, or poor photo quality. Resubmit with clear, valid documents matching your registered details.',
    popular: false,
  },

  {
    id: 12,
    category: 'limits',
    question: 'What are the transaction limits?',
    answer:
      'Basic account: ₹10,000/day, ₹25,000/month. Verified account: ₹50,000/day, ₹200,000/month. Premium account: ₹100,000/day, ₹500,000/month.',
    popular: true,
  },
  {
    id: 13,
    category: 'limits',
    question: 'Are there any fees for using PayWallet?',
    answer:
      'PayWallet to PayWallet transfers are free. Bank transfers: ₹5-15 depending on amount. Bill payments: Free for most utilities. Cash-out: 1.5% (min ₹10).',
    popular: true,
  },

  {
    id: 14,
    category: 'technical',
    question: 'The app is not working properly. What should I do?',
    answer:
      'Try these steps: 1) Force close and restart the app, 2) Check internet connection, 3) Update to latest version, 4) Clear app cache, 5) Restart your phone. If issues persist, contact support.',
    popular: false,
  },
  {
    id: 15,
    category: 'technical',
    question: 'I forgot my mobile number linked to PayWallet',
    answer:
      'Visit any PayWallet agent with your NID and a signed letter requesting number change. You can also call customer support at 16247 for assistance.',
    popular: false,
  },
];
