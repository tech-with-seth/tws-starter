ARG DATABASE_URL

FROM node:20-alpine AS development-dependencies-env
COPY . /app
WORKDIR /app
RUN npm ci

FROM node:20-alpine AS production-dependencies-env
ARG DATABASE_URL
COPY ./package.json package-lock.json prisma /app/
WORKDIR /app
ENV DATABASE_URL=$DATABASE_URL
RUN echo $DATABASE_URL
RUN apk add --no-cache postgresql-client
RUN if [ -z "$DATABASE_URL" ]; then echo "DATABASE_URL is not set"; exit 1; fi
RUN pg_isready -d $DATABASE_URL
RUN npm ci --omit=dev
RUN npx prisma migrate deploy
RUN npx prisma generate

FROM node:20-alpine AS build-env
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN npm run build

FROM node:20-alpine
COPY ./package.json package-lock.json /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
WORKDIR /app
CMD ["npm", "run", "start"]