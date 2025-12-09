import { Link } from 'react-router-dom';

function FeaturedArtisans() {
  const artisans = [
    {
      id: 1,
      name: 'Atelier Dubois',
      specialty: 'Menuiserie',
      city: 'Lyon (69)',
      rating: 5,
    },
    {
      id: 2,
      name: 'Services & Co',
      specialty: 'Plomberie',
      city: 'Grenoble (38)',
      rating: 5,
    },
    {
      id: 3,
      name: 'Boulangerie Rondeau',
      specialty: 'Boulangerie',
      city: 'Pontoise (95)',
      rating: 4,
    },
  ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i += 1) {
      stars.push(
        <i
          key={i}
          className={`bi ${i <= rating ? 'bi-star-fill' : 'bi-star'}`}
        />,
      );
    }
    return stars;
  };

  return (
    <section className="featured-section pb-5">
      <div className="container">
        <h2 className="featured-title text-center mb-4">
          Les artisans du mois
        </h2>

        <div className="row g-3 featured-row">
          {artisans.map((artisan) => (
            <div key={artisan.id} className="col-12 col-lg-4">
              <Link
                to={`/artisan/${artisan.id}`}
                className="featured-card d-flex align-items-center text-decoration-none"
              >
                <div className="featured-avatar" />

                <div className="featured-content">
                  <h3 className="featured-name mb-1">{artisan.name}</h3>

                  <p className="featured-specialty mb-0">
                    <span className="featured-specialty-link">
                      {artisan.specialty}
                    </span>
                  </p>

                  <p className="featured-city mb-1">{artisan.city}</p>

                  <div className="featured-stars">
                    {renderStars(artisan.rating)}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedArtisans;
