# See https://github.com/docker-library/php/blob/4677ca134fe48d20c820a19becb99198824d78e3/7.0/fpm/Dockerfile
FROM php:7.1-fpm

LABEL author="Christian Elowsky <christian.elowsky@gmail.com>"

RUN apt-get update && apt-get install -y \
    git \
    unzip 

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Type docker-php-ext-install to see available extensions
RUN docker-php-ext-install pdo pdo_mysql


# Setup xdebug
RUN pecl install xdebug \
    && docker-php-ext-enable xdebug \
    && echo "error_reporting = E_ALL" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "display_startup_errors = On" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "display_errors = On" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.remote_enable=1" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.remote_connect_back=1" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.idekey=\"PHPSTORM\"" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.remote_port=9124" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini 

# Adds bash alias to easily run commands from host e.g. "docker run php sf d:d:d --force"
RUN echo 'alias sf="php bin/console"' >> ~/.bashrc

# Exposes php-fpm service on internal network
EXPOSE 9000

# Gives the user www-data the same UID as your host's user 
# Confirm by executing the "id" command in the host:
RUN usermod -u 1000 www-data

# Copies composer.json from main project to container 
COPY ./composer.json /var/www/symfony/composer.json
WORKDIR /var/www/symfony

# Makes sure environment is set so app/AppKernel.php does not fail
# and makes sure cache directory permissions are very relaxed
CMD export APP_ENV=dev \
    && chmod -R 777 var/ \
    && composer install --no-scripts \
    && php bin/console d:m:m --no-interaction \
    && php-fpm
