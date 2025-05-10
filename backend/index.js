import OpenAI from "openai";
import dotenv from "dotenv";
import cors from 'cors';
import express from 'express';
import mysql from 'mysql2'

dotenv.config();

const app = express();
const port = 3001



const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const generateEmail = async (tone, sendTo, subject, content) => {
  const system_string = `Write an email where the tone is ${tone}. You are writing to ${sendTo} and the subject is ${subject}. Use the language of user input`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: system_string },
      { role: "user", content: content },
    ],
  });

  return completion.choices[0].message.content;
};

const addToBlackList = async(ip) => {
  await new Promise((resolve, reject) => {
    const sql = 'INSERT INTO block_queue(ip) VALUES( ? )';
    db.query(sql, [ip], (err, result) => {
      if (err) {
        reject(err);
      } else {
        console.log('Inserted');
        resolve(result);
      }
    });
  });
}

const deleteFromBlackList = async(ip) => {
  await new Promise((resolve, reject) => {
    const sql = 'DELETE FROM block_queue WHERE ip = ?';
    db.query(sql, [ip], (err, result) => {
      if (err) {
        reject(err);
      } else {
        console.log('Inserted');
        resolve(result);
      }
    });
  });
}

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});



app.use(express.json());

app.use(cors());

app.post('/send-email', async (req, res) => {
  console.log('enterers')
  const { sendTo, subject, content, tone } = req.body;
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  try {
    // Sprawdzanie blokady
    const result = await new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM block_queue WHERE ip = ?';
      db.query(sql, [ip], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    // Jeśli użytkownik znajduje się w czarnej liście
    if (result.length > 0) {
      //Pobranie Daty
      const addedDate = new Date(result[0].date_stamp);
      const now = new Date();

      // Różnica w milisekundach
      const diffMs = now - addedDate;

      // Różnica w pełnych minutach
      const diffMinutes = Math.floor(diffMs / 60000);

      console.log(diffMinutes)

      if (diffMinutes === 0) {
        return res.status(420).json({ time: diffMs });
      } else {
        console.log("Datestamp został utworzony minutę temu");
        deleteFromBlackList(ip)
        const val = await generateEmail(tone, sendTo, subject, content)
        addToBlackList(ip)
        return res.status(200).json({ message: val });
      }

      
    } else {
      // Jeśli użytkownik nie jest w czarnej liście, dodajemy go
      addToBlackList(ip)
      //generowanie emaila
      const val = await generateEmail(tone, sendTo, subject, content);
      return res.status(200).json({ message: val });
    }

  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running!`);
});






