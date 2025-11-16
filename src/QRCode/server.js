const express = require('express');
const QRCode = require('qrcode');
const emailjs = require('emailjs-com');

const app = express();
app.use(express.json());
app.use(express.static('public')); // for HTML form

// === EmailJS Config (get from https://emailjs.com) ===
const EMAILJS_SERVICE_ID = 'service_0nbyj0r';
const EMAILJS_TEMPLATE_ID = 'template_3nvyoyd';
const EMAILJS_PUBLIC_KEY = 'F33pfI-zsdDEz0gy5';

emailjs.init(EMAILJS_PUBLIC_KEY);

// === POST /register ===
app.post('/register', async (req, res) => {
  const { fullName, studentId, laptopBrand } = req.body;

  if (!fullName || !studentId || !laptopBrand) {
    return res.status(400).json({ error: 'All fields required' });
  }

  try {
    // Generate REAL QR image as Base64 (PNG)
    const qrImage = await QRCode.toDataURL(`Student ID: ${studentId}\nName: ${fullName}`);

    // Send email via EmailJS
    const templateParams = {
      fullName,
      studentId,
      laptopBrand,
      qrImage,                    // ← This is the real image!
      to_email: `${fullName.split(' ')[0].toLowerCase()}@student.haramaya.edu.et`
    };

    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);

    res.json({ message: `${fullName} is successfully registered` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});