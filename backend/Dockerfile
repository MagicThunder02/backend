# FROM node:alpine
FROM node:alpine as magic-intermediate

EXPOSE 8080

WORKDIR /usr/src/app
COPY ./package*.json ./

# Installs latest Chromium (92) package.
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    nodejs \
    yarn

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Puppeteer v10.0.0 works with Chromium 92.
RUN npm add puppeteer@10.0.0
# RUN yarn add puppeteer@10.0.0

# Add user so we don't need --no-sandbox.
# RUN addgroup -S pptruser && adduser -S -G pptruser pptruser \
#     && mkdir -p /home/pptruser/Downloads /app \
#     && chown -R pptruser:pptruser /home/pptruser \
#     && chown -R pptruser:pptruser /app

# USER pptruser

RUN npm i

#cancellare magic-intermediate se vengono cambiati i pacchetti
FROM magic-intermediate

COPY ./dist ./dist
COPY ./client ./client
COPY ./.env ./


CMD ["node", "dist/main"]