import { error, type RequestHandler } from "@sveltejs/kit";
import { v4 } from "uuid";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { PUBLIC_PRODUCTION } from "$lib/Logic/production_state";

export const GET: RequestHandler = async ({ url, fetch }) => {
  const amount = Number(url.searchParams.get("amount") ?? "0");

  if (isNaN(amount) || amount <= 0) {
    error(400, "Amount must be a positive number.");
  }
  else if(amount > 6){
    error(400, "Max of 6 codes can be generated at a time.");
  }

  //Genrate the PDF and send it back
  try {
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    let page = pdfDoc.addPage();
    const { width, height } = page.getSize();

    const headingFontSize = 13;
    const margin = 38; // Margin around the page
    const qrSize = 150; // QR code side length
    const spaceBetweenQr = 30; // Space between QR codes
    const headingHeight = 100; // Height reserved for the heading
    const borderPadding = 5; // Padding around the QR code border

    // Add a heading
    const headingText = "OneMoreMeal - Meal Pickup Codes";
    page.drawText(headingText, {
      font,
      x: margin,
      y: height - margin - 20,
      size: 18,
      color: rgb(0, 0, 0),
    });

    // Add a instructionText
    const instructionText =
      "Clearly cut out each code and securely attach one code to each of your meal containers.";
    page.drawText(instructionText, {
      font,
      x: margin,
      y: height - margin - headingFontSize - 40,
      size: headingFontSize,
      color: rgb(0, 0, 0),
    });

    // Calculate starting positions
    let x = margin;
    let y = height - headingHeight - margin;

    for (let i = 0; i < amount; i++) {
      const uuid = v4();
      const response = PUBLIC_PRODUCTION ? await fetch(
        `https://qrickit.com/api/qr.php?d=https://www.onemoremeal.co.za/newmeal?rnd=${uuid}&addtext=Scan+for+pickup&t=p&e=m`
      ) : await fetch(`https://qrickit.com/api/qr.php?d=https://867b-102-132-162-197.ngrok-free.app/newmeal?rnd=${uuid}&addtext=Scan+for+pickup&t=p&e=m`);

      if (!response.ok) {
        error(500, "Failed to fetch QR code");
      }

      const qrCode = await response.arrayBuffer();

      const qrCodeImage = await pdfDoc.embedPng(qrCode);

      page.drawImage(qrCodeImage, {
        x,
        y: y - qrSize,
        width: qrSize,
        height: qrSize,
      });


      page.drawRectangle({
        x: x - borderPadding, // Start slightly outside the QR code
            y: y - qrSize - borderPadding,
            width: qrSize + 2 * borderPadding,
            height: qrSize + 2 * borderPadding,
            borderColor: rgb(0, 0, 0), // Black border
            borderWidth: 1, 
      });

      // Move to the next position
      x += qrSize + spaceBetweenQr;

      // If the next QR code doesn't fit in the row, move to the next row
      if (x + qrSize > width - margin) {
        x = margin;
        y -= qrSize + spaceBetweenQr;
      }

      // Check if there's enough space for another row
      if (y - qrSize - spaceBetweenQr < margin) {
        // Add a new page if the current page is full
        x = margin;
        y = height - headingHeight - margin;
        page = pdfDoc.addPage([595.28, 841.89]);
      }
    }

    const pdfBytes = await pdfDoc.save();

    return new Response(pdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="qr_codes.pdf"`,
      },
    });
  } catch (e) {
    error(500, "Failed to generate PDF: " + e);
  }
};
