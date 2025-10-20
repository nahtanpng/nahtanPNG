'use client';

import React from 'react';
import { useFadeInOnScroll } from '@/app/utils/useFadeInOnScroll';
import {
  SiAmazonwebservices,
  SiGooglecloud,
  SiTryhackme,
} from 'react-icons/si';
import Image from 'next/image';
import Link from 'next/link';

import AluraLogo from './AluraLogo';

export default function ProfilesSection() {
  const highlightRef = useFadeInOnScroll();

  const profiles = [
    {
      svg: '/bootdev.svg',
      title: 'Boot.dev',
      url: 'https://www.boot.dev/u/nahtanpng',
    },
    {
      icon: <AluraLogo width={30} height={30} color="#fff" />,
      color: '#00183a',
      title: 'Alura',
      url: 'https://cursos.alura.com.br/user/nahtanpng',
    },
    {
      icon: <SiTryhackme color="#c20808" size={20} />,
      color: '#c20808',
      title: 'Tryhackme',
      url: 'https://tryhackme.com/p/nahtanpng',
    },
    {
      icon: <SiGooglecloud color="#4285F4" size={20} />,
      color: '#4285F4',
      title: 'GCP Skills Boost',
      url: 'https://www.cloudskillsboost.google/public_profiles/1f11381f-0db2-4d43-8bbf-e8e236f214c2',
    },
    {
      icon: <SiAmazonwebservices color="#FF9900" size={20} />,
      color: '#FF9900',
      title: 'AWS Skill Builder',
      url: 'https://skillsprofile.skillbuilder.aws/user/nahtanpng/certification-badges',
    },
  ];

  return (
    <section className="fade-in-section pt-12" ref={highlightRef}>
      <h2 className="text-3xl font-bold mb-4 pixel-font">Perfis</h2>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {profiles.map((profile, idx) => (
          <Link
            key={idx}
            href={profile.url}
            className="card border dark:border-zinc-700 hover:scale-105 cursor-pointer flex items-center gap-3 rounded-xl p-3 text-accent-foreground transition-all duration-75 focus:outline-hidden focus-visible:outline focus-visible:outline-ring relative overflow-hidden"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="p-2 flex items-center justify-center rounded-lg relative overflow-hidden">
              {profile.icon ? (
                <>
                  <span
                    className="absolute inset-0 flex items-center justify-center blur-lg opacity-70 z-0"
                    style={{ fontSize: 44, color: profile.color }}
                  >
                    {profile.color}
                  </span>
                  <span
                    className="z-10 relative flex items-center justify-center"
                    style={{ width: 24, height: 24 }}
                  >
                    {profile.icon}
                  </span>
                </>
              ) : profile.svg ? (
                <>
                  <Image
                    src={profile.svg}
                    alt={profile.title || 'profile'}
                    width={44}
                    height={44}
                    className="absolute inset-0 flex items-center justify-center blur-lg opacity-100 z-0"
                    style={{ objectFit: 'contain', color: profile.color }}
                  />
                  <div
                    className="z-10 relative flex items-center justify-center"
                    style={{ width: 24, height: 24 }}
                  >
                    <Image
                      src={profile.svg}
                      alt={profile.title || 'profile'}
                      width={24}
                      height={24}
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                </>
              ) : null}
            </div>
            <span className="text-xs md:text-sm">{profile.title}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
