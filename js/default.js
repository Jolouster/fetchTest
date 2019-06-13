/**
 * Envía una petición al servidor de datos y entrega la respuesta en formato JSON.
 *
 * @param {string} url      Es la URL a la que se envía la petición.
 * @param {string} subject  Asunto sobre el que se pregunta al servidor, la instrucción a ejecutar.
 * @param {object} parameters Objeto con información complementaria que el servidor necesita para poder ejecutar correctamente la instrucción.
 * @returns {Promise}       Devuelve una promesa. Se reciben los datos en formato JSON o una excepción con la explicación del error.
 */
function sendRequest(url, subject, parameters = null) {
    return new Promise((resolve, mError) => {
        let dataToSend = {
            formData: subject
        };

        if (null !== parameters) {
            dataToSend.parameters = parameters;
        }

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                'Content-Type': 'application/json' // sent request
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw Error('Request rejected with status ' + response.status);
                }
            })
            .then(function (data) {
                // resolve(data);
                console.info('Datos rebidos [' + subject + ']: ' + data);
                try {
                    resolve(JSON.parse(data));
                } catch (err) {
                    resolve(data);
                }
            })
            // .catch(error => mError(error));
            .catch(function (error) {
                let responseStatus = resonse.status;
                let msgError = error + " Status: " + responseStatus;
                mError(msgError);
            })
    });
}

/**
 * Devuelve un elemento del DOM.
 * @param String ID del elemento HTML al que se quiere acceder
 */
function _(str) {
    return document.getElementById(str);
}

if (!document.addEventListener) {
    console.error("No existe la función addEventListener");
}

if (!document.getElementsByClassName) {
    console.error("No existe la funcion getElementsByClassName");
}