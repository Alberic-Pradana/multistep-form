/*
SQLyog Ultimate v12.5.1 (64 bit)
MySQL - 10.4.8-MariaDB : Database - master2
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`master2` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

/*Table structure for table `dbmdatabase` */

DROP TABLE IF EXISTS `dbmdatabase`;

CREATE TABLE `dbmdatabase` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `Perusahaan` bigint(20) DEFAULT NULL,
  `Host` varchar(100) DEFAULT 'localhost',
  `User` varchar(100) DEFAULT 'atro',
  `Password` varchar(100) DEFAULT 'naylatools',
  `Database` varchar(100) DEFAULT NULL,
  `Type` varchar(25) DEFAULT NULL,
  `Tanggal` timestamp NULL DEFAULT NULL,
  `Status` int(1) DEFAULT 0,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `dbmdatabase` */

insert  into `dbmdatabase`(`ID`,`Perusahaan`,`Host`,`User`,`Password`,`Database`,`Type`,`Tanggal`,`Status`) values 
(1,1,'localhost','naylatools','N@yl4naylatools','pos','POS',NULL,1);

/*Table structure for table `dbmperusahaan` */

DROP TABLE IF EXISTS `dbmperusahaan`;

CREATE TABLE `dbmperusahaan` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `Nama` varchar(100) DEFAULT NULL,
  `Alamat` varchar(225) DEFAULT NULL,
  `Telp` varchar(100) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Type` varchar(25) DEFAULT NULL,
  `Aktif` date DEFAULT NULL,
  `Sampai` date DEFAULT NULL,
  `Tanggal` timestamp NULL DEFAULT NULL,
  `Status` int(1) DEFAULT 0,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `dbmperusahaan` */

insert  into `dbmperusahaan`(`ID`,`Nama`,`Alamat`,`Telp`,`Email`,`Type`,`Aktif`,`Sampai`,`Tanggal`,`Status`) values 
(1,'NaylaTools','Dsn Sawo Ds Dungus Kec Sukodono Kab SIdoarjo','081234779772','heru.praseti@gmail.com','POS','2020-06-04','2020-07-11','2020-06-04 06:42:07',1),
(2,'','Dsn Sawo Ds Dungus Kec Sukodono Kab SIdoarjo','081234779772','mail@nayla.xyz','POS',NULL,NULL,NULL,1),
(3,'','Sawo Dungus','888','','POS',NULL,NULL,NULL,1);

/*Table structure for table `dbmuser` */

DROP TABLE IF EXISTS `dbmuser`;

CREATE TABLE `dbmuser` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `Perusahaan` bigint(20) DEFAULT NULL,
  `Nama` varchar(225) DEFAULT NULL,
  `UserID` varchar(225) DEFAULT NULL,
  `Email` varchar(225) DEFAULT NULL,
  `Password` text DEFAULT NULL,
  `Gambar` varchar(225) DEFAULT NULL,
  `Status` int(1) DEFAULT 0,
  `Type` varchar(100) DEFAULT 'gmail',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `dbmuser` */

insert  into `dbmuser`(`ID`,`Perusahaan`,`Nama`,`UserID`,`Email`,`Password`,`Gambar`,`Status`,`Type`) values 
(1,1,'NaylaTools',NULL,'heru.praseti@gmail.com','$2y$05$Vpl/yKKRCqdu5owVsI2zYeQwOGG7u6VgPkZAnhi/qPY8Vk20DNwcu',NULL,1,'gmail'),
(2,2,'NaylaTools',NULL,'mail@nayla.xyz','naylatools','assets/img/user.jpg',1,'non gmail'),
(3,3,'',NULL,'','$2y$05$e8brFxYV/OpObL25g19BWelik1Am9uw9WmQly2wIvl1DEwL.XN56m','https://lh6.googleusercontent.com/-05BZjqX-VHg/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnX0fnqW0dPOScUFWEOsov_mIzlhQ/photo.jpg',1,'gmail');

/*Table structure for table `dbsmenu` */

DROP TABLE IF EXISTS `dbsmenu`;

CREATE TABLE `dbsmenu` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `IdMenu` varchar(225) DEFAULT NULL,
  `Nama` varchar(225) DEFAULT NULL,
  `Keterangan` varchar(225) DEFAULT NULL,
  `File` varchar(225) DEFAULT NULL,
  `Icon` varchar(225) DEFAULT NULL,
  `Posisi` varchar(225) DEFAULT NULL,
  `IsOrder` bigint(225) DEFAULT NULL,
  `Status` int(1) DEFAULT 1,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4;

/*Data for the table `dbsmenu` */

insert  into `dbsmenu`(`ID`,`IdMenu`,`Nama`,`Keterangan`,`File`,`Icon`,`Posisi`,`IsOrder`,`Status`) values 
(1,'menuMenu','Menu','Master Menu','menu.php','fas fa-file','master',0,1),
(2,'menuDashboard','Dashboard','Halaman Dashboard','dashboard.php','fas fa-home','root',1,1),
(3,'menubarang','Master Barang','Halaman Master Barang','barang.php','fa fa-chart-pie','master',1,1),
(4,'menupelanggan','Master Pelanggan','Halaman Master Pelanggan','pelanggan.php','fas fa-users','master',2,1),
(5,'menusupplier','Master Suplier','Halaman Master Suplier','suplier.php','fas fa-address-card','master',3,1),
(6,'menuuser','Master User','Halaman MAster User','user.php','fas fa-user-tie','master',4,1),
(7,'menuPembelian','Pembelian','Halaman Pembelian','pembelian.php','shopping_cart','transaksi',1,1),
(8,'menuPenjualan','Penjualan','Halaman Penjualan','penjualan.php','t\r\nstorefront','transaksi',2,1),
(9,'menuBarcode','Barcode','Halaman Barcode','barcode.php','fas fa-barcode','master',8,1),
(10,'menuStokOpname','Stok Opname','Halaman Stok Opname','stokopname','fas fa-warehouse','master',7,1),
(11,'kasir','Kasir - F1','Halaman Kasir','kasir.php','fas fa-calculator','root',2,1),
(12,'menuLaporanPenjualan','Penjualan','Laporan Penjualan','laporanpenjualan.php','fas fa-cart-plus','laporan',1,1),
(13,'menuLaporanPembelian','Pembelian','Laporan Pembelian','laporanpembelian.php','fas fa-dollar-sign','laporan',2,1),
(14,'menuPiutang','Piutang','Laporan Piutang','piutang.php','fas fa-money-bill-wave','laporan',3,1),
(15,'menuHutang','Hutang','Laporan Hutang','hutang.php','fas fa-money-check','laporan',4,1),
(16,'menuRetur','Retur','Laporan Retur','retur.php','fas fa-truck-loading','laporan',6,1),
(17,'menuKas','KAS','Laporan Kas','kas.php','fas fa-book','laporan',0,1),
(18,'menuLabaRugi','Laba - Rugi','Laporan Laba Rugi','labarugi.php','fas fa-balance-scale','laporan',5,1),
(19,'menuKategori','Kategori','Master Kategori','kategori.php','fas fa-sitemap','master',5,1),
(20,'menuSatuan','Satuan Barang','Master Satuan','satuan.php','fa fa-balance-scale','master',6,1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
