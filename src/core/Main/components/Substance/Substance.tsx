import React, { useRef } from 'react';
import smoothScrollIntoView from '../../../../helper/smoothScroll';
import CardsContainer from './Webinars';
import Footer from './Footer';
import HeadLine from './HeadLine';
import RegisterForm from './RegisterForm';
import VideoSection from './VideoSection';

export default function Substance(): JSX.Element {
  const registerRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <HeadLine />
      <CardsContainer onClick={() => smoothScrollIntoView(registerRef)} />
      <VideoSection />
      <div ref={registerRef} />
        <RegisterForm />
      <Footer />
    </>
  );
}
