import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import db from './db.js';

const app = express();
const __dirname = path.resolve();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// เพิ่มกิจกรรม
app.post('/add', (req, res) => {
  const { name, type, duration, date } = req.body;
  db.run(
    'INSERT INTO activities (name, type, duration, date) VALUES (?, ?, ?, ?)',
    [name, type, duration, date],
    err => {
      if (err) return res.status(500).send('Error saving activity');
      res.status(200).send('Saved');
    }
  );
});

// แสดงกิจกรรมทั้งหมด
app.get('/activities', (req, res) => {
  db.all('SELECT * FROM activities ORDER BY date DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
});

// เปิดหน้าเว็บหลัก
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
  console.log('✅ Server running on http://localhost:3000');
});
