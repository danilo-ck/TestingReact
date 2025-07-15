import React from 'react';

const Features = () => {
  const features = [
    {
      icon: "📅",
      title: "Gestión de Reservas",
      description: "Control total sobre horarios, disponibilidad y reservas de tus instalaciones"
    },
    {
      icon: "👥",
      title: "Gestión de Usuarios",
      description: "Administra fácilmente los datos y membresías de todos tus clientes"
    },
    {
      icon: "💰",
      title: "Control de Pagos",
      description: "Seguimiento completo de pagos, facturas y estado financiero"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Todo lo que necesitas para gestionar tu instalación
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Simplifica la administración de tu centro deportivo con nuestras herramientas especializadas
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div className="text-primary-600 text-xl">{feature.icon}</div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
