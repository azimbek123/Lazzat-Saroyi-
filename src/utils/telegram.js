// Telegram Bot notification for new orders
const BOT_TOKEN = '8846250010:AAHvylIgaJWueqHf1RRie_8bQYIRPXsB72o';
const CHAT_ID = '7420313359';

/**
 * Send order notification to Telegram with dish photo
 * @param {Object} params
 * @param {Object} params.dish - The dish object
 * @param {string} params.lang - Current language
 * @param {Object} params.customer - Customer info { name, phone, notes, quantity }
 * @param {string} params.formattedPrice - Formatted price string
 */
export async function sendOrderToTelegram({ dish, lang, customer, formattedPrice }) {
  const dishName = dish.name[lang] || dish.name['uz'] || 'Nomsiz';
  const dishNameUz = dish.name['uz'] || '';
  const dishNameRu = dish.name['ru'] || '';
  const dishNameEn = dish.name['en'] || '';

  const now = new Date();
  const dateStr = now.toLocaleDateString('uz-UZ', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const timeStr = now.toLocaleTimeString('uz-UZ', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const caption = [
    `🛒 *YANGI BUYURTMA!*`,
    ``,
    `📋 *Taom:* ${dishNameUz}`,
    dishNameRu ? `🇷🇺 ${dishNameRu}` : '',
    dishNameEn ? `🇬🇧 ${dishNameEn}` : '',
    ``,
    `💰 *Narxi:* ${formattedPrice}`,
    `📦 *Soni:* ${customer.quantity} dona`,
    `⭐ *Reyting:* ${dish.rating || '—'}`,
    `⏱ *Tayyorlanish:* ${dish.cookTime || '—'}`,
    ``,
    `👤 *Mijoz:* ${customer.name}`,
    `📞 *Telefon:* ${customer.phone}`,
    customer.notes ? `📝 *Izoh:* ${customer.notes}` : '',
    ``,
    `🕐 *Vaqt:* ${dateStr} — ${timeStr}`,
    ``,
    `━━━━━━━━━━━━━━━━━━`,
    `🍽 *Sasiq Oyoqlar Restaurant*`,
  ]
    .filter(Boolean)
    .join('\n');

  try {
    // Send photo with caption
    if (dish.image) {
      const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          photo: dish.image,
          caption: caption,
          parse_mode: 'Markdown',
        }),
      });

      const data = await response.json();

      if (!data.ok) {
        // If photo fails (e.g. URL not accessible by Telegram), fallback to text message
        console.warn('Photo send failed, falling back to text:', data.description);
        await sendTextMessage(caption);
      }

      return data;
    } else {
      // No image — send text message only
      return await sendTextMessage(caption);
    }
  } catch (error) {
    console.error('Telegram notification error:', error);
    // Don't block the order if Telegram fails
    return null;
  }
}

async function sendTextMessage(text) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: text,
      parse_mode: 'Markdown',
    }),
  });
  return await response.json();
}
