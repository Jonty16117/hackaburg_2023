import express, { Request, Response } from 'express';
import axios from 'axios';
import multer, { File } from 'multer';

const upload = multer();

interface MulterRequest extends Request {
  file: File;
}

const router = express.Router();

router.post<{}, string>('/', upload.single('file'), async (req: MulterRequest, res: Response) => {
  try {
    const data = req.body
    const file = req.file;

    if (data.use_model !== "rfr" && data.use_model !== "gbr") {
      throw new Error('Missing required fields');
    }

    let prediction = ""

    if (data.use_model === "rfr") {
      const response = await axios.post(`http://ml_backend:${process.env.ML_BACKEND_LOCAL_PORT}/predict_rfr_range`, file);
      prediction = response.data.prediction;
    }

    if (data.use_model === "gbr") {
      const response = await axios.post(`http://ml_backend:${process.env.ML_BACKEND_LOCAL_PORT}/predict_gbr_range`, file);
      prediction = response.data.prediction;
    }

    res.json(prediction);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
