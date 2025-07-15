import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Configura tu instalación",
      description: "Añade tus canchas, horarios y tarifas en minutos"
    },
    {
      number: 2,
      title: "Invita a tus clientes",
      description: "Tus usuarios podrán reservar online 24/7"
    },
    {
      number: 3,
      title: "Gestiona y cobra",
      description: "Administra todo desde un panel único y sencillo"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Cómo funciona ReservApp
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            En solo 3 pasos tendrás tu sistema de reservas funcionando
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
