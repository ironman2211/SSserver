const express = require('express');
const puppeteer = require('puppeteer');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/screenshot', async (req, res) => {
  try {
    const url = req.body.url;

    const browser = await puppeteer.launch({
        headless: true, // Use the new headless mode
        args: ['--no-sandbox', '--disable-setuid-sandbox'], // Additional options (if needed)
      });
    
      const page = await browser.newPage();
    await page.goto(url);
    
    // Adjust the viewport and wait for page content to load
    await page.waitForTimeout(1000); 

    const screenshot = await page.screenshot({ fullPage: true });
    
    await browser.close();

    res.contentType('image/png');
    res.send(screenshot);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while capturing the screenshot.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
