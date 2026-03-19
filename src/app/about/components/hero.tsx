'use client';

import Image from 'next/image';

import {
  BracketsAngleIcon,
  CalendarIcon,
  MapPinIcon,
} from '@phosphor-icons/react';
import { useFadeInOnScroll } from '@/app/utils/useFadeInOnScroll';

export default function HeroSection() {
  const aboutRef = useFadeInOnScroll();

  return (
    <section
      className="flex flex-col md:flex-row align-center justify-between w-full gap-5 md:mt-8 fade-in-section"
      ref={aboutRef}
    >
      <Image
        src="/nathan.jpeg"
        alt="Avatar"
        width={1000}
        height={1000}
        className="rounded-md w-[420px] h-auto object-cover"
      />
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold mt-8 mb-4 pixel-font">Sobre mim</h1>
        <section className="flex-col gap-4 flex text-muted-foreground">
          <p>
            Minha jornada na programação começou na ETEC, onde descobri o poder
            de transformar ideias em código. Desde então, tenho me dedicado a
            aprender constantemente e criar soluções que fazem a diferença.
          </p>
          <p>
            Atualmente trabalho como desenvolvedor full stack na OSS Brasil,
            onde desenvolvo aplicações web modernas usando React, Next.js,
            Node.js e outras tecnologias. Gosto de enfrentar desafios técnicos e
            transformar problemas complexos em soluções elegantes.
          </p>
          <p>
            Quando não estou codando, você pode me encontrar explorando novas
            tecnologias, contribuindo para projetos open source ou criando bots
            para Discord. Acredito que a tecnologia tem o poder de melhorar
            vidas e é isso que me motiva todos os dias.
          </p>
        </section>
        <div className="flex flex-wrap gap-3">
          <div className="card flex items-center gap-2 px-4 py-2  backdrop-blur-sm rounded-full border border-zinc-700/50">
            <MapPinIcon size={16} className="text-icon" />
            <span className="text-sm text-foreground">São Paulo, SP</span>
          </div>
          <div className="card flex items-center gap-2 px-4 py-2  backdrop-blur-sm rounded-full border border-zinc-700/50">
            <CalendarIcon size={16} className="text-icon" />
            <span className="text-sm text-foreground">20 anos</span>
          </div>
          <div className="card flex items-center gap-2 px-4 py-2  backdrop-blur-sm rounded-full border border-zinc-700/50">
            <BracketsAngleIcon size={16} className="text-icon" />
            <span className="text-sm text-foreground">3+ anos programando</span>
          </div>
        </div>
      </div>
    </section>
  );
}
