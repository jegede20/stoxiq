export interface BrokerStep {
  title: string
  instruction: string
  proTip?: string
  warning?: string
}

export interface BrokerFAQ {
  question: string
  answer: string
}

export interface BrokerData {
  id: string
  storageKey: string
  name: string
  shortCode: string
  accentColor: string
  region: 'us' | 'uk' | 'africa'
  country: string
  founded: string
  beginnerTag: 'BEGINNER' | 'INTERMEDIATE'
  tagline: string
  summary: string
  officialUrl: string
  minDeposit: string
  commission: string
  fractional: string
  mobile: string
  regulated: string
  insurance: string
  stocksStat: string
  beginnerScore: number
  tags: string[]
  filterCategories: ('Commission-Free' | 'No Minimum' | 'Mobile App' | 'Fractional Shares')[]
  about: string[]
  bestFor: string[]
  pros: string[]
  cons: string[]
  criticalWarning?: string
  specialNote?: string
  watchOutFor: string[]
  stepsCount: number
  steps: BrokerStep[]
  faqs: BrokerFAQ[]
}

export interface RegionMeta {
  id: 'us' | 'uk' | 'africa'
  name: string
  code: string
  brokerPreview: string
  platformCountLabel: string
  highlightTag: string
  countriesSubtext?: string
  ambientHover: string
}

export const REGIONS_META: RegionMeta[] = [
  {
    id: 'us',
    name: 'United States',
    code: 'US',
    brokerPreview: 'Robinhood · Fidelity · Webull',
    platformCountLabel: '6 Platforms',
    highlightTag: 'MOST PLATFORMS HAVE NO MIN. DEPOSIT',
    ambientHover: 'rgba(59,130,246,0.08)',
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    code: 'UK',
    brokerPreview: 'Freetrade · Trading 212 · eToro',
    platformCountLabel: '5 Platforms',
    highlightTag: 'GREAT FOR COMMISSION-FREE TRADING',
    ambientHover: 'rgba(239,68,68,0.08)',
  },
  {
    id: 'africa',
    name: 'Africa',
    code: 'AF',
    brokerPreview: 'Bamboo · EasyEquities · Chaka',
    platformCountLabel: '7 Platforms',
    highlightTag: 'INVEST IN US STOCKS FROM AFRICA',
    countriesSubtext: 'Nigeria · South Africa · Ghana · Kenya',
    ambientHover: 'rgba(34,197,94,0.08)',
  },
]

