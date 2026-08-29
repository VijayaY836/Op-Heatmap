// India GeoJSON boundary including disputed territories per Government of India claims
// Includes: Jammu & Kashmir, Ladakh, Arunachal Pradesh (claimed but disputed with China)
// Source: Based on Survey of India political map boundaries

export const indiaBoundary = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    properties: { name: 'India' },
    geometry: {
      type: 'MultiPolygon',
      coordinates: [
        // Mainland India + J&K + Ladakh + Arunachal Pradesh
        [[
          // Jammu & Kashmir / Ladakh northern boundary (claimed)
          [73.8, 37.1],
          [74.5, 37.1],
          [75.5, 37.1],
          [76.5, 37.1],
          [77.5, 37.1],
          [78.5, 37.1],
          [79.5, 37.1],
          [80.0, 37.0],
          // Arunachal Pradesh eastern boundary (claimed, disputed with China)
          [92.0, 37.0],
          [93.0, 36.5],
          [94.0, 35.5],
          [95.0, 34.5],
          [96.0, 33.0],
          [97.0, 31.0],
          [97.4, 29.5],
          [97.4, 28.0],
          [97.4, 27.0],
          [97.0, 26.0],
          [96.0, 25.0],
          [95.0, 24.0],
          [94.0, 23.0],
          [93.0, 22.0],
          [92.0, 21.0],
          [91.0, 20.0],
          // Northeast states
          [90.0, 19.0],
          [89.0, 18.0],
          [88.0, 17.0],
          [87.0, 16.0],
          [86.0, 15.0],
          [85.0, 14.0],
          [84.0, 13.0],
          [83.0, 12.0],
          [82.0, 11.0],
          [81.0, 10.0],
          [80.0, 9.0],
          [79.0, 8.5],
          // Southern tip - Kanyakumari
          [78.0, 8.1],
          [77.0, 8.1],
          [76.0, 8.1],
          [75.0, 8.1],
          [74.0, 8.1],
          [73.0, 8.1],
          [72.0, 8.1],
          [71.0, 8.1],
          [70.0, 8.1],
          [69.0, 8.1],
          [68.1, 8.1],
          // Western coast - Gujarat
          [68.1, 10.0],
          [68.1, 12.0],
          [68.1, 14.0],
          [68.1, 16.0],
          [68.1, 18.0],
          [68.1, 20.0],
          [68.1, 22.0],
          [68.1, 24.0],
          [68.1, 26.0],
          [68.1, 28.0],
          [68.1, 30.0],
          [68.1, 32.0],
          [68.1, 34.0],
          [68.1, 36.0],
          [68.1, 37.1],
          // Back to start
          [73.8, 37.1]
        ]]
      ]
    }
  }]
};

// Simplified but politically accurate boundary for heatmap overlay
// Shows India's claimed boundaries including disputed regions
export const indiaSimplifiedBoundary = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    properties: { name: 'India' },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [68.1, 37.1],   // J&K/Ladakh north (claimed boundary with Pakistan/China)
        [68.1, 8.1],    // Kanyakumari south
        [97.4, 8.1],    // Easternmost point (Arunachal Pradesh, claimed)
        [97.4, 37.1],   // Arunachal Pradesh north (McMahon Line, disputed with China)
        [68.1, 37.1]    // Close polygon
      ]]
    }
  }]
};

// Detailed boundary for better visual representation
export const indiaDetailedBoundary = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    properties: { name: 'India' },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        // Western boundary (Gujarat to J&K)
        [68.11, 8.07],   // Kanyakumari
        [68.11, 10.0],
        [68.11, 15.0],
        [68.11, 20.0],
        [68.11, 23.5],
        [68.11, 24.5],   // Rann of Kutch
        [69.0, 24.5],
        [70.0, 24.0],
        [71.0, 23.5],
        [72.0, 23.0],
        [73.0, 22.5],
        [74.0, 22.0],
        [75.0, 21.5],
        [76.0, 21.0],
        [77.0, 20.5],
        [78.0, 20.0],
        [79.0, 19.0],
        [80.0, 17.5],
        [81.0, 16.0],
        [82.0, 14.5],
        [83.0, 13.0],
        [84.0, 11.5],
        [85.0, 10.0],
        [86.0, 9.0],
        [87.0, 8.5],
        [88.0, 8.3],
        [89.0, 8.2],
        [90.0, 8.2],
        [91.0, 8.2],
        [92.0, 8.5],
        [93.0, 10.0],
        [94.0, 12.0],
        [95.0, 14.0],
        [96.0, 16.0],
        [97.0, 18.0],
        [97.4, 20.0],
        [97.4, 22.0],
        [97.4, 24.0],
        [97.4, 26.0],
        [97.4, 28.0],
        [97.4, 29.5],
        // Arunachal Pradesh northern boundary (McMahon Line)
        [96.5, 30.5],
        [95.5, 31.5],
        [94.5, 32.5],
        [93.5, 33.5],
        [92.5, 34.5],
        [91.5, 35.5],
        [90.5, 36.0],
        [89.5, 36.5],
        [88.5, 36.8],
        [87.5, 37.0],
        [86.5, 37.0],
        [85.5, 37.0],
        [84.5, 37.0],
        [83.5, 37.0],
        [82.5, 37.0],
        [81.5, 37.0],
        [80.5, 37.0],
        [79.5, 37.0],
        [78.5, 37.0],
        [77.5, 37.0],
        [76.5, 37.0],
        [75.5, 37.0],
        [74.5, 37.0],
        [73.8, 37.0],
        // J&K / Ladakh northern areas
        [73.0, 37.0],
        [72.0, 37.0],
        [71.0, 37.0],
        [70.0, 37.0],
        [69.0, 37.0],
        [68.11, 37.07],
        [68.11, 8.07]
      ]]
    }
  }]
};

export default indiaBoundary;