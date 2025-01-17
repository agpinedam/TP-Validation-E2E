const baseUrl = "http://127.0.0.1:9090/feedback"; // Cambia esto por la URL de tu página principal

describe("Pruebas de la interfaz principal", () => {
  before((browser) => browser.url(baseUrl));

  after((browser) => browser.end());

  test("El formulario se renderiza correctamente", (browser) => {
    browser
      .windowMaximize()
      .assert.elementPresent("form", "El formulario está presente")
      .assert.elementPresent("form .input-group", "El campo de nombre está presente")
      .assert.attributeEquals(
        "form input[name='name']",
        "placeholder",
        "Jean",
        "El campo de nombre tiene el placeholder correcto"
      )
      .assert.elementPresent("form textarea[name='message']", "El área de texto para mensajes está presente")
      .assert.attributeEquals(
        "form textarea[name='message']",
        "rows",
        "4",
        "El área de texto tiene el atributo rows con el valor correcto"
      )
      .assert.elementPresent("form button[type='submit']", "El botón de envío está presente")
      .assert.containsText(
        "form button[type='submit']",
        "Envoyer",
        "El botón de envío contiene el texto correcto"
      );
  });

  test("El encabezado se renderiza correctamente", (browser) => {
    browser
      .assert.elementPresent("header.container-fluid", "El encabezado principal está presente")
      .assert.elementPresent("header img[alt='spanish']", "La imagen del encabezado está presente")
      .assert.containsText(
        "header h2.display-3",
        "IDEALEMENT SITUE",
        "El título principal del encabezado contiene el texto correcto"
      )
      .assert.containsText(
        "header h2.text-danger",
        "30 mètres de la plage",
        "El subtítulo del encabezado contiene el texto correcto"
      )
      .assert.elementPresent("header a[href='/contact']", "El enlace de contacto está presente")
      .assert.containsText(
        "header a[href='/contact']",
        "Contactez-nous",
        "El botón de contacto contiene el texto correcto"
      );
  });

  test("El contador se renderiza correctamente", (browser) => {
    browser
      .assert.elementPresent("section.row", "La sección del contador está presente")
      .assert.elementPresent("section .col-3:nth-child(2) img", "El icono de avisos está presente")
      .getText("section .col-3:nth-child(2) .h2", function (result) {
        const contador = parseInt(result.value, 10);
        this.assert.ok(
          !isNaN(contador),
          `El contador de avisos muestra un número válido: ${contador}`
        );
      })
      .assert.containsText(
        "section .col-3:nth-child(2) .fs-6",
        "Nombre d'avis",
        "El texto del contador de avisos es correcto"
      )
      .assert.containsText(
        "section .col-3:nth-child(3) .h2",
        "2022",
        "El contador de fecha muestra el valor correcto"
      )
      .assert.containsText(
        "section .col-3:nth-child(3) .fs-6",
        "Depuis juillet",
        "El texto del contador de fecha es correcto"
      );
  });
  

  test("La tarjeta de feedback se renderiza correctamente", (browser) => {
    const testFeedback = {
      createdAt: "2025-01-17T00:00:00Z",
      name: "Jean Dupont",
      message: "Un séjour merveilleux à la plage !",
    };
    const dateFormated = "17/0/2025"; // Ajusta según el formato de fecha esperado.

    browser.execute(function (feedback) {
      const container = document.createElement("div");
      container.id = "test-feedback";
      document.body.appendChild(container);
      container.innerHTML = `
        <div class="col-12 mt-2 mb-2">
          <div class="card">
            <div class="card-header">
              <div class="row">
                <div class="col-3">Déposé le : ${feedback.createdAt}</div>
                <div class="col-3">Auteur : ${feedback.name}</div>
              </div>
            </div>
            <div class="card-body">
              <blockquote class="blockquote mb-0">
                <p>${feedback.message}</p>
              </blockquote>
            </div>
          </div>
        </div>`;
    }, [testFeedback]);

    it('Verify submission of the feedback form', function(browser) {
      browser
        .waitForElementVisible('form', 5000)
        .setValue('input[name="name"]', 'John Doe')
        .setValue('textarea[name="message"]', 'This is a test message.')
        .moveToElement('button[type="submit"]', 0, 0)  // Move to submit button to make it visible
        .execute(function() {
          document.querySelector('button[type="submit"]').scrollIntoView({behavior: 'auto'});
        })
        .click('button[type="submit"]')
        .waitForElementVisible('.card', 5000, 'After submission, a new feedback appears')
        .pause(1000)
        .assert.urlContains('/feedback')
        .assert.value('input[name="name"]', '')
        .assert.value('textarea[name="message"]', '')
        .end();
    });

  });
});
