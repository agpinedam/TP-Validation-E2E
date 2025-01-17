const baseUrl = "http://127.0.0.1:9090/login"; // Cambia esto por la URL de tu págin

describe("Pruebas de la página principal", () => {
    before((browser) => browser.url(baseUrl));
  
    after((browser) => browser.end());

    test("El formulario de inicio de sesión se renderiza y funciona correctamente", (browser) => {
        browser
        .waitForElementVisible("main.container", "El contenedor principal está visible")
    
        // Verificar estructura del formulario
        .assert.elementPresent("form", "El formulario está presente")
        .assert.elementPresent("form .input-group:nth-child(1) input[name='name']", "El campo de nombre está presente")
        .assert.attributeEquals(
            "form .input-group:nth-child(1) input[name='name']",
            "placeholder",
            "hello world",
            "El campo de nombre tiene el placeholder correcto"
        )
        .assert.elementPresent("form .input-group:nth-child(2) input[name='password']", "El campo de contraseña está presente")
        .assert.attributeEquals(
            "form .input-group:nth-child(2) input[name='password']",
            "type",
            "password",
            "El campo de contraseña tiene el tipo correcto"
        )
        .assert.elementPresent("form button[type='submit']", "El botón de envío está presente")
        .assert.containsText("form button[type='submit']", "Envoyer", "El botón de envío contiene el texto correcto");
    
        // Verificar interacción con el formulario
        browser
        .setValue("form .input-group:nth-child(1) input[name='name']", "user")
        .setValue("form .input-group:nth-child(2) input[name='password']", "user")
        .click("form button[type='submit']")
        //.pause(1000) // Pausa para permitir la navegación/redirección después del envío
        .assert.urlContains("/admin", "La redirección al dashboard es exitosa después del envío del formulario"); // Cambia "/dashboard" según la redirección esperada.
    });
});