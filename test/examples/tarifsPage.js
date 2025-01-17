const baseUrl = "http://127.0.0.1:9090/pricing"; // Remplacez ceci par l'URL de votre page principale

describe("Tests de la page principale", () => {
  before((browser) => browser.url(baseUrl));

  after((browser) => browser.end());

  test("L'en-tête affiche correctement le contenu initial", (browser) => {
    browser
      .windowMaximize() // Maximiser la fenêtre au début
      .assert.elementPresent("header.container-fluid", "Le conteneur d'en-tête est présent")
      .useXpath()
      .assert.containsText(
        "//header//h2[contains(@class, 'home--header-title')]",
        "UN PRIX POUR",
        "Le titre principal contient 'UN PRIX POUR'"
      )
      .assert.containsText(
        "//header//h2[contains(@class, 'home--header-title')]",
        "TOUTES LES SAISONS",
        "Le titre principal contient 'TOUTES LES SAISONS'"
      )
      .assert.containsText(
        "//header//h2[contains(@class, 'display-6')]",
        "Venez séjourner à Rosas",
        "Le sous-titre contient 'Venez séjourner à Rosas'"
      )
      .assert.containsText(
        "//header//p",
        "De 460 € à 760 € / semaine",
        "Le texte du prix est correct"
      )
      .assert.containsText(
        "//header//a[@href='/contact']",
        "Contactez-nous",
        "Le bouton de contact contient le texte 'Contactez-nous'"
      );
  });  
  
  test("La carte basse saison", (browser) => {
    // Vérifier la carte de la basse saison
    browser
      .execute(function () {
        const element = document.evaluate(
          '//*[@id="tarifs-pricing"]/div/div[1]',
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue;

        if (element) {
          element.scrollIntoView({ behavior: 'auto' });
        }
      })
      .assert.containsText(
        '//*[@id="tarifs-pricing"]/div/div[1]/div/div/h5',
        "Basse saison",
        "L'élément contient 'Basee saison'"
      )
      .assert.containsText(
        '//*[@id="tarifs-pricing"]/div/div[1]/div/div/p',
        "460 € / semaine",
        "Le prix de la basse saison est correct"
      )
      .assert.elementPresent(
        '//*[@id="tarifs-pricing"]/div/div[1]/div/div/div[2]/a',
        "Le bouton de contact est présent dans la carte de basse saison"
      );
  });

  test("La carte Moyenne saison", (browser) => {
    // Vérifier la carte de la basse saison
    browser
      .assert.containsText(
        '//*[@id="tarifs-pricing"]/div/div[2]/div/div/h5',
        "Moyenne saison",
        "L'élément contient 'Moyenne saison'"
      )
      .assert.containsText(
        '//*[@id="tarifs-pricing"]/div/div[2]/div/div/p',
        "560 € / semaine",
        "Le prix de la basse saison est correct"
      )
      .assert.elementPresent(
        '//*[@id="tarifs-pricing"]/div/div[2]/div/div/div[2]/a',
        "Le bouton de contact est présent dans la carte de basse saison"
      );
  });

  test("La carte Haute saison", (browser) => {
    // Vérifier la carte de la basse saison
    browser
      .assert.containsText(
        '//*[@id="tarifs-pricing"]/div/div[3]/div/div/h5',
        "Haute saison",
        "L'élément contient 'Haute saison'"
      )
      .assert.containsText(
        '//*[@id="tarifs-pricing"]/div/div[3]/div/div/p',
        "760 € / semaine",
        "Le prix de la basse saison est correct"
      )
      .assert.elementPresent(
        '//*[@id="tarifs-pricing"]/div/div[3]/div/div/div[2]/a',
        "Le bouton de contact est présent dans la carte de basse saison"
      )
      .click('//*[@id="tarifs-pricing"]/div/div[3]/div/div/div[2]/a')
      .assert.containsText(
        '/html/body/header/div[2]/div/div[2]/h2[1]',
        "CONTACTEZ-NOUS",
        "Le prix de la basse saison est correct"
      );
  });
});
