import ee from '@google/earthengine';

export const getWaterData = async (region) => {
  try {
    // Get CHIRPS precipitation data
    const precipitation = ee.ImageCollection('UCSB-CHG/CHIRPS/DAILY')
      .filterDate(ee.Date(Date.now()).advance(-30, 'day'), ee.Date(Date.now()));
    
    // Get JRC water occurrence
    const water = ee.Image('JRC/GSW1_4/GlobalSurfaceWater')
      .select('occurrence');
    
    // Get terrain data
    const elevation = ee.Image('USGS/SRTMGL1_003');
    const slope = ee.Terrain.slope(elevation);
    
    // Calculate statistics for the region
    const stats = await Promise.all([
      precipitation.mean().reduceRegion({
        reducer: ee.Reducer.mean(),
        geometry: region,
        scale: 1000,
      }).getInfo(),
      water.reduceRegion({
        reducer: ee.Reducer.mean(),
        geometry: region,
        scale: 30,
      }).getInfo(),
      slope.reduceRegion({
        reducer: ee.Reducer.mean(),
        geometry: region,
        scale: 30,
      }).getInfo(),
    ]);

    return {
      precipitation: stats[0].precipitation,
      waterOccurrence: stats[1].occurrence,
      slope: stats[2].slope,
    };
  } catch (error) {
    console.error('Error fetching Earth Engine data:', error);
    throw error;
  }
};

export const getSoilMoisture = async (region) => {
  try {
    const soilMoisture = ee.ImageCollection('NASA_USDA/HSL/SMAP10KM_soil_moisture')
      .filterDate(ee.Date(Date.now()).advance(-7, 'day'), ee.Date(Date.now()))
      .select('ssm')
      .mean();

    const stats = await soilMoisture.reduceRegion({
      reducer: ee.Reducer.mean(),
      geometry: region,
      scale: 10000,
    }).getInfo();

    return stats.ssm;
  } catch (error) {
    console.error('Error fetching soil moisture data:', error);
    throw error;
  }
};