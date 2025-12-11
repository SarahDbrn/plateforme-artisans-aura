import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArtisanById, sendContactMessage } from '../services/api';
import { Helmet } from "react-helmet-async";


function ArtisanPage() {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);

  // Champs formulaire
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [sending, setSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const renderStars = (rating) => {
    const stars = [];
    const rounded = Math.round(Number(rating || 0));

    for (let i = 1; i <= 5; i += 1) {
      stars.push(
        <i
          key={i}
          className={`bi ${i <= rounded ? 'bi-star-fill' : 'bi-star'}`}
        />,
      );
    }
    return stars;
  };

  useEffect(() => {
    async function fetchArtisan() {
      try {
        const data = await fetchArtisanById(id);
        setArtisan(data);
      } catch (error) {
        console.error('Erreur lors du chargement de la fiche artisan :', error);
        setArtisan(null);
      } finally {
        setLoading(false);
      }
    }

    fetchArtisan();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    setSending(true);

    try {
      await sendContactMessage({
        artisanId: id,
        name,
        email,
        subject,
        message,
      });

      setSuccessMessage(
        'Votre message a bien été envoyé à cet artisan. Une réponse vous sera apportée sous 48h.',
      );
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (error) {
      console.error('Erreur lors de l’envoi du message de contact :', error);
      setErrorMessage(
        "Une erreur est survenue lors de l'envoi du message. Merci de réessayer plus tard.",
      );
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <main className="artisan-page py-5">
        <div className="container">
          <p>Chargement de la fiche artisan...</p>
        </div>
      </main>
    );
  }

  if (!artisan) {
    return (
      <main className="artisan-page py-5">
        <div className="container">
          <p>Artisan introuvable.</p>
        </div>
      </main>
    );
  }

  return (
    <>
    <Helmet>
        <title>
          {artisan
            ? `${artisan.name} – Artisan ${artisan.specialty} à ${artisan.location}`
            : "Fiche artisan – Plateforme Artisans AURA"}
        </title>

        <meta
          name="description"
          content={
            artisan
              ? `Découvrez ${artisan.name}, artisan spécialisé en ${artisan.specialty} à ${artisan.location}. Consultez ses informations et contactez-le facilement via le formulaire.`
              : "Découvrez les fiches détaillées des artisans de la région Auvergne Rhône-Alpes."
          }
        />
      </Helmet>
    <main className="artisan-page py-4 py-lg-5">
      <div className="container">
        <div className="row g-4 g-lg-5 artisan-row">
          {/* COLONNE GAUCHE : photo + infos */}
          <div className="col-12 col-lg-6 artisan-col-info">
            <section className="artisan-info text-center text-lg-start w-100">
              <div className="artisan-photo mx-auto mx-lg-0 mb-3" />

              <h1 className="artisan-name-detail mb-2">{artisan.name}</h1>

              <div className="artisan-stars-detail mb-2">
                {renderStars(artisan.rating)}
              </div>

              <p className="artisan-meta mb-1">
                <span className="fw-semibold">Spécialité :</span>{' '}
                <span className="artisan-specialty-link">
                  {artisan.Speciality?.name}
                </span>
              </p>

              <p className="artisan-meta mb-3">
                <span className="fw-semibold">Localisation :</span>{' '}
                <span className="artisan-location-link">
                  {artisan.city}
                </span>
              </p>

              <h2 className="artisan-about-title mb-2">A propos :</h2>
              <p className="artisan-about-text mb-4">
                {artisan.about ||
                  "Cet artisan n'a pas encore renseigné de description."}
              </p>

              {artisan.website && (
                <section className="artisan-website mb-4">
                  <h3 className="artisan-website-title mb-1">Site web</h3>
                  <a
                    href={artisan.website}
                    target="_blank"
                    rel="noreferrer"
                    className="artisan-website-link"
                  >
                    <i className="bi bi-box-arrow-up-right me-1" />
                    Voir le site web
                  </a>
                </section>
              )}
            </section>
          </div>

          {/* COLONNE DROITE : carte formulaire */}
          <div className="col-12 col-lg-6">
            <section className="artisan-contact-card p-3 p-lg-4 h-100">
              <h2 className="artisan-contact-title mb-3">
                Contactez l’artisan
              </h2>

              <p className="artisan-contact-intro mb-4">
                Remplissez ce formulaire pour demander un devis, des informations
                ou des précisions sur ses prestations. Une réponse vous sera
                apportée sous 48h.
              </p>

              {successMessage && (
                <div className="alert alert-success" role="alert">
                  {successMessage}
                </div>
              )}

              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="contact-name" className="form-label">
                    Nom
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="contact-email" className="form-label">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="contact-subject" className="form-label">
                    Objet
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    className="form-control"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="contact-message" className="form-label">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    className="form-control"
                    rows="5"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>

                <div className="text-end mt-2">
                  <button
                    type="submit"
                    className="btn artisan-contact-submit"
                    disabled={sending}
                  >
                    {sending ? 'Envoi en cours...' : 'Envoyer'}
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}

export default ArtisanPage;
