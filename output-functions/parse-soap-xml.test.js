/**
 * Unit Tests for Parse SOAP XML
 */

const parseSoapXml = require('./parse-soap-xml');

// Mock the parseXML function
global.parseXML = jest.fn();

describe('Parse SOAP XML', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Successful responses', () => {
    test('parses valid SOAP XML response', () => {
      const mockParsedXml = {
        'soapenv:Envelope': {
          'soapenv:Body': {
            'ns:CustomerResponse': {
              'Customer': {
                'CustomerId': '12345',
                'Name': 'John Doe',
                'Status': 'active',
                'Balance': '1000.00'
              }
            }
          }
        }
      };

      global.parseXML.mockReturnValue(mockParsedXml);

      const params = {
        wsResponseCode: "200",
        wsResponseBody: '<soapenv:Envelope>...</soapenv:Envelope>'
      };
      
      const result = parseSoapXml(params);
      
      expect(global.parseXML).toHaveBeenCalledWith(params.wsResponseBody);
      expect(result.status).toBe('success');
      expect(result.customerId).toBe('12345');
      expect(result.customerName).toBe('John Doe');
      expect(result.customerStatus).toBe('active');
      expect(result.accountBalance).toBe('1000.00');
    });

    test('handles missing optional fields', () => {
      const mockParsedXml = {
        'soapenv:Envelope': {
          'soapenv:Body': {
            'ns:CustomerResponse': {
              'Customer': {}
            }
          }
        }
      };

      global.parseXML.mockReturnValue(mockParsedXml);

      const params = {
        wsResponseCode: "200",
        wsResponseBody: '<soapenv:Envelope>...</soapenv:Envelope>'
      };
      
      const result = parseSoapXml(params);
      
      expect(result.status).toBe('success');
      expect(result.customerId).toBe('');
      expect(result.customerName).toBe('');
      expect(result.customerStatus).toBe('');
      expect(result.accountBalance).toBe('0');
    });

    test('handles empty strings in XML', () => {
      const mockParsedXml = {
        'soapenv:Envelope': {
          'soapenv:Body': {
            'ns:CustomerResponse': {
              'Customer': {
                'CustomerId': '',
                'Name': '',
                'Status': '',
                'Balance': ''
              }
            }
          }
        }
      };

      global.parseXML.mockReturnValue(mockParsedXml);

      const params = {
        wsResponseCode: "200",
        wsResponseBody: '<soapenv:Envelope>...</soapenv:Envelope>'
      };
      
      const result = parseSoapXml(params);
      
      expect(result.status).toBe('success');
      expect(result.accountBalance).toBe('0');
    });
  });

  describe('Failed responses', () => {
    test('handles non-200 response code', () => {
      const params = {
        wsResponseCode: "500"
      };
      
      const result = parseSoapXml(params);
      
      expect(global.parseXML).not.toHaveBeenCalled();
      expect(result.status).toBe('failed');
      expect(result.customerId).toBe('');
      expect(result.customerName).toBe('');
      expect(result.customerStatus).toBe('');
      expect(result.accountBalance).toBe('0');
      expect(result.FailExitReason).toBe('XML_PARSE_ERROR');
    });

    test('handles 400 error', () => {
      const params = {
        wsResponseCode: "400"
      };
      
      const result = parseSoapXml(params);
      
      expect(result.status).toBe('failed');
      expect(result.FailExitReason).toBe('XML_PARSE_ERROR');
    });
  });
});
