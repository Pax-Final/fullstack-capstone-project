const natural = require("natural");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json()); 

app.post("/sentiment", (req, res) => {
  try {

    const { sentence } = req.body;

    if (!sentence || sentence.trim() === "") {
      return res.status(400).json({ message: "Le paramètre 'sentence' est requis" });
    }

    const Analyzer = natural.SentimentAnalyzer;
    const stemmer = natural.PorterStemmer; 
    const analyzer = new Analyzer("English", stemmer, "afinn");

    const score = analyzer.getSentiment(sentence.split(" ")); 
    let sentiment = "neutral";

    if (score < 0) {
      sentiment = "negative";
    } else if (score >= 0.33) {
      sentiment = "positive";
    }

    res.status(200).json({
      sentence,
      score,
      sentiment
    });
  } catch (error) {
    console.error("Erreur d'analyse de sentiment :", error);
    
    res.status(500).json({ message: "Erreur serveur lors de l'analyse de sentiment" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Sentiment analysis server running on port ${PORT}`);
});
