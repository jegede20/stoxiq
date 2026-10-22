export interface RiskMistake {
  num: string
  title: string
  what: string
  fix: string
}

export interface RiskSection {
  type: 'section' | 'warning' | 'red-flag' | 'protect' | 'mistake-list' | 'cautionary-stat'
  title: string
  body?: string
  flags?: string[]
  tips?: string[]
  note?: string
  mistakes?: RiskMistake[]
  statValue?: string
  statLabel?: string
}

export interface RiskTopic {
  id: string
  number: string
  title: string
  headline: string
  subtitle: string
  description: string
  tagVariant: 'high-risk' | 'very-common' | 'fraud-alert'
  tagLabel: string
  iconName: 'Flame' | 'AlertOctagon' | 'ShieldAlert' | 'TrendingDown'
  route: string
  duration: string
  sections: RiskSection[]
}

export const RISKS: RiskTopic[] = [
  {
    id: 'emotional-trading',
    number: '01',
    title: 'Emotional Trading',
    headline: 'Your Emotions Are Your Biggest Enemy',
    subtitle: 'How fear and greed destroy beginner portfolios — and how to protect yourself.',
    description: 'Panic selling in downturns and FOMO buying at peaks turn normal market swings into permanent losses.',
    tagVariant: 'high-risk',
    tagLabel: 'HIGH RISK',
    iconName: 'Flame',
    route: '/risks/emotional-trading',
    duration: '~4 min read',
    sections: [
      {
        type: 'section',
        title: 'The Two Emotions That Hurt Investors Most',
        body: `In the stock market, your brain is wired to work against you. Two emotions in particular cause more financial damage than any market crash:
FEAR → makes you sell when you shouldn't.
GREED → makes you buy when you shouldn't.`,
      },
      {
        type: 'cautionary-stat',
        title: 'THE COST OF EMOTIONAL REACTIONS',
        statValue: 'Buy High, Sell Low',
        statLabel: 'Fear and FOMO push beginners to enter after +300% hype spikes and exit during -15% routine pullbacks.',
      },
      {
        type: 'section',
        title: 'Fear — The Panic Seller',
        body: `A stock you own drops 15% in one week. Every instinct screams: "Sell it before it gets worse!" So you sell. At a loss. Two months later, the stock has fully recovered and is now 10% higher than when you bought it. This is panic selling — and it's the #1 way beginners turn a temporary loss into a permanent one. The market goes up and down constantly. Short-term drops are normal. Expected. Healthy. Selling every time a stock dips is a guaranteed way to lose money over time.`,
      },
      {
        type: 'section',
        title: 'Greed — The FOMO Buyer',
        body: `A stock you've been watching has gone up 300% in the last month. You didn't buy early, but now everyone's talking about it. You feel like you're missing out. So you buy at the peak. The next week, the hype fades. The price crashes. You bought at the top and are now holding a large loss. This is FOMO — Fear of Missing Out. It causes beginners to buy high and sell low — the exact opposite of good investing.`,
      },
      {
        type: 'warning',
        title: 'CAUTIONARY REALITY',
        body: `In early 2021, retail buyers who chased viral social-media momentum near $400–$480 watched shares plunge over 80% within days once the crowd moved on.`,
      },
      {
        type: 'red-flag',
        title: 'RED FLAG DETECTOR',
        body: "Signs you're making an emotion-driven decision:",
        flags: [
          'You feel rushed or panicked',
          "You're basing the decision on recent price alone",
          'You heard about it from social media or a group chat',
          "You're ignoring your original investment plan",
          'You feel either very excited or very scared',
        ],
        note: 'If any of these apply — step back. Wait 24 hours before acting.',
      },
      {
        type: 'protect',
        title: 'HOW TO PROTECT YOURSELF',
        tips: [
          'Make investment decisions when calm, not during market hours',
          'Set a simple plan before you invest — and stick to it',
          'Avoid checking your portfolio every hour',
          'Remember: short-term drops are normal, not emergencies',
          'Ask: "Would I still buy this if no one else was talking about it?"',
        ],
      },
    ],
  },
  {
    id: 'beginner-mistakes',
    number: '02',
    title: 'Common Beginner Mistakes',
    headline: 'The Mistakes Almost Every Beginner Makes',
    subtitle: 'Know them now. Avoid them from day one.',
    description: 'Six predictable traps that trip up first-time investors — and the simple habits that prevent every one of them.',
    tagVariant: 'very-common',
    tagLabel: 'VERY COMMON',
    iconName: 'AlertOctagon',
    route: '/risks/beginner-mistakes',
    duration: '~4 min read',
    sections: [
      {
        type: 'cautionary-stat',
        title: 'SHORT-TERM TRADING REALITY',
        statValue: '70–80%',
        statLabel: 'Of short-term day traders lose money over the long run when impatience overrides a calm, diversified plan.',
      },
      {
        type: 'mistake-list',
        title: 'Six Mistakes to Eliminate Before Your First Trade',
        mistakes: [
          {
            num: '01',
            title: "Investing money you can't afford to lose",
            what: 'Emergency comes up → forced to sell at a loss',
            fix: 'Only invest money you can leave alone for 1–2 years+',
          },
          {
            num: '02',
            title: 'Checking your portfolio every hour',
            what: 'Every small dip triggers anxiety and bad decisions',
            fix: 'Check weekly at most when starting out',
          },
          {
            num: '03',
            title: 'Going all-in on one stock',
            what: 'One bad event wipes out your entire investment',
            fix: 'Diversify — ETFs make this simple',
          },
          {
            num: '04',
            title: 'Following "hot tips" without research',
            what: 'You buy at the peak of hype right before it crashes',
            fix: 'Research every stock before buying — no exceptions',
          },
          {
            num: '05',
            title: 'Expecting quick profits',
            what: 'Impatience leads to trading instead of investing',
            fix: 'Set a minimum holding period (e.g., 1 year) before you even think about selling',
          },
          {
            num: '06',
            title: "Not understanding what you're buying",
            what: "You can't make rational decisions about a company you know nothing about",
            fix: 'Only buy companies whose business you can explain in one sentence',
          },
        ],
      },
      {
        type: 'warning',
        title: 'WARNING',
        body: `Never invest rent money, emergency savings, school fees, or borrowed funds. Forced selling during a temporary market dip turns paper fluctuations into real financial harm.`,
      },
      {
        type: 'red-flag',
        title: 'RED FLAG DETECTOR',
        body: 'Check yourself before placing your next order:',
        flags: [
          'You will need this cash back within the next 6–12 months',
          'You cannot explain how the company makes money in one sentence',
          '100% of your account is concentrated in one single stock',
          'You check live prices more than once a day',
        ],
        note: 'Pause and switch to a broad market ETF or reduce your position size if any apply.',
      },
      {
        type: 'protect',
        title: 'HOW TO PROTECT YOURSELF',
        tips: [
          'Keep an emergency cash buffer completely separate from your brokerage account',
          'Use broad index ETFs as the core 70–100% foundation of your first portfolio',
          'Set a minimum 1–2 year horizon before evaluating performance',
          'Run the 6-point Pre-Buy Checklist before every purchase',
        ],
      },
    ],
  },
  {
    id: 'scams-red-flags',
    number: '03',
    title: 'Stock Scams & Red Flags',
    headline: 'How to Spot a Stock Scam',
    subtitle: 'The tricks used to steal money from beginner investors — and how to avoid them.',
    description: 'Recognise pump-and-dump schemes, fake WhatsApp/Telegram trading groups, and unregulated clone brokers instantly.',
    tagVariant: 'fraud-alert',
    tagLabel: 'FRAUD ALERT',
    iconName: 'ShieldAlert',
    route: '/risks/scams-red-flags',
    duration: '~5 min read',
    sections: [
      {
        type: 'section',
        title: 'Scams Are Everywhere in Finance',
        body: `Wherever there is money, there are people trying to take it dishonestly. The stock market is no exception. As a beginner, you are the primary target for these scams.`,
      },
      {
        type: 'cautionary-stat',
        title: 'THE GOLDEN RULE OF FRAUD DETECTION',
        statValue: '0% Guaranteed',
        statLabel: 'Zero legitimate stock investments guarantee returns. Any promise of "guaranteed 20%–100% profit" is fraud.',
      },
      {
        type: 'section',
        title: 'The Pump and Dump',
        body: `How it works: a group of people secretly buy a large amount of a cheap, obscure stock. They then flood social media with posts about how this stock is "about to explode." Beginners pile in. The price shoots up. The scammers sell ALL their shares at the inflated price. The price crashes immediately. You're left holding a worthless stock.`,
      },
      {
        type: 'red-flag',
        title: 'RED FLAG DETECTOR — Pump & Dump Warning Signs',
        flags: [
          'Urgency — "Buy NOW before it\'s too late!"',
          'Guaranteed returns — "This WILL 5x"',
          'Unknown company with sudden massive hype',
          'Promoted heavily in WhatsApp groups or DMs',
        ],
      },
      {
        type: 'section',
        title: 'Unregulated Broker Scams',
        body: `How it works: a fake broker asks you to deposit money. They show you a fake dashboard where your "investments" are growing rapidly. When you try to withdraw — suddenly there are fees, taxes, or your account gets frozen. The money is gone.`,
      },
      {
        type: 'red-flag',
        title: 'RED FLAG DETECTOR — Fake Broker Warning Signs',
        flags: [
          'You found them through an unsolicited DM or ad',
          'They promise 20%, 50%, or 100%+ returns',
          'They pressure you to recruit friends',
          'They are not registered with a financial regulator',
          'They ask for payment in crypto or gift cards',
        ],
      },
      {
        type: 'warning',
        title: 'THE SIMPLE RULE',
        body: `If someone is promising guaranteed returns on any investment — it's a scam. No legitimate investment in the world comes with a guarantee. Stick to regulated brokers only.`,
      },
      {
        type: 'protect',
        title: 'HOW TO PROTECT YOURSELF',
        tips: [
          'Verify regulation directly with FINRA/SEC (US), FCA (UK), SEC Nigeria, or FSCA (South Africa)',
          'Never deposit money into a platform sent to you via unsolicited DMs, Telegram, or WhatsApp',
          'Never pay "unlock fees" or "withdrawal taxes" to release your own funds',
          'Download broker apps only from official links and verified app stores',
        ],
      },
    ],
  },
  {
    id: 'volatility-loss',
    number: '04',
    title: 'Volatility & Loss',
    headline: "Stocks Go Down. Here's How to Handle It.",
    subtitle: "The truth about volatility, loss, and why it doesn't have to be scary.",
    description: 'Understand normal market swings, unrealised vs realised losses, and why history rewards calm investors.',
    tagVariant: 'high-risk',
    tagLabel: 'HIGH RISK',
    iconName: 'TrendingDown',
    route: '/risks/volatility-loss',
    duration: '~4 min read',
    sections: [
      {
        type: 'section',
        title: 'Price Drops Are Not Accidents',
        body: `New investors often panic when their stock drops in value. What they don't know: drops are completely normal and expected. Even the best stocks in history — Apple, Amazon, Microsoft — have all dropped 30%, 40%, even 50% or more at various points. And they still made their long-term investors rich. A drop is only a permanent loss if you sell.`,
      },
      {
        type: 'cautionary-stat',
        title: 'HISTORICAL DRAWDOWNS IN WORLD-CLASS STOCKS',
        statValue: '-30% to -50%+',
        statLabel: 'Even Apple, Amazon, and Microsoft experienced steep temporary drops on their way to long-term compounding.',
      },
      {
        type: 'section',
        title: 'What Is Volatility?',
        body: `Volatility is how much a stock's price moves up and down. High volatility = big swings. Low volatility = small, gradual movements. Some stocks are naturally more volatile. Young technology companies tend to be more volatile. Large, established companies (like Coca-Cola) tend to be more stable. As a beginner, starting with lower volatility stocks or ETFs means fewer sleepless nights.`,
      },
      {
        type: 'section',
        title: 'Unrealised vs Realised Loss',
        body: `UNREALISED LOSS — the stock has dropped in price but you haven't sold. The loss exists on paper only. It can recover.

REALISED LOSS — you sold the stock after it dropped. The loss is now real and permanent.

This is why panic-selling during a dip is so dangerous: you turn a temporary paper loss into a permanent real one. The market has recovered from every crash in history — every single one.`,
      },
      {
        type: 'red-flag',
        title: 'RED FLAG DETECTOR — Signs Volatility Is Too High for Your Comfort',
        flags: [
          'A 15–20% dip makes you lose sleep or check your phone constantly',
          'Your portfolio holds only high-volatility single tech or meme stocks',
          'You feel tempted to sell everything after one red week in the news',
        ],
        note: 'Volatility is the price of admission for long-term market returns — size your positions so dips stay tolerable.',
      },
      {
        type: 'protect',
        title: 'HOW TO PROTECT YOURSELF — KEY TAKEAWAYS',
        tips: [
          "All stocks go up and down — that's normal",
          'Only sell a falling stock if the reason you bought it has changed',
          'A paper loss is not a real loss until you sell',
          'Time in the market beats timing the market',
          'Start with low-volatility ETFs if drops make you anxious',
        ],
      },
    ],
  },
]
