# See https://github.com/docker-library/php/blob/4677ca134fe48d20c820a19becb99198824d78e3/7.0/fpm/Dockerfile
FROM php:7.1-fpm

LABEL author="Christian Elowsky <christian.elowsky@gmail.com>"

RUN apt-get update && apt-get install -y \
    git \
    unzip 

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer --version

# Type docker-php-ext-install to see available extensions
RUN docker-php-ext-install pdo pdo_mysql


# install xdebug
RUN pecl install xdebug
RUN docker-php-ext-enable xdebug
RUN echo "error_reporting = E_ALL" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini
RUN echo "display_startup_errors = On" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini
RUN echo "display_errors = On" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini
RUN echo "xdebug.remote_enable=1" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini
RUN echo "xdebug.remote_connect_back=1" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini
RUN echo "xdebug.idekey=\"PHPSTORM\"" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini
RUN echo "xdebug.remote_port=9123" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini


RUN echo 'alias sf="php app/console"' >> ~/.bashrc
RUN echo 'alias sf3="php bin/console"' >> ~/.bashrc

COPY ./package.json /var/www/symfony/package.json
COPY ./gulpfile.js /var/www/symfony/gulpfile.js
COPY ./composer.json /var/www/symfony/composer.json

WORKDIR /var/www/symfony

EXPOSE 9000
RUN usermod -u 1000 www-data
CMD export APP_ENV=dev \
    && chmod -R 777 var/ \
    && composer install --no-scripts \
    && php bin/console d:m:m --no-interaction \
    && php-fpm
#CMD npm run build -- --env=dev
#CMD ["npm", "run-script", "build", " -- ", "--env=dev"]
