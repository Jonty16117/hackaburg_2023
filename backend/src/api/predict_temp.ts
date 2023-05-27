import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post<{}, string>('/', async (req, res) => {
  try {
    const data = req.body

    if (data.use_model !== "rfr" && data.use_model !== "gbr") {
      throw new Error('Missing required fields');
    }

    // const data = {
    //   feature_c: 1.23,
    //   feature_ct: 4.56,
    //   feature_motorspeed: 7.89,
    //   ambient_temp: 10.11,
    //   car_speed: 12.13,
    //   soc: 14.15
    //   use_model: "rfr"
    // };
    
    const features = {
      feature_c: data.feature_c,
      feature_ct: data.feature_ct,
      feature_motorspeed: data.feature_motorspeed,
      ambient_temp: data.ambient_temp,
      car_speed: data.car_speed,
      soc: data.soc
    };

    let prediction = ""

    if (data.use_model === "rfr") {
      const response = await axios.post(`http://ml_backend:${process.env.ML_BACKEND_LOCAL_PORT}/predict_rfr`, features);
      prediction = response.data.prediction;
    }

    if (data.use_model === "gbr") {
      const response = await axios.post(`http://ml_backend:${process.env.ML_BACKEND_LOCAL_PORT}/predict_gbr`, features);
      prediction = response.data.prediction;
    }

    res.json(prediction);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
