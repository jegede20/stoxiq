export interface QuizOption {
  id: 'a' | 'b' | 'c' | 'd'
  text: string
  correct?: boolean
}

export interface QuizQuestion {
  id: string
  question: string
  options: QuizOption[]
  explanation: string
  lessonLink: {
    route: string
    label: string
  }
}

export interface QuizData {
  id: string
  eyebrow: string
  title: string
  moduleId: string | null
  nextModuleRoute: string
  questionCount: number
  time: string
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
  type: string
  unlockAfter: string
  questions: QuizQuestion[]
}

export const QUIZZES: Record<string, QuizData> = {
  quiz_module1: {
    id: 'quiz_module1',
    eyebrow: 'MODULE 01 QUIZ',
    title: 'Stock Market Basics',
    moduleId: 'module1',
    nextModuleRoute: '/learn/module2',
    questionCount: 5,
    time: '~5 min',
    difficulty: 'BEGINNER',
    type: 'Multiple Choice',
    unlockAfter: 'module1',
    questions: [
      {
        id: 'q1',
        question: 'What is a stock?',
        options: [
          { id: 'a', text: 'A loan from a company to investors' },
          { id: 'b', text: 'A unit of ownership in a company', correct: true },
          { id: 'c', text: 'A guaranteed savings account' },
          { id: 'd', text: 'A type of bank deposit' },
        ],
        explanation: 'A stock represents partial ownership in a company. When you buy a share, you become a part-owner.',
        lessonLink: { route: '/learn/module1/lesson1', label: 'Lesson 1.1: What Is a Stock, Really?' },
      },
      {
        id: 'q2',
        question: 'Which best describes a dividend?',
        options: [
          { id: 'a', text: 'The fee you pay to buy a stock' },
          { id: 'b', text: 'The profit from selling a stock higher than you bought it' },
          { id: 'c', text: 'A regular cash payment from company profits to shareholders', correct: true },
          { id: 'd', text: 'A penalty for selling stocks early' },
        ],
        explanation: "Dividends are a company's way of sharing its profits with shareholders — like receiving regular \"rent.\"",
        lessonLink: { route: '/learn/module1/lesson2', label: 'Lesson 1.2: How Do You Actually Make Money?' },
      },
      {
        id: 'q3',
        question: 'What is an ETF?',
        options: [
          { id: 'a', text: "A single company's stock" },
          { id: 'b', text: 'A savings account with guaranteed returns' },
          { id: 'c', text: 'A fund that holds a collection of many stocks in one purchase', correct: true },
          { id: 'd', text: 'A type of currency used for trading' },
        ],
        explanation: 'An ETF lets you invest in many companies at once, making it an easy way for beginners to diversify.',
        lessonLink: { route: '/learn/module1/lesson3', label: 'Lesson 1.3: The Types of Stocks Worth Knowing' },
      },
      {
        id: 'q4',
        question: 'If a stock goes from $50 to $80 and you sell, what is the $30 gain called?',
        options: [
          { id: 'a', text: 'A dividend' },
          { id: 'b', text: 'A capital gain', correct: true },
          { id: 'c', text: 'A broker fee' },
          { id: 'd', text: 'A market order' },
        ],
        explanation: 'Profit made from selling a stock at a higher price than you paid is called a capital gain.',
        lessonLink: { route: '/learn/module1/lesson2', label: 'Lesson 1.2: How Do You Actually Make Money?' },
      },
      {
        id: 'q5',
        question: 'Which is most recommended for complete beginners?',
        options: [
          { id: 'a', text: 'A single growth stock in one company' },
          { id: 'b', text: 'Penny stocks with very low prices' },
          { id: 'c', text: 'A broad market ETF', correct: true },
          { id: 'd', text: 'Only dividend-paying stocks' },
        ],
        explanation: 'Broad ETFs spread investment across many companies, reducing the risk of betting on a single stock.',
        lessonLink: { route: '/learn/module1/lesson3', label: 'Lesson 1.3: The Types of Stocks Worth Knowing' },
      },
    ],
  },
  quiz_module2: {
    id: 'quiz_module2',
    eyebrow: 'MODULE 02 QUIZ',
    title: 'How the Market Works',
    moduleId: 'module2',
    nextModuleRoute: '/learn/module3',
    questionCount: 5,
    time: '~5 min',
    difficulty: 'BEGINNER',
    type: 'Multiple Choice',
    unlockAfter: 'module2',
    questions: [
      {
        id: 'q1',
        question: 'What is a stock exchange?',
        options: [
          { id: 'a', text: 'A shop where you buy company products' },
          { id: 'b', text: 'An app on your phone' },
          { id: 'c', text: 'An organised platform where stocks are listed and traded', correct: true },
          { id: 'd', text: 'A government savings programme' },
        ],
        explanation: 'Stock exchanges like NYSE and NASDAQ are platforms where buyers and sellers trade stocks.',
        lessonLink: { route: '/learn/module2/lesson1', label: 'Lesson 2.1: What Is the Stock Market?' },
      },
      {
        id: 'q2',
        question: 'The S&P 500 is best described as:',
        options: [
          { id: 'a', text: 'A list of the 500 cheapest stocks in the US' },
          { id: 'b', text: 'An index that tracks the performance of 500 major US companies', correct: true },
          { id: 'c', text: 'A type of investment account' },
          { id: 'd', text: 'A beginner investment app' },
        ],
        explanation: "The S&P 500 is an index that acts like a scoreboard for 500 of America's largest companies.",
        lessonLink: { route: '/learn/module2/lesson1', label: 'Lesson 2.1: What Is the Stock Market?' },
      },
      {
        id: 'q3',
        question: 'What does a "bear market" mean?',
        options: [
          { id: 'a', text: 'Markets are rising by over 20%' },
          { id: 'b', text: 'Trading is temporarily paused' },
          { id: 'c', text: 'Stock prices are generally falling by 20% or more', correct: true },
          { id: 'd', text: 'Only large companies can be traded' },
        ],
        explanation: 'A bear market is when prices broadly fall 20% or more from their peak. Normal and temporary.',
        lessonLink: { route: '/learn/module2/lesson2', label: 'Lesson 2.2: Why Do Stock Prices Go Up and Down?' },
      },
      {
        id: 'q4',
        question: 'Primary difference between trading and investing?',
        options: [
          { id: 'a', text: 'Trading is safer than investing' },
          { id: 'b', text: 'Investing = buying and holding long-term; trading = frequent short-term buying and selling', correct: true },
          { id: 'c', text: 'Only professionals can invest' },
          { id: 'd', text: 'Trading always makes more money' },
        ],
        explanation: 'Investing is about patience and time. Trading is about frequent moves — much riskier for beginners.',
        lessonLink: { route: '/learn/module2/lesson3', label: "Lesson 2.3: Trading vs Investing — What's the Difference?" },
      },
      {
        id: 'q5',
        question: 'At what time does the NYSE open?',
        options: [
          { id: 'a', text: '8:00 AM Eastern Time' },
          { id: 'b', text: '9:30 AM Eastern Time', correct: true },
          { id: 'c', text: '10:00 AM Eastern Time' },
          { id: 'd', text: 'The market is open 24 hours' },
        ],
        explanation: 'NYSE and NASDAQ both open at 9:30 AM and close at 4:00 PM Eastern Time, Mon–Fri.',
        lessonLink: { route: '/learn/module2/lesson1', label: 'Lesson 2.1: What Is the Stock Market?' },
      },
    ],
  },
  quiz_module3: {
    id: 'quiz_module3',
    eyebrow: 'MODULE 03 QUIZ',
    title: 'Reading Stock Information',
    moduleId: 'module3',
    nextModuleRoute: '/learn/module4',
    questionCount: 5,
    time: '~5 min',
    difficulty: 'INTERMEDIATE',
    type: 'Multiple Choice',
    unlockAfter: 'module3',
    questions: [
      {
        id: 'q1',
        question: 'What does a stock\'s "ticker symbol" refer to?',
        options: [
          { id: 'a', text: 'The daily price of the stock' },
          { id: 'b', text: 'The short code used to identify a stock on an exchange', correct: true },
          { id: 'c', text: 'The number of shares available to buy' },
          { id: 'd', text: "The stock's annual profit" },
        ],
        explanation: 'Every stock has a unique ticker — AAPL for Apple, TSLA for Tesla — used to search and identify it.',
        lessonLink: { route: '/learn/module3/lesson1', label: 'Lesson 3.1: How to Read a Stock Page' },
      },
      {
        id: 'q2',
        question: 'What does an upward-trending 1Y chart line mean?',
        options: [
          { id: 'a', text: 'The stock is guaranteed to keep rising' },
          { id: 'b', text: "The stock's price has generally increased over that period", correct: true },
          { id: 'c', text: 'The company is paying large dividends' },
          { id: 'd', text: 'The stock is considered risky' },
        ],
        explanation: 'An upward 1Y line shows the overall price trend has been positive over the past 12 months.',
        lessonLink: { route: '/learn/module3/lesson2', label: 'Lesson 3.2: Understanding a Stock Chart' },
      },
      {
        id: 'q3',
        question: 'What is a portfolio?',
        options: [
          { id: 'a', text: 'A trading strategy used by professionals' },
          { id: 'b', text: 'A type of brokerage account' },
          { id: 'c', text: 'The collection of all investments you own', correct: true },
          { id: 'd', text: 'A government investment fund' },
        ],
        explanation: "Your portfolio is simply everything you've invested in — all your stocks, ETFs, and other assets.",
        lessonLink: { route: '/learn/module3/lesson3', label: 'Lesson 3.3: What Is a Portfolio?' },
      },
      {
        id: 'q4',
        question: 'Why is diversification important?',
        options: [
          { id: 'a', text: 'It guarantees profits' },
          { id: 'b', text: 'It reduces the risk of losing everything if one stock performs badly', correct: true },
          { id: 'c', text: 'It makes your portfolio grow faster' },
          { id: 'd', text: 'It avoids paying taxes' },
        ],
        explanation: "Spreading across multiple stocks means one bad investment can't wipe you out completely.",
        lessonLink: { route: '/learn/module3/lesson3', label: 'Lesson 3.3: What Is a Portfolio?' },
      },
      {
        id: 'q5',
        question: 'What does "market cap" tell you?',
        options: [
          { id: 'a', text: 'The maximum amount you can invest in it' },
          { id: 'b', text: 'How many employees the company has' },
          { id: 'c', text: "The total market value of the company's shares", correct: true },
          { id: 'd', text: 'How old the company is' },
        ],
        explanation: 'Market cap = share price × total shares. Bigger market cap generally means a more established company.',
        lessonLink: { route: '/learn/module3/lesson1', label: 'Lesson 3.1: How to Read a Stock Page' },
      },
    ],
  },
  quiz_module4: {
    id: 'quiz_module4',
    eyebrow: 'MODULE 04 QUIZ',
    title: 'Buying Your First Stock',
    moduleId: 'module4',
    nextModuleRoute: '/platforms',
    questionCount: 5,
    time: '~5 min',
    difficulty: 'INTERMEDIATE',
    type: 'Multiple Choice',
    unlockAfter: 'module4',
    questions: [
      {
        id: 'q1',
        question: 'What is a broker?',
        options: [
          { id: 'a', text: 'A type of stock you can buy' },
          { id: 'b', text: 'A platform or company that lets you buy and sell stocks on your behalf', correct: true },
          { id: 'c', text: 'A government official who oversees markets' },
          { id: 'd', text: 'Someone who guarantees investment returns' },
        ],
        explanation: 'A broker is your access point to the market. Modern brokers are apps like Robinhood, Freetrade, or Bamboo.',
        lessonLink: { route: '/learn/module4/lesson1', label: 'Lesson 4.1: How to Choose a Broker' },
      },
      {
        id: 'q2',
        question: 'What is a market order?',
        options: [
          { id: 'a', text: 'An order to buy a stock only if it reaches a specific price' },
          { id: 'b', text: 'An instruction to buy a stock immediately at the current price', correct: true },
          { id: 'c', text: 'A type of savings plan' },
          { id: 'd', text: 'An order placed outside of market hours' },
        ],
        explanation: 'A market order executes instantly at whatever the current price is. Simple and fast.',
        lessonLink: { route: '/learn/module4/lesson2', label: 'Lesson 4.2: Market Orders vs Limit Orders' },
      },
      {
        id: 'q3',
        question: 'Most important feature to look for in a beginner broker?',
        options: [
          { id: 'a', text: 'The ability to trade 500 different currency pairs' },
          { id: 'b', text: 'Regulation by a recognised financial authority', correct: true },
          { id: 'c', text: 'The promise of guaranteed returns' },
          { id: 'd', text: 'No need to verify your identity' },
        ],
        explanation: 'Regulation protects your money. An unregulated broker is a major red flag regardless of other features.',
        lessonLink: { route: '/learn/module4/lesson1', label: 'Lesson 4.1: How to Choose a Broker' },
      },
      {
        id: 'q4',
        question: 'A "limit order" means:',
        options: [
          { id: 'a', text: 'You can only buy one share at a time' },
          { id: 'b', text: 'Your order only executes if the stock reaches your target price', correct: true },
          { id: 'c', text: 'There is a limit on how much you can invest' },
          { id: 'd', text: 'The broker limits your profits' },
        ],
        explanation: 'A limit order gives you price control — it only fills at your specified price or better.',
        lessonLink: { route: '/learn/module4/lesson2', label: 'Lesson 4.2: Market Orders vs Limit Orders' },
      },
      {
        id: 'q5',
        question: 'Most important question before buying a stock?',
        options: [
          { id: 'a', text: '"Has this stock risen in the past week?"' },
          { id: 'b', text: '"Is this a popular stock on social media?"' },
          { id: 'c', text: '"Do I understand what this company does and can I afford to leave this money invested?"', correct: true },
          { id: 'd', text: '"Is this the cheapest stock available today?"' },
        ],
        explanation: 'Understanding the business and investing only money you can leave alone are the two most important beginner principles.',
        lessonLink: { route: '/learn/module4/lesson3', label: 'Lesson 4.3: Before You Buy Anything — Read This' },
      },
    ],
  },
  quiz_final: {
    id: 'quiz_final',
    eyebrow: 'THE FULL STOXIQ CHALLENGE',
    title: 'The Full StoxIQ Challenge',
    moduleId: null,
    nextModuleRoute: '/platforms',
    questionCount: 20,
    time: '~15 min',
    difficulty: 'ADVANCED',
    type: 'Multiple Choice',
    unlockAfter: 'all-modules',
    questions: [
      {
        id: 'fq1',
        question: 'What is a stock?',
        options: [
          { id: 'a', text: 'A loan from a company to investors' },
          { id: 'b', text: 'A unit of ownership in a company', correct: true },
          { id: 'c', text: 'A guaranteed bank savings certificate' },
          { id: 'd', text: 'A fixed monthly government stipend' },
        ],
        explanation: 'A stock represents partial ownership in a company. Buying one share makes you a real part-owner of that business.',
        lessonLink: { route: '/learn/module1/lesson1', label: 'Lesson 1.1: What Is a Stock, Really?' },
      },
      {
        id: 'fq2',
        question: 'How do capital gains differ from dividends?',
        options: [
          { id: 'a', text: 'Capital gains come from selling at a higher price; dividends are cash payments from company profits', correct: true },
          { id: 'b', text: 'Dividends only happen when you sell your shares' },
          { id: 'c', text: 'Capital gains are guaranteed every quarter' },
          { id: 'd', text: 'There is no difference — both are broker fees' },
        ],
        explanation: 'Investors earn money in two ways: capital gains when the share price rises and you sell, and dividends paid out of company profits.',
        lessonLink: { route: '/learn/module1/lesson2', label: 'Lesson 1.2: How Do You Actually Make Money?' },
      },
      {
        id: 'fq3',
        question: 'Why is an Exchange-Traded Fund (ETF) widely called the beginner’s best friend?',
        options: [
          { id: 'a', text: 'It guarantees your account can never go down' },
          { id: 'b', text: 'It bundles many companies into a single purchase for instant diversification', correct: true },
          { id: 'c', text: 'It lets you trade outside market hours with zero risk' },
          { id: 'd', text: 'It only holds penny stocks' },
        ],
        explanation: 'An ETF holds dozens or hundreds of companies in one basket, reducing the risk of betting everything on one business.',
        lessonLink: { route: '/learn/module1/lesson3', label: 'Lesson 1.3: The Types of Stocks Worth Knowing' },
      },
      {
        id: 'fq4',
        question: 'What is a stock exchange such as NYSE, NASDAQ, LSE, or JSE?',
        options: [
          { id: 'a', text: 'A social media group for sharing stock tips' },
          { id: 'b', text: 'An organised, regulated marketplace where stocks are listed and traded', correct: true },
          { id: 'c', text: 'A currency exchange booth at an airport' },
          { id: 'd', text: 'A private bank vault' },
        ],
        explanation: 'Stock exchanges are regulated electronic marketplaces where buy and sell orders sent through brokers are matched.',
        lessonLink: { route: '/learn/module2/lesson1', label: 'Lesson 2.1: What Is the Stock Market?' },
      },
      {
        id: 'fq5',
        question: 'What does a market index like the S&P 500 or FTSE 100 track?',
        options: [
          { id: 'a', text: 'The performance of a defined group of major companies as an overall market scoreboard', correct: true },
          { id: 'b', text: 'Only companies that pay monthly dividends' },
          { id: 'c', text: 'Interest rates set by commercial banks' },
          { id: 'd', text: 'The cheapest stocks listed that morning' },
        ],
        explanation: 'Indices act like a report card for a group of companies — such as 500 major US companies in the S&P 500 or 100 UK leaders in the FTSE 100.',
        lessonLink: { route: '/learn/module2/lesson1', label: 'Lesson 2.1: What Is the Stock Market?' },
      },
      {
        id: 'fq6',
        question: 'Which statement accurately contrasts a bull market and a bear market?',
        options: [
          { id: 'a', text: 'Bull market = falling 20%+; Bear market = rising steadily' },
          { id: 'b', text: 'Bull market = prices broadly rising; Bear market = prices broadly falling 20% or more from peak', correct: true },
          { id: 'c', text: 'Bear markets permanent end the stock market forever' },
          { id: 'd', text: 'Bull markets only apply to technology stocks' },
        ],
        explanation: 'Bull markets feature rising prices and optimism; bear markets see broad declines of 20%+ from peaks. Both are normal, temporary cycles.',
        lessonLink: { route: '/learn/module2/lesson2', label: 'Lesson 2.2: Why Do Stock Prices Go Up and Down?' },
      },
      {
        id: 'fq7',
        question: 'Why should almost every beginner start as an investor rather than a day trader?',
        options: [
          { id: 'a', text: 'Day trading is illegal on mobile apps' },
          { id: 'b', text: 'Studies show 70–80% of day traders lose money, whereas long-term investing has the strongest wealth-building track record', correct: true },
          { id: 'c', text: 'Investors never experience temporary price dips' },
          { id: 'd', text: 'Brokers charge $500 per day trade' },
        ],
        explanation: 'Holding quality businesses or broad ETFs over years lets compounding work in your favour; short-term trading stacks the odds against beginners.',
        lessonLink: { route: '/learn/module2/lesson3', label: "Lesson 2.3: Trading vs Investing — What's the Difference?" },
      },
      {
        id: 'fq8',
        question: 'At what hours are the US stock exchanges (NYSE & NASDAQ) open for regular trading?',
        options: [
          { id: 'a', text: '24 hours a day, 7 days a week' },
          { id: 'b', text: '9:30 AM to 4:00 PM Eastern Time, Monday to Friday', correct: true },
          { id: 'c', text: '6:00 AM to 12:00 PM Eastern Time daily' },
          { id: 'd', text: 'Weekends only' },
        ],
        explanation: 'Regular US market hours run 9:30 AM – 4:00 PM Eastern Time on weekdays (excluding market holidays).',
        lessonLink: { route: '/learn/module2/lesson1', label: 'Lesson 2.1: What Is the Stock Market?' },
      },
      {
        id: 'fq9',
        question: 'What does a company’s Market Cap represent?',
        options: [
          { id: 'a', text: 'The maximum dollar amount one investor may buy' },
          { id: 'b', text: 'Total market value of the company (Current Share Price × Total Shares)', correct: true },
          { id: 'c', text: 'The price ceiling a stock cannot rise above' },
          { id: 'd', text: 'How much cash the company holds in a bank account' },
        ],
        explanation: 'Market capitalization equals Current Share Price multiplied by Total Shares in existence — indicating how large and established a company is.',
        lessonLink: { route: '/learn/module3/lesson1', label: 'Lesson 3.1: How to Read a Stock Page' },
      },
      {
        id: 'fq10',
        question: 'When reading a stock chart as a beginner, why is zooming out to 1Y or 5Y better than staring at 1D?',
        options: [
          { id: 'a', text: '1D charts hide the ticker symbol' },
          { id: 'b', text: 'Zooming out reveals the real long-term trend rather than scary daily noise', correct: true },
          { id: 'c', text: 'Longer charts guarantee future returns' },
          { id: 'd', text: 'Brokers charge extra for 1D charts' },
        ],
        explanation: 'Single-day wiggles are mostly short-term noise. Multi-month and multi-year charts show the true business trajectory.',
        lessonLink: { route: '/learn/module3/lesson2', label: 'Lesson 3.2: Understanding a Stock Chart' },
      },
      {
        id: 'fq11',
        question: 'What happens when a big price move occurs on unusually high trading volume?',
        options: [
          { id: 'a', text: 'The move is generally a more meaningful signal because many buyers/sellers participated', correct: true },
          { id: 'b', text: 'The stock exchange deletes the trade' },
          { id: 'c', text: 'It means nobody traded the stock that day' },
          { id: 'd', text: 'Dividends are cancelled automatically' },
        ],
        explanation: 'High volume shows broad market participation behind a move, whereas low-volume price jumps are less reliable.',
        lessonLink: { route: '/learn/module3/lesson2', label: 'Lesson 3.2: Understanding a Stock Chart' },
      },
      {
        id: 'fq12',
        question: 'How does diversification protect your portfolio?',
        options: [
          { id: 'a', text: 'It eliminates all market movement' },
          { id: 'b', text: 'Spreading money across multiple companies prevents one bad company scandal from wiping you out', correct: true },
          { id: 'c', text: 'It doubles your dividend rate legally' },
          { id: 'd', text: 'It exempts you from broker identity verification' },
        ],
        explanation: 'If one company drops 60% in a 10-stock or 500-stock portfolio, the remaining healthy businesses cushion the overall impact.',
        lessonLink: { route: '/learn/module3/lesson3', label: 'Lesson 3.3: What Is a Portfolio?' },
      },
      {
        id: 'fq13',
        question: 'Which of these is a classic warning sign of emotional trading?',
        options: [
          { id: 'a', text: 'Checking your long-term ETF once a quarter' },
          { id: 'b', text: 'Feeling rushed or panicked because of recent price swings or a group chat tip', correct: true },
          { id: 'c', text: 'Reading what a company does before investing' },
          { id: 'd', text: 'Keeping an emergency fund in cash' },
        ],
        explanation: 'Urgency, panic during a dip, or FOMO excitement from social media are clear signs emotion is hijacking your plan — pause 24 hours.',
        lessonLink: { route: '/risks/emotional-trading', label: 'Risk 01: Emotional Trading' },
      },
      {
        id: 'fq14',
        question: 'How does a "Pump and Dump" stock scam operate?',
        options: [
          { id: 'a', text: 'A regulated ETF rebalances its top 500 holdings quarterly' },
          { id: 'b', text: 'Promoters secretly buy a cheap obscure stock, flood social media with urgent hype, and dump their shares onto late beginners', correct: true },
          { id: 'c', text: 'A company pays regular quarterly dividends for 20 years' },
          { id: 'd', text: 'A broker verifies your identity with a passport' },
        ],
        explanation: 'Pump-and-dump scammers manufacture viral urgency ("Buy NOW — guaranteed 5x!") so they can sell their cheap shares at inflated prices before the crash.',
        lessonLink: { route: '/risks/scams-red-flags', label: 'Risk 03: Stock Scams & Red Flags' },
      },
      {
        id: 'fq15',
        question: 'What is the difference between an unrealised loss and a realised loss?',
        options: [
          { id: 'a', text: 'Unrealised loss is a temporary paper drop while you still hold; realised loss becomes permanent when you sell', correct: true },
          { id: 'b', text: 'Realised losses can still bounce back in your account' },
          { id: 'c', text: 'Unrealised losses are charged as bank fees' },
          { id: 'd', text: 'They mean the exact same thing' },
        ],
        explanation: 'Until you sell, a price drop is only on paper and can recover. Panic-selling locks in a permanent realised loss.',
        lessonLink: { route: '/risks/volatility-loss', label: 'Risk 04: Volatility & Loss' },
      },
      {
        id: 'fq16',
        question: 'Which authorities regulate legitimate beginner brokers across StoxIQ’s three regions?',
        options: [
          { id: 'a', text: 'WhatsApp admins and Telegram channel hosts' },
          { id: 'b', text: 'FINRA & SEC (US), FCA (UK), and SEC Nigeria / FSCA (Africa)', correct: true },
          { id: 'c', text: 'No financial authority regulates mobile stock apps' },
          { id: 'd', text: 'App store star ratings alone' },
        ],
        explanation: 'Always confirm your broker is authorised by an official national regulator such as FINRA/SEC, the UK FCA, SEC Nigeria, or South Africa’s FSCA.',
        lessonLink: { route: '/learn/module4/lesson1', label: 'Lesson 4.1: How to Choose a Broker' },
      },
      {
        id: 'fq17',
        question: 'What do Fractional Shares allow a beginner to do?',
        options: [
          { id: 'a', text: 'Avoid all stock price fluctuations' },
          { id: 'b', text: 'Invest a small fixed amount (like $10 or £5) to own a proportional slice of an expensive share', correct: true },
          { id: 'c', text: 'Vote ten times per share' },
          { id: 'd', text: 'Buy stocks without opening a brokerage account' },
        ],
        explanation: 'Fractional shares let you invest according to your budget rather than needing hundreds of dollars for one whole share.',
        lessonLink: { route: '/learn/module4/lesson1', label: 'Lesson 4.1: How to Choose a Broker' },
      },
      {
        id: 'fq18',
        question: 'When would you choose a Limit Order instead of a Market Order?',
        options: [
          { id: 'a', text: 'When you want to buy immediately regardless of current price' },
          { id: 'b', text: 'When you want your buy order to execute ONLY if the stock reaches your target price or lower', correct: true },
          { id: 'c', text: 'When you want guaranteed profits' },
          { id: 'd', text: 'When the company has no ticker symbol' },
        ],
        explanation: 'A market order fills immediately at the current market price; a limit order sets the maximum price you are willing to pay, though it may not fill.',
        lessonLink: { route: '/learn/module4/lesson2', label: 'Lesson 4.2: Market Orders vs Limit Orders' },
      },
      {
        id: 'fq19',
        question: 'Someone DMs you promising a "100% guaranteed 30% monthly stock return" if you send crypto. What should you do?',
        options: [
          { id: 'a', text: 'Test it with $100 first' },
          { id: 'b', text: 'Recognise it immediately as a scam — no legitimate investment guarantees returns', correct: true },
          { id: 'c', text: 'Invite friends to unlock a bonus tier' },
          { id: 'd', text: 'Borrow money to invest faster' },
        ],
        explanation: 'Guaranteed return promises, unsolicited DMs, and crypto/gift-card deposit requests are classic hallmarks of investment fraud.',
        lessonLink: { route: '/risks/scams-red-flags', label: 'Risk 03: Stock Scams & Red Flags' },
      },
      {
        id: 'fq20',
        question: 'According to the Pre-Buy Checklist, which money should you invest in stocks?',
        options: [
          { id: 'a', text: 'Next month’s rent if a stock looks exciting' },
          { id: 'b', text: 'Your emergency medical fund' },
          { id: 'c', text: 'Only money you can afford to leave untouched for at least 1–2+ years in businesses or ETFs you understand', correct: true },
          { id: 'd', text: 'Short-term high-interest borrowed cash' },
        ],
        explanation: 'Never invest rent, emergency funds, or borrowed money. Give quality investments time to grow without being forced to sell in a dip.',
        lessonLink: { route: '/learn/module4/lesson3', label: 'Lesson 4.3: Before You Buy Anything — Read This' },
      },
    ],
  },
}
