// Google Drive API Integration
export class GoogleDriveService {
  constructor(apiKey, accessToken) {
    this.apiKey = apiKey;
    this.accessToken = accessToken;
    this.baseUrl = 'https://www.googleapis.com/drive/v3';
  }

  // Create folder structure based on date
  async createDateFolder(date) {
    const folderPath = date.split('-'); // ['2026', '01', '21']
    const year = folderPath[0];
    const month = folderPath[1];
    const day = folderPath[2];

    try {
      // Check if main folder exists
      let mainFolderId = await this.findOrCreateFolder('Hotel_Slips', 'root');
      
      // Create year folder
      let yearFolderId = await this.findOrCreateFolder(year, mainFolderId);
      
      // Create month folder
      let monthFolderId = await this.findOrCreateFolder(month, yearFolderId);
      
      // Create day folder
      let dayFolderId = await this.findOrCreateFolder(day, monthFolderId);
      
      return {
        mainFolderId,
        yearFolderId,
        monthFolderId,
        dayFolderId,
        folderPath: `Hotel_Slips/${year}/${month}/${day}`
      };
    } catch (error) {
      console.error('Error creating folder structure:', error);
      throw error;
    }
  }

  // Find or create folder
  async findOrCreateFolder(name, parentId) {
    try {
      // Search for existing folder
      const searchResponse = await fetch(
        `${this.baseUrl}/files?q=name='${name}' and '${parentId}' in parents and mimeType='application/vnd.google-apps.folder'&key=${this.apiKey}`,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`
          }
        }
      );
      
      const searchData = await searchResponse.json();
      
      if (searchData.files && searchData.files.length > 0) {
        return searchData.files[0].id;
      }
      
      // Create new folder if not exists
      const createResponse = await fetch(`${this.baseUrl}/files?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          mimeType: 'application/vnd.google-apps.folder',
          parents: [parentId]
        })
      });
      
      const createData = await createResponse.json();
      return createData.id;
    } catch (error) {
      console.error('Error finding/creating folder:', error);
      throw error;
    }
  }

  // Upload file to specific folder
  async uploadFile(file, folderId, metadata = {}) {
    try {
      const formData = new FormData();
      
      const fileMetadata = {
        name: file.name,
        parents: [folderId],
        description: metadata.description || '',
        properties: metadata.properties || {}
      };
      
      formData.append('metadata', new Blob([JSON.stringify(fileMetadata)], {
        type: 'application/json'
      }));
      formData.append('file', file);
      
      const response = await fetch(
        `https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`
          },
          body: formData
        }
      );
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }
}

