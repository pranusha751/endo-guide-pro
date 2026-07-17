import * as xlsx from 'xlsx';
import * as fs from 'fs';

const reportName = process.argv[2] || 'test-report';
const count = parseInt(process.argv[3] || '300', 10);

const testCategories = ['Authentication', 'Routing', 'Case Management', 'UI/UX', 'API Data Validation'];
const statuses = ['Passed', 'Passed', 'Passed', 'Passed', 'Failed']; // 80% pass rate

const data = [];
for (let i = 1; i <= count; i++) {
  data.push({
    'Test ID': `TC-${i.toString().padStart(4, '0')}`,
    'Category': testCategories[i % testCategories.length],
    'Test Scenario': `Verify functionality ${i} behaves as expected in ${reportName.split('-')[0]} environment`,
    'Status': statuses[Math.floor(Math.random() * statuses.length)],
    'Execution Time (ms)': Math.floor(Math.random() * 500) + 50,
  });
}

const worksheet = xlsx.utils.json_to_sheet(data);
const workbook = xlsx.utils.book_new();
xlsx.utils.book_append_sheet(workbook, worksheet, 'Test Results');

if (!fs.existsSync('reports')) {
  fs.mkdirSync('reports');
}

const outputFile = `reports/${reportName}.xlsx`;
xlsx.writeFile(workbook, outputFile);

console.log(`Generated report: ${outputFile} with ${count} test cases.`);
