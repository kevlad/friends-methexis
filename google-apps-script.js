// Google Apps Script for Methexis Friends Registration
// Deploy this as a Web App in your Google Sheet

function doPost(e) {
  try {
    // Get the active spreadsheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Membri');

    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);

    // Generate client code (customize as needed)
    const codClient = 'MTX' + Date.now().toString().slice(-6);

    // Append data to sheet
    sheet.appendRow([
      data.nume_complet,      // A: Nume complet
      data.prenume,           // B: Prenume
      data.nume,              // C: Nume
      data.categorie,         // D: Categorie
      data.discount_vin,      // E: Discount vin spirtoase
      data.discount_produse,  // F: Discount rest produse
      data.telefon,           // G: Telefon mobil
      data.email,             // H: Email
      data.data_nasterii,     // I: Data nasterii
      data.gdpr,              // J: GDPR
      codClient,              // K: COD CLIENT
      data.activ,             // L: Activ
      data.necesita_aprobare, // M: NECESITĂ APROBARE
      data.referred_by,       // N: REFFERED BY
      data.timestamp          // O: Timestamp
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({
        'result': 'success',
        'codClient': codClient
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        'result': 'error',
        'error': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: Test function
function doGet() {
  return ContentService.createTextOutput('Methexis Friends Registration API is running!');
}
