FROM node
# FROM node:current-alpine3.16

# update packages
RUN apt update

# create root application folder
WORKDIR /app

# # copy configs to /app folder
# COPY package*.json ./
# COPY tsconfig.json ./
# # copy source code to /app/src folder
# COPY src /app/src
# COPY test /app/test
# COPY views /app/views



# check files list
# RUN ls -a

# RUN npm install
# RUN npm run build
# RUN npm start


# EXPOSE 3000

# CMD [ "npm", "start" ]
# ENTRYPOINT [ "tail", "-f", "/dev/null" ]
ENTRYPOINT [ "npm", "run", "dev" ]