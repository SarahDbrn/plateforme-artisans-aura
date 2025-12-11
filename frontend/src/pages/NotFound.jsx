import { Helmet } from "react-helmet-async";

function NotFound() {
  return (
    <> <Helmet>
        <title>Page introuvable – Plateforme Artisans AURA</title>
        <meta
          name="description"
          content="La page que vous recherchez n’existe pas ou a été déplacée sur la Plateforme Artisans AURA."
        />
      </Helmet>
    <main>
      <h1>Page non trouvée</h1>
      <p>La page que vous cherchez n&apos;existe pas ou a été déplacée.</p>
    </main>
    </>
  );
}

export default NotFound;
