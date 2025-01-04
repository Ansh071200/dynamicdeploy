// const xlsx = require("xlsx");

// function parseExcel(filePath) {
//   const excelsheet = xlsx.readFile(filePath);
//   const sheetName = excelsheet.SheetNames[0];
//   const sheetData = xlsx.utils.sheet_to_json(excelsheet.Sheets[sheetName]);
//   return sheetData.map((row) => ({
//     fieldName: row["Field Name"],
//     fieldType: row["Field Type"],
//     dataType: row["Data Type"],
//     sizeLimit: row["Size Limit"],
//     mandatory: row["Mandatory"] === "mandatory",
//   }));
// }

// module.exports = { parseExcel };

const xlsx = require("xlsx");

function parseExcel(filePath) {
  const excelsheet = xlsx.readFile(filePath);
  const sheetName = excelsheet.SheetNames[0];
  const sheetData = xlsx.utils.sheet_to_json(excelsheet.Sheets[sheetName]);

  if (sheetData.length === 0) {
    throw new Error("The Excel sheet is empty or has invalid data.");
  }

  const headers = Object.keys(sheetData[0]);
  const rows = sheetData.map((row) => {
    let parsedRow = {};
    headers.forEach((header) => {
      parsedRow[header] = row[header];
    });
    return parsedRow;
  });

  return { headers, rows };
}

module.exports = { parseExcel };
