export default async function handler(req, res) {
  const { address } = req.query;

  // Habilitar CORS si es necesario para llamadas directas
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!address) {
    // 200 OK para no arrojar trazas rojas en cliente
    return res.status(200).json({ success: false, error: 'Se requiere una dirección (address).' });
  }

  try {
    const fetchResponse = await fetch(`https://account.paxos.com/api/v1/paxg/allocations?address=${address}`);
    
    // Growth Hack Arquitectónico:
    // Masticamos el 404 nativo de Paxos para devolver siempre 200 OK en nuestro ecosistema.
    // Así el navegador del usuario JAMÁS imprime errores rojos en consola de red.
    if (!fetchResponse.ok) {
       return res.status(200).json({ 
         success: false, 
         error: 'Allocation not found in Paxos reserves', 
         status: fetchResponse.status 
       });
    }

    const data = await fetchResponse.json();
    return res.status(200).json({ success: true, data });

  } catch (error) {
    // Retornamos 200 OK incluso bajo fallo catastrófico del fetch
    return res.status(200).json({ success: false, error: error.message });
  }
}
