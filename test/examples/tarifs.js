const baseUrl = "http://127.0.0.1:9090/pricing"; // Cambia esto por la URL de tu págin

describe("Pruebas de la página principal", () => {
  before((browser) => browser.url(baseUrl));

  after((browser) => browser.end());

  test("La cabecera muestra correctamente el contenido inicial", (browser) => {
    browser
      .windowMaximize() // Maximizar la ventana al inicio
      .assert.elementPresent("header.container-fluid", "El contenedor de cabecera está presente")
      .useXpath()
      .assert.containsText(
        "//header//h2[contains(@class, 'home--header-title')]",
        "UN PRIX POUR",
        "El título principal contiene 'UN PRIX POUR'"
      )
      .assert.containsText(
        "//header//h2[contains(@class, 'home--header-title')]",
        "TOUTES LES SAISONS",
        "El título principal contiene 'TOUTES LES SAISONS'"
      )
      .assert.containsText(
        "//header//h2[contains(@class, 'display-6')]",
        "Venez séjourner à Rosas",
        "El subtítulo contiene 'Venez séjourner à Rosas'"
      )
      .assert.containsText(
        "//header//p",
        "De 460 € à 760 € / semaine",
        "El texto del precio es correcto"
      )
      .assert.containsText(
        "//header//a[@href='/contact']",
        "Contactez-nous",
        "El botón de contacto contiene el texto 'Contactez-nous'"
      )
  });  
  
  test("Las tarjeta basse saison", (browser) => {
    // Verificar tarjeta de la baja temporada
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
        "El elemento contiene 'Basee saison'"
      )
      .assert.containsText(
        '//*[@id="tarifs-pricing"]/div/div[1]/div/div/p',
        "460 € / semaine",
        "El precio de la baja temporada es correcto"
      )
      .assert.elementPresent(
        '//*[@id="tarifs-pricing"]/div/div[1]/div/div/div[2]/a',
        "El botón de contacto está presente en la tarjeta de baja temporada"
      )
  });

  test("Las tarjeta Moyenne saison", (browser) => {
    // Verificar tarjeta de la baja temporada
    browser
      .assert.containsText(
        '//*[@id="tarifs-pricing"]/div/div[2]/div/div/h5',
        "Moyenne saison",
        "El elemento contiene 'Moyenne saison'"
      )
      .assert.containsText(
        '//*[@id="tarifs-pricing"]/div/div[2]/div/div/p',
        "560 € / semaine",
        "El precio de la baja temporada es correcto"
      )
      .assert.elementPresent(
        '//*[@id="tarifs-pricing"]/div/div[2]/div/div/div[2]/a',
        "El botón de contacto está presente en la tarjeta de baja temporada"
      )
  });

  test("Las tarjeta Haute saison", (browser) => {
    // Verificar tarjeta de la baja temporada
    browser
      .assert.containsText(
        '//*[@id="tarifs-pricing"]/div/div[3]/div/div/h5',
        "Haute saison",
        "El elemento contiene 'Haute saison'"
      )
      .assert.containsText(
        '//*[@id="tarifs-pricing"]/div/div[3]/div/div/p',
        "760 € / semaine",
        "El precio de la baja temporada es correcto"
      )
      .assert.elementPresent(
        '//*[@id="tarifs-pricing"]/div/div[3]/div/div/div[2]/a',
        "El botón de contacto está presente en la tarjeta de baja temporada"
      )
      .click('//*[@id="tarifs-pricing"]/div/div[3]/div/div/div[2]/a')
      .assert.containsText(
        '/html/body/header/div[2]/div/div[2]/h2[1]',
        "CONTACTEZ-NOUS",
        "El precio de la baja temporada es correcto"
      )
  });
  
});
