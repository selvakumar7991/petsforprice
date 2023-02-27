const path = require('path');
const sm = require('sitemap');
const fs = require('fs');

const axios = require('axios');

const OUTPUT_FILE = path.resolve(__dirname,'../public', 'sitemap.xml');

const fetchData = async () => {
    const response =  await axios.get("http://localhost:5000/sitemap");

    const res = response.data.map(data => ({
        url: `https://petsforprice.com/productDetail/${data.category}/${data._id}`,
        changefreq: 'daily',
        priority: 0.8,
        lastmod : new Date().toISOString()
    }));
    return res
  };

const links = [
      { url: '/', changefreq: 'always', priority: 1, lastmod : new Date().toISOString() },
      { url: '/postad', changefreq: 'weekly', priority: 0.5, lastmod : new Date().toISOString() },
      { url: '/listingSearch?keyword=&city=&category=Dogs', changefreq: 'daily', priority: 0.8, lastmod : new Date().toISOString() },
      { url: '/listingSearch?keyword=&city=&category=Cats', changefreq: 'daily', priority: 0.8, lastmod : new Date().toISOString() },
      { url: '/listingSearch?keyword=&city=&category=Fishes', changefreq: 'daily', priority: 0.8, lastmod : new Date().toISOString() },
      { url: '/listingSearch?keyword=&city=&category=Birds', changefreq: 'daily', priority: 0.8, lastmod : new Date().toISOString() },
      { url: '/listingSearch?keyword=&city=&category=Others', changefreq: 'daily', priority: 0.8, lastmod : new Date().toISOString() },
      { url: '/listingSearch?keyword=&city=&category=Accessories', changefreq: 'daily', priority: 0.8, lastmod : new Date().toISOString() },
];

fetchData().then(data=>{
    const stream = new sm.SitemapStream({ hostname: 'https://petsforprice.com' });
    links.forEach( link => stream.write( link ) );
    data.map(res=>{
        stream.write(res);
    });
    stream.end();
    sm.streamToPromise( stream ).then( data => {
        fs.writeFileSync(OUTPUT_FILE, data.toString());
    })
});
