const styles = `

...
* {
    box-sizing: border-box;
}
...
.image, .details {
    flex: 1;  /* this means each will take up half the container's width */
    max-width: 50%; /* this ensures it doesn't grow larger than half the container */
    box-sizing: border-box;
}
...

body {
    font-family: Arial, sans-serif;
    background-color: #fafafa;
    margin: 0;
    padding: 0;
}

.container {
    max-width: 1000px;
    margin: 0px auto;
    padding: 20px;
    border: 2px solid #f3d3ff;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    background-color: #fafafa;
}

.header {
    text-align: center;
    margin-bottom: 20px;
    background-color: #ffd42a;
    padding: 10px;
}

.designer-info {
    text-align: left;
    margin-bottom: 10px;
}

.content {
    display: flex;
    justify-content: space-between;
    flex-wrap: no-wrap;
    margin-bottom: 20px;
}

.image {
    width: 100%;
    text-align: center;
    padding: 10px;
}

.image img {
    width: 100%;  /* Set only the width */
    border: 1px solid #f3d3ff;
}

.details {
    width: 50%;
    padding: 10px;
}

.signature, .changes-made, .review-next, .print-button {
    text-align: center;
    margin-top: 20px;
}

input[type="text"] {
    width: 60%;
    padding: 10px;
    margin: 5px auto;
    border: 1px solid #f3d3ff;
    display: block;
    max-length: 60;
}

.review-next button, .print-button button {
    padding: 10px 20px;
    background-color: #00e0ed;
    color: #fff;
    cursor: pointer;
}

.changes-made p {
    text-decoration: underline;
}

.changes-table {
    margin: auto;
    border: 1px solid #f3d3ff;
    width: 80%;
}
/* Print-specific styles */
@media print {
    body {
        background-color: white;  /* Adjust as needed */
        width: 100%;
    }
    .container {
        width: 100%;
        border: none;
        box-shadow: none;
    }
    .header {
        background-color: #ffd42a;  /* Ensure the header background prints */
    }
    .content {
        flex-wrap: no-wrap;
    }
    .image, .details {
        flex: 1;
        max-width: 50%;  /* Explicitly set width for printing */
    }
    .no-print {
        display: none;  /* Hide any non-print elements */
    }
}
`;

function generateAndDownload() {
    // Capture input values
    let headerText = document.getElementById("headerText").value;
    let designName = document.getElementById("designName").value;
    let imgSrc = document.getElementById("imgSrc").value;
    let productType = document.getElementById("productType").value;
    let size = document.getElementById("size").value;
    let color = document.getElementById("color").value;
    let quantity = document.getElementById("quantity").value;
    let price = document.getElementById("price").value;
    let designerName = document.getElementById("designerName").value;
    let designerPosition = document.getElementById("designerPosition").value;
    let reviewNextLink = document.getElementById("reviewNextLink").value;
    let changesMade = document.getElementById("changesMade").value;

    // Formulate the generated HTML
    let generatedHTML = `
    <!DOCTYPE html>
    <html>
    <head>
    <style>
    ${styles}
    </style>
      <title>${headerText}</title>
      <script>
        function printPage() {
          window.print();
        }
        function reviewNext() {
          window.location.href = '${reviewNextLink}';
        }
      </script>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${headerText}</h1>
          <p class="no-print">Review the details below and sign to approve.</p>
        </div>
        
        <div class="content">
          <div class="image">
            <h3>Design Name: ${designName}</h3>
            <img width="320" src="${imgSrc}" alt="Design Image">
          </div>
          <div class="details">
            <h2>Design Details:</h2>
            <table>
              <tr>
                <td>Product:</td>
                <td>${productType}</td>
              </tr>
              <tr>
                <td>Size:</td>
                <td>${size}</td>
              </tr>
              <tr>
                <td>Color:</td>
                <td>${color}</td>
              </tr>
              <tr>
                <td>Quantity:</td>
                <td>${quantity}</td>
              </tr>
              <tr>
                <td>Price per Unit:</td>
                <td>${price}</td>
              </tr>
              <tr>
                <td colspan="2">
                  Designer: ${designerName}<br>
                  Position: ${designerPosition}
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div class="changes-made">
          <h2>Changes Made:</h2>
          <table class="changes-table">
            <tr>
              <td>${changesMade}</td>
            </tr>
          </table>
        </div>
        <div class="signature">
          <label for="signature">Signature:</label>
          <input type="text" id="signature" name="signature">
        </div>
        <div class="print-button no-print">
          <button onclick="printPage()">Print to PDF</button>
          <p>Once signed, print this page and send it back to the designer.</p>
        </div>
        <div class="review-next no-print">
          <button onclick="reviewNext()">Review Next Proof</button>
        </div>
      </div>
    </body>
    </html>
    `;

    // Create a downloadable file from the generated HTML
    let blob = new Blob([generatedHTML], { type: 'text/html' });
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'GeneratedProof.html';
    link.click();
}
