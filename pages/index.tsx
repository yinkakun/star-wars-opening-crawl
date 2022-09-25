import gsap from 'gsap';
import Image from 'next/image';
import { useSound } from 'use-sound';
import { useRef, forwardRef, Fragment } from 'react';
import useIsomorphicLayoutEffect from 'use-isomorphic-layout-effect';

gsap.config({
  force3D: true,
});

const openingCrawlAnimation = (element: HTMLElement) => {
  const timeline = gsap.timeline();
  const selector = gsap.utils.selector(element);
  const scene = selector('.gsap-opening-crawl-scene');
  const starWarsLogo = selector('.gsap-star-wars-logo');
  const openingCrawl = selector('.gsap-opening-crawl');

  return timeline
    .to(element, {
      autoAlpha: 1,
      zIndex: 1,
    })
    .from(starWarsLogo, {
      scale: 1.3,
      autoAlpha: 0,
    })
    .to(starWarsLogo, {
      autoAlpha: 1,
      duration: 0.5,
    })
    .to(
      starWarsLogo,
      {
        scale: 0.1,
        duration: 5,
      },
      '+=0.5',
    )
    .to(
      starWarsLogo,
      {
        autoAlpha: 0,
        duration: 0.3,
      },
      '+=0.5',
    )
    .set(openingCrawl, {
      autoAlpha: 0,
      rotateX: 45,
      translateZ: 100,
      marginTop: 100,
      y: 0,
    })
    .to(openingCrawl, {
      autoAlpha: 1,
      duration: 0.3,
    })
    .fromTo(
      scene,
      {
        top: '60%',
      },
      {
        top: '-20%',
        duration: 30,
      },
      '-=5',
    )
    .to(
      openingCrawl,
      {
        duration: 40,
        translateZ: -500,
      },
      '=',
    )
    .to(scene, { scale: 0.2, duration: 60 }, '=')
    .to(scene, { autoAlpha: 0, duration: 10 }, '-=10');
};

interface ILightSaberAnimation {
  lightSaberTurnOffSound: () => void;
  lightSaberTurnOnSound: () => void;
  lightSaberHumSound: () => void;
  pauseLightSaberHumSound: () => void;
  element: HTMLElement;
}

const lightSaberAnimation = ({
  element,
  lightSaberTurnOffSound,
  lightSaberTurnOnSound,
  lightSaberHumSound,
  pauseLightSaberHumSound,
}: ILightSaberAnimation) => {
  const timeline = gsap.timeline({
    defaults: {
      ease: 'none',
      duration: 1,
    },
  });
  const selector = gsap.utils.selector(element);
  const lightSaber = selector('.gsap-light-saber');
  const lightSaberBlade = selector('.gsap-light-saber-blade');
  const lightSaberHandle = selector('.gsap-light-saber-handle');
  const backgroundLight = selector('.gsap-background-light');

  return timeline
    .to(element, {
      autoAlpha: 1,
      zIndex: 1,
    })
    .fromTo(
      lightSaberHandle,
      {
        opacity: 0,
      },
      {
        autoAlpha: 1,
        duration: 0.5,
        delay: 0.2,
      },
    )
    .from(lightSaberBlade, {
      scaleY: 0,
      transformOrigin: 'bottom',
      opacity: 0,
    })
    .call(lightSaberTurnOnSound)
    .to(
      lightSaberBlade,
      {
        scaleY: 1,
        autoAlpha: 1,
        ease: 'power2.inOut',
        transformOrigin: 'bottom',
        duration: 1,
      },
      '+=0.3',
    )
    .to(
      backgroundLight,
      {
        autoAlpha: 1,
        duration: 1,
      },
      '<',
    )
    .call(lightSaberHumSound)
    .to(
      lightSaber,
      {
        rotation: 30,
        duration: 1,
        ease: 'power3.out',
      },
      '>',
    )
    .to(
      lightSaber,
      {
        rotation: -30,
        duration: 1,
        ease: 'power3.out',
      },
      '>',
    )
    .to(
      lightSaber,
      {
        rotation: 50,
        duration: 1,
        ease: 'power3.out',
      },
      '>',
    )
    .to(
      lightSaber,
      {
        rotation: -50,
        duration: 1,
        ease: 'power3.out',
      },
      '>',
    )
    .to(
      lightSaber,
      {
        rotation: 360,
        duration: 2,
        ease: 'sine.inOut',
      },
      '>',
    )
    .call(pauseLightSaberHumSound)
    .call(lightSaberTurnOffSound)
    .to(lightSaberBlade, {
      scaleY: 0,
      autoAlpha: 0,
    })
    .to(
      backgroundLight,
      {
        autoAlpha: 0,
        duration: 1,
      },
      '<',
    )
    .to(
      lightSaber,
      {
        autoAlpha: 0,
      },
      '+=0.5',
    )
    .to(element, {
      autoAlpha: 0,
      zIndex: 0,
    });
};

const introductionTitleAnimation = (element: HTMLElement) => {
  const timeline = gsap.timeline();
  const selector = gsap.utils.selector(element);
  const title = selector('.gsap-introduction-title');

  return timeline
    .to(element, {
      autoAlpha: 1,
      zIndex: 1,
    })
    .fromTo(
      title,
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        duration: 1,
      },
    )
    .to(
      title,
      {
        autoAlpha: 0,
      },
      '+=1.5',
    )
    .to(element, {
      autoAlpha: 0,
      zIndex: 0,
    });
};

