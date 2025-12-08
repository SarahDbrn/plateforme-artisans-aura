function HowToFindArtisan() {
  const steps = [
    {
      number: '1',
      title: 'Choisir une catégorie',
      text: 'Sélectionnez la catégorie d’artisanat dans le menu (Bâtiment, Services, Fabrication, Alimentation).',
    },
    {
      number: '2',
      title: 'Choisir un artisan',
      text: 'Parcourez la liste des artisans et consultez leurs fiches détaillées.',
    },
    {
      number: '3',
      title: 'Envoyer une demande',
      text: 'Remplissez le formulaire de contact pour poser vos questions ou demander un devis.',
    },
    {
      number: '4',
      title: 'Recevoir une réponse',
      text: 'L’artisan vous répondra sous 48 heures, directement par e-mail.',
    },
  ];

  return (
    <section className="howto-section py-5">
      <div className="container">
        <h2 className="howto-title mb-4">
          Comment trouver mon artisan&nbsp;?
        </h2>

        <div className="row g-3 g-md-4">
          {steps.map((step) => (
            <div key={step.number} className="col-12 col-md-6 col-lg-3">
              <div className="howto-card h-100">
                <div className="howto-number">
                  {step.number}
                </div>
                <h3 className="howto-card-title">
                  {step.title}
                </h3>
                <p className="howto-card-text">
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowToFindArtisan;
