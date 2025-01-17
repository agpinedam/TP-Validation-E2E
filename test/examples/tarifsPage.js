const baseUrl = "http://127.0.0.1:9090/login"; // Cambia esto por la URL de tu página de inicio de sesión

describe("Pruebas de la página de inicio de sesión", () => {
  before((browser) => browser.url(baseUrl));

  after((browser) => browser.end());

  test("El formulario se renderiza correctamente", (browser) => {
    browser
      .windowMaximize()
      .assert.elementPresent("main.container", "El contenedor principal está presente")
      .useXpath()
      .assert.elementPresent("//form", "El formulario está presente")
      .assert.elementPresent("//form//input[@name='name']", "El campo de entrada para el nombre está presente")
      .assert.attributeEquals(
        "//form//input[@name='name']",
        "placeholder",
        "hello world",
        "El campo de nombre tiene el placeholder correcto"
      )
      .assert.elementPresent("//form//input[@name='password']", "El campo de entrada para la contraseña está presente")
      .assert.attributeEquals(
        "//form//input[@name='password']",
        "type",
        "password",
        "El campo de contraseña tiene el tipo correcto"
      )
      .assert.elementPresent("//form//button[@type='submit']", "El botón de envío está presente")
      .assert.containsText(
        "//form//button[@type='submit']",
        "Envoyer",
        "El botón de envío contiene el texto correcto"
      );
  });

  test("El formulario permite el ingreso de datos", (browser) => {
    browser
      .useXpath()
      .setValue("//form//input[@name='name']", "user")
      .setValue("//form//input[@name='password']", "user")
      .assert.value("//form//input[@name='name']", "user", "El campo de nombre contiene los datos ingresados")
      .assert.value(
        "//form//input[@name='password']",
        "user",
        "El campo de contraseña contiene los datos ingresados"
      );
      browser
      .click("//form//button[@type='submit']")
      .windowMaximize()
      .assert.urlContains("/admin", "La redirección al dashboard es exitosa tras enviar el formulario"); // Cambia "/dashboard" según la redirección esperada.
  });
});