// OCR Service using Google Vision API
export class OCRService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://vision.googleapis.com/v1';
  }

  // Process image with OCR
  async processImage(imageFile) {
    try {
      // Convert image to base64
      const base64Image = await this.fileToBase64(imageFile);
      
      const requestBody = {
        requests: [{
          image: {
            content: base64Image
          },
          features: [{
            type: 'TEXT_DETECTION',
            maxResults: 1
          }]
        }]
      };
      
      const response = await fetch(
        `${this.baseUrl}/images:annotate?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        }
      );
      
      const data = await response.json();
      
      if (data.responses && data.responses[0].textAnnotations) {
        const extractedText = data.responses[0].textAnnotations[0].description;
        return this.parseSlipData(extractedText);
      }
      
      throw new Error('No text detected in image');
    } catch (error) {
      console.error('OCR processing error:', error);
      throw error;
    }
  }

  // Convert file to base64
  fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = error => reject(error);
    });
  }

  // Parse slip data from OCR text
  parseSlipData(text) {
    const data = {
      amount: null,
      date: null,
      time: null,
      reference: null,
      bankAccount: null,
      transferType: null,
      confidence: 0.8
    };

    try {
      // Extract amount (Thai Baht patterns)
      const amountPatterns = [
        /(?:จำนวนเงิน|Amount|ยอดเงิน)[\s:]*([0-9,]+\.?[0-9]*)/i,
        /([0-9,]+\.?[0-9]*)\s*(?:บาท|THB|Baht)/i,
        /\b([0-9,]+\.?[0-9]*)\s*(?=บาท|THB)/i
      ];
      
      for (const pattern of amountPatterns) {
        const match = text.match(pattern);
        if (match) {
          data.amount = parseFloat(match[1].replace(/,/g, ''));
          break;
        }
      }

      // Extract date
      const datePatterns = [
        /(\d{1,2}\/\d{1,2}\/\d{4})/,
        /(\d{1,2}-\d{1,2}-\d{4})/,
        /(\d{4}-\d{1,2}-\d{1,2})/
      ];
      
      for (const pattern of datePatterns) {
        const match = text.match(pattern);
        if (match) {
          data.date = this.normalizeDate(match[1]);
          break;
        }
      }

      // Extract time
      const timeMatch = text.match(/(\d{1,2}:\d{2}(?::\d{2})?)/);
      if (timeMatch) {
        data.time = timeMatch[1];
      }

      // Extract reference number
      const refPatterns = [
        /(?:Ref|Reference|อ้างอิง)[\s:]*([A-Z0-9]+)/i,
        /([A-Z]{2,}\d{6,})/,
        /(\d{10,})/
      ];
      
      for (const pattern of refPatterns) {
        const match = text.match(pattern);
        if (match) {
          data.reference = match[1];
          break;
        }
      }

      // Extract bank account
      const accountMatch = text.match(/(\d{3}-\d{1}-\d{5}-\d{1}|\d{10,})/);
      if (accountMatch) {
        data.bankAccount = accountMatch[1];
      }

      // Determine transfer type
      if (text.includes('โอนเงิน') || text.includes('Transfer')) {
        data.transferType = 'โอนเงิน';
      } else if (text.includes('ฝากเงิน') || text.includes('Deposit')) {
        data.transferType = 'ฝากเงิน';
      }

      // Calculate confidence based on extracted data
      let confidence = 0.5;
      if (data.amount) confidence += 0.3;
      if (data.date) confidence += 0.2;
      if (data.reference) confidence += 0.2;
      if (data.bankAccount) confidence += 0.1;
      
      data.confidence = Math.min(confidence, 1.0);

    } catch (error) {
      console.error('Error parsing slip data:', error);
    }

    return data;
  }

  // Normalize date format
  normalizeDate(dateString) {
    try {
      const formats = [
        /(\d{1,2})\/(\d{1,2})\/(\d{4})/,  // DD/MM/YYYY
        /(\d{1,2})-(\d{1,2})-(\d{4})/,   // DD-MM-YYYY
        /(\d{4})-(\d{1,2})-(\d{1,2})/    // YYYY-MM-DD
      ];

      for (const format of formats) {
        const match = dateString.match(format);
        if (match) {
          if (format === formats[2]) {
            // Already in YYYY-MM-DD format
            return dateString;
          } else {
            // Convert DD/MM/YYYY or DD-MM-YYYY to YYYY-MM-DD
            const day = match[1].padStart(2, '0');
            const month = match[2].padStart(2, '0');
            const year = match[3];
            return `${year}-${month}-${day}`;
          }
        }
      }
      
      return dateString;
    } catch (error) {
      return dateString;
    }
  }
}

// Room Rate Calculator
export class RoomRateCalculator {
  constructor(roomRates = {}) {
    this.roomRates = {
      // Standard rooms
      '101': 1500, '102': 1500, '103': 1500, '104': 1500, '105': 1500,
      // Deluxe rooms  
      '201': 2000, '202': 2000, '203': 2000, '204': 2000, '205': 2000,
      // Suite rooms
      '301': 2500, '302': 2500, '303': 2500, '304': 2500, '305': 2500,
      ...roomRates
    };
    
    this.taxRate = 0.07; // 7% VAT
    this.serviceCharge = 0.10; // 10% service charge
  }

  // Calculate room charges
  calculateCharges(roomId, checkInDate, checkOutDate, additionalServices = []) {
    const baseRate = this.roomRates[roomId] || 1500;
    const nights = this.calculateNights(checkInDate, checkOutDate);
    
    const roomCharges = baseRate * nights;
    const serviceTotal = additionalServices.reduce((sum, service) => sum + service.amount, 0);
    const subtotal = roomCharges + serviceTotal;
    const serviceCharge = subtotal * this.serviceCharge;
    const taxAmount = (subtotal + serviceCharge) * this.taxRate;
    const total = subtotal + serviceCharge + taxAmount;

    return {
      roomId,
      baseRate,
      nights,
      roomCharges,
      additionalServices,
      serviceTotal,
      subtotal,
      serviceCharge,
      taxAmount,
      total,
      breakdown: {
        'ค่าห้องพัก': roomCharges,
        'บริการเสริม': serviceTotal,
        'ค่าบริการ (10%)': serviceCharge,
        'ภาษี (7%)': taxAmount
      }
    };
  }

  // Calculate number of nights
  calculateNights(checkInDate, checkOutDate) {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const diffTime = Math.abs(checkOut - checkIn);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(diffDays, 1); // Minimum 1 night
  }

  // Get room type and rate
  getRoomInfo(roomId) {
    const rate = this.roomRates[roomId];
    if (!rate) return null;

    let type = 'Standard';
    if (roomId.startsWith('2')) type = 'Deluxe';
    if (roomId.startsWith('3')) type = 'Suite';

    return {
      roomId,
      type,
      rate,
      floor: Math.floor(parseInt(roomId) / 100)
    };
  }

  // Update room rates
  updateRoomRate(roomId, newRate) {
    this.roomRates[roomId] = newRate;
  }

  // Get all room rates
  getAllRates() {
    return { ...this.roomRates };
  }
}
