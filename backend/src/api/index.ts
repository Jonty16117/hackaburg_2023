import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import emojis from './emojis';
import predict_temp from './predict_temp';
import predict_temp_range from './predict_temp_range';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/emojis', emojis);
router.use('/predict_temp', predict_temp);
router.use('/predict_temp_range', predict_temp_range);

export default router;
