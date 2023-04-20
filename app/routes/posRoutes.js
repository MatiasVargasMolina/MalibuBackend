const Transbank = require('transbank-sdk-nodejs');
app.post('/pago', async (req, res) => {
    const amount = req.body.amount; // Monto de la transacción
    const buyOrder = req.body.buyOrder; // Número de orden de compra
    const returnUrl = 'https://mi-tienda.cl/retorno'; // URL de retorno después de la transacción
  
    Transbank.Configuration.forTestingWebpayPlusNormal();
  
    try {
      const response = await Transbank.WebpayPlus.Transaction.create(buyOrder, returnUrl, amount);
      const token = response.token; // Token de la transacción
      const url = response.url; // URL de pago
  
      res.redirect(url);
    } catch (error) {
      res.status(500).send('Error al procesar la transacción');
    }
  });
  