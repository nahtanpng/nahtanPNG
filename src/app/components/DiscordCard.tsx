'use client';

import { SiDiscord } from 'react-icons/si';
import Image from 'next/image';

export default function DiscordCard() {
  return (
    <div className="relative rounded-2xl shadow-lg border dark:border-zinc-700 overflow-hidden min-h-[200px] transition-all duration-500 group">
      <div className="absolute inset-0">
        <Image
          src="/banner-servidor-dos-programadores.png"
          alt={`Ícone do servidor dos programadores`}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-110"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/50" />
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute inset-0 bg-gradient-to-br from-[#0064ec]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="relative z-10 p-4 flex flex-col gap-3 h-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SiDiscord size={20} className="text-[#5865f2]" />
            <span className="text-sm font-semibold text-white pixel-font drop-shadow-lg">
              Servidor
            </span>
          </div>
        </div>

        <footer className="flex items-center justify-between mt-auto">
          <a
            href="https://discord.gg/programador"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-button flex items-center gap-2 px-4 py-2 text-white bg-[#5865f2] rounded-full text-xs font-bold transition-all duration-300 hover:scale-105"
          >
            <SiDiscord size={12} />
            Entrar no servidor
          </a>
        </footer>
      </div>
    </div>
  );
}
