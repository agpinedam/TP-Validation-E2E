describe('Test de la página A LOUER APPARTEMENT ROSAS', function() {
  before(browser => browser.navigateTo('http://127.0.0.1:9090')); // Cambia la URL si es necesario

  it('Verifica la visibilidad del header y el contenido principal', function(browser) {
    browser
      .waitForElementVisible('body') // Verifica que el cuerpo de la página se cargue
      .assert.visible('header.container-fluid') // Verifica el header
      .assert.containsText('h2.display-3', 'A LOUER APPARTEMENT ROSAS') // Verifica el título principal
      .assert.containsText('h2.display-6.text-danger', '2 chambres | 30 m de la plage') // Verifica subtítulo
      .assert.visible('a[href="/contact"]') // Verifica el botón de contacto
      .assert.visible('img[alt="spanish"]'); // Verifica que la imagen principal se cargue
  });

  it('Navega por la barra de navegación y verifica los enlaces', function(browser) {
    browser
      .assert.visible('.navbar-toggler') // Verifica el botón de menú responsive
      .click('.navbar-toggler') // Abre el menú
      .assert.visible('a[href="/geo"]') // Verifica el enlace de "Localisation"
      .assert.visible('a[href="/pricing"]') // Verifica el enlace de "Tarifs"
      .assert.visible('a[href="/feedback"]') // Verifica el enlace de "Avis";
  });

  it('Verifica la sección de galería y características', function(browser) {
    browser
      .assert.visible('#appartement-gallerie') // Galería de imágenes
      .assert.visible('img[alt="photo1"]') // Una imagen de ejemplo
      .assert.visible('#caracteristiques') // Verifica la sección de características
  });

  it('Prueba la sección de tarifas', function(browser) {
    browser
      .assert.visible('#tarifs') // Verifica la sección de tarifas
  });

  after(browser => browser.end()); // Finaliza el test
});
