export interface LessonBlock {
  type: 'section' | 'key-concept' | 'did-you-know' | 'real-example' | 'warning' | 'summary'
  title?: string
  body?: string
  bullets?: string[]
}

export interface LessonData {
  id: string
  lessonSlug: string
  moduleId: string
  number: string
  title: string
  subtitle: string
  duration: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  type: string
  content: LessonBlock[]
}

export interface ModuleData {
  id: string
  number: string
  title: string
  icon: 'BookOpen' | 'Landmark' | 'TrendingUp' | 'ShoppingBag'
  description: string
  lessons: string[]
  outcomes: string[]
  estimatedTime: string
  quizId: string
}

export const KEY_TERMS: Record<string, string> = {
  'stock': 'A unit of partial ownership in a company that trades on an exchange.',
  'share': 'One single unit of stock ownership in a business.',
  'supply and demand': 'Prices rise when more buyers want shares than sellers offer, and fall when sellers outnumber buyers.',
  'capital gain': 'The profit earned when you sell an investment for more than you paid for it.',
  'dividends': 'Regular cash payments distributed by a company to its shareholders out of profits.',
  'common stock': 'The standard type of share most investors buy — granting ownership, voting rights, and potential dividends.',
  'ETF': 'Exchange-Traded Fund — a single investment basket holding dozens or hundreds of stocks at once.',
  'diversification': 'Spreading your money across many investments so no single company can sink your portfolio.',
  'stock exchanges': 'Regulated electronic marketplaces (like NYSE, NASDAQ, LSE, or JSE) where shares are bought and sold.',
  'indices': 'Scoreboards (like the S&P 500 or FTSE 100) that measure the performance of a group of stocks.',
  'Bull Market': 'A sustained period when stock prices are broadly rising and investor confidence is strong.',
  'Bear Market': 'A market downturn where stock prices broadly fall 20% or more from recent highs.',
  'ticker': 'A short 1–5 letter code used to identify a public company on an exchange (e.g., AAPL for Apple).',
  'Market Cap': 'Total market value of a company, calculated as Current Share Price × Total Shares.',
  'volume': 'The total number of shares bought and sold during a trading period.',
  'P/E': 'Price-to-Earnings ratio — how much investors pay per $1 of annual company profit.',
  'Support': 'A price "floor" where buying demand historically steps in to stop a stock falling further.',
  'Resistance': 'A price "ceiling" where selling pressure historically slows a stock from rising higher.',
  'portfolio': 'The complete collection of stocks, ETFs, and investments that you own.',
  'broker': 'A regulated financial platform or app that executes stock purchases and sales on your behalf.',
  'Fractional Shares': 'Buying a dollar/pound/naira slice of a single expensive share rather than a whole share.',
  'market order': 'An instruction to buy or sell immediately at the best available current market price.',
  'limit order': 'An instruction to buy or sell only if the stock reaches your chosen target price or better.',
  'slippage': 'A small difference between the expected price of a market order and the exact price at execution.',
}

export const MODULES: ModuleData[] = [
  {
    id: 'module1',
    number: '01',
    title: 'What Is a Stock?',
    icon: 'BookOpen',
    description: 'Understand company ownership, how investors actually earn returns, and the core stock types worth knowing.',
    lessons: ['lesson1', 'lesson2', 'lesson3'],
    outcomes: [
      'Understand what owning a stock really means in plain English',
      'Know the two ways investors make money: capital gains and dividends',
      'Distinguish common stocks, growth stocks, dividend stocks, and ETFs',
      'See why broad market ETFs are a beginner’s safest starting point',
    ],
    estimatedTime: '~14 min',
    quizId: 'quiz_module1',
  },
  {
    id: 'module2',
    number: '02',
    title: 'How the Stock Market Works',
    icon: 'Landmark',
    description: 'Explore global exchanges, market hours, major indices, bull vs bear cycles, and investing vs trading.',
    lessons: ['lesson1', 'lesson2', 'lesson3'],
    outcomes: [
      'Know how exchanges like NYSE, NASDAQ, LSE, and JSE execute trades',
      'Read market indices like the S&P 500, NASDAQ 100, and FTSE 100',
      'Understand why prices rise and fall through supply, demand, and emotion',
      'Know why beginners should start as long-term investors rather than day traders',
    ],
    estimatedTime: '~16 min',
    quizId: 'quiz_module2',
  },
  {
    id: 'module3',
    number: '03',
    title: 'Reading Basic Stock Information',
    icon: 'TrendingUp',
    description: 'Decode stock pages, ticker symbols, market cap, price charts, portfolios, and diversification.',
    lessons: ['lesson1', 'lesson2', 'lesson3'],
    outcomes: [
      'Confidently read ticker symbols, price changes, 52-week ranges, and market cap',
      'Separate long-term chart trends from short-term daily noise',
      'Understand volume bars, support floors, and resistance ceilings',
      'Structure a simple, diversified first portfolio without overcomplicating it',
    ],
    estimatedTime: '~16 min',
    quizId: 'quiz_module3',
  },
  {
    id: 'module4',
    number: '04',
    title: 'Buying Your First Stock',
    icon: 'ShoppingBag',
    description: 'Select a regulated broker, choose between market and limit orders, and run the 6-point pre-buy checklist.',
    lessons: ['lesson1', 'lesson2', 'lesson3'],
    outcomes: [
      'Evaluate brokers using regulation, zero-commission, and fractional share criteria',
      'Know exactly when to use a market order vs a limit order',
      'Run the 6-question Pre-Buy Checklist before every single trade',
      'Make your first investment calmly with money you can leave untouched',
    ],
    estimatedTime: '~14 min',
    quizId: 'quiz_module4',
  },
]

