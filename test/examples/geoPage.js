const baseUrl = "http://127.0.0.1:9090/geo"; // Cambia esto por la URL de tu págin

describe("Pruebas de la página principal", () => {
  before((browser) => browser.url(baseUrl));

  after((browser) => browser.end());

  test("El encabezado se renderiza correctamente", (browser) => {
    browser
        .windowMaximize()
        .waitForElementVisible("header.container-fluid")
        .assert.containsText("header h2.home--header-title", "IDEALEMENT SITUE")
        .assert.containsText("header h2.text-danger", "30 mètres de la plage")
        .assert.visible("header a.btn-dark")
        .assert.attributeContains(
            "header a.btn-dark",
            "href",
            "/contact"
      );
  });

  test("La sección 'Accès' muestra las opciones correctas", (browser) => {
    browser
      .assert.containsText(".col-4 h5.card-title", "Accès")
      .execute(function () {
        const element = document.evaluate(
          '/html/body/main/section[1]/div[1]/h5',
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
        ".list-group-item.list-group-item-primary small",
        "Temps de trajet : 8 heures"
      )
      .assert.containsText(
        ".list-group-item.list-group-item-primary p",
        "Autoroute jusqu'à Figueras."
      )
      .assert.visible('.list-group-item', 'Paris → Rosas') // Verify first travel option
      .useXpath() 
      .assert.containsText(
        "/html/body/main/section[1]/div[1]/div[1]/div[2]/div/a[1]/small",
        "900 km."
      )
  });  

  test("La sección 'Carte' incluye un iframe de Google Maps", (browser) => {
    browser
      .useCss()
      .assert.containsText(".col-8 h5.card-title", "Carte")
      .assert.elementPresent("iframe[src*='google.com/maps']");
  });

  test("La sección 'Localisation' tiene el contenido correcto", (browser) => {
    browser
      // Verificar el título de la tarjeta
      .assert.containsText(
        "body > main > section:nth-child(1) > div.col-8 > div > div > h5",
        "Localisation"
      )
      // Verificar que el iframe tenga el atributo 'src' correcto
      .assert.attributeContains(
        ".card.border.border-light.bg-light.pt-2 iframe",
        "src",
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1476.3135223062156!2d3.1618640724716895!3d42.26513647400954"
      )
      
  });

  test("La sección 'A proximité' tiene contenido descriptivo", (browser) => {
    browser
      .execute(function () {
        const element = document.evaluate(
          '/html/body/main/section[2]/div[1]/h5',
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue;
  
        if (element) {
          element.scrollIntoView({ behavior: 'auto' });
        }
      })
      .useXpath() // Cambiar al modo XPath
      .assert.containsText(
        '/html/body/main/section[2]/div[1]/h5',
        "A proximité"
      )
      .assert.containsText(
        "/html/body/main/section[2]/div[1]/p[1]",
        "Situé sur la promenade qui longe la mer"
      );
  });  

  test("La lista de 'Nos meilleures adresses' incluye restaurantes", (browser) => {
    browser
      .useXpath() // Cambiar al modo XPath
      .assert.containsText(
        '/html/body/main/section[2]/div[2]/h5',
        "Nos meilleures adresses"
      )
      .assert.containsText(
        '/html/body/main/section[2]/div[2]/div[1]/ol/li[1]',
        "Restaurant Rosa"
      )
      .assert.containsText(
        '/html/body/main/section[2]/div[2]/div[1]/ol/li[2]',
        "Jamoneria Jamon 100 %"
      )
      .assert.containsText(
        '/html/body/main/section[2]/div[2]/div[1]/ol/li[3]',
        "idreria Toxt's"
      )
  });
  
});
