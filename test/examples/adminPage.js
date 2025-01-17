const baseUrl = "http://127.0.0.1:9090/login"; // Remplacez cela par l'URL correspondante

describe("Tests de rendu des messages dans le tableau", () => {
  before((browser) => browser.url(baseUrl));

  after((browser) => browser.end());

  test("Le tableau des messages se rend correctement", (browser) => {

    browser
        .setValue("form .input-group:nth-child(1) input[name='name']", "user")
        .setValue("form .input-group:nth-child(2) input[name='password']", "user")
        .click("form button[type='submit']")
    browser
      .windowMaximize()
      .assert.elementPresent("table.table", "Le tableau principal est présent")
      .assert.containsText(
        "table thead th:nth-child(1)",
        "dates",
        "La colonne 'dates' est correctement étiquetée"
      )
      .assert.containsText(
        "table thead th:nth-child(2)",
        "authors",
        "La colonne 'authors' est correctement étiquetée"
      )
      .assert.containsText(
        "table thead th:nth-child(3)",
        "arrived -> departure",
        "La colonne 'arrived -> departure' est correctement étiquetée"
      )
      .assert.containsText(
        "table thead th:nth-child(4)",
        "messages",
        "La colonne 'messages' est correctement étiquetée"
      )
      .assert.containsText(
        "table thead th:nth-child(5)",
        "delete",
        "La colonne 'delete' est correctement étiquetée"
      )
      .assert.elementPresent("table tbody tr", "Il y a des lignes dans le corps du tableau")
      .assert.elementPresent(
        "table tbody tr:first-child td:nth-child(1)",
        "La première ligne contient une date"
      )
      .assert.elementPresent(
        "table tbody tr:first-child td:nth-child(2)",
        "La première ligne contient un auteur"
      )
      .assert.elementPresent(
        "table tbody tr:first-child td:nth-child(3)",
        "La première ligne contient des informations sur 'arrived -> departure'"
      )
      .assert.elementPresent(
        "table tbody tr:first-child td:nth-child(4)",
        "La première ligne contient un message"
      )
      .assert.elementPresent(
        "table tbody tr:first-child td:nth-child(5) button",
        "La première ligne contient un bouton de suppression"
      );
  });

  test("Le bouton de déconnexion redirige vers la page de connexion", (browser) => {
    browser
      .assert.elementPresent("#navbarTogglerDemo03 > ul > li > button", "Le bouton de déconnexion est présent")
      .click("#navbarTogglerDemo03 > ul > li > button")
      .assert.urlContains("/login", "L'utilisateur a été correctement redirigé vers la page de connexion");
  });
});
