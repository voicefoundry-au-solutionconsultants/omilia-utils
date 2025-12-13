/**
 * Unit Tests for Parse Appointment List
 */

const parseAppointmentList = require('./parse-appointment-list');

describe('Parse Appointment List', () => {
  describe('Successful responses with appointments', () => {
    test('parses single appointment', () => {
      const params = {
        wsResponseCode: "200",
        wsResponseBody: {
          appointments: [
            {
              date: "2025-01-15",
              time: "10:00 AM",
              type: "Checkup",
              location: "Main Office"
            }
          ]
        }
      };
      
      const result = parseAppointmentList(params);
      
      expect(result.hasAppointment).toBe('true');
      expect(result.appointmentDate).toBe('2025-01-15');
      expect(result.appointmentTime).toBe('10:00 AM');
      expect(result.appointmentType).toBe('Checkup');
      expect(result.appointmentLocation).toBe('Main Office');
      expect(result.totalAppointments).toBe('1');
    });

    test('parses multiple appointments and returns first', () => {
      const params = {
        wsResponseCode: "200",
        wsResponseBody: {
          appointments: [
            {
              date: "2025-01-15",
              time: "10:00 AM",
              type: "Checkup",
              location: "Main Office"
            },
            {
              date: "2025-02-20",
              time: "2:00 PM",
              type: "Follow-up",
              location: "Branch Office"
            },
            {
              date: "2025-03-10",
              time: "9:00 AM",
              type: "Consultation",
              location: "Downtown"
            }
          ]
        }
      };
      
      const result = parseAppointmentList(params);
      
      expect(result.hasAppointment).toBe('true');
      expect(result.appointmentDate).toBe('2025-01-15');
      expect(result.appointmentTime).toBe('10:00 AM');
      expect(result.totalAppointments).toBe('3');
    });
  });

  describe('Successful responses without appointments', () => {
    test('handles empty appointments array', () => {
      const params = {
        wsResponseCode: "200",
        wsResponseBody: {
          appointments: []
        }
      };
      
      const result = parseAppointmentList(params);
      
      expect(result.hasAppointment).toBe('false');
      expect(result.appointmentDate).toBe('');
      expect(result.appointmentTime).toBe('');
      expect(result.appointmentType).toBe('');
      expect(result.appointmentLocation).toBe('');
      expect(result.totalAppointments).toBe('0');
    });

    test('handles null appointments', () => {
      const params = {
        wsResponseCode: "200",
        wsResponseBody: {
          appointments: null
        }
      };
      
      const result = parseAppointmentList(params);
      
      expect(result.hasAppointment).toBe('false');
      expect(result.totalAppointments).toBe('0');
    });

    test('handles undefined appointments', () => {
      const params = {
        wsResponseCode: "200",
        wsResponseBody: {}
      };
      
      const result = parseAppointmentList(params);
      
      expect(result.hasAppointment).toBe('false');
      expect(result.totalAppointments).toBe('0');
    });
  });

  describe('Failed responses', () => {
    test('handles 500 error response', () => {
      const params = {
        wsResponseCode: "500"
      };
      
      const result = parseAppointmentList(params);
      
      expect(result.hasAppointment).toBe('error');
      expect(result.appointmentDate).toBe('');
      expect(result.appointmentTime).toBe('');
      expect(result.appointmentType).toBe('');
      expect(result.appointmentLocation).toBe('');
      expect(result.totalAppointments).toBe('0');
      expect(result.FailExitReason).toBe('SERVICE_UNAVAILABLE');
    });

    test('handles 404 error response', () => {
      const params = {
        wsResponseCode: "404"
      };
      
      const result = parseAppointmentList(params);
      
      expect(result.hasAppointment).toBe('error');
      expect(result.FailExitReason).toBe('SERVICE_UNAVAILABLE');
    });
  });
});
