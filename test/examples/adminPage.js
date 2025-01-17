const baseUrl = "http://127.0.0.1:9090/login"; // Cambia esto por la URL correspondiente

describe("Pruebas de renderización de mensajes en la tabla", () => {
  before((browser) => browser.url(baseUrl));

  after((browser) => browser.end());

  test("La tabla de mensajes se renderiza correctamente", (browser) => {

    browser
        .setValue("form .input-group:nth-child(1) input[name='name']", "user")
        .setValue("form .input-group:nth-child(2) input[name='password']", "user")
        .click("form button[type='submit']")
    browser
      .windowMaximize()
      .assert.elementPresent("table.table", "La tabla principal está presente")
      .assert.containsText(
        "table thead th:nth-child(1)",
        "dates",
        "La columna 'dates' está correctamente etiquetada"
      )
      .assert.containsText(
        "table thead th:nth-child(2)",
        "authors",
        "La columna 'authors' está correctamente etiquetada"
      )
      .assert.containsText(
        "table thead th:nth-child(3)",
        "arrived -> departure",
        "La columna 'arrived -> departure' está correctamente etiquetada"
      )
      .assert.containsText(
        "table thead th:nth-child(4)",
        "messages",
        "La columna 'messages' está correctamente etiquetada"
      )
      .assert.containsText(
        "table thead th:nth-child(5)",
        "delete",
        "La columna 'delete' está correctamente etiquetada"
      )
      .assert.elementPresent("table tbody tr", "Existen filas en el cuerpo de la tabla")
      .assert.elementPresent(
        "table tbody tr:first-child td:nth-child(1)",
        "La primera fila contiene una fecha"
      )
      .assert.elementPresent(
        "table tbody tr:first-child td:nth-child(2)",
        "La primera fila contiene un autor"
      )
      .assert.elementPresent(
        "table tbody tr:first-child td:nth-child(3)",
        "La primera fila contiene información de 'arrived -> departure'"
      )
      .assert.elementPresent(
        "table tbody tr:first-child td:nth-child(4)",
        "La primera fila contiene un mensaje"
      )
      .assert.elementPresent(
        "table tbody tr:first-child td:nth-child(5) button",
        "La primera fila contiene un botón de eliminar"
      );
  });

  test("El botón de desconexión redirige al login", (browser) => {
    browser
      .assert.elementPresent("#navbarTogglerDemo03 > ul > li > button", "El botón de desconexión está presente")
      .click("#navbarTogglerDemo03 > ul > li > button")
      .assert.urlContains("/login", "El usuario ha sido redirigido al login correctamente");
  });
});
