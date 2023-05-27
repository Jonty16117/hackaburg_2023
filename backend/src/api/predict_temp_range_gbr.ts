import express, { Request, Response } from 'express';
import axios from 'axios';
import multer from 'multer';
import fs from 'fs';

const upload = multer();

interface MulterRequest extends Request {
  file: Express.Multer.File;
}

const router = express.Router();

router.post<{}, string>('/', upload.single('file'), async (req: MulterRequest, res: Response) => {
  try {
    
    // const data = req.body
    const file = req.file;

    const destinationPath = './test_data.parquet';

    fs.writeFile(destinationPath, file.buffer, async (err) => {
      if (err) {
        console.error(err);
        throw new Error('Error in saving file');
      } else {
        const blob = new Blob([file.buffer], { type: file.mimetype });
        const response = await axios.post(`http://ml_backend:${process.env.ML_BACKEND_LOCAL_PORT}/predict_gbr_range`, blob);
        let prediction = response.data.prediction;
      }
    });




    res.json(123);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