const HomePage = () => {
  const animationTimelineRef = useRef<gsap.core.Timeline>();
  const lightSaberRef = useRef<HTMLDivElement>(null);
  const introductionRef = useRef<HTMLDivElement>(null);
  const openingCrawlRef = useRef<HTMLDivElement>(null);

  const [playStarWarsThemeSong] = useSound('/audios/star-wars-theme.mp3', {
    volume: 0.3,
    loop: true,
  });

  const [playLightSaberHumSound, { pause: pauseLightSaberHum }] = useSound(
    '/audios/lightsaber-hum.mp3',
  );
  const [playLightSaberOnSound] = useSound('/audios/lightsaber-turn-on.mp3');
  const [playLightSaberOffSound] = useSound('/audios/lightsaber-turn-off.mp3');

  useIsomorphicLayoutEffect(() => {
    playStarWarsThemeSong();

    animationTimelineRef.current = gsap.timeline({
      paused: true,
      defaults: {
        ease: 'none',
      },
    });

    animationTimelineRef.current
      .add(
        lightSaberAnimation({
          element: lightSaberRef.current!,
          lightSaberTurnOffSound: playLightSaberOffSound,
          lightSaberTurnOnSound: playLightSaberOnSound,
          lightSaberHumSound: playLightSaberHumSound,
          pauseLightSaberHumSound: pauseLightSaberHum,
        }),
      )
      .add(introductionTitleAnimation(introductionRef.current!), '-=1')
      .call(playStarWarsThemeSong)
      .add(openingCrawlAnimation(openingCrawlRef.current!), '-=1');

    return () => {
      animationTimelineRef.current?.kill();
    };
  }, [
    playLightSaberHumSound,
    pauseLightSaberHum,
    playLightSaberOnSound,
    playLightSaberOffSound,
    playStarWarsThemeSong,
  ]);

  return (
    <Fragment>
      <PageCover animationTimeline={animationTimelineRef.current!} />
      <LightSaber ref={lightSaberRef} />
      <IntroductionTitle ref={introductionRef} />
      <OpeningCrawl ref={openingCrawlRef} />
    </Fragment>
  );
};

export default HomePage;

const LightSaber = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      className="fixed inset-0 z-0 flex h-screen w-full items-center justify-center bg-black"
      ref={ref}
    >
      <div className="radial-background gsap-background-light fixed inset-0 -z-10 h-full w-full opacity-0" />

      <div className="gsap-light-saber z-10 flex flex-col items-center">
        <div className="gsap-light-saber-blade rounded-t-[100px] shadow-[0_-10px_30px] shadow-sky-100">
          <div className="rounded-t-[100px] shadow-[0_-5px_20px] shadow-sky-300">
            <div className="h-[50vh] w-4 rounded-t-[100px]  border-b-4 border-slate-500 bg-sky-200 shadow-[0_0_10px] shadow-sky-500" />
          </div>
        </div>

        <div className="gsap-light-saber-handle flex h-20 w-4 flex-col items-center justify-center gap-2 rounded-b-[4px] border-2 border-t-4 border-slate-500 bg-slate-700">
          <div className="h-2 w-2 animate-pulse rounded-full  bg-sky-300" />
          <div className="h-2 w-2 animate-pulse rounded-full  bg-sky-300" />
        </div>
      </div>
    </div>
  );
});

LightSaber.displayName = 'LightSaber';

const IntroductionTitle = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      className="fixed inset-0 z-0 flex h-screen w-full items-center justify-center bg-black"
      ref={ref}
    >
      <div className="mx-auto w-fit px-4">
        <h1 className="gsap-introduction-title glow-blue flex flex-col gap-1 text-2xl text-[#4bd5ee] md:text-4xl lg:text-6xl">
          <span> A long time ago in a galaxy far,</span> <span>far away...</span>
        </h1>
      </div>
    </div>
  );
});

IntroductionTitle.displayName = 'Introduction';

const OpeningCrawl = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      className="fixed inset-0 -z-10 flex h-screen w-full animate-background-image-move flex-col items-center justify-center overflow-hidden bg-black bg-[url('/images/background.png')] bg-repeat"
      ref={ref}
    >
      <div className="gsap-star-wars-logo absolute top-1/2 flex w-[80%] -translate-y-1/2 items-center justify-center">
        <Image src="/images/star-wars-logo.svg" alt="hello" width={1000} height={500} />
      </div>

      <div className="perspective gsap-opening-crawl-scene absolute left-0 right-0 ">
        <div className="gsap-opening-crawl preserve-3d flex w-full flex-col gap-8 px-5 text-4xl font-semibold leading-loose text-[#E5B13A] opacity-0 md:text-6xl lg:text-7xl">
          <h2 className="text-center uppercase">Episode IV</h2>
          <div className="flex flex-col gap-12 md:gap-20">
            <p>
              It is a period of civil war. Rebel spaceships, striking from a hidden base,
              have won their first victory against the evil Galactic Empire.
            </p>

            <p>
              During the battle, Rebel spies managed to steal secret plans to the Empire`s
              ultimate weapon, the DEATH STAR, and space station with enough power to
              destroy an entire planet.
            </p>
            <p>
              Pursued by the Empire`s sinister agents, Princess Leia races home aboard her
              starship, custodian of the stolen plans that can save her people and restore
              freedom to the galaxy….
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

OpeningCrawl.displayName = 'OpeningCrawl';

interface PageCoverProps {
  animationTimeline: gsap.core.Timeline;
}

const PageCover = ({ animationTimeline }: PageCoverProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const playAnimation = () => {
    gsap
      .to(containerRef.current!, {
        autoAlpha: 0,
        duration: 0.1,
      })
      .then(() => {
        animationTimeline.play();
      });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-transparent"
      ref={containerRef}
    >
      <button
        type="button"
        onClick={playAnimation}
        className="gsap-animation-play-button border border-white px-6 py-2 uppercase text-white"
      >
        Enter The Force
      </button>
    </div>
  );
};