export const LESSONS: Record<string, Record<string, LessonData>> = {
  module1: {
    lesson1: {
      id: 'module1_lesson1',
      lessonSlug: 'lesson1',
      moduleId: 'module1',
      number: '1.1',
      title: 'What Is a Stock, Really?',
      subtitle: 'Strip away the Wall Street jargon — owning a stock simply means owning a real slice of a real business.',
      duration: '~4 min read',
      level: 'Beginner',
      type: 'Reading',
      content: [
        {
          type: 'section',
          title: "Let's Start with a Simple Story",
          body: `Imagine your friend opens a pizza shop. The shop is doing well, but she wants to open three more locations. The problem? She doesn't have enough money to do it alone. So she comes to you and says: "Give me $1,000 and I'll give you 10% ownership of my business." You agree. Now you own 10% of her pizza company. That — in its simplest form — is a stock.`,
        },
        {
          type: 'key-concept',
          title: 'KEY CONCEPT',
          body: `A stock is a small piece of ownership in a company. When you buy a stock, you become a part-owner of that business — even if it's just a tiny part.`,
        },
        {
          type: 'section',
          title: 'How This Works in the Real World',
          body: `Real companies do exactly the same thing — just at a much bigger scale. Apple, Amazon, Tesla — they all needed money to grow. Instead of borrowing from one person, they sold ownership to thousands (sometimes millions) of people. Each of those pieces of ownership is called a share. One share = one unit of ownership in the company. When you buy one share of Apple, you become one of millions of Apple owners. You own a tiny slice of everything Apple has — its products, its buildings, its future profits.`,
        },
        {
          type: 'did-you-know',
          title: 'DID YOU KNOW?',
          body: `Apple has over 15 billion shares in existence. That means ownership is split across 15 billion tiny pieces — and you can own as many as you want.`,
        },
        {
          type: 'section',
          title: 'Why Does the Price Change?',
          body: `When lots of people want to buy a company's stock, the price goes up. When people want to sell, the price goes down. It's basically supply and demand — the same reason concert tickets get expensive when everyone wants to go. If Apple releases a groundbreaking new iPhone, people get excited. They want to own a piece of that success. Demand for Apple stock rises — and so does the price.`,
        },
        {
          type: 'summary',
          title: 'LESSON SUMMARY',
          bullets: [
            'A stock is a unit of ownership in a company',
            'Companies sell stocks to raise money for growth',
            'The price of a stock moves based on supply and demand',
            'Buying a stock makes you a part-owner of that business',
          ],
        },
      ],
    },
    lesson2: {
      id: 'module1_lesson2',
      lessonSlug: 'lesson2',
      moduleId: 'module1',
      number: '1.2',
      title: 'How Do You Actually Make Money?',
      subtitle: 'Understand capital gains, dividends, and why temporary price dips only become real losses if you sell.',
      duration: '~5 min read',
      level: 'Beginner',
      type: 'Reading',
      content: [
        {
          type: 'section',
          title: 'There Are Two Ways',
          body: `When people talk about making money from stocks, there are really only two ways it happens. Way 1: The price goes up (Capital Gains). Way 2: The company pays you (Dividends). Let's break both down.`,
        },
        {
          type: 'section',
          title: 'Way 1 — The Price Goes Up',
          body: `You buy 1 share of a company for $50. Six months later, it's worth $80. You sell it. You just made $30. That profit is called a capital gain. This is the most common way beginners think about making money from stocks — and it's real. But there's a catch: the price can also go DOWN. If you bought at $50 and it drops to $30, you've lost $20 on paper. If you sell at $30, that loss becomes real. This is why timing and patience matter in investing.`,
        },
        {
          type: 'real-example',
          title: 'REAL EXAMPLE',
          body: `If you bought one share of Apple in January 2020 for around $75, by the end of 2021 that same share was worth over $175. That's a $100 gain on a single share — without doing anything except holding it.`,
        },
        {
          type: 'section',
          title: 'Way 2 — Dividends',
          body: `Some companies share their profits directly with shareholders. These payments are called dividends. Think of it like being a landlord. You own a property (the stock), and every few months the tenant (the company) pays you rent (dividends). Not every company pays dividends. Younger, faster-growing companies usually reinvest profits back into the business instead. Older, more stable companies — like Coca-Cola or Johnson & Johnson — tend to pay regular dividends.`,
        },
        {
          type: 'key-concept',
          title: 'KEY CONCEPT',
          body: `Capital gains = profit from price rising. Dividends = regular cash payments from company profits. Both count as making money from stocks. You don't need both — many beginners start with capital gains only.`,
        },
        {
          type: 'section',
          title: 'What About Losing Money?',
          body: `Yes — it's possible to lose money in stocks. If the price of a stock falls and you sell, you lose that difference. This is a real risk and it's important to understand it upfront. The good news: if you don't sell, you haven't lost anything yet. Prices can recover. Many experienced investors say the biggest mistake beginners make is panic-selling when prices dip. We'll cover this more in the Watch Out For section.`,
        },
        {
          type: 'summary',
          title: 'LESSON SUMMARY',
          bullets: [
            "You make money when a stock's price rises (capital gains)",
            'Some companies pay you dividends — regular cash from profits',
            'You can also lose money if prices fall and you sell',
            "Not selling during a dip means the loss isn't permanent yet",
          ],
        },
      ],
    },
    lesson3: {
      id: 'module1_lesson3',
      lessonSlug: 'lesson3',
      moduleId: 'module1',
      number: '1.3',
      title: 'The Types of Stocks Worth Knowing',
      subtitle: 'Focus on the four categories that actually matter on day one: common, growth, dividend stocks, and ETFs.',
      duration: '~5 min read',
      level: 'Beginner',
      type: 'Reading',
      content: [
        {
          type: 'section',
          title: "You Don't Need to Know Every Type",
          body: `There are many categories of stocks out there. For now, we're only covering what actually matters when you're just starting out. The rest comes later.`,
        },
        {
          type: 'section',
          title: 'Common Stocks (The Default)',
          body: `When someone says "I bought a stock," they almost always mean a common stock. Common stocks give you: ownership in the company, the right to vote on certain company decisions, and a share of profits (if dividends are paid). This is the type of stock you'll buy as a beginner. Almost everything on Robinhood, Fidelity, eToro, or Bamboo is a common stock.`,
        },
        {
          type: 'section',
          title: 'Growth Stocks',
          body: `Growth stocks are companies that are expanding fast. Think Tesla in 2019. Think Nvidia in 2022. These companies usually don't pay dividends — they reinvest every penny back into growing faster. The potential reward: the price rises dramatically as the company grows. The risk: if growth slows or fails, the price can fall just as fast. Growth stocks are exciting but volatile.`,
        },
        {
          type: 'section',
          title: 'Dividend Stocks',
          body: `Dividend stocks are companies that pay you regularly. Think of them as the "steady" option. Companies like Coca-Cola, McDonald's, and Johnson & Johnson have paid dividends consistently for decades. The potential reward: regular income + price growth. The risk: usually grows slower than growth stocks. Dividend stocks are popular with people who want passive income.`,
        },
        {
          type: 'section',
          title: "ETFs — The Beginner's Best Friend",
          body: `ETF stands for Exchange-Traded Fund. Instead of buying one company's stock, an ETF lets you buy a small piece of MANY companies at once — in a single purchase. For example, the S&P 500 ETF (SPY) gives you exposure to the top 500 US companies in one click. If one company in the ETF does badly, the others help balance it out. This is called diversification. ETFs are widely recommended for beginners because they reduce the risk of betting everything on a single company.`,
        },
        {
          type: 'key-concept',
          title: 'KEY CONCEPT',
          body: `ETF = a basket of many stocks in one purchase. Less risk than a single stock. Often the smartest starting point for new investors.`,
        },
        {
          type: 'summary',
          title: 'LESSON SUMMARY',
          bullets: [
            'Common stocks are what most beginners buy',
            'Growth stocks have high potential but high risk',
            'Dividend stocks offer steady income over time',
            'ETFs let you invest in many companies at once',
            'For most beginners, ETFs are the safest entry point',
          ],
        },
      ],
    },
  },
  module2: {
    lesson1: {
      id: 'module2_lesson1',
      lessonSlug: 'lesson1',
      moduleId: 'module2',
      number: '2.1',
      title: 'What Is the Stock Market?',
      subtitle: 'See how electronic stock exchanges, market hours, and major indices connect millions of buyers and sellers.',
      duration: '~5 min read',
      level: 'Beginner',
      type: 'Reading',
      content: [
        {
          type: 'section',
          title: 'Think of It Like a Marketplace',
          body: `A market is just a place where buyers and sellers meet to exchange things. A fruit market sells fruit. A car market sells cars. The stock market is a place where buyers and sellers meet to exchange stocks — ownership pieces of companies. The difference? You don't have to physically go anywhere. It all happens electronically, in seconds, from your phone.`,
        },
        {
          type: 'section',
          title: 'Where Exactly Does This Happen?',
          body: `Trading happens on stock exchanges. An exchange is an organised platform where stocks are listed and traded. The most well-known ones:

NYSE (New York Stock Exchange) — the largest stock exchange in the world. Home to companies like Coca-Cola and Walmart.

NASDAQ — known for tech companies. Home to Apple, Google, Amazon, Meta.

LSE (London Stock Exchange) — the UK's primary exchange.

JSE (Johannesburg Stock Exchange) — Africa's largest stock exchange.

When you buy Apple stock through Robinhood or eToro, your order goes through NASDAQ behind the scenes. You never see it — it just works.`,
        },
        {
          type: 'did-you-know',
          title: 'DID YOU KNOW?',
          body: `The New York Stock Exchange was founded in 1792 — over 230 years ago. Traders used to meet under a buttonwood tree on Wall Street to buy and sell stocks.`,
        },
        {
          type: 'section',
          title: 'Market Hours',
          body: `The stock market doesn't run 24/7.

US Markets (NYSE & NASDAQ):
Open: 9:30 AM Eastern Time
Close: 4:00 PM Eastern Time
Days: Monday to Friday (closed weekends & holidays)

UK Market (LSE):
Open: 8:00 AM GMT | Close: 4:30 PM GMT

This matters because you can only buy or sell during market hours.`,
        },
        {
          type: 'section',
          title: "Indices — The Market's Report Card",
          body: `You've probably heard of the "S&P 500" or the "Dow Jones" in the news. These are called indices. They track the performance of a group of stocks to give you a quick snapshot of how the market is doing overall.

S&P 500 → tracks the top 500 US companies
Dow Jones → tracks 30 major US companies
NASDAQ 100 → tracks the top 100 NASDAQ companies
FTSE 100 → tracks the top 100 UK companies`,
        },
        {
          type: 'key-concept',
          title: 'KEY CONCEPT',
          body: `An index is like a scoreboard for a group of stocks. It tells you how that group is performing overall — not any single company.`,
        },
        {
          type: 'summary',
          title: 'LESSON SUMMARY',
          bullets: [
            'The stock market is where buyers and sellers trade stocks',
            'Trading happens on exchanges like NYSE, NASDAQ, and LSE',
            'Markets are open during specific hours on weekdays only',
            'Indices like the S&P 500 track overall market health',
          ],
        },
      ],
    },
    lesson2: {
      id: 'module2_lesson2',
      lessonSlug: 'lesson2',
      moduleId: 'module2',
      number: '2.2',
      title: 'Why Do Stock Prices Go Up and Down?',
      subtitle: 'Discover how earnings, economic news, hype, and bull vs bear market cycles move stock prices.',
      duration: '~6 min read',
      level: 'Beginner',
      type: 'Reading',
      content: [
        {
          type: 'section',
          title: 'It All Comes Down to Supply and Demand',
          body: `The price of any stock is simply what someone is willing to pay for it right now. If more people want to buy a stock than sell it, the price goes up. If more people want to sell than buy, the price goes down. That's the core of it. Everything else is just a reason why people choose to buy or sell.`,
        },
        {
          type: 'section',
          title: 'What Makes People Want to Buy or Sell?',
          body: `Company Performance — if Apple announces record profits, people get excited and buy more Apple stock. The price goes up.

Bad News — if a company gets hit with a scandal or loses a major contract, people sell. The price goes down.

The Overall Economy — if the economy is doing well, people feel confident investing. Most stocks rise.

Hype and Emotion — sometimes stocks rise or fall simply because of rumours, social media trends, or fear. This is one of the biggest traps for beginners.`,
        },
        {
          type: 'real-example',
          title: 'REAL EXAMPLE',
          body: `In early 2021, GameStop was a struggling video game retailer with a falling stock price. A group of people on Reddit decided to all buy it at once. The price shot up from $20 to nearly $500 in weeks — not because the company improved, but because of coordinated buying hype. It then crashed back down. Many latecomers lost significant money. This is a perfect example of emotion and hype moving a stock — not real value.`,
        },
        {
          type: 'section',
          title: 'Bull Markets vs Bear Markets',
          body: `You'll hear these two terms constantly.

Bull Market — when stock prices are generally rising. People are confident. The economy feels good. Called "bull" because a bull attacks by thrusting upward.

Bear Market — when stock prices are generally falling (typically 20% or more from their peak). People are cautious. Fear dominates. Called "bear" because a bear attacks by swiping downward.

Both are completely normal. Markets go through bull and bear cycles repeatedly over time. Historically, bull markets have lasted longer and risen higher than bear markets have fallen.`,
        },
        {
          type: 'key-concept',
          title: 'KEY CONCEPT',
          body: `Bull market = prices rising = good times. Bear market = prices falling = tough times. Both are temporary. Both are normal. Long-term investors profit through both.`,
        },
        {
          type: 'summary',
          title: 'LESSON SUMMARY',
          bullets: [
            'Stock prices move based on supply and demand',
            'Company news, economy, and emotion all drive prices',
            'Bull markets = rising prices | Bear markets = falling prices',
            'Short-term price moves are often driven by emotion, not logic',
            'Long-term, prices tend to follow real company value',
          ],
        },
      ],
    },
    lesson3: {
      id: 'module2_lesson3',
      lessonSlug: 'lesson3',
      moduleId: 'module2',
      number: '2.3',
      title: "Trading vs Investing — What's the Difference?",
      subtitle: 'Two completely different games — and why patient long-term investing wins for almost every beginner.',
      duration: '~5 min read',
      level: 'Beginner',
      type: 'Reading',
      content: [
        {
          type: 'section',
          title: "They Sound Similar But They're Very Different",
          body: `People often use "trading" and "investing" interchangeably. They shouldn't. These are two completely different strategies with different goals, different risks, and different time commitments.`,
        },
        {
          type: 'section',
          title: 'Investing — The Long Game',
          body: `Investing means buying stocks and holding them for a long time — months, years, sometimes decades. The goal: let the company grow over time, and profit from that growth. The mindset: "I believe in this company's future. I'll wait." Famous example: Warren Buffett bought Coca-Cola stock in 1988 and still holds it today. He's made billions simply by waiting.

Best for: beginners, people with a full-time job, anyone who wants long-term wealth, people who can't afford to lose short-term.`,
        },
        {
          type: 'section',
          title: 'Trading — The Short Game',
          body: `Trading means buying and selling stocks frequently — sometimes within the same day. The goal: profit from short-term price movements. The mindset: "I think this will go up in the next few hours. I'll buy and sell quickly." Sounds exciting. But the reality is: most beginner traders lose money. Studies consistently show that over 70–80% of day traders lose money in the long run.`,
        },
        {
          type: 'warning',
          title: 'WATCH OUT',
          body: `Trading is not the same as investing. If someone promises you can "get rich quick" by trading stocks as a beginner — walk away. It's not impossible, but the odds are not in your favour without serious experience.`,
        },
        {
          type: 'section',
          title: 'What Should a Beginner Do?',
          body: `Start as an investor. Not a trader. Buy stocks or ETFs you believe in. Hold them for months or years. Don't panic when prices dip. Let time do the work. This is the approach that has created more long-term wealth than any other strategy in the history of the stock market. Once you understand the market deeply, you can explore trading — but not yet.`,
        },
        {
          type: 'summary',
          title: 'LESSON SUMMARY',
          bullets: [
            'Investing = buying and holding long-term (months/years)',
            'Trading = buying and selling short-term (days/hours)',
            'Most beginners should start as investors, not traders',
            'Long-term investing has the best track record for wealth building',
            'Trading requires experience, time, and high risk tolerance',
          ],
        },
      ],
    },
  },
  module3: {
    lesson1: {
      id: 'module3_lesson1',
      lessonSlug: 'lesson1',
      moduleId: 'module3',
      number: '3.1',
      title: 'How to Read a Stock Page',
      subtitle: 'Turn an intimidating screen of financial metrics into a clear 30-second snapshot of any public company.',
      duration: '~6 min read',
      level: 'Beginner',
      type: 'Reading',
      content: [
        {
          type: 'section',
          title: 'What You See When You Look Up a Stock',
          body: `When you search for a stock on any broker app, you'll see a page full of numbers and terms. At first glance it looks overwhelming. It isn't. You only need to understand a few of them to get started. Let's use Apple (AAPL) as our example and break down each important term.`,
        },
        {
          type: 'section',
          title: 'The Key Numbers Explained',
          body: `TICKER SYMBOL — every company has a short code called a ticker. Apple = AAPL | Tesla = TSLA | Amazon = AMZN. It's just an abbreviation. You use it to search.

CURRENT PRICE — the price of one share right now. Example: $189.40 means one Apple share costs $189.40.

PRICE CHANGE (▲ or ▼) — how much the price moved today. ▲ $4.20 (+2.3%) means it rose $4.20 today. ▼ $2.10 (-1.1%) means it fell $2.10 today.

52-WEEK HIGH / LOW — the highest and lowest price the stock reached in the last 12 months. Useful context — where are we compared to the range?

MARKET CAP — the total value of the company. Shares × Current Price = Market Cap. Apple's market cap is over $2 trillion. Bigger market cap = more established company generally.

VOLUME — how many shares have been traded today. High volume = lots of activity = more liquidity. Low volume = fewer trades = harder to buy/sell quickly.

P/E RATIO — this compares the stock price to the company's earnings. A P/E of 25 means you're paying $25 for every $1 of profit. For beginners: don't stress over P/E too much yet. Just know it exists.`,
        },
        {
          type: 'key-concept',
          title: 'KEY CONCEPT',
          body: `The most important numbers for a beginner:
1. Current Price — what it costs right now
2. Price Change — is it up or down today?
3. Market Cap — how big is this company?
Everything else comes later as you learn more.`,
        },
        {
          type: 'section',
          title: 'The Price Chart',
          body: `Below the numbers is usually a price chart — a line showing how the stock price moved over time. Time filters: 1D | 1W | 1M | 3M | 1Y. As a beginner, look at the 1Y or longer chart. One bad day means very little in the long term.`,
        },
        {
          type: 'summary',
          title: 'LESSON SUMMARY',
          bullets: [
            'Every stock has a ticker symbol — its short code',
            "Price change shows today's up or down movement",
            'Market cap shows how big the company is',
            'The price chart shows performance over time',
            'Zoom out on the chart — one day means very little',
          ],
        },
      ],
    },
    lesson2: {
      id: 'module3_lesson2',
      lessonSlug: 'lesson2',
      moduleId: 'module3',
      number: '3.2',
      title: 'Understanding a Stock Chart',
      subtitle: 'Learn to zoom out past daily market noise and read the real multi-year trend behind any stock.',
      duration: '~5 min read',
      level: 'Beginner',
      type: 'Reading',
      content: [
        {
          type: 'section',
          title: 'Charts Are Just Visual Stories',
          body: `A stock chart is just a picture of what a stock's price has done over time. Nothing more. It's a story told with a line. As a beginner, you only need to read a basic line chart. That's all.`,
        },
        {
          type: 'section',
          title: 'What a Line Chart Shows',
          body: `A line chart draws a single line connecting the price at each point in time. Line going UP = price increased. Line going DOWN = price decreased. Line staying FLAT = price barely moved. Look for the general direction, not every tiny wiggle. The tiny daily ups and downs are called "noise." The overall direction over weeks or months is called the "trend." As a beginner, you care about the trend — not the noise.`,
        },
        {
          type: 'real-example',
          title: 'REAL EXAMPLE',
          body: `If you looked at the Apple stock chart from 2015 to today, you'd see a line that goes up dramatically — even though there were many scary dips along the way. Zoom out. The trend tells the real story.`,
        },
        {
          type: 'section',
          title: 'Support and Resistance (Simplified)',
          body: `Support — a price level the stock keeps bouncing back up from. Think of it as a floor. When the price drops to this level, buyers tend to step in.

Resistance — a price level the stock keeps struggling to break through. Think of it as a ceiling. When the price rises to this level, sellers tend to step in.

For a beginner, just know these terms exist.`,
        },
        {
          type: 'section',
          title: 'The Volume Bar',
          body: `Below most charts you'll see a bar graph — this is the volume. Tall bars = lots of trading activity. Short bars = quiet day. Big price moves on high volume = more meaningful. Big price moves on low volume = less trustworthy.`,
        },
        {
          type: 'summary',
          title: 'LESSON SUMMARY',
          bullets: [
            'A line chart shows the price story over time',
            'Focus on the trend (overall direction), not daily noise',
            'Zoom out on charts — short-term looks scarier than it is',
            'Support = price floor | Resistance = price ceiling',
            'High volume on a big move = more significant signal',
          ],
        },
      ],
    },
    lesson3: {
      id: 'module3_lesson3',
      lessonSlug: 'lesson3',
      moduleId: 'module3',
      number: '3.3',
      title: 'What Is a Portfolio?',
      subtitle: 'Build a resilient collection of investments using diversification so no single setback wipes you out.',
      duration: '~5 min read',
      level: 'Beginner',
      type: 'Reading',
      content: [
        {
          type: 'section',
          title: 'Your Portfolio Is Everything You Own',
          body: `A portfolio is simply the collection of all the stocks (and other investments) you own. If you own 3 shares of Apple, 2 shares of Tesla, and 1 S&P 500 ETF — that's your portfolio. Think of it like a bag that holds everything you've invested in. You can check the bag at any time to see how your investments are doing as a whole.`,
        },
        {
          type: 'section',
          title: 'Why Diversification Matters',
          body: `There's an old saying: "Don't put all your eggs in one basket." In investing, this is called diversification — spreading your money across different stocks instead of putting everything into one. Imagine you put all your savings into one company. That company gets hit with a scandal. The stock price drops 60%. You've lost 60% of everything. Now imagine you spread your money across 10 different companies. One gets hit. The other 9 keep you afloat. You might only lose 6% overall. Diversification is the single most effective way to reduce risk as a beginner.`,
        },
        {
          type: 'key-concept',
          title: 'KEY CONCEPT',
          body: `Diversification = not putting all your money into one stock. The easiest way to diversify as a beginner? Buy an ETF. One purchase. Hundreds of companies. Instant diversification.`,
        },
        {
          type: 'section',
          title: 'How to Think About Your First Portfolio',
          body: `As a beginner, keep it simple.

Option A (Simplest): 100% in a broad ETF like the S&P 500 index fund. One purchase. Done. Let it grow.

Option B (Slightly more active): 70–80% in a broad ETF + 20–30% in 2–3 individual companies you genuinely understand and believe in.

Avoid: putting all your money in one "hot" stock, owning 30 different stocks when just starting, investing money you can't leave alone for 1–2 years.`,
        },
        {
          type: 'summary',
          title: 'LESSON SUMMARY',
          bullets: [
            'A portfolio is everything you own across all investments',
            'Diversification = spreading risk across multiple stocks',
            "Don't put all your money in one company",
            'ETFs are the easiest way to diversify instantly',
            'Keep your first portfolio simple — broad ETF + 2-3 stocks max',
          ],
        },
      ],
    },
  },
  module4: {
    lesson1: {
      id: 'module4_lesson1',
      lessonSlug: 'lesson1',
      moduleId: 'module4',
      number: '4.1',
      title: 'How to Choose a Broker',
      subtitle: 'Know the five non-negotiable standards every legitimate beginner investment app must meet.',
      duration: '~5 min read',
      level: 'Beginner',
      type: 'Reading',
      content: [
        {
          type: 'section',
          title: "You Can't Buy Stocks Directly",
          body: `You can't walk up to Apple and say "I'd like to buy one share please." To buy a stock, you need a middleman — someone with access to the exchange. That middleman is called a broker. A broker is a platform or company that lets you buy and sell stocks on your behalf. Today, brokers are apps on your phone. No office visits. No phone calls. Open an account. Fund it. Buy stocks. Done.`,
        },
        {
          type: 'section',
          title: 'What to Look For in a Broker',
          body: `✓ Commission-Free Trading — you shouldn't pay a fee every time you buy or sell a stock.

✓ No Minimum Deposit — as a beginner, you don't want to be forced to deposit large amounts.

✓ Fractional Shares — lets you buy a piece of a share instead of a whole one. Amazon costs over $3,000 per share — but with fractional shares you can own $10 worth.

✓ Regulation & Safety — your broker must be regulated by a financial authority. US: FINRA & SEC | UK: FCA | Africa: SEC Nigeria, FSCA

✓ Simple Interface — if the app is confusing on day one, it's not the right app for a beginner.`,
        },
        {
          type: 'warning',
          title: 'WATCH OUT',
          body: `Be very careful of unregulated brokers promising guaranteed returns or extremely high profits. No legitimate broker guarantees profits. If it sounds too good to be true — it is.`,
        },
        {
          type: 'section',
          title: 'Your Broker Is in the Next Section',
          body: `We have a full platform guide based on your region. Whether you're in the US, UK, or Africa — we've selected the best beginner-friendly brokers for your location with step-by-step registration guides included. Head to the Platforms section after this module.`,
        },
        {
          type: 'summary',
          title: 'LESSON SUMMARY',
          bullets: [
            'A broker is the platform you use to buy and sell stocks',
            'Look for: commission-free, low/no minimum, fractional shares',
            'Always verify your broker is regulated in your country',
            'Avoid any broker promising guaranteed returns',
            'Your region-specific broker list is in the Platforms section',
          ],
        },
      ],
    },
    lesson2: {
      id: 'module4_lesson2',
      lessonSlug: 'lesson2',
      moduleId: 'module4',
      number: '4.2',
      title: 'Market Orders vs Limit Orders',
      subtitle: 'Understand the two order types you will see on the buy screen — immediate execution vs target price control.',
      duration: '~4 min read',
      level: 'Beginner',
      type: 'Reading',
      content: [
        {
          type: 'section',
          title: 'When You Buy a Stock, You Place an Order',
          body: `Buying a stock isn't like buying something on Amazon where you click and it's done at a fixed price. In the stock market, prices move constantly. So you have to tell your broker: "Buy this stock — but under what conditions?" That instruction is called an order. For beginners, only two types matter right now.`,
        },
        {
          type: 'section',
          title: 'Market Order — Buy Right Now',
          body: `A market order says: "Buy this stock immediately at whatever the current price is."

Pros: fastest way to buy (executes almost instantly), simple — no conditions to set.

Cons: you don't control the exact price. In fast-moving markets you might pay slightly more than expected (this is called slippage).

Best for: stable large company stocks like Apple or Microsoft, when you just want to get in quickly, ETFs with high trading volume.`,
        },
        {
          type: 'section',
          title: 'Limit Order — Buy at My Price',
          body: `A limit order says: "Only buy this stock if the price reaches $X or lower."

Example: Apple is trading at $190. You think $185 is a better price. You set a limit order at $185. If the price drops to $185 or below — your order executes automatically. If it never drops that low — your order simply doesn't execute.

Pros: you control the exact price you pay, you never overpay by accident.

Cons: your order might never fill. If the stock shoots up, you miss the ride while waiting.`,
        },
        {
          type: 'key-concept',
          title: 'KEY CONCEPT',
          body: `Starting out? Use market orders for large, stable stocks and ETFs. They're simple, fast, and the price difference is usually negligible. As you grow more confident, explore limit orders.`,
        },
        {
          type: 'summary',
          title: 'LESSON SUMMARY',
          bullets: [
            'An order is your instruction to the broker on how to buy',
            'Market order = buy now at current price (fast, simple)',
            'Limit order = only buy if price reaches my target',
            'Beginners can start with market orders on stable stocks',
            'Limit orders give more control but might not fill',
          ],
        },
      ],
    },
    lesson3: {
      id: 'module4_lesson3',
      lessonSlug: 'lesson3',
      moduleId: 'module4',
      number: '4.3',
      title: 'Before You Buy Anything — Read This',
      subtitle: 'Six calm questions to run before every trade so excitement or hype never makes an expensive mistake for you.',
      duration: '~5 min read',
      level: 'Beginner',
      type: 'Reading',
      content: [
        {
          type: 'section',
          title: "Don't Skip This Step",
          body: `The excitement of buying your first stock is real — and it can make you rush. Rushing is how beginners make their first (and most expensive) mistakes. Before you tap "Buy" on anything, run through this checklist. Every time. Not just the first time. Every time.`,
        },
        {
          type: 'section',
          title: 'THE PRE-BUY CHECKLIST',
          body: `✓ 1. Do I actually understand what this company does?
Can you explain what the company does in one sentence? If not — don't buy it. Research first. "I heard it was going up" is not a reason to buy.

✓ 2. Am I investing money I can afford to leave alone?
Only invest money you won't need for at least 1–2 years minimum. Never invest rent money, emergency funds, or borrowed money.

✓ 3. Am I buying because of research or because of hype?
If you're buying because of a Reddit post, a WhatsApp group, or a TikTok video — pause. Hype is one of the biggest traps in investing.

✓ 4. Am I diversified or going all-in on one stock?
If this is your only investment, consider an ETF first to spread the risk.

✓ 5. Do I have a rough idea of when I'd sell?
"I'll hold this for at least 1 year" is fine. "I'll sell if it drops 30%" is also fine. No plan at all = panic decisions when prices move.

✓ 6. Am I emotionally okay if this drops 20% tomorrow?
All stocks can drop. If a 20% drop would cause you to panic-sell or lose sleep — reconsider the amount you're investing.`,
        },
        {
          type: 'real-example',
          title: 'REAL EXAMPLE',
          body: `A common first-time scenario: someone sees Company X trending on social media. They invest $500 without researching what the company actually does. The next week, the hype fades and the price drops 35%. They panic and sell at a loss. If they had held — the stock recovered fully 3 months later. The checklist would have flagged: "Am I buying because of hype?" — YES → Pause.`,
        },
        {
          type: 'section',
          title: 'Your First Buy — Keep It Simple',
          body: `For your very first purchase: start with a small amount you can afford to lose. Choose a company you genuinely understand OR a broad ETF. Use a market order for simplicity. Set a reminder to check back in 3 months — not every day. The goal of your first buy isn't to get rich. It's to learn the process, feel confident, and start building the habit.`,
        },
        {
          type: 'summary',
          title: 'LESSON SUMMARY',
          bullets: [
            'Always run the pre-buy checklist before purchasing anything',
            'Only invest money you can leave untouched for 1–2 years',
            'Research the company — never buy based on hype alone',
            'Start small, keep it simple, learn the process',
            'Your first buy is about building confidence, not instant profit',
          ],
        },
      ],
    },
  },
}

export const ALL_LESSONS_ORDERED: LessonData[] = MODULES.flatMap((mod) =>
  mod.lessons.map((slug) => LESSONS[mod.id][slug])
)

export function lessonKeyToRoute(lessonKey: string | null | undefined): string {
  if (!lessonKey) return '/learn/module1/lesson1'
  const parts = lessonKey.split('_')
  if (parts.length === 2 && LESSONS[parts[0]]?.[parts[1]]) {
    return `/learn/${parts[0]}/${parts[1]}`
  }
  return '/learn/module1/lesson1'
}
