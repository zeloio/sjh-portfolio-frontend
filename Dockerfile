FROM node:18-buster-slim
RUN mkdir -p /home/node/app/node_modules
RUN chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY * ./
RUN npm i
# RUN npm run build-production:ssr
USER node
COPY --chown=node:node . .
EXPOSE 8080
CMD [ "node", "./index.js" ]