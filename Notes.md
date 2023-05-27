## What can we do with next predicted data row:
- Predict the next target temperature for the components and see if its out of the range of sub-optimal, we can suggest a motorspeed range/internal car climate settings to the user
- how fast soc is decreasing based on cars resource utilization (ambient temp, motor speed, etc)
- 

<!-- - manage internal car temp based on prediction -->



mongodb://username:password@host:port/database
mongodb://root:root@localhost:3001/db

running backend:
- npm install
- npm start
- console.log(process.env["MONGODB_URI_LOCAL"])
- Database admin (mongodb-express) is served at `http://localhost:8081/`

connect to ec2 ssh:
ssh -i /Users/jaswinderkantiwal/Downloads/ee-default-keypair.pem ubuntu@ec2-63-35-176-242.eu-west-1.compute.amazonaws.com

scp -i /Users/jaswinderkantiwal/Downloads/ee-default-keypair.pem -r /path/to/local/folder ubuntu@ec2-63-35-176-242.eu-west-1.compute.amazonaws.com:/home/ubuntu
