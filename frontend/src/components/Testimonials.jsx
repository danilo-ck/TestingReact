import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Carlos Martínez",
      company: "Club Deportivo Los Pinos",
      initials: "CM",
      quote: "Desde que usamos ReservApp, nuestras reservas se han incrementado un 40%. La gestión es mucho más eficiente y nuestros socios están muy contentos."
    },
    {
      name: "Laura García",
      company: "Centro Deportivo Élite",
      initials: "LG",
      quote: "La plataforma es súper intuitiva. Ahorramos 5 horas semanales en gestión y ya no tenemos problemas con las reservas duplicadas."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-lg text-gray-600">
            Instalaciones deportivas que ya confían en ReservApp
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.company}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "{testimonial.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
