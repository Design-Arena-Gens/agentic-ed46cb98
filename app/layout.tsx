import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Générateur de Prompt Photo Pro',
  description: 'Générez des prompts optimisés pour améliorer vos photos avec ChatGPT',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
