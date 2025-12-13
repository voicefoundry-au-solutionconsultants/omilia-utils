/**
 * Parse SOAP/XML Response
 * Uses parseXML function to handle SOAP responses
 * 
 * Output Function - MUST return object
 * Demonstrates XML parsing capability
 */

if (params.wsResponseCode === "200") {
  // Parse XML response
  const parsed = parseXML(params.wsResponseBody);
  
  // Navigate SOAP envelope structure
  const envelope = parsed['soapenv:Envelope'];
  const body = envelope['soapenv:Body'];
  const response = body['ns:CustomerResponse'];
  
  // Extract customer data
  const customer = response['Customer'];
  
  ocpReturn({
    status: "success",
    customerId: customer['CustomerId'] || "",
    customerName: customer['Name'] || "",
    customerStatus: customer['Status'] || "",
    accountBalance: customer['Balance'] || "0"
  });
} else {
  ocpReturn({
    status: "failed",
    customerId: "",
    customerName: "",
    customerStatus: "",
    accountBalance: "0",
    FailExitReason: "XML_PARSE_ERROR"
  });
}
