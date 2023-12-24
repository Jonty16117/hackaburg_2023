import express, { Request, Response } from 'express';
import axios from 'axios';
import multer from 'multer';
import fs from 'fs';
import FormData from 'form-data';

const upload = multer();

interface MulterRequest extends Request {
  file: Express.Multer.File;
}

const router = express.Router();

router.post<{}, string>('/', upload.single('file'), async (req: MulterRequest, res: Response) => {
  try {
    const file = req.file;
    const destinationPath = './test_data.parquet';
    fs.writeFile(destinationPath, file.buffer, async (err) => {
      if (err) {
        console.error(err);
        throw new Error('Error in saving file');
      } else {
        const formData = new FormData();
        formData.append('file', fs.createReadStream(destinationPath));
        try {
          await axios.post(`http://ml_backend:${process.env.ML_BACKEND_LOCAL_PORT}/predict_rfr_range`, formData, {
            headers: formData.getHeaders(),
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
          });
          // fs.writeFileSync("predictions.csv", response.data);
          console.log('File uploaded successfully');
        } catch (error) {
          console.error('Error uploading file:', error.message);
        }
      }
    });
    res.json("success");
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
