FROM nginx
# COPY nginx.conf /etc/nginx/nginx.conf
COPY build /usr/share/nginx/html
COPY ./release/prod/nginx.conf /etc/nginx/nginx.conf
RUN  cd /usr/share/nginx/html && ls
WORKDIR /usr/share/nginx/html
CMD ["nginx","-g","daemon off;"]


