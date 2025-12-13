/**
 * Parse Appointment List
 * Extracts appointment information from array response
 * 
 * Output Function - MUST return object
 * Handles multiple appointments in response
 */

if (params.wsResponseCode === "200") {
  const appointments = params.wsResponseBody.appointments;
  
  if (appointments && appointments.length > 0) {
    // Get the next upcoming appointment
    const nextAppt = appointments[0];
    
    ocpReturn({
      hasAppointment: "true",
      appointmentDate: nextAppt.date,
      appointmentTime: nextAppt.time,
      appointmentType: nextAppt.type,
      appointmentLocation: nextAppt.location,
      totalAppointments: appointments.length.toString()
    });
  } else {
    // No appointments found
    ocpReturn({
      hasAppointment: "false",
      appointmentDate: "",
      appointmentTime: "",
      appointmentType: "",
      appointmentLocation: "",
      totalAppointments: "0"
    });
  }
} else {
  // Error case
  ocpReturn({
    hasAppointment: "error",
    appointmentDate: "",
    appointmentTime: "",
    appointmentType: "",
    appointmentLocation: "",
    totalAppointments: "0",
    FailExitReason: "SERVICE_UNAVAILABLE"
  });
}
