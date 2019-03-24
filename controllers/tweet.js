var Sentiment = require('sentiment');
var sentiment = new Sentiment();
const Twit = require("twit");
var Sentiment = require('sentiment');
var sentiment = new Sentiment();
var twitterAPI = new Twit({
    consumer_key: 'iQugbu76pBPEeVUqOQjHUXJAu',
    consumer_secret: 'eIK68pub00TLLnGx6GqNL1SL1G89tNNK6FuH6lCCB4uylHq5pP',
    access_token: '3303757363-DtlpCHcO8ZWMt1iCIloh0PGRUHtAQoMYH3dEXkM',
    access_token_secret: 'wQXF36NtjAlJ51rlxG0OCft8M1nVTVuMiuAhDngllplUA',
})
let tweets = [];
exports.getTweets = async (ticker) => {
    let average = 0;
    const res = await twitterAPI.get('search/tweets', { q: ticker, count: 100 });
    for (let i = 0; i < res.data.statuses.length; i++) {
        console.log(res.data.statuses[i].text)
        let sentimentGuy = await sentiment.analyze(res.data.statuses[i].text);
        average += sentimentGuy.comparative;
        res.data.statuses[i].sentiment = sentimentGuy;

    }
    if (average > 0) average += " - Pinnacle Recommendation: Buy"
    else average += " - Pinnacle Recommendation: Sell"
    return { statuses: res.data.statuses, average };
}