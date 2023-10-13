const express = require('express');
const puppeteer = require('puppeteer');
const app = express();
const port = process.env.PORT || 3000;

app.get('/screenshot', async (req, res) => {
  try {
    const { url } = req.query;

    const browser = await puppeteer.launch({
      headless: 'new', // Use the new headless mode
    });    const page = await browser.newPage();

    await page.goto(url);
    const screenshot = await page.screenshot();

    await browser.close();

    res.setHeader('Content-Type', 'image/png');
    res.send(screenshot);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error capturing the screenshot.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
