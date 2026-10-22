import React from 'react'
import { cn } from '@/lib/utils'

import robinhoodLogo from '@/assets/brokers/robinhood.png'
import fidelityLogo from '@/assets/brokers/fidelity.png'
import webullLogo from '@/assets/brokers/webull.png'
import freetradeLogo from '@/assets/brokers/freetrade.png'
import trading212Logo from '@/assets/brokers/trading212.png'
import etoroLogo from '@/assets/brokers/etoro.png'
import bambooLogo from '@/assets/brokers/bamboo.svg'
import easyequitiesLogo from '@/assets/brokers/easyequities.png'
import chakaLogo from '@/assets/brokers/chaka.svg'

const BROKER_LOGOS: Record<string, string> = {
  robinhood: robinhoodLogo,
  fidelity: fidelityLogo,
  webull: webullLogo,
  freetrade: freetradeLogo,
  trading212: trading212Logo,
  etoro: etoroLogo,
  'etoro-uk': etoroLogo,
  bamboo: bambooLogo,
  easyequities: easyequitiesLogo,
  chaka: chakaLogo,
}

interface BrokerLogoProps {
  brokerId: string
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  className?: string
}

export const BrokerLogo: React.FC<BrokerLogoProps> = ({
  brokerId,
  name,
  size = 'md',
  className,
}) => {
  const src = BROKER_LOGOS[brokerId]

  const sizeClasses =
    size === 'xs'
      ? 'w-[18px] h-[18px] rounded-[5px]'
      : size === 'sm'
      ? 'w-[26px] h-[26px] rounded-full'
      : size === 'lg'
      ? 'w-[64px] h-[64px] rounded-[18px]'
      : 'w-[42px] h-[42px] rounded-[12px]'

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center overflow-hidden border border-[rgba(255,255,255,0.14)] bg-[#13131F] shrink-0 shadow-[0_2px_10px_rgba(0,0,0,0.35)]',
        sizeClasses,
        className
      )}
    >
      {src ? (
        <img
          src={src}
          alt={`${name} official logo`}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover block"
        />
      ) : (
        <span className="font-sans text-[11px] font-bold text-gold-base">
          {name.slice(0, 2).toUpperCase()}
        </span>
      )}
    </span>
  )
}

export default BrokerLogo
