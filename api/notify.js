const webpush = require('web-push');

webpush.setVapidDetails(
  'mailto:zilatantall@gmail.com',
  'BK7WcRlvj1FTyaaSW_LtLUAE0S8aG3aI9O130lXSbwuI5va5xDojo9XYDwXI7iyH7JkMNQdKBhiCJILvQJuDNuY',
  'tszOQhL2pEj-w0QIIcv2YkbC5kcUfbcobu1IFLLqoU4'
);

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({error: 'Method not allowed'}); return; }
  const { subscription, titre, message } = req.body;
  if (!subscription) { res.status(400).json({error: 'No subscription'}); return; }
  const payload = JSON.stringify({
    title: titre || 'MCM SERVICE CI',
    body: message || 'Nouveau message',
    icon: '/icon-192.png',
    badge: '/icon-192.png'
  });
  try {
    await webpush.sendNotification(subscription, payload);
    res.status(200).json({success: true});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};
