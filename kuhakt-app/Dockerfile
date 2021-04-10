FROM nginx:stable-alpine
#testing the above using rhel8 
#registry.rosetta.ericssondevops.com/sd-mana-tmo-dcb-iot/tmo-dcb/rhel7nginx116:1.0
#FROM nginx
#RUN mkdir /etc/ssl/private/
#COPY ccm-nginx-selfsigned.crt /etc/ssl/certs/ccm-nginx-selfsigned.crt
#COPY ccm-nginx-selfsigned.key /etc/ssl/private/ccm-nginx-selfsigned.key
COPY ./build /usr/share/nginx/html
#COPY ./dist /opt/app-root/src/
# COPY nginx.conf /etc/nginx/nginx.conf
# COPY default.conf /etc/nginx/conf.d/default.conf
#ENV NGINX_DEFAULT_CONF_PATH=/etc/nginx/conf.d/default.conf 
#ENV NGINX_APP_ROOT=/usr/share/nginx/html
EXPOSE 80
#EXPOSE 8443
CMD ["nginx","-g","daemon off;"]