# Methexis Friends CRM - Setup Instructions

## Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named "Methexis Friends CRM"
3. Rename the first sheet to "Membri"
4. Add these column headers in row 1:

```
A: Nume complet
B: Prenume
C: Nume
D: Categorie
E: Discount vin spirtoase
F: Discount rest produse
G: Telefon mobil
H: Email
I: Data nasterii
J: GDPR
K: COD CLIENT
L: Activ
M: NECESITĂ APROBARE
N: REFFERED BY
O: Timestamp
```

## Step 2: Create Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code
3. Paste the code from `google-apps-script.js` (see below)
4. Click **Save** (💾 icon)
5. Click **Deploy** → **New deployment**
6. Click ⚙️ **gear icon** → Select type: **Web app**
7. Configure:
   - **Description**: "Methexis Friends Registration"
   - **Execute as**: Me
   - **Who has access**: Anyone
8. Click **Deploy**
9. **Copy the Web App URL** - you'll need this!
10. Click **Authorize access** and grant permissions

## Step 3: Update the Registration Form

1. Open `/c/xampp/htdocs/friends-methexis/script.js`
2. Find this line:
   ```javascript
   const GOOGLE_APPS_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with the URL you copied
4. Save the file

## Step 4: Test

1. Open `http://localhost/friends-methexis/` in your browser
2. Fill out the registration form
3. Submit
4. Check your Google Sheet - you should see a new row!

## Google Apps Script Code

Save this as a reference (already in `google-apps-script.js`):

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Membri');

    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);

    // Generate client code (you can customize this logic)
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
```

## Next Steps

After you have the registration form working:
1. Set up the CRM admin panel at `/c/xampp/htdocs/crm-methexis/`
2. This will show pending registrations and allow you to approve them
