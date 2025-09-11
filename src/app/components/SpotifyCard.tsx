'use client';

import { useState, useEffect } from 'react';
import Card from './Card';
import { SiSpotify } from 'react-icons/si';
import { PlayIcon, PauseIcon, MusicNoteIcon } from '@phosphor-icons/react';
import Image from 'next/image';

interface SpotifyTrack {
  name: string;
  artist: string;
  album: string;
  image: string;
  url: string;
  isPlaying: boolean;
  playedAt?: string;
}

export default function SpotifyCard() {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [useDemo, setUseDemo] = useState(false);

  useEffect(() => {
    fetchLastPlayed();
    const interval = setInterval(fetchLastPlayed, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchLastPlayed = async () => {
    try {
      const response = await fetch('/api/spotify/last-played');

      if (response.ok) {
        const data = await response.json();
        setTrack(data);
        setError(false);
        setUseDemo(false);
      } else {
        console.log('API não disponível, usando dados de demonstração');
        setUseDemo(true);
        setError(false);
      }

      setLoading(false);
    } catch (err) {
      console.error('Erro ao buscar última música:', err);
      console.log('Usando dados de demonstração');
      setUseDemo(true);
      setError(false);
      setLoading(false);
    }
  };

  const formatPlayedAt = (playedAt: string) => {
    const date = new Date(playedAt);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return 'Agora mesmo';
    if (diffInMinutes < 60) return `${diffInMinutes}m atrás`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h atrás`;
    return `${Math.floor(diffInMinutes / 1440)}d atrás`;
  };

  if (loading) {
    return (
      <Card className="card-glass p-6 flex flex-col items-center justify-center min-h-[200px]">
        <div className="flex flex-col items-center justify-center">
          <SiSpotify size={32} className="text-[#1DB954] animate-pulse mb-2" />
          <p className="text-sm text-muted-foreground">Carregando música...</p>
        </div>
      </Card>
    );
  }

  if (error || !track) {
    return (
      <Card className="card-glass p-6 flex flex-col items-center justify-center min-h-[200px]">
        <div className="flex flex-col items-center justify-center">
          <SiSpotify size={32} className="text-[#1DB954] mb-2" />
          <p className="text-sm text-muted-foreground text-center">
            Não foi possível carregar a música
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="spotify-card relative rounded-2xl shadow-lg border dark:border-zinc-700 overflow-hidden min-h-[200px] transition-all duration-500 group">
      {track.image && (
        <div className="spotify-card-background absolute inset-0">
          <Image
            src={track.image}
            alt={`Capa do álbum ${track.album}`}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-110"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/50" />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="absolute inset-0 bg-gradient-to-br from-[#1DB954]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      )}

      {!track.image && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1DB954]/20 via-black/90 to-black">
          <div className="absolute inset-0 flex items-center justify-center">
            <MusicNoteIcon size={120} className="text-white/10" />
          </div>
        </div>
      )}

      <div className="relative z-10 p-4 flex flex-col gap-3 h-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SiSpotify size={20} className="text-[#1DB954] animate-pulse" />
            <span className="text-sm font-semibold text-white pixel-font drop-shadow-lg">
              {track.isPlaying ? 'Tocando agora' : 'Última música'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {track.isPlaying ? (
              <PlayIcon size={16} className="text-[#1DB954] drop-shadow-lg" />
            ) : (
              <PauseIcon size={16} className="text-white/80 drop-shadow-lg" />
            )}
            {useDemo && (
              <span className="text-xs text-yellow-400 font-bold drop-shadow-lg px-2 py-1 bg-yellow-400/20 rounded-full backdrop-blur-sm">
                DEMO
              </span>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center gap-1">
          <h3 className="font-bold text-white text-lg leading-tight drop-shadow-lg truncate">
            {track.name}
          </h3>
          <p className="text-white/90 text-sm font-medium drop-shadow-lg truncate">
            {track.artist}
          </p>
          <p className="text-white/80 text-sm drop-shadow-lg truncate">
            {track.album}
          </p>
          {track.playedAt && !track.isPlaying && (
            <p className="text-white/70 text-xs mt-1 drop-shadow-lg">
              {formatPlayedAt(track.playedAt)}
            </p>
          )}
        </div>

        <footer className="flex items-center justify-between mt-auto">
          <a
            href={track.url}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-button flex items-center gap-2 px-4 py-2 text-white bg-[#1DB954] rounded-full text-xs font-bold transition-all duration-300 hover:scale-105"
          >
            <SiSpotify size={12} />
            Abrir no Spotify
          </a>
        </footer>
      </div>
    </div>
  );
}
