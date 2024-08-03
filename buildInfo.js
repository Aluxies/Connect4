const fs = require('fs');
const path = require('path');

const buildInfo = {
    date: new Date(),
};

fs.writeFileSync(path.join(__dirname, 'dist', 'buildInfo.json'), JSON.stringify(buildInfo, null, 2));

console.log('Build information saved to dist/build-info.json');
