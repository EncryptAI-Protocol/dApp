import { createConfig, http } from 'wagmi'
import { mainnet, sepolia, moonbaseAlpha } from 'wagmi/chains'

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}

export const config = createConfig({
  chains: [mainnet, sepolia, moonbaseAlpha],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [moonbaseAlpha.id]: http(),
  },
})