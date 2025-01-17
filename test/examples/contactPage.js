const baseUrl = "http://127.0.0.1:9090/contact"; // Cambia esto según la configuración real

describe("Pruebas de la página de contacto", () => {
  before((browser) => browser.url(baseUrl));

  after((browser) => browser.end());

  test("El encabezado de la página se renderiza correctamente", (browser) => {
    browser
      .windowMaximize()
      .assert.elementPresent("header", "El encabezado está presente")
      .assert.containsText(
        "header h2.display-3",
        "CONTACTEZ-NOUS",
        "El título principal del encabezado es correcto"
      )
      .assert.containsText(
        "header h2.display-6.text-danger",
        "remplissez le formulaire",
        "El subtítulo del encabezado es correcto"
      )
  });

  test("El formulario de contacto se renderiza correctamente", (browser) => {
    browser
      .assert.elementPresent("form", "El formulario está presente")
      .assert.elementPresent(
        "form input[name='firstName']",
        "El campo 'firstName' está presente"
      )
      .assert.attributeContains(
        "form input[name='firstName']",
        "placeholder",
        "Jean",
        "El campo 'firstName' tiene el placeholder correcto"
      )
      .assert.elementPresent(
        "form input[name='lastName']",
        "El campo 'lastName' está presente"
      )
      .assert.elementPresent(
        "form input[name='mobilePhone']",
        "El campo 'mobilePhone' está presente"
      )
      .assert.attributeContains(
        "form input[name='mobilePhone']",
        "pattern",
        "0[6|7]{1}([0-9]{2}){4}",
        "El campo 'mobilePhone' tiene el patrón de validación correcto"
      )
      .assert.elementPresent(
        "form input[name='email']",
        "El campo 'email' está presente"
      )
      .assert.elementPresent(
        "form input[name='arrivedAt']",
        "El campo 'arrivedAt' está presente"
      )
      .assert.elementPresent(
        "form input[name='departureAt']",
        "El campo 'departureAt' está presente"
      )
      .assert.elementPresent(
        "form textarea[name='message']",
        "El campo de mensaje está presente"
      )
      .assert.elementPresent(
        "form button[type='submit']",
        "El botón de enviar está presente"
      );
  });
});
