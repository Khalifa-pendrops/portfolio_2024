const fs = require('fs');
const path = require('path');

const filesToDelete = [
  'Resume.pdf',
  'Resume3.pdf',
  'resume2.pdf',
  'resume4.pdf'
];

filesToDelete.forEach(file => {
  const filePath = path.join(__dirname, 'public', file);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`Deleted ${file}`);
  } else {
    console.log(`${file} not found`);
  }
});
