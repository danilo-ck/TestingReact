import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../components/Container.jsx';
import Header from '../components/Header.jsx';
import Hero from '../components/Hero.jsx';
import Features from '../components/Features.jsx';
import HowItWorks from '../components/HowItWorks.jsx';
import Testimonials from '../components/Testimonials.jsx';
import Footer from '../components/Footer.jsx';

const LandingPage = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header 
        isLanding={true}
        onNavigateToLogin={goToLogin}
      />
      
      {/* Hero Section */}
      <section className="bg-white">
          <Hero
            title="Gestiona tu instalación deportiva"
            highlightedText="de forma inteligente"
            description="La plataforma completa para administrar reservas, horarios y usuarios de tu centro deportivo"
            secondaryDescription="Únete a más de 500 instalaciones deportivas que ya optimizan sus reservas con nuestra solución"
            primaryButtonText="Comenzar prueba gratuita"
            primaryButtonAction={goToLogin}
            secondaryButtons={[
              {
                text: "Ver demo",
                action: goToLogin,
                variant: "secondary"
              },
              {
                text: "¿Ya tienes cuenta?",
                action: goToLogin,
                variant: "ghost"
              }
            ]}
          />
      </section>

      {/* Components */}
      <Features />
      <HowItWorks />
      <Testimonials />
      <Footer onNavigateToLogin={goToLogin} />
    </div>
  );
};

export default LandingPage;
