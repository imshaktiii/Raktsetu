const BloodStock = require("../models/BloodStock");

const getBloodStock = async (req, res) => {
  try {
    const stockRecords = await BloodStock.find({});
    
    // Seed sample records if empty so the user has active database entries automatically
    if (stockRecords.length === 0) {
      const seedData = [
        {
          name: "AIIMS Central Blood Bank",
          category: "Government",
          address: "Ansari Nagar, Near Ring Road, New Delhi",
          state: "Delhi",
          district: "New Delhi",
          city: "Ansari Nagar",
          phone: "+91-11-26588500",
          email: "bloodbank@aiims.edu",
          website: "www.aiims.edu",
          stock: {
            "A+": { bags: 24, status: "Available" },
            "A-": { bags: 4, status: "Low" },
            "B+": { bags: 38, status: "Available" },
            "B-": { bags: 2, status: "Critical" },
            "AB+": { bags: 15, status: "Available" },
            "AB-": { bags: 1, status: "Critical" },
            "O+": { bags: 45, status: "Available" },
            "O-": { bags: 0, status: "Unavailable" }
          }
        },
        {
          name: "Red Cross Society Regional Center",
          category: "Red Cross",
          address: "1, Red Cross Road, Near Parliament House, Central Delhi",
          state: "Delhi",
          district: "Central Delhi",
          city: "Central Delhi",
          phone: "+91-11-23716441",
          email: "info@indianredcross.org",
          website: "www.indianredcross.org",
          stock: {
            "A+": { bags: 18, status: "Available" },
            "A-": { bags: 8, status: "Available" },
            "B+": { bags: 22, status: "Available" },
            "B-": { bags: 6, status: "Low" },
            "AB+": { bags: 9, status: "Available" },
            "AB-": { bags: 4, status: "Low" },
            "O+": { bags: 28, status: "Available" },
            "O-": { bags: 5, status: "Low" }
          }
        },
        {
          name: "Safdarjung Hospital Blood Depot",
          category: "Government",
          address: "Ansari Nagar East, Safdarjung, New Delhi",
          state: "Delhi",
          district: "New Delhi",
          city: "Safdarjung",
          phone: "+91-11-26707100",
          email: "contact@safdarjunghospital.gov.in",
          website: "www.vmmc-sjh.nic.in",
          stock: {
            "A+": { bags: 12, status: "Available" },
            "A-": { bags: 1, status: "Critical" },
            "B+": { bags: 19, status: "Available" },
            "B-": { bags: 0, status: "Unavailable" },
            "AB+": { bags: 5, status: "Low" },
            "AB-": { bags: 0, status: "Unavailable" },
            "O+": { bags: 31, status: "Available" },
            "O-": { bags: 2, status: "Critical" }
          }
        },
        {
          name: "Max Super Speciality Blood Bank",
          category: "Private",
          address: "Press Enclave Road, Saket, South Delhi",
          state: "Delhi",
          district: "South Delhi",
          city: "Saket",
          phone: "+91-11-26515050",
          email: "saket@maxhealthcare.com",
          website: "www.maxhealthcare.in",
          stock: {
            "A+": { bags: 30, status: "Available" },
            "A-": { bags: 10, status: "Available" },
            "B+": { bags: 35, status: "Available" },
            "B-": { bags: 8, status: "Available" },
            "AB+": { bags: 18, status: "Available" },
            "AB-": { bags: 5, status: "Low" },
            "O+": { bags: 40, status: "Available" },
            "O-": { bags: 12, status: "Available" }
          }
        },
        {
          name: "Mumbai Central Health Bank",
          category: "Government",
          address: "Central Hospital Grounds, Dadar, Mumbai",
          state: "Maharashtra",
          district: "Mumbai City",
          city: "Dadar",
          phone: "+91-22-24101112",
          email: "mumbai.health@gov.in",
          website: "www.maharashtra.gov.in",
          stock: {
            "A+": { bags: 14, status: "Available" },
            "A-": { bags: 2, status: "Critical" },
            "B+": { bags: 26, status: "Available" },
            "B-": { bags: 1, status: "Critical" },
            "AB+": { bags: 8, status: "Low" },
            "AB-": { bags: 0, status: "Unavailable" },
            "O+": { bags: 35, status: "Available" },
            "O-": { bags: 4, status: "Low" }
          }
        }
      ];
      const inserted = await BloodStock.insertMany(seedData);
      return res.status(200).json({
        success: true,
        stocks: inserted
      });
    }

    res.status(200).json({
      success: true,
      stocks: stockRecords
    });
  } catch (error) {
    console.error("Error fetching blood stock:", error);
    res.status(500).json({
      success: false,
      message: "Server Error: Could not fetch blood stock records",
      error: error.message
    });
  }
};

module.exports = {
  getBloodStock
};
