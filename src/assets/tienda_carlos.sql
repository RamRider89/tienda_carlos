-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 24-10-2022 a las 06:00:47
-- Versión del servidor: 8.0.30-0ubuntu0.22.04.1
-- Versión de PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tienda_carlos`
--
CREATE DATABASE IF NOT EXISTS `tienda_carlos` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `tienda_carlos`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias_tienda`
--

CREATE TABLE `categorias_tienda` (
  `id` int NOT NULL COMMENT 'identificador de categoria',
  `descripcion` varchar(250) DEFAULT NULL COMMENT 'descripcion de categoria'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='tabla de categorias';

--
-- Volcado de datos para la tabla `categorias_tienda`
--

INSERT INTO `categorias_tienda` (`id`, `descripcion`) VALUES
(1, 'Sin Categoria'),
(2, 'Muebles'),
(3, 'Linea Blanca'),
(4, 'Electrodomesticos'),
(5, 'Electronica'),
(6, 'Celulares'),
(7, 'Otra');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalles_productos`
--

CREATE TABLE `detalles_productos` (
  `id` int NOT NULL,
  `prod_id` int NOT NULL DEFAULT '1',
  `titulo_detalle` varchar(250) DEFAULT NULL,
  `descripcion` varchar(250) DEFAULT NULL,
  `visible` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `detalles_productos`
--

INSERT INTO `detalles_productos` (`id`, `prod_id`, `titulo_detalle`, `descripcion`, `visible`) VALUES
(1, 2, 'Precio', '12500', 1),
(2, 2, 'Piezas', '3', 1),
(3, 2, 'Marca', 'Comfort', 1),
(4, 2, 'Color', 'Crema', 1),
(5, 2, 'Estilo', 'Contemporaneo', 0),
(6, 3, 'Precio', '1500', 1),
(7, 3, 'Piezas', '4', 1),
(8, 3, 'Marca', 'Sleep Well', 1),
(9, 3, 'Color', 'Negro', 1),
(10, 3, 'Estilo', 'Moderno', 1),
(11, 4, 'Precio', '8500', 1),
(12, 4, 'Piezas', '6', 1),
(13, 4, 'Marca', 'Troncoso', 1),
(14, 4, 'Color', 'Negro', 1),
(15, 4, 'Estilo', 'Moderno Contempo', 1),
(16, 5, 'Precio', '5000', 1),
(17, 5, 'Piezas', '1', 1),
(18, 5, 'Marca', 'Sleep Comfort', 1),
(19, 5, 'Color', 'Crema T', 1),
(20, 5, 'Estilo', 'Moderno Romano', 1),
(21, 6, 'Marca', 'Mabe', 1),
(22, 6, 'Modelo', 'ST-400', 1),
(23, 6, 'Precio', '12800', 1),
(24, 6, 'Color', 'Negro', 1),
(25, 6, 'Capacidad', '10 pies', 1),
(26, 7, 'Marca', 'Wirpool', 1),
(27, 7, 'Modelo', 'ST-W3', 1),
(28, 7, 'Precio', '5700', 1),
(29, 7, 'Color', 'Blanco', 0),
(30, 7, 'Capacidad', '12 pies', 1),
(31, 11, 'Marca', 'Lenovo', 1),
(32, 11, 'Modelo', 'S121', 1),
(33, 11, 'Precio', '9000', 1),
(34, 11, 'Color', 'Rosa', 1),
(35, 11, 'Procesador', 'Intel', 1),
(36, 12, 'Marca', 'HP', 1),
(37, 12, 'Modelo', 'H1', 1),
(38, 12, 'Precio', '4500', 1),
(39, 12, 'Color', 'Negro', 1),
(40, 12, 'Procesador', 'Intel i5', 1),
(41, 2, 'Credito', 'Si', 1),
(42, 9, 'M', 'C', 1),
(43, 9, 'Detalle Agregado', 'Nuevo', 1),
(44, 31, 'D1', 'NEW', 1),
(45, 31, 'D2', 'N', 1),
(46, 36, 'D', 'R', 1),
(47, 37, 'r', '5', 0),
(48, 37, '6', '6', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_tienda`
--

CREATE TABLE `productos_tienda` (
  `id` int NOT NULL,
  `nombre` varchar(250) DEFAULT NULL COMMENT 'nombre del producto',
  `cat_id` int NOT NULL DEFAULT '0' COMMENT 'identificador de categoria',
  `visible` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `productos_tienda`
--

INSERT INTO `productos_tienda` (`id`, `nombre`, `cat_id`, `visible`) VALUES
(1, 'Producto Prueba', 1, 0),
(2, 'Sala', 2, 1),
(3, 'Recamara', 2, 1),
(4, 'Comedor', 2, 1),
(5, 'Sillon', 2, 1),
(6, 'Refrigerador', 3, 1),
(7, 'Lavadora', 3, 1),
(8, 'Secadora', 3, 1),
(9, 'Licuadora', 4, 1),
(10, 'Cafetera', 4, 1),
(11, 'Laptop', 5, 1),
(12, 'Impresora', 5, 1),
(13, 'Teclado edit 3', 6, 0),
(14, 'Tostadora', 4, 1),
(15, 'Prueba', 5, 0),
(16, 'Prueba 2', 5, 0),
(17, 'Prueba 3', 1, 0),
(18, 'Prueba 4', 3, 0),
(19, NULL, 1, 0),
(20, 'prueba json', 5, 0),
(21, 'test flight json', 2, 0),
(22, 't f json', 1, 0),
(23, 'Prueba postwoman', 5, 0),
(24, 'test up', 3, 0),
(25, 'test 2', 2, 0),
(26, 'test close', 4, 0),
(27, 'test close 2', 4, 0),
(28, 'test close 3', 4, 0),
(29, 'test close search ', 5, 0),
(30, 'close search 2', 6, 0),
(31, 'Nombre Editado', 4, 1),
(32, 'Mesa', 2, 0),
(33, 'Test', 4, 0),
(34, 'RE', 4, 0),
(35, 'TRE', 5, 0),
(36, 'TY ER RT 2', 2, 0),
(37, 'tha', 3, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias_tienda`
--
ALTER TABLE `categorias_tienda`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `detalles_productos`
--
ALTER TABLE `detalles_productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos_tienda`
--
ALTER TABLE `productos_tienda`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cat_id` (`cat_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias_tienda`
--
ALTER TABLE `categorias_tienda`
  MODIFY `id` int NOT NULL AUTO_INCREMENT COMMENT 'identificador de categoria', AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `detalles_productos`
--
ALTER TABLE `detalles_productos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT de la tabla `productos_tienda`
--
ALTER TABLE `productos_tienda`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
