describe('Test de la página A LOUER APPARTEMENT ROSAS', function() {
  before(browser => browser.navigateTo('http://127.0.0.1:9090')); // Cambia la URL si es necesario

  it('Verifica la visibilidad del header y el contenido principal', function(browser) {
    browser
      .windowMaximize()
      .waitForElementVisible('body') // Verifica que el cuerpo de la página se cargue
      .assert.visible('header.container-fluid') // Verifica el header
      .assert.containsText('h2.display-3', 'A LOUER APPARTEMENT ROSAS') // Verifica el título principal
      .assert.containsText('h2.display-6.text-danger', '2 chambres | 30 m de la plage') // Verifica subtítulo
      .assert.visible('a[href="/contact"]') // Verifica el botón de contacto
      .assert.visible('img[alt="spanish"]'); // Verifica que la imagen principal se cargue
  });

  it('Navega por la barra de navegación y verifica los enlaces', function(browser) {
    browser
      .assert.visible('a[href="/geo"]') // Verifica el enlace de "Localisation"
      .assert.visible('a[href="/pricing"]') // Verifica el enlace de "Tarifs"
      .assert.visible('a[href="/feedback"]') // Verifica el enlace de "Avis";
  });

  it('Verifica la sección de galería y características', function(browser) {
    browser
      .windowMaximize()
      .assert.visible('#appartement-gallerie') // Galería de imágenes
      .assert.visible('img[alt="photo1"]') // Una imagen de ejemplo
      .assert.visible('#caracteristiques') // Verifica la sección de características
      .assert.containsText('#caracteristiques', 'Plage à 30m') // Verifica texto de características
      .assert.containsText('#caracteristiques', 'Parking gratuit'); // Verifica otro texto
  });

  it('Prueba la sección de tarifas con XPath', function (browser) {
    browser
      .windowMaximize()
      .assert.visible('#tarifs') // Verifica que la sección de tarifas es visible
      .useXpath() // Cambia el modo a XPath
      .assert.visible('//*[@id="tarifs"]/div[2]/div[3]/div') // Verifica que el elemento objetivo es visible
      .execute(function () {
        const element = document.evaluate(
          '//*[@id="tarifs"]/div[2]/div[3]/div',
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue;
  
        if (element) {
          element.scrollIntoView({ behavior: 'auto' });
        }
      })
      .pause(500) // Espera para asegurarse de que el desplazamiento haya terminado
      .assert.containsText('//*[@id="tarifs"]/div[2]/div[3]/div', 'Haute saison') // Verifica el texto del elemento
      .useCss(); // Vuelve al modo CSS si es necesario
  });  

  after(browser => browser.end()); // Finaliza el test
});
