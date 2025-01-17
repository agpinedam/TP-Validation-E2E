const baseUrl = "http://127.0.0.1:9090/contact"; // Remplacez cela par la configuration réelle

describe("Tests de la page de contact", () => {
  before((browser) => browser.url(baseUrl));

  after((browser) => browser.end());

  test("L'en-tête de la page se rend correctement", (browser) => {
    browser
      .windowMaximize()
      .assert.elementPresent("header", "L'en-tête est présent")
      .assert.containsText(
        "header h2.display-3",
        "CONTACTEZ-NOUS",
        "Le titre principal de l'en-tête est correct"
      )
      .assert.containsText(
        "header h2.display-6.text-danger",
        "remplissez le formulaire",
        "Le sous-titre de l'en-tête est correct"
      );
  });

  test("Le formulaire de contact se rend correctement", (browser) => {
    browser
      .assert.elementPresent("form", "Le formulaire est présent")
      .assert.elementPresent(
        "form input[name='firstName']",
        "Le champ 'firstName' est présent"
      )
      .assert.attributeContains(
        "form input[name='firstName']",
        "placeholder",
        "Jean",
        "Le champ 'firstName' a le placeholder correct"
      )
      .assert.elementPresent(
        "form input[name='lastName']",
        "Le champ 'lastName' est présent"
      )
      .assert.elementPresent(
        "form input[name='mobilePhone']",
        "Le champ 'mobilePhone' est présent"
      )
      .assert.attributeContains(
        "form input[name='mobilePhone']",
        "pattern",
        "0[6|7]{1}([0-9]{2}){4}",
        "Le champ 'mobilePhone' a le modèle de validation correct"
      )
      .assert.elementPresent(
        "form input[name='email']",
        "Le champ 'email' est présent"
      )
      .assert.elementPresent(
        "form input[name='arrivedAt']",
        "Le champ 'arrivedAt' est présent"
      )
      .assert.elementPresent(
        "form input[name='departureAt']",
        "Le champ 'departureAt' est présent"
      )
      .assert.elementPresent(
        "form textarea[name='message']",
        "Le champ de message est présent"
      )
      .assert.elementPresent(
        "form button[type='submit']",
        "Le bouton d'envoi est présent"
      );
  });
});
