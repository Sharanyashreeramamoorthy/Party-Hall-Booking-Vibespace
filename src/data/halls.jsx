const halls = [
  {
    id: 1,
    name: "Grand Palace Hall",
    location: "Chennai",
    capacity: 200,
    price: 65000,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800",
    realityReport: {
      crowdComfort: 82,
      parking: 61,
      acPerformance: 73,
      management: 84,
      vendorFlexibility: 52,
      trueValue: 80
    },
    availability: [
      { date: "12 Oct", status: "available", price: 65000 },
      { date: "13 Oct", status: "available", price: 65000 },
      { date: "14 Oct", status: "booked", price: null },
      { date: "15 Oct", status: "limited", price: 72000 },
      { date: "16 Oct", status: "available", price: 65000 }
    ]
  },
  {
    id: 2,
    name: "Royal Celebration Hall",
    location: "Chennai",
    capacity: 150,
    price: 55000,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800",
    realityReport: {
      crowdComfort: 90,
      parking: 88,
      acPerformance: 80,
      management: 92,
      vendorFlexibility: 70,
      trueValue: 88
    },
    availability: [
      { date: "12 Oct", status: "booked", price: null },
      { date: "13 Oct", status: "available", price: 55000 },
      { date: "14 Oct", status: "available", price: 55000 },
      { date: "15 Oct", status: "available", price: 55000 },
      { date: "16 Oct", status: "limited", price: 60000 }
    ]
  },
  {
    id: 3,
    name: "Green Garden Convention Center",
    location: "Chennai",
    capacity: 300,
    price: 75000,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
    realityReport: {
      crowdComfort: 78,
      parking: 95,
      acPerformance: 65,
      management: 75,
      vendorFlexibility: 85,
      trueValue: 79
    },
    availability: [
      { date: "12 Oct", status: "available", price: 75000 },
      { date: "13 Oct", status: "limited", price: 82000 },
      { date: "14 Oct", status: "available", price: 75000 },
      { date: "15 Oct", status: "booked", price: null },
      { date: "16 Oct", status: "available", price: 75000 }
    ]
  }
];

export default halls;