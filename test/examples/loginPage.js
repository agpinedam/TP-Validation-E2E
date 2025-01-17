const baseUrl = "http://127.0.0.1:9090/login"; // Changez cela par l'URL de votre page

describe("Tests de la page principale", () => {
  before((browser) => browser.url(baseUrl));

  after((browser) => browser.end());

  test("Le formulaire de connexion est rendu et fonctionne correctement", (browser) => {
    browser
      .waitForElementVisible("main.container", "Le conteneur principal est visible")

      // Vérification de la structure du formulaire
      .assert.elementPresent("form", "Le formulaire est présent")
      .assert.elementPresent("form .input-group:nth-child(1) input[name='name']", "Le champ 'Nom' est présent")
      .assert.attributeEquals(
        "form .input-group:nth-child(1) input[name='name']",
        "placeholder",
        "hello world",
        "Le champ 'Nom' a le placeholder correct"
      )
      .assert.elementPresent("form .input-group:nth-child(2) input[name='password']", "Le champ 'Mot de passe' est présent")
      .assert.attributeEquals(
        "form .input-group:nth-child(2) input[name='password']",
        "type",
        "password",
        "Le champ 'Mot de passe' a le type correct"
      )
      .assert.elementPresent("form button[type='submit']", "Le bouton d'envoi est présent")
      .assert.containsText("form button[type='submit']", "Envoyer", "Le bouton d'envoi contient le texte correct");

    // Vérification de l'interaction avec le formulaire
    browser
      .setValue("form .input-group:nth-child(1) input[name='name']", "user")
      .setValue("form .input-group:nth-child(2) input[name='password']", "user")
      .click("form button[type='submit']")
      .assert.urlContains("/admin", "La redirection vers le tableau de bord est réussie"); // Ajustez "/admin" si nécessaire
  });
});
