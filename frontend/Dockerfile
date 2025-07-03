FROM node:18-alpine AS builder
WORKDIR /app

COPY . .

RUN npm install
RUN VITE_API_URL=https://shortner-back-production.up.railway.app npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/templates/default.conf.template

ENV PORT=80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
