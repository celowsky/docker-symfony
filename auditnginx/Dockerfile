FROM nginx

COPY nginx.conf /etc/nginx/
COPY audit.conf /etc/nginx/sites-available/

RUN mkdir -p /etc/nginx/sites-enabled/ \
    && ln -s /etc/nginx/sites-available/audit.conf /etc/nginx/sites-enabled/audit.conf \
    && rm /etc/nginx/conf.d/default.conf 

RUN echo "upstream audit-php-upstream { server auditphp:9000; }" > /etc/nginx/conf.d/upstream.conf

RUN usermod -u 1000 www-data

CMD ["nginx"]

EXPOSE 80
EXPOSE 443
