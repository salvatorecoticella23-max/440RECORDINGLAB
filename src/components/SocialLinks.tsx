import { Instagram, Youtube } from 'lucide-react';

export interface SocialLink {
  label: string;
  href: string;
  icon: 'instagram' | 'tiktok' | 'spotify' | 'youtube';
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/440_recordinglab?dlrf=MWYxNHkycG5jMWNlcA%3D%3D&utm_source=qr',
    icon: 'instagram',
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@440_recordinglab?_r=1&_t=ZN-9AWhIIuzGAI',
    icon: 'tiktok',
  },
  {
    label: 'Spotify',
    href: 'https://open.spotify.com/playlist/5C5EBVgz1ZTAQHQfzZLpc1?si=3P3AQTzXQ0qFhTqt-PJziA&utm_source=copy-link&pt=62f8a0a28ff5a33fe34a0f7bbc5d89a8&pi=bnHelN_3QDydp',
    icon: 'spotify',
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@440recordinglab?si=7JXtSmAPvTs_r0q4',
    icon: 'youtube',
  },
];

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z" />
    </svg>
  );
}

function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm5.53 17.34a.75.75 0 0 1-1.03.25c-2.82-1.72-6.37-2.11-10.55-1.16a.75.75 0 1 1-.33-1.46c4.57-1.04 8.5-.59 11.66 1.34.36.22.47.7.25 1.03zm1.47-3.27a.94.94 0 0 1-1.29.31c-3.23-1.98-8.15-2.56-11.97-1.4a.94.94 0 1 1-.55-1.8c4.38-1.33 9.82-.69 13.5 1.57.44.27.58.85.31 1.32zm.13-3.39C15.24 8.49 8.8 8.27 5.16 9.34a1.12 1.12 0 1 1-.65-2.15c4.17-1.26 11.29-1 15.7 1.61a1.12 1.12 0 1 1-1.11 1.94z" />
    </svg>
  );
}

export default function SocialLinks({
  size = 'md',
}: {
  size?: 'sm' | 'md';
}) {
  const box = size === 'sm' ? 'w-10 h-10' : 'w-11 h-11';
  const icon = size === 'sm' ? 'w-[18px] h-[18px]' : 'w-5 h-5';

  const renderIcon = (name: SocialLink['icon']) => {
    switch (name) {
      case 'instagram':
        return <Instagram className={icon} />;
      case 'tiktok':
        return <TikTokIcon className={icon} />;
      case 'spotify':
        return <SpotifyIcon className={icon} />;
      case 'youtube':
        return <Youtube className={icon} />;
    }
  };

  return (
    <div className="flex gap-3">
      {SOCIAL_LINKS.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          title={s.label}
          className={`${box} rounded-xl bg-ink-card border border-ink-border flex items-center justify-center text-white/50 hover:text-neon hover:border-neon/40 hover:shadow-neon-sm transition-all duration-300`}
        >
          {renderIcon(s.icon)}
        </a>
      ))}
    </div>
  );
}