export const BROKERS: Record<'us' | 'uk' | 'africa', BrokerData[]> = {
  us: [
    {
      id: 'robinhood',
      storageKey: 'broker_robinhood',
      name: 'Robinhood',
      shortCode: 'RH',
      accentColor: '#4ADE80',
      region: 'us',
      country: 'United States',
      founded: 'Founded 2013',
      beginnerTag: 'BEGINNER',
      tagline: 'The app that introduced commission-free trading to millions of beginners.',
      summary: 'Ultra-clean mobile experience with $0 commissions, $0 account minimums, and $1 fractional shares across US stocks and ETFs.',
      officialUrl: 'https://robinhood.com',
      minDeposit: '$0',
      commission: '$0',
      fractional: 'Yes',
      mobile: 'iOS & Android',
      regulated: 'FINRA & SEC',
      insurance: 'SIPC up to $500,000',
      stocksStat: '5,000+',
      beginnerScore: 9,
      tags: ['Commission-Free', 'No Minimum', 'Mobile App', 'Fractional Shares'],
      filterCategories: ['Commission-Free', 'No Minimum', 'Mobile App', 'Fractional Shares'],
      about: [
        'Robinhood pioneered zero-commission retail investing in the United States, stripping away legacy brokerage fees and complex trading screens.',
        'Regulated by FINRA and the SEC with SIPC protection up to $500,000 on securities, it lets beginners buy fractional slices of major US companies or broad index ETFs starting from just $1.',
      ],
      bestFor: [
        'Complete US beginners who want the simplest mobile app on day one',
        'Investors starting with small amounts ($5–$100) using fractional shares',
        'Long-term ETF and common stock buyers who do not need institutional charting',
      ],
      pros: [
        'Zero commissions on stocks and ETFs',
        'Clean, uncluttered mobile interface',
        'Fractional shares starting from $1',
        'Instant deposits available on small transfers',
        'Crypto and retirement IRA options available',
      ],
      cons: [
        'Limited fundamental research tools on the free tier',
        'Customer support can be slower during peak volatility',
        'Occasional historical technical outages during extreme volume',
        'Available to US residents only',
      ],
      watchOutFor: [
        'Disable Margin Investing and Options Trading when opening your account — stick strictly to a standard Cash / Individual Investing account.',
        'Avoid trading on confetti-style excitement or daily top-mover lists; search deliberately for the ETF or stock you researched.',
      ],
      stepsCount: 11,
      steps: [
        {
          title: 'Download the Official Robinhood App',
          instruction: 'Open the Apple App Store or Google Play Store and install "Robinhood: Investing for All", or visit robinhood.com on desktop.',
          proTip: 'Verify the publisher is Robinhood Markets, Inc. before downloading.',
        },
        {
          title: 'Tap Sign Up & Enter Your Email',
          instruction: 'Create your login credentials using a personal email address and a strong unique password, then enable two-factor authentication (2FA).',
        },
        {
          title: 'Provide Legal Identity Details',
          instruction: 'Enter your legal name, residential US address, phone number, and date of birth exactly as they appear on your government ID.',
        },
        {
          title: 'Verify Your SSN & Tax Status',
          instruction: 'Provide your Social Security Number (required by federal FINRA/SEC law for all US brokerages) to verify your identity.',
          warning: 'Every legitimate US-regulated broker is legally required to verify your SSN for tax reporting.',
        },
        {
          title: 'Answer Basic Investor Profile Questions',
          instruction: 'Select your employment status and investing experience ("None" or "Not much" is completely fine and helps keep risky features turned off).',
        },
        {
          title: 'Skip Margin & Options Upgrades',
          instruction: 'Choose the standard Individual Brokerage account without margin borrowing so you only ever invest cash you actually deposit.',
          warning: 'Never borrow money (margin) to buy stocks as a beginner.',
        },
        {
          title: 'Link Your Checking Account',
          instruction: 'Connect your US bank securely via instant verification or micro-deposits so you can move funds in and out free of charge.',
        },
        {
          title: 'Make Your First Small Deposit',
          instruction: 'Transfer an amount you can leave untouched for 1–2+ years — even $10 or $25 is enough to learn the process.',
          proTip: 'Robinhood gives instant buying power on modest ACH transfers while the bank transfer settles.',
        },
        {
          title: 'Search for Your Chosen ETF or Stock',
          instruction: 'Tap the magnifying glass and type the exact ticker symbol (for example, VOO or SPY for an S&P 500 ETF, or AAPL for Apple).',
        },
        {
          title: 'Choose Buy in Dollars or Shares',
          instruction: 'Tap "Trade" → "Buy", select "Buy in Dollars" for fractional shares (e.g., $20), and verify the order type in the top-right corner is Market Order or Limit Order.',
        },
        {
          title: 'Review Order Summary & Swipe Up to Submit',
          instruction: 'Double-check the ticker, dollar amount, and $0 commission during US market hours (9:30 AM – 4:00 PM ET), submit, and save your confirmation.',
          proTip: 'Set a calendar check-in for 3 months out instead of watching daily price ticks.',
        },
      ],
      faqs: [
        {
          question: 'Is my money protected if Robinhood goes out of business?',
          answer: 'Yes. Robinhood Financial LLC is a member of SIPC, which protects securities customers up to $500,000 (including $250,000 for claims for cash). Note that SIPC does not protect against normal stock price declines.',
        },
        {
          question: 'Do I need to buy a whole share of an expensive stock?',
          answer: 'No. With fractional shares, you can invest as little as $1 into companies trading at hundreds of dollars per share.',
        },
        {
          question: 'Are there inactivity or account maintenance fees?',
          answer: 'No. Standard Robinhood investing accounts carry $0 monthly maintenance fees and $0 stock/ETF trade commissions.',
        },
      ],
    },
    {
      id: 'fidelity',
      storageKey: 'broker_fidelity',
      name: 'Fidelity',
      shortCode: 'FD',
      accentColor: '#C9A84C',
      region: 'us',
      country: 'United States',
      founded: 'Founded 1946',
      beginnerTag: 'BEGINNER',
      tagline: "One of America's most trusted brokers — now free for everyone.",
      summary: 'Decades of institutional credibility combined with $0 commissions, fractional "Stocks by the Slice", and top-tier customer support.',
      officialUrl: 'https://www.fidelity.com',
      minDeposit: '$0',
      commission: '$0',
      fractional: 'Yes',
      mobile: 'iOS & Android',
      regulated: 'FINRA & SEC',
      insurance: 'SIPC up to $500,000',
      stocksStat: '7,000+',
      beginnerScore: 8.5,
      tags: ['Commission-Free', 'No Minimum', 'Fractional Shares', 'Research Tools'],
      filterCategories: ['Commission-Free', 'No Minimum', 'Mobile App', 'Fractional Shares'],
      about: [
        'Founded in 1946, Fidelity Investments manages trillions in client assets and stands among the most respected financial institutions in the world.',
        'It combines $0 online US stock and ETF commissions, $1 fractional shares ("Stocks by the Slice"), zero-expense-ratio index funds, and 24/7 phone support without relying on payment for order flow (PFOF) on stock/ETF trades.',
      ],
      bestFor: [
        'Beginners who prioritize maximum institutional trust and phone customer service',
        'Long-term wealth builders opening an Individual account or Roth IRA',
        'Investors who want deeper research reports as their knowledge grows',
      ],
      pros: [
        'Extremely trusted 75+ year track record',
        'Industry-leading research tools and educational library',
        '24/7 live US customer support',
        'No Payment for Order Flow (PFOF) on stocks & ETFs',
        'Outstanding for long-term and retirement investing',
      ],
      cons: [
        'Desktop interface has more menus than minimalist apps',
        'Mobile app feels slightly less sleek than Robinhood',
        'Available to US residents only',
      ],
      watchOutFor: [
        'Make sure you select "The Fidelity Account" (Individual Brokerage) or a Roth IRA — avoid Margin or Options add-ons.',
        'When placing fractional trades, choose "Dollars" on the trade ticket during standard market hours (9:30 AM – 4:00 PM ET).',
      ],
      stepsCount: 11,
      steps: [
        {
          title: 'Visit Fidelity.com or Install Fidelity Investments',
          instruction: 'Go to fidelity.com or download the official Fidelity Investments app on iOS or Android and tap "Open an Account".',
        },
        {
          title: 'Select "The Fidelity Account" (Individual)',
          instruction: 'Choose a standard Individual Brokerage Account for general investing (or Roth IRA if investing specifically for retirement).',
          proTip: 'Both carry $0 account minimums and $0 annual account fees.',
        },
        {
          title: 'Enter Personal & Contact Information',
          instruction: 'Fill in your legal name, email, phone number, US residential address, and Social Security Number.',
        },
        {
          title: 'Complete Employment & Regulatory Disclosures',
          instruction: 'Answer standard FINRA questions regarding whether you or a household member work at a brokerage or stock exchange.',
        },
        {
          title: 'Verify Your Core Position for Uninvested Cash',
          instruction: 'Leave the default Fidelity Government Money Market (SPAXX) selected — your uninvested cash earns competitive interest automatically.',
          proTip: 'This is a major advantage of Fidelity over many app-only brokers.',
        },
        {
          title: 'Review Terms & Open Your Account',
          instruction: 'Confirm all details and submit your application. Approval typically happens within minutes.',
        },
        {
          title: 'Link Your Bank via Electronic Funds Transfer (EFT)',
          instruction: 'Navigate to "Transfer" → "Link a Bank" and connect your checking account.',
        },
        {
          title: 'Transfer Your Initial Investment Amount',
          instruction: 'Initiate a deposit of money you can comfortably leave invested for at least 1–2+ years.',
        },
        {
          title: 'Switch App Experience to Simplified Mode',
          instruction: 'In the Fidelity mobile app settings, enable the streamlined experience for a cleaner, beginner-friendly layout.',
        },
        {
          title: 'Look Up Your Stock or ETF Ticker',
          instruction: 'Use the search bar to pull up your researched ETF or company quote page and review Current Price and Market Cap.',
        },
        {
          title: 'Tap Buy, Choose Dollars or Shares & Place Order',
          instruction: 'Select "Buy", choose "Dollars" (from $1) or "Shares", pick Market or Limit order during NYSE/NASDAQ hours, preview, and submit.',
          warning: 'Fractional dollar orders execute only during live market hours (9:30 AM – 4:00 PM ET).',
        },
      ],
      faqs: [
        {
          question: 'What does "No PFOF" mean on Fidelity?',
          answer: 'Fidelity does not accept payment from market makers for routing your stock and ETF orders, often resulting in slight price improvement when your order executes.',
        },
        {
          question: 'Is there any minimum to open a Fidelity brokerage account?',
          answer: 'No. It costs $0 to open an account, and fractional "Stocks by the Slice" start at $1.',
        },
      ],
    },
    {
      id: 'webull',
      storageKey: 'broker_webull',
      name: 'Webull',
      shortCode: 'WB',
      accentColor: '#6366F1',
      region: 'us',
      country: 'United States',
      founded: 'Founded 2017',
      beginnerTag: 'INTERMEDIATE',
      tagline: 'More tools than Robinhood — still free and beginner-accessible.',
      summary: 'Commission-free US stocks and ETFs paired with a risk-free Paper Trading simulator so beginners can practice with virtual money first.',
      officialUrl: 'https://www.webull.com',
      minDeposit: '$0',
      commission: '$0',
      fractional: 'Yes',
      mobile: 'iOS & Android',
      regulated: 'FINRA & SEC',
      insurance: 'SIPC up to $500,000',
      stocksStat: '5,000+',
      beginnerScore: 7.5,
      tags: ['Commission-Free', 'No Minimum', 'Mobile App', 'Paper Trading'],
      filterCategories: ['Commission-Free', 'No Minimum', 'Mobile App', 'Fractional Shares'],
      about: [
        'Webull bridges the gap between ultra-simple apps and advanced charting terminals while keeping US stock and ETF commissions at $0.',
        'Its standout feature for new learners is built-in Paper Trading — letting you practice placing market and limit orders using virtual dollars before risking a single cent of real savings.',
      ],
      bestFor: [
        'Hands-on learners who want to practice in a free Paper Trading simulator first',
        'Beginners who enjoy visual charts and deeper data breakdowns',
        'Commission-free investors starting with $5+ fractional shares',
      ],
      pros: [
        'Richer charting and stock comparison tools',
        'Full extended-hours market visibility',
        'Built-in Paper Trading simulator with virtual cash',
        'Fast, responsive mobile interface',
      ],
      cons: [
        'Dense data screens can feel busy for absolute day-one beginners',
        'Customer support is primarily in-app/email',
        'Available to US residents only',
      ],
      watchOutFor: [
        'Select a Cash Account rather than a Margin Account during onboarding so you never trade on borrowed funds.',
        'Do not let technical indicators tempt you into short-term day trading — use Webull for calm, long-term investing.',
      ],
      stepsCount: 10,
      steps: [
        {
          title: 'Download Webull & Create Your Login',
          instruction: 'Install Webull from the App Store or Google Play and sign up with your mobile number or email address.',
        },
        {
          title: 'Try Paper Trading First (Optional)',
          instruction: 'Open the "Paper Trading" tab immediately after signup to practice placing dummy Market and Limit orders with virtual funds.',
          proTip: 'Practicing 2–3 virtual trades removes all button-clicking anxiety before funding real cash.',
        },
        {
          title: 'Tap "Open Account" for Real Investing',
          instruction: 'Start your FINRA/SEC regulated brokerage application inside the app.',
        },
        {
          title: 'Select "Cash Account" (Not Margin)',
          instruction: 'Explicitly choose an Individual Cash Account rather than a Margin Account.',
          warning: 'Webull may highlight Margin by default — switch the toggle to Cash Account.',
        },
        {
          title: 'Upload ID & Verify Personal Information',
          instruction: 'Provide your residential address, SSN, and a clear photo of your driver’s license or state ID.',
        },
        {
          title: 'Wait for Account Approval',
          instruction: 'Applications are typically verified within a few minutes to 1 business day.',
        },
        {
          title: 'Link Your US Bank Account via ACH',
          instruction: 'Go to Transfers → Deposit and connect your checking account with $0 ACH transfer fees.',
        },
        {
          title: 'Deposit Your Starting Capital',
          instruction: 'Transfer a comfortable starter amount ($5 minimum for fractional share orders).',
        },
        {
          title: 'Search Ticker & Open the Simple Order Ticket',
          instruction: 'Search your chosen ETF or stock ticker, tap "Trade", and select Market or Limit order.',
        },
        {
          title: 'Confirm Fractional or Whole Shares & Submit',
          instruction: 'Toggle fractional shares if investing a specific dollar amount ($5+), verify all details, and place your order.',
        },
      ],
      faqs: [
        {
          question: 'What is Paper Trading on Webull?',
          answer: 'Paper Trading simulates live delayed market prices with virtual money so you can practice buying and holding without risking real cash.',
        },
        {
          question: 'What is the minimum for fractional shares on Webull?',
          answer: 'While there is $0 minimum to open an account, fractional share purchases on Webull start at $5 per trade.',
        },
      ],
    },
  ],
  uk: [
    {
      id: 'freetrade',
      storageKey: 'broker_freetrade',
      name: 'Freetrade',
      shortCode: 'FT',
      accentColor: '#F87171',
      region: 'uk',
      country: 'United Kingdom',
      founded: 'Founded 2016',
      beginnerTag: 'BEGINNER',
      tagline: "The UK's commission-free investing app — built for beginners.",
      summary: 'FCA-regulated UK investing app offering £0 commission basic trades, US fractional shares from £2, and Stocks & Shares ISA options.',
      officialUrl: 'https://freetrade.io',
      minDeposit: '£0',
      commission: '£0 (basic trades)',
      fractional: 'Yes',
      mobile: 'iOS & Android',
      regulated: 'FCA',
      insurance: 'FSCS up to £85,000',
      stocksStat: '6,000+',
      beginnerScore: 8.5,
      tags: ['Commission-Free', 'ISA Available', 'Fractional Shares', 'Mobile App'],
      filterCategories: ['Commission-Free', 'No Minimum', 'Mobile App', 'Fractional Shares'],
      about: [
        'Freetrade brought simple, transparent, commission-free investing to UK savers without confusing CFD traps.',
        'Authorised and regulated by the UK Financial Conduct Authority (FCA) with FSCS protection up to £85,000, Freetrade supports both General Investment Accounts (GIA) and tax-efficient Stocks & Shares ISAs.',
      ],
      bestFor: [
        'UK beginners who want a calm, jargon-free app with zero CFD products',
        'Savers starting with £2–£50 in UK ETFs and US stocks',
        'Long-term investors who prefer end-of-day batch execution over rapid trading',
      ],
      pros: [
        'Commission-free basic trades on UK & US stocks',
        'Clean, calm interface with zero CFD distractions',
        'Access to LSE ETFs and US stocks in one app',
        'Tax-efficient Stocks & Shares ISA available (paid tier)',
        'Fractional US shares starting from £2',
      ],
      cons: [
        'Free Basic orders execute in a daily afternoon batch unless instantaneous is selected/upgraded',
        'FX conversion fee applies when buying US dollar stocks in GBP',
        'Paid plan needed for a Stocks & Shares ISA wrapper',
      ],
      watchOutFor: [
        'When buying US stocks (like AAPL) from a GBP account, check the small FX conversion fee shown on the confirmation screen.',
        'Remember you must complete the quick in-app W-8BEN US tax form (takes 30 seconds) before buying US shares so US dividend withholding tax is halved from 30% to 15%.',
      ],
      stepsCount: 10,
      steps: [
        {
          title: 'Download Freetrade on iOS or Android',
          instruction: 'Search "Freetrade" in the UK App Store or Google Play Store and install the official app.',
        },
        {
          title: 'Enter Email & Verify Magic Link',
          instruction: 'Enter your email address, tap the verification link sent to your inbox, and set your device passcode/biometrics.',
        },
        {
          title: 'Provide UK Address & National Insurance Number',
          instruction: 'Enter your UK residential details and National Insurance (NI) number for FCA regulatory verification.',
          proTip: 'Keep your NI number handy — it speeds up instant electronic verification.',
        },
        {
          title: 'Choose GIA (Free) or Stocks & Shares ISA',
          instruction: 'Start with the £0/month General Investment Account (GIA) while learning, or choose a Stocks & Shares ISA if investing larger long-term sums tax-free.',
        },
        {
          title: 'Sign the In-App W-8BEN Form',
          instruction: 'Tap to confirm you are a non-US tax resident inside the app so you can buy US-listed shares with reduced US withholding tax.',
        },
        {
          title: 'Connect Your UK Bank via Open Banking',
          instruction: 'Link your UK current account securely via Open Banking or Apple/Google Pay.',
        },
        {
          title: 'Top Up Your Account from £2+',
          instruction: 'Transfer a small starter sum that you will not need for the next 1–2+ years.',
        },
        {
          title: 'Search for an LSE ETF or US Stock',
          instruction: 'Use the Discover tab to look up broad ETFs (like Vanguard S&P 500 VUSA in GBP) or individual companies.',
          proTip: 'Buying GBP-listed ETFs on the London Stock Exchange avoids USD currency conversion fees!',
        },
        {
          title: 'Select Basic Order (£0 Commission)',
          instruction: 'Enter your GBP amount and pick Basic Order for £0 commission execution.',
        },
        {
          title: 'Review Fee Breakdown & Confirm Purchase',
          instruction: 'Check the transparent cost summary screen and confirm your first investment.',
        },
      ],
      faqs: [
        {
          question: 'What is FSCS protection?',
          answer: 'The Financial Services Compensation Scheme protects eligible UK client assets up to £85,000 if an FCA-regulated firm fails financially (it does not cover market price drops).',
        },
        {
          question: 'How can I avoid FX fees on Freetrade?',
          answer: 'Buy GBP-denominated ETFs listed on the London Stock Exchange (such as VUSA or VWRL) rather than USD-denominated US tickers.',
        },
      ],
    },
    {
      id: 'trading212',
      storageKey: 'broker_trading212',
      name: 'Trading 212',
      shortCode: 'T2',
      accentColor: '#38BDF8',
      region: 'uk',
      country: 'United Kingdom',
      founded: 'Founded 2004',
      beginnerTag: 'BEGINNER',
      tagline: 'Truly commission-free with fractional shares and AutoInvest.',
      summary: 'Invest from just £1 with a free Stocks & Shares ISA, portfolio Pies/AutoInvest, and a risk-free Practice mode — just stay in the "Invest/ISA" tab.',
      officialUrl: 'https://www.trading212.com',
      minDeposit: '£1',
      commission: '£0',
      fractional: 'Yes (from £1)',
      mobile: 'iOS & Android',
      regulated: 'FCA',
      insurance: 'FSCS up to £85,000',
      stocksStat: '10,000+',
      beginnerScore: 8.5,
      tags: ['Commission-Free', 'ISA Available', 'Fractional Shares', 'AutoInvest', 'Practice Account'],
      filterCategories: ['Commission-Free', 'No Minimum', 'Mobile App', 'Fractional Shares'],
      criticalWarning: 'CFD products available — always use "Invest" or "Stocks ISA" account, NEVER the "CFD" account.',
      about: [
        'Trading 212 UK Ltd is authorised and regulated by the FCA and has become one of Britain’s most popular platforms thanks to its £0 subscription Stocks & Shares ISA and £1 fractional minimums.',
        'Its "Pies & AutoInvest" feature lets beginners build a diversified basket of ETFs and stocks and automate recurring deposits effortlessly.',
      ],
      bestFor: [
        'UK beginners who want a free £0/month Stocks & Shares ISA',
        'Investors starting with as little as £1 per fractional trade',
        'Anyone wanting Practice Mode + automated monthly ETF investing',
      ],
      pros: [
        'Invest from just £1 with fractional shares',
        'Pies & AutoInvest for effortless diversification',
        'Free £0-fee Stocks & Shares ISA wrapper',
        '10,000+ UK, US, and European stocks & ETFs',
        'Built-in Practice account with virtual funds',
      ],
      cons: [
        '0.15% FX fee on non-GBP trades',
        'CFD account tab exists in the same app (beginners must avoid)',
        'Interface packs many features onto one screen',
      ],
      watchOutFor: [
        'CRITICAL: Trading 212 offers three account modes: Stocks ISA, Invest, and CFD. CFDs are complex leveraged derivatives where most retail users lose money. ONLY ever use "Stocks ISA" or "Invest".',
        'Check whether a stock trades in GBP, USD, or EUR before buying so you know if the small 0.15% FX conversion fee applies.',
      ],
      stepsCount: 10,
      steps: [
        {
          title: 'Download Trading 212 & Tap Open Account',
          instruction: 'Install the official Trading 212 app on iOS/Android or visit trading212.com.',
        },
        {
          title: 'Select "Stocks ISA" or "Invest" (NEVER CFD)',
          instruction: 'On the account selection screen, choose "Stocks ISA" (tax-free UK wrapper) or "Invest" — uncheck or skip "CFD".',
          warning: 'Never open or deposit money into the CFD tab — stick 100% to real shares inside Stocks ISA or Invest.',
        },
        {
          title: 'Enter UK Residency & National Insurance Details',
          instruction: 'Complete your personal details, tax residency, and UK National Insurance number.',
        },
        {
          title: 'Verify Identity with Photo ID & Selfie',
          instruction: 'Upload your passport or UK driving licence for rapid FCA KYC verification.',
        },
        {
          title: 'Test the App in Practice Mode First',
          instruction: 'Switch to "Practice" in the menu to explore searching tickers and placing £10 virtual orders risk-free.',
          proTip: 'Switch back to Real Money mode only when you feel 100% comfortable.',
        },
        {
          title: 'Fund Your Account from £1 via Instant Bank Transfer',
          instruction: 'Connect your UK bank via Open Banking for fee-free GBP deposits starting at just £1.',
        },
        {
          title: 'Complete the W-8BEN Prompt (For US Stocks)',
          instruction: 'Confirm the one-screen W-8BEN declaration if you plan to buy US-listed companies.',
        },
        {
          title: 'Search Your Chosen ETF or Company',
          instruction: 'Tap the search icon and verify the exchange (LSE in GBP/pence vs NASDAQ/NYSE in USD).',
        },
        {
          title: 'Choose Market or Limit Order & Enter £ Amount',
          instruction: 'Tap "Buy", set the value slider or type £10+, and confirm Market Order during open market hours.',
        },
        {
          title: 'Review Order & Optionally Set Up a Long-Term Pie',
          instruction: 'Review the zero-commission summary, submit your trade, and explore "Pies" if you want automatic monthly diversification.',
        },
      ],
      faqs: [
        {
          question: 'Why does StoxIQ warn against the CFD tab?',
          answer: 'CFDs (Contracts for Difference) use leverage and do not give you real share ownership — regulatory disclosures show roughly 75%+ of retail CFD accounts lose money. Always use Stocks ISA or Invest.',
        },
        {
          question: 'Is Trading 212’s Stocks & Shares ISA really free?',
          answer: 'Yes — there is £0 monthly or annual ISA platform fee, and £0 commission on stock/ETF trades (only a small 0.15% FX fee on non-GBP currencies).',
        },
      ],
    },
    {
      id: 'etoro-uk',
      storageKey: 'broker_etoro_uk',
      name: 'eToro UK',
      shortCode: 'eT',
      accentColor: '#4ADE80',
      region: 'uk',
      country: 'United Kingdom',
      founded: 'Founded 2007',
      beginnerTag: 'BEGINNER',
      tagline: 'Invest and follow other investors — perfect for social beginners.',
      summary: 'FCA-regulated social investing platform with $100k virtual Demo account, CopyTrader insights, and $0 commission on real unleveraged stocks.',
      officialUrl: 'https://www.etoro.com/en-gb/',
      minDeposit: '$50 (USD)',
      commission: '$0 on real stocks',
      fractional: 'Yes (from $10)',
      mobile: 'iOS & Android',
      regulated: 'FCA',
      insurance: 'FSCS up to £85,000',
      stocksStat: '3,000+',
      beginnerScore: 8,
      tags: ['CopyTrader', 'Commission-Free', 'Social Investing', 'Demo Account'],
      filterCategories: ['Commission-Free', 'Mobile App', 'Fractional Shares'],
      criticalWarning: 'Two product types exist — Real Stocks (use this) and CFDs (avoid). Always verify Leverage is X1 ("BUYING THE UNDERLYING ASSET") when buying.',
      about: [
        'eToro (UK) Ltd is regulated by the FCA and famous for social investing, a generous $100,000 virtual demo portfolio, and $0 commission on underlying real stocks.',
        'Because eToro accounts operate in US Dollars (USD) and also offer leveraged trades, beginners must verify X1 leverage on every buy screen to ensure they are buying real underlying shares.',
      ],
      bestFor: [
        'Beginners who want a $100,000 virtual Demo Account to practice for weeks before depositing',
        'Visual learners who enjoy reading community discussions and CopyTrader portfolios',
        'Investors focusing primarily on major US stocks from $10 per fractional trade',
      ],
      pros: [
        'Unique CopyTrader & transparent investor portfolios',
        'Social community feed on every stock page',
        '$100,000 virtual Demo Account included instantly',
        '3,000+ US and global stocks at $0 commission',
        'Approachable, modern interface',
      ],
      cons: [
        '$5 flat withdrawal fee',
        'Accounts are USD-denominated (GBP conversion fees apply)',
        'CFDs sit alongside real stocks if leverage is changed from X1',
        '$10/month inactivity fee after 12 months without logging in',
      ],
      watchOutFor: [
        'CRITICAL: At the bottom of every eToro buy ticket, confirm the text literally says "YOU ARE BUYING THE UNDERLYING ASSET · COMMISSION $0" with Leverage set to X1. If it says "CFD TRADE", cancel immediately!',
        'Log in at least once every few months to avoid the 12-month inactivity fee, and plan withdrawals sensibly due to the $5 fee.',
      ],
      stepsCount: 10,
      steps: [
        {
          title: 'Create Your eToro UK Account',
          instruction: 'Visit etoro.com/en-gb or install the official eToro app and register with your email and password.',
        },
        {
          title: 'Explore the $100,000 Virtual Portfolio First',
          instruction: 'Toggle "Switch to Virtual" in the left sidebar/menu to test placing X1 unleveraged stock orders safely.',
        },
        {
          title: 'Complete FCA Profile & Experience Questionnaire',
          instruction: 'Answer eToro’s suitability questions honestly — this helps restrict inappropriate leveraged products.',
        },
        {
          title: 'Upload Proof of Identity & UK Address',
          instruction: 'Submit your passport/driving licence and a recent utility bill or bank statement.',
        },
        {
          title: 'Switch Back to Real Portfolio & Deposit ($50 Min)',
          instruction: 'Deposit at least $50 equivalent in GBP via bank transfer or debit card (note the FX conversion rate to USD).',
          proTip: 'Using an eToro Money GBP account can reduce currency conversion costs.',
        },
        {
          title: 'Search for Your Researched Stock or ETF',
          instruction: 'Use the top search bar to navigate to the asset’s overview page — ignore hyped social posts and stick to your plan.',
        },
        {
          title: 'Tap "Invest" to Open the Order Ticket',
          instruction: 'Click "Invest" and enter your dollar amount (from $10 minimum per fractional stock trade).',
        },
        {
          title: 'VERIFY Leverage = X1 & "Underlying Asset"',
          instruction: 'Ensure Leverage is set to X1 (never X2 or X5) and verify the footer reads "YOU ARE BUYING THE UNDERLYING ASSET".',
          warning: 'Any leverage above X1 turns the order into a risky CFD with overnight fees — keep it strictly at X1!',
        },
        {
          title: 'Check Stop Loss / Take Profit Are Unset for Long-Term Holding',
          instruction: 'Make sure automatic Stop Loss isn’t accidentally set tight if your goal is calm, unleveraged long-term ownership.',
        },
        {
          title: 'Click "Open Trade" / "Set Order" & Confirm',
          instruction: 'Submit your X1 real-stock purchase during market hours and verify it appears in your Portfolio.',
        },
      ],
      faqs: [
        {
          question: 'How do I make sure I am buying a real stock and not a CFD on eToro?',
          answer: 'Always buy ("Buy", never "Short"), keep Leverage at X1, and check the bottom of the order window for the exact words: "You are buying the underlying asset". Note that some US ETFs are offered as CFDs in the UK due to PRIIPs rules — stick to UCITS ETFs or individual stocks for real ownership.',
        },
        {
          question: 'Why does eToro show balances in US Dollars ($)?',
          answer: 'eToro operates its core trading ledger in USD globally, converting your GBP deposit on entry and exit.',
        },
      ],
    },
  ],
  africa: [
    {
      id: 'bamboo',
      storageKey: 'broker_bamboo',
      name: 'Bamboo',
      shortCode: 'BB',
      accentColor: '#4ADE80',
      region: 'africa',
      country: 'Nigeria & Ghana',
      founded: 'Founded 2019',
      beginnerTag: 'BEGINNER',
      tagline: 'Invest in US stocks directly from Africa — starting from $20.',
      summary: 'SEC Nigeria regulated digital broker giving African beginners direct fractional access to 3,500+ US stocks and ETFs using local currency or USD.',
      officialUrl: 'https://investbamboo.com',
      minDeposit: '$20',
      commission: '$0 (spreads/small fee apply)',
      fractional: 'Yes',
      mobile: 'iOS & Android',
      regulated: 'SEC Nigeria',
      insurance: 'SIPC via US partner up to $500k',
      stocksStat: '3,500+',
      beginnerScore: 8.5,
      tags: ['US Stocks', 'Fractional Shares', 'Naira Deposits', 'Mobile App', 'SEC Nigeria Regulated'],
      filterCategories: ['Commission-Free', 'Mobile App', 'Fractional Shares'],
      about: [
        'Bamboo opened Wall Street to everyday African investors, enabling seamless deposits in Naira (NGN), Cedis, or USD to buy real fractional shares of Apple, Microsoft, Coca-Cola, and S&P 500 ETFs.',
        'Regulated by the Securities and Exchange Commission (SEC) Nigeria and partnered with FINRA/SIPC-regulated US clearing brokers, Bamboo pairs a clean beginner app with built-in learning guides.',
      ],
      bestFor: [
        'Investors in Nigeria and Ghana wanting direct USD exposure to 3,500+ US stocks and ETFs',
        'Beginners starting with $20 who want fractional shares from $1+',
        'Long-term savers protecting purchasing power in US-dollar assets',
      ],
      pros: [
        '3,500+ real US stocks and ETFs',
        'Fractional share investing from $1 once funded',
        'Local Naira and USD funding options supported',
        'Sleek, beginner-friendly mobile app',
        'SEC Nigeria regulated with US SIPC-insured brokerage partner',
      ],
      cons: [
        '$20 minimum initial deposit',
        'FX conversion spread between NGN and USD',
        'Withdrawals take 1–3 business days to settle',
        'Focuses primarily on US stocks (use Chaka for full NGX trading)',
      ],
      watchOutFor: [
        'Pay close attention to the NGN/USD exchange rate shown before funding and withdrawing — frequent depositing and withdrawing eats into returns through FX spreads.',
        'Remember US market hours in West Africa Time (WAT): 2:30 PM – 9:00 PM WAT (3:30 PM – 10:00 PM during US winter time).',
      ],
      stepsCount: 9,
      steps: [
        {
          title: 'Download Bamboo from App Store or Google Play',
          instruction: 'Search "Bamboo: Invest. Trade. Earn." and install the official app by Bamboo Systems Technology.',
        },
        {
          title: 'Sign Up with Phone Number & Email',
          instruction: 'Verify your mobile number via SMS OTP, enter your email address, and create a secure PIN and password.',
        },
        {
          title: 'Complete BVN / National ID & KYC Verification',
          instruction: 'Provide your BVN (Nigeria) or Ghana Card/Passport and take a quick selfie for SEC KYC compliance.',
          proTip: 'BVN verification only confirms your identity — Bamboo cannot access or debit your bank accounts.',
        },
        {
          title: 'Fund Your Wallet ($20 Minimum)',
          instruction: 'Tap "Deposit", choose Naira bank transfer or USD card/domiciliary transfer, and review the live NGN→USD exchange rate.',
          warning: 'Only fund money you plan to leave invested long-term so FX conversion spreads don’t hurt short-term withdrawals.',
        },
        {
          title: 'Wait for USD Buying Power Confirmation',
          instruction: 'Once your transfer clears (often within minutes), your USD wallet balance updates inside Bamboo.',
        },
        {
          title: 'Browse "ETFs" or Search a US Ticker',
          instruction: 'Tap Search and look up a broad ETF like VOO or SPY (S&P 500) or a company you genuinely understand.',
        },
        {
          title: 'Tap "Buy" & Choose "Buy in Dollars"',
          instruction: 'Enter how many US dollars you wish to invest (e.g., $20) or switch to Limit Order to set a target price.',
        },
        {
          title: 'Review Fee & Submit During US Market Hours',
          instruction: 'Check the transparent fee preview and submit during live NYSE/NASDAQ hours (2:30 PM – 9:00 PM WAT).',
        },
        {
          title: 'Track Your Portfolio Calmly Over Months, Not Hours',
          instruction: 'View your fractional shares and any USD dividends directly on your Bamboo home dashboard.',
          proTip: 'Reinvest USD dividends over time to compound your dollar portfolio.',
        },
      ],
      faqs: [
        {
          question: 'Is Bamboo regulated in Nigeria?',
          answer: 'Yes. Bamboo is licensed and regulated by the Securities and Exchange Commission (SEC) of Nigeria, and US securities are held via a FINRA/SIPC-regulated US partner.',
        },
        {
          question: 'What happens to dividends paid by US companies on Bamboo?',
          answer: 'Dividends (net of standard US non-resident withholding tax) are credited directly to your Bamboo USD wallet.',
        },
      ],
    },
    {
      id: 'easyequities',
      storageKey: 'broker_easyequities',
      name: 'EasyEquities',
      shortCode: 'EE',
      accentColor: '#F59E0B',
      region: 'africa',
      country: 'South Africa',
      founded: 'Founded 2014',
      beginnerTag: 'BEGINNER',
      tagline: "South Africa's most popular investment app — invest from just R10.",
      summary: 'FSCA-regulated South African favourite offering JSE stocks, US shares, and Tax-Free Savings Accounts (TFSA) with fractional investing from R10.',
      officialUrl: 'https://www.easyequities.co.za',
      minDeposit: 'R10',
      commission: 'Low (0.25% brokerage)',
      fractional: 'Yes (from R10)',
      mobile: 'iOS & Android',
      regulated: 'FSCA',
      insurance: 'Segregated Nominee Custody',
      stocksStat: '2,000+',
      beginnerScore: 9,
      tags: ['JSE Stocks', 'US Stocks', 'TFSA Available', 'Fractional Shares', 'FSCA Regulated'],
      filterCategories: ['No Minimum', 'Mobile App', 'Fractional Shares'],
      specialNote: 'IMPORTANT NOTE: JSE stock prices are listed in CENTS (ZAc), not Rands — e.g., 10,500c equals R105.00 (similar to UK pence notation).',
      about: [
        'EasyEquities democratised investing across South Africa, growing to over 1.5 million investors by eliminating high monthly account minimums and introducing fractional share rights from R10.',
        'Regulated by the Financial Sector Conduct Authority (FSCA), it gives you seamless Zar (ZAR), Tax-Free Savings Account (TFSA), and USD wallets under one login — plus a R100,000 Demo account.',
      ],
      bestFor: [
        'South African beginners starting with R10 to R500+',
        'Investors wanting both local JSE ETFs/shares and US stocks in one app',
        'Long-term savers maximising South Africa’s Tax-Free Savings Account (TFSA) allowance',
      ],
      pros: [
        'Start investing from just R10 with no minimum deposit',
        'Trade both JSE (South Africa) and US stocks',
        'Tax-Free Savings Account (TFSA) included for eligible ETFs',
        '1.5M+ users and rich EasyAcademy beginner lessons',
        'Free ZAR & USD Demo accounts included',
      ],
      cons: [
        'Small 0.25% brokerage fee + statutory taxes apply per trade',
        'Colourful multi-wallet interface takes a day to learn',
        'Primarily focused on South African residents (with select regional support)',
      ],
      watchOutFor: [
        'JSE stocks quote in CENTS (ZAc), not Rands! A share displayed at "25,000c" costs R250.00 — don’t panic thinking it costs R25,000!',
        'Keep your Thrive level active (via simple free educational/deposit tasks) to avoid any small monthly Thrive inactivity fee.',
      ],
      stepsCount: 10,
      steps: [
        {
          title: 'Download EasyEquities or Register Online',
          instruction: 'Install the official EasyEquities app on iOS/Android or visit easyequities.co.za and tap Register.',
        },
        {
          title: 'Complete FICA Identity Verification',
          instruction: 'Enter your South African ID number (or passport details) and residential details for instant FICA verification.',
        },
        {
          title: 'Test the Free ZAR & USD Demo Wallets',
          instruction: 'Swipe your top account carousel to the purple/demo EasyEquities ZAR Demo wallet and try a test trade first.',
          proTip: 'Every account comes pre-loaded with virtual demo funds automatically.',
        },
        {
          title: 'Choose ZAR, TFSA, or USD Account Wallet',
          instruction: 'Swipe to EasyEquities ZAR (general JSE shares/ETFs), TFSA (tax-free ETFs), or EasyEquities USD (US stocks).',
          warning: 'In a TFSA, you can only buy approved ETFs/bundles (not single stocks), and annual SARS deposit caps apply.',
        },
        {
          title: 'Fund Your Account via EFT from R10+',
          instruction: 'Tap Menu → Deposits and make a free bank EFT using your unique EasyEquities reference code.',
          proTip: 'Manual bank EFT is cheapest; instant card/SID deposits carry higher convenience fees.',
        },
        {
          title: 'Convert ZAR to USD (Optional for US Stocks)',
          instruction: 'If buying US companies like Apple or Microsoft, use EasyFX inside the app to move funds from ZAR to your USD wallet.',
        },
        {
          title: 'Search an ETF (e.g., Satrix S&P 500) or Share',
          instruction: 'Open "Invest Now" and filter by ETFs or Shares.',
        },
        {
          title: 'Check Price Notation (Cents vs Rands)',
          instruction: 'Verify the quote currency — remember JSE quotes are in South African cents (divide by 100 for Rands).',
        },
        {
          title: 'Enter Your Rand/Dollar Amount (From R10)',
          instruction: 'Type how much you want to invest (fractional ownership adjusts automatically) and tap "Invest Now".',
        },
        {
          title: 'Review Transparent Cost Breakdown & Confirm',
          instruction: 'Expand "Transaction Cost Breakdown" to see the exact Rands/cents brokerage fee before confirming.',
        },
      ],
      faqs: [
        {
          question: 'Why does a JSE stock say 14,200c?',
          answer: 'Like the London Stock Exchange (pence), the Johannesburg Stock Exchange quotes share prices in cents (ZAc). Divide by 100: 14,200c = R142.00 per share.',
        },
        {
          question: 'Can I buy the S&P 500 in Rands without converting to USD?',
          answer: 'Yes! JSE-listed feeder ETFs such as Satrix S&P 500 (STX500) or Sygnia Itrix S&P 500 let you invest in the S&P 500 directly in Rands — even inside your TFSA.',
        },
      ],
    },
    {
      id: 'chaka',
      storageKey: 'broker_chaka',
      name: 'Chaka',
      shortCode: 'CK',
      accentColor: '#6366F1',
      region: 'africa',
      country: 'Nigeria',
      founded: 'Founded 2019',
      beginnerTag: 'BEGINNER',
      tagline: 'Trade Nigerian and US stocks in one place — built for Africans.',
      summary: 'First FinTech awarded SEC Nigeria’s Digital Sub-Broker license, offering both local NGX blue-chips (in Naira) and US stocks (in USD) inside one app.',
      officialUrl: 'https://chaka.com',
      minDeposit: '$10 (USD) | ₦1,000 (NGX)',
      commission: 'Low fees apply',
      fractional: 'Yes',
      mobile: 'iOS & Android',
      regulated: 'SEC Nigeria',
      insurance: 'CSCS (NGX) & SIPC (US partner)',
      stocksStat: '4,000+',
      beginnerScore: 8,
      tags: ['NGX Stocks', 'US Stocks', 'Naira + USD Accounts', 'SEC Nigeria Regulated', 'CSCS Number'],
      filterCategories: ['Mobile App', 'Fractional Shares'],
      specialNote: 'TRADING HOURS: NGX trading hours: 10:00 AM – 2:30 PM WAT (Mon–Fri) · US trading hours: 2:30 PM – 9:00 PM WAT (daylight saving).',
      about: [
        'Chaka made history as the first platform to receive the SEC Nigeria Digital Sub-Broker license, giving Nigerian investors regulated access to both the Nigerian Exchange (NGX) and Wall Street under one roof.',
        'When you invest in Nigerian stocks (like GTCO, Zenith Bank, MTN Nigeria, or Dangote Cement), Chaka provisions a real CSCS (Central Securities Clearing System) number in your name, alongside fractional US shares in your Global wallet.',
      ],
      bestFor: [
        'Nigerian beginners who want both local NGX dividend stocks and US ETFs/stocks in one app',
        'Investors starting small with ₦1,000 locally or $10 globally',
        'Anyone wanting official CSCS custody on Nigerian equities',
      ],
      pros: [
        'Local Nigerian (NGX) AND Global (US) stocks in one app',
        'Separate Naira & USD wallets with low entry minimums',
        'Pioneering SEC Nigeria Digital Sub-Broker regulation',
        'Generates an official CSCS clearing number for your NGX shares',
      ],
      cons: [
        'Local statutory NGX/SEC/CSCS fees add small percentages on Nigerian trades',
        'Smaller user community than Bamboo',
        'App UI has slightly fewer educational walkthroughs than larger global apps',
      ],
      watchOutFor: [
        'Note the two separate market schedules! Nigerian Exchange (NGX) trades 10:00 AM – 2:30 PM WAT, while US markets open right as NGX closes (2:30 PM – 9:00 PM WAT).',
        'Local NGX stocks trade in whole shares (minimum 1 share, though many Nigerian shares cost ₦20–₦500 per share), whereas Global US stocks support fractional dollar slices.',
      ],
      stepsCount: 10,
      steps: [
        {
          title: 'Install the Official Chaka App',
          instruction: 'Download Chaka from Google Play or the Apple App Store and tap "Get Started".',
        },
        {
          title: 'Register Email, Phone & Secure Passcode',
          instruction: 'Verify your email address and phone number and enable biometric login.',
        },
        {
          title: 'Verify Identity (BVN, NIN & Photo ID)',
          instruction: 'Complete SEC Nigeria KYC verification with your BVN, NIN, and residential proof so both Local and Global wallets activate.',
        },
        {
          title: 'Receive Your Official CSCS Number (For NGX)',
          instruction: 'Chaka automatically creates or links your CSCS clearing number for Nigerian Exchange ownership.',
          proTip: 'A CSCS number proves your Nigerian shares are registered in Nigeria’s central clearing depository.',
        },
        {
          title: 'Choose Local Wallet (₦) or Global Wallet ($)',
          instruction: 'Select Local Wallet to buy Nigerian companies from ₦1,000, or Global Wallet to buy US stocks/ETFs from $10.',
        },
        {
          title: 'Fund Your Selected Wallet',
          instruction: 'Deposit Naira via bank transfer, or fund your Global USD wallet checking the displayed exchange rate.',
        },
        {
          title: 'Check Live Market Hours in WAT',
          instruction: 'Confirm the market is open: 10:00 AM – 2:30 PM WAT for NGX stocks, or 2:30 PM – 9:00 PM WAT for US stocks.',
          warning: 'Orders placed outside trading hours queue until the next market open, when prices may gap slightly.',
        },
        {
          title: 'Search Your Researched Stock or ETF',
          instruction: 'Look up local leaders on NGX or global ETFs/companies on NYSE & NASDAQ.',
        },
        {
          title: 'Select Market or Limit Order & Enter Amount',
          instruction: 'Choose whole units for NGX shares or fractional USD amounts (from $10) for Global stocks.',
        },
        {
          title: 'Review Statutory Fees & Confirm Trade',
          instruction: 'Inspect the trade summary including any SEC/CSCS statutory charges, confirm with your PIN, and hold for the long term.',
        },
      ],
      faqs: [
        {
          question: 'What is a CSCS number and why does it matter?',
          answer: 'CSCS (Central Securities Clearing System) is Nigeria’s official depository for Nigerian Exchange shares. Having a CSCS number means your local shares are recorded directly under your identity.',
        },
        {
          question: 'Can I buy both Nigerian bank dividends and an S&P 500 ETF?',
          answer: 'Yes — use your Local Naira wallet during 10:00 AM – 2:30 PM WAT for NGX stocks, and your Global USD wallet during 2:30 PM – 9:00 PM WAT for US ETFs.',
        },
      ],
    },
  ],
}

export const ALL_BROKERS_FLAT: BrokerData[] = [
  ...BROKERS.us,
  ...BROKERS.uk,
  ...BROKERS.africa,
]
