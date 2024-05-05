const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')
const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')



const flowPrincipal = addKeyword(['hola', 'buenas', 'buenos dias', 'buenos tardes', 'buenos noches'])
    .addAnswer('🙌 ¡Hola bienvenido a *JOKATEJAS!*')
    .addAnswer('¿Cuál es tu nombre?', { capture: true }, (ctx) => {
        console.log('Mensaje entrante: ', ctx.body)
    })
    .addAnswer('¡Estamos felices de atenderte!, revisa nuestro catálogo:\nhttps://drive.google.com/file/d/1exGUtgAUgNoZJS-m8S_j8RUSozHaeGwO/view?usp=drive_link')
    .addAnswer('Porfavor escriba *pedir* si desea ordenar algo', {
        delay: 3000
    })

const flowPedido = addKeyword(['pedir','pedido'])
.addAnswer('¡Muy bien!, a continuación escriba los siguientes datos:\n\n\n1) Indicar los productos que desea ordenar?\n\n2) Indicar la dirección donde se enviará su pedido (ubicación)\n\n3) Indicar el medio de pago: Efectivo o plin(*989478480*)')




const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal, flowPedido])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()