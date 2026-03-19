import Image from 'next/image';
import Card from './Card';

export default function AboutCard() {
  return (
    <Card className="card-glass col-span-1 md:col-span-2 p-8 flex flex-col justify-center items-start">
      <div className="flex items-center gap-4 mb-3">
        <Image
          src="/nathan-perfil.jpeg"
          alt="Avatar"
          width={500}
          height={500}
          className="w-20 h-20 rounded-full border-2 border-primary dark:border-zinc-700 object-cover object-bottom"
        />
        <div>
          <span className="font-semibold text-lg text-primary pixel-font">
            Nathan Ferreira
          </span>
          <p className="text-sm text-muted-foreground">Software Developer</p>
        </div>
      </div>
      <p className="text-sm md:text-base text-foreground opacity-90 mt-2">
        Olá! Sou Nathan Ferreira, desenvolvedor Full Stack com paixão por
        tecnologia e aprendizado. Gosto de unir criatividade e organização para
        transformar suas ideias em sistemas eficientes e bem pensados.
      </p>
    </Card>
  );
}
