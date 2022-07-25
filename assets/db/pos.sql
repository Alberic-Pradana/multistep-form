/*
SQLyog Ultimate v12.5.1 (64 bit)
MySQL - 8.0.29-0ubuntu0.20.04.3 : Database - pos
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`pos` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

/*Table structure for table `dbmakun` */

DROP TABLE IF EXISTS `dbmakun`;

CREATE TABLE `dbmakun` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `GroupType` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `CodeSub` varchar(30) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `Code` varchar(30) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `Description` varchar(1000) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `Posisi` varchar(10) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `Amount` decimal(20,2) NOT NULL DEFAULT '0.00',
  `CreatedBy` bigint DEFAULT NULL,
  `TimeCreated` datetime DEFAULT NULL,
  `UpdatedBy` varchar(200) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `TimeUpdated` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `Status` tinyint(1) DEFAULT '1',
  `Lokasi` bigint DEFAULT '0',
  PRIMARY KEY (`ID`,`CodeSub`,`Code`),
  UNIQUE KEY `UNIQUER` (`Code`),
  UNIQUE KEY `ID` (`ID`),
  KEY `LocationID` (`Lokasi`,`Code`)
) ENGINE=InnoDB AUTO_INCREMENT=412 DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbmakun` */

insert  into `dbmakun`(`ID`,`GroupType`,`CodeSub`,`Code`,`Description`,`Posisi`,`Amount`,`CreatedBy`,`TimeCreated`,`UpdatedBy`,`TimeUpdated`,`Status`,`Lokasi`) values 
(1,'Asset','','1.0.00.00.00','Aset (Harta)','',0.00,0,'2020-06-18 21:46:59',NULL,'2020-09-01 06:28:40',1,0),
(2,'Asset','','1.1.00.00.00','Aset Lancar (Harta Lancar)','Debit',0.00,0,'2020-06-18 21:48:25',NULL,'2020-09-01 06:28:40',1,0),
(3,'Asset','','1.1.01.00.00','Kas dan Setara Kas','Debit',0.00,0,'2020-06-18 21:48:27',NULL,'2020-09-01 06:28:40',1,0),
(4,'Asset','','1.1.01.01.00','Kas','Debit',0.00,0,'2020-06-18 21:48:28',NULL,'2020-09-16 21:26:15',1,0),
(5,'Asset','','1.1.01.01.01','Kas Kecil','Debit',0.00,0,'2020-06-18 21:48:28',NULL,'2021-04-27 04:44:29',1,0),
(6,'Asset','','1.1.01.01.02','Kas Besar','Debit',0.00,0,'2020-06-18 21:48:28',NULL,'2021-04-27 04:44:29',1,0),
(7,'Asset','','1.1.01.02.00','Bank','Debit',0.00,0,'2020-06-18 21:48:28',NULL,'2020-09-01 06:28:40',1,0),
(8,'Asset','','1.1.02.00.00','Piutang','Debit',0.00,0,'2020-06-18 21:48:28',NULL,'2021-04-26 13:18:39',1,0),
(9,'Asset','','1.1.02.01.00','Piutang Usaha','Debit',0.00,0,'2020-06-18 21:48:28',NULL,'2021-03-22 07:42:20',1,0),
(10,'Asset','','1.1.02.02.00','Piutang Lain-lain','Debit',0.00,0,'2020-06-18 21:48:28',NULL,'2021-02-14 19:50:26',1,0),
(11,'Asset','','1.1.02.02.01','Wesel Tagih','Debit',0.00,0,'2020-06-18 21:48:28',NULL,'2020-09-01 06:28:40',1,0),
(12,'Asset','','1.1.02.02.02','Piutang Hubungan Istimewa ( Pemilik / Karyawan )','Debit',0.00,0,'2020-06-18 21:48:28',NULL,'2020-09-01 06:28:40',1,0),
(13,'Asset','','1.1.02.02.03','Piutang Pinjaman Pihak Luar ( pihak ke 3 )','Debit',0.00,0,'2020-06-18 21:48:28',NULL,'2020-09-01 06:28:40',1,0),
(14,'Asset','','1.1.02.02.04','Piutang Restitusi Pajak','Debit',0.00,0,'2020-06-18 21:48:28',NULL,'2020-09-01 06:28:40',1,0),
(15,'Asset','','1.1.03.00.00','Cadangan Kerugian Piutang Usaha','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(16,'Asset','','1.1.04.00.00','Persediaan ( Saldo Akhir )','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(17,'Asset','','1.1.04.01.00','Persediaan Bahan Baku','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(18,'Asset','','1.1.04.02.00','Persediaan Bahan Pembantu','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(19,'Asset','','1.1.04.03.00','Persediaan Perlengkapan Produksi','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(20,'Asset','','1.1.04.04.00','Persediaan Barang Dalam Proses ( BDP / 1/2 jadi )','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(21,'Asset','','1.1.04.05.00','Persediaan Barang Jadi','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(22,'Asset','','1.1.05.00.00','Uang Muka & Beban Dibayar di Muka (Prepaid)','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(23,'Asset','','1.1.05.01.00','Uang Muka','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(24,'Asset','','1.1.05.01.01','Uang Muka Pembelian Barang','Debit',0.00,NULL,NULL,NULL,'2020-09-16 21:26:18',1,0),
(25,'Asset','','1.1.05.01.02','Uang Muka PPN Masukan','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(26,'Asset','','1.1.05.01.03','Uang Muka PPH ps 21','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(27,'Asset','','1.1.05.01.04','Uang Muka PPH ps 22','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(28,'Asset','','1.1.05.01.05','Uang Muka PPH ps 23','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(29,'Asset','','1.1.05.01.06','Uang Muka PPH ps 25','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(30,'Asset','','1.1.05.01.07','Uang Muka PPH ps 4 (2)','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(31,'Asset','','1.1.05.01.08','Pajak Tangguhan Lain','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(32,'Asset','','1.1.05.01.09','Uang Muka Lainnya','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(33,'Asset','','1.1.06.00.00','Beban Dibayar Dimuka  ( Prepaid expenses )','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(34,'Asset','','1.1.06.01.00','Biaya dibayar dimuka','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(35,'Asset','','1.1.06.02.00','Sewa dibayar dimuka','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(36,'Asset','','1.1.06.03.00','Asuransi dibayar dimuka','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(37,'Asset','','1.1.07.00.00','Aset Lancar Lainnya','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(38,'Asset','','1.1.07.01.00','Investasi','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(39,'Asset','','1.1.07.01.01','Investasi Uang Tunai Pada Perusahaan Baru','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(40,'Asset','','1.1.07.01.02','Investasi Penyertaan Saham','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(41,'Asset','','1.2.00.00.00','Aset Tetap (Harta Tetap)','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(42,'Asset','','1.2.01.00.00','Aset Tetap Berwujud','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(43,'Asset','','1.2.01.01.00','Peralatan','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(44,'Asset','','1.2.01.01.01','Peralatan Kantor','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(45,'Asset','','1.2.01.01.02','Peralatan Toko / Outlet','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(46,'Asset','','1.2.01.01.03','Peralatan Gudang Distribusi','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(47,'Asset','','1.2.01.01.04','Peralatan Pabrik ( Produksi )','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(48,'Asset','','1.2.01.02.00','Kendaraan','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(49,'Asset','','1.2.01.02.01','Sepeda Motor','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(50,'Asset','','1.2.01.02.02','Mobil','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(51,'Asset','','1.2.01.02.03','Kendaraan Angkutan Barang','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(52,'Asset','','1.2.01.03.00','Bangunan','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(53,'Asset','','1.2.01.03.01','Kantor','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(54,'Asset','','1.2.01.03.02','Toko / Outlet','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(55,'Asset','','1.2.01.03.03','Gudang','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(56,'Asset','','1.2.01.03.04','Pabrik','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(57,'Asset','','1.2.01.03.05','Aset Bangunan Lainnya','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(58,'Asset','','1.2.01.04.00','Tanah / Lahan','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(59,'Asset','','1.2.01.04.01','Tanah Untuk Usaha','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(60,'Asset','','1.2.02.00.00','Akumulasi Penyusutan Aset Tetap Berwujud','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(61,'Asset','','1.2.02.01.00','Akumulasi Penyusutan Peralatan','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(62,'Asset','','1.2.02.01.01','Akumulasi Penyusutan Peralatan Kantor','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(63,'Asset','','1.2.02.01.02','Akumulasi Penyusutan Peralatan Toko / Outlet','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(64,'Asset','','1.2.02.01.03','Akumulasi Penyusutan Peralatan Gudang Distribusi','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(65,'Asset','','1.2.02.01.04','Akumulasi Penyusutan Peralatan Peralatan Pabrik (P','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(66,'Asset','','1.2.02.02.00','Akumulasi Penyusutan Kendaraan','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(67,'Asset','','1.2.02.02.01','Akumulasi Penyusutan Kendaraan Sepeda Mo','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(68,'Asset','','1.2.02.02.02','Akumulasi Penyusutan Kendaraan Mobil','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(69,'Asset','','1.2.02.02.03','Akumulasi Penyusutan Kendaraan Angkutan Barang','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(70,'Asset','','1.2.02.03.00','Akumulasi Penyusutan Bangunan','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(71,'Asset','','1.2.02.03.01','Akumulasi Penyusutan Kantor','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(72,'Asset','','1.2.02.03.02','Akumulasi Penyusutan Bangunan Toko / Outlet','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(73,'Asset','','1.2.02.03.03','Akumulasi Penyusutan Bangunan Gudang','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(74,'Asset','','1.2.02.03.04','Akumulasi Penyusutan Bangunan Pabrik','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(75,'Asset','','1.2.02.03.05','Akumulasi Penyusutan Bangunan Lainnya','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(76,'Asset','','1.2.03.00.00','Aset Tetap Tidak Berwujud','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(77,'Asset','','1.2.03.01.00','Software Komputer','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(78,'Asset','','1.2.03.02.00','Hak Merk','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(79,'Asset','','1.2.03.03.00','Hak Waralaba ( Franchise )','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(80,'Asset','','1.2.03.04.00','Hak Paten','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(81,'Asset','','1.2.03.05.00','Goodwill','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(82,'Asset','','1.2.03.06.00','Hak Cipta','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(83,'Asset','','1.2.04.00.00','Akumulasi Penyusutan Aset Tetap Tidak Berwujud','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(84,'Asset','','1.2.04.01.00','Akumulasi Penyusutan Software Komputer','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(85,'Asset','','1.2.04.02.00','Akumulasi Amortisasi Hak Merk','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(86,'Asset','','1.2.04.03.00','Akumulasi Amortisasi Hak Waralaba ( Franchise )','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(87,'Asset','','1.2.04.04.00','Akumulasi Amortisasi Hak Paten','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(88,'Asset','','1.2.04.05.00','Akumulasi Amortisasi Goodwill','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(89,'Asset','','1.2.04.06.00','Akumulasi Amortisasi Hak Cipta','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(90,'Hutang','','2.0.00.00.00','Hutang (Kewajiban)','',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(91,'Hutang','','2.1.00.00.00','Hutang Lancar ( Jangka Pendek )','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(92,'Hutang','','2.1.01.00.00','Hutang Usaha','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(93,'Hutang','','2.1.02.00.00','Hutang Pajak','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(94,'Hutang','','2.1.02.01.00','Hutang PPN Pembelian & Penjualan','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(95,'Hutang','','2.1.02.01.01','Hutang PPN Masukan','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(96,'Hutang','','2.1.02.01.02','Hutang PPN Keluaran','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(97,'Hutang','','2.1.02.01.03','Hutang PPN','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(98,'Hutang','','2.1.02.02.00','Hutang PPH','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(99,'Hutang','','2.1.02.02.01','Utang PPH ps 21','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(100,'Hutang','','2.1.02.02.02','Utang PPH ps 22','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(101,'Hutang','','2.1.02.02.03','Utang PPH ps 23','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(102,'Hutang','','2.1.02.02.04','Utang PPH ps 25','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(103,'Hutang','','2.1.02.02.05','Utang PPH ps 26','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(104,'Hutang','','2.1.02.02.06','Utang PPH ps 29','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(105,'Hutang','','2.1.02.02.07','Utang PPH ps 15','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(106,'Hutang','','2.1.02.02.08','Utang PPH ps 4 (2)','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(107,'Hutang','','2.1.02.02.09','Utang PPH lainnya','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(108,'Hutang','','2.1.02.03.00','Hutang Pajak Lainnya','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(109,'Hutang','','2.1.02.03.01','PBB','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(110,'Hutang','','2.1.02.03.02','Bea Materai','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(111,'Hutang','','2.1.02.03.03','BPHTB','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(112,'Hutang','','2.1.02.03.04','Pajak Daerah & Retribusi Daerah ( PDRD )','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(113,'Hutang','','2.1.02.03.05','Cukai','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(114,'Hutang','','2.1.02.03.06','Bea Masuk Import ( BM )','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(116,'Hutang','','2.1.02.03.07','Pajak Tangguhan lain','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(117,'Hutang','','2.1.03.00.00','Pendapatan Diterima di Muka','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(118,'Hutang','','2.1.03.01.00','Uang Muka Penjualan ( Terima DP )','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(119,'Hutang','','2.1.03.02.00','Uang Sewa diterima di muka','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(120,'Hutang','','2.1.03.03.00','Pendapatan Jasa diterima di muka','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(121,'Hutang','','2.1.04.00.00','Hutang Jangka Pendek Lainnya','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(122,'Hutang','','2.1.04.01.00','Hutang Beban Operasional lain','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(123,'Hutang','','2.1.04.01.01','Hutang Beban Utilitas ( Listrik, Air, Telpon, Inte','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(124,'Hutang','','2.1.04.01.02','Hutang Deviden','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(125,'Hutang','','2.1.04.01.03','Hutang Bunga Pinjaman Jangka Pendek','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(126,'Hutang','','2.1.04.01.04','Hutang ke Direksi / Pemilik','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(127,'Hutang','','2.1.04.01.05','Hutang Beban Gaji Karyawan','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(128,'Hutang','','2.1.04.01.06','Hutang Hubungan Istimewa Lain','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(130,'Hutang','','2.2.00.00.00','Hutang Jangka Panjang','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(131,'Hutang','','2.2.01.00.00','Hutang Bank','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(133,'Hutang','','2.2.01.01.00','Pinjaman Kredit Modal Kerja','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(134,'Hutang','','2.2.01.02.00','Pinjaman KPR','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(135,'Hutang','','2.2.01.02.01','KPR Gedung Kantor','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(136,'Hutang','','2.2.01.02.02','KPR Gedung Pabrik','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(137,'Hutang','','2.2.01.03.00','Pinjaman Leasing Kendaraan','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(138,'Hutang','','2.2.01.03.01','Leasing Motor','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(139,'Hutang','','2.2.01.03.02','Leasing Mobil','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(140,'Hutang','','2.2.01.03.03','Leasing Mobil Angkutan','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(141,'Hutang','','2.2.01.03.04','Pinjaman Leasing Peralatan','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(143,'Hutang','','2.2.02.00.00','Hutang Jangka Panjang Lainnya','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(144,'Hutang','','2.2.02.01.00','Hutang Pinjaman Bank Jangka Panjang Lain','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(145,'Modal','','3.0.00.00.00','Modal','',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(146,'Modal','','3.1.00.00.00','Modal Disetor','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(147,'Modal','','3.1.01.00.00','Modal Investor','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(148,'Modal','','3.1.01.01.00','Modal Setoran Awal','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(149,'Modal','','3.1.01.02.00','Modal Setoran Tambahan','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(150,'Modal','','3.1.01.03.00','Divestasi / Penarikan Modal Investor','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(151,'Modal','','3.1.01.03.01','Divestasi Investor','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(152,'Modal','','3.2.00.00.00','Laba Ditahan','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(153,'Modal','','3.2.01.00.00','Laba Ditahan Periode Sebelumnya','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(154,'Modal','','3.2.01.01.00','Cadangan Dari Laba ditahan Periode Sebelumnya','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(155,'Modal','','3.2.01.02.00','Pembagian Hak Pemodal','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(156,'Modal','','3.2.01.02.01','Prive (untuk Perorangan / cv)','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(157,'Modal','','3.2.01.02.02','Deviden (untuk PT)','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(158,'Modal','','3.2.01.03.00','Laba setelah Deviden / Prive Periode sebelumnya','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(159,'Modal','','3.2.02.00.00','Laba Ditahan Periode Berjalan','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(160,'Modal','','3.2.02.01.00','Cadangan Dari Laba ditahan Periode Berjalan','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(161,'Modal','','3.2.02.02.00','Pembagian Deviden / Prive Periode Berjalan','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(162,'Modal','','3.2.02.02.01','Deviden / Prive Investor (Periode Berjalan)','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(163,'Modal','','3.2.02.03.00','Laba setelah Deviden / Prive Periode berjalan','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(164,'Modal','','3.3.00.00.00','Modal Saham','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(165,'Modal','','3.3.01.00.00','Agio Saham','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(166,'Modal','','3.3.02.00.00','Disagio Saham','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(167,'Pendapatan','','4.0.00.00.00','Pendapatan','',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(168,'Pendapatan','','4.1.00.00.00','Pendapatan Usaha','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(169,'Pendapatan','','4.1.01.00.00','Pendapatan Penjualan Barang dan Jasa','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(170,'Pendapatan','','4.1.01.01.00','Pendapatan Penjualan Barang','Credit',0.00,NULL,NULL,NULL,'2021-04-27 04:44:36',1,0),
(171,'Pendapatan','','4.1.01.02.00','Pendapatan Jasa','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(172,'Pendapatan','','4.2.00.00.00','Pendapatan Usaha Lainnya','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(173,'Pendapatan','','4.2.01.00.00','Pendapatan Usaha Lainnya','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(174,'Pendapatan','','4.3.00.00.00','Retur dan Potongan Penjualan','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(175,'Pendapatan','','4.3.01.00.00','Retur Penjualan','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(176,'Pendapatan','','4.3.01.01.00','Retur Penjualan Barang','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(177,'Pendapatan','','4.3.01.02.00','Pengembalian Dana dari Pendapatan Jasa','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(178,'Pendapatan','','4.3.02.00.00','Potongan Penjualan','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(179,'Pendapatan','','4.3.02.01.00','Potongan Penjualan Barang','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(180,'Pendapatan','','4.3.02.02.00','Potongan Pendapatan Jasa','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(181,'Harga Pokok Penjualan','','5.0.00.00.00','Harga Pokok Penjualan','',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(182,'Harga Pokok Penjualan','','5.1.00.00.00','Harga Pokok Produksi Barang Jadi','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(183,'Harga Pokok Penjualan','','5.1.01.00.00','Biaya Fabrikasi / Produksi','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(184,'Harga Pokok Penjualan','','5.1.01.01.00','Biaya Bahan Baku','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(185,'Harga Pokok Penjualan','','5.1.01.01.01','Nilai Persediaan Awal Bahan Baku','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(186,'Harga Pokok Penjualan','','5.1.01.01.02','Pembelian Bahan Baku','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(187,'Harga Pokok Penjualan','','5.1.01.01.03','Biaya Pengadaan Pembelian Bahan Baku','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(188,'Harga Pokok Penjualan','','5.1.01.01.04','Harga Pokok Pembelian Bahan Baku','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(189,'Harga Pokok Penjualan','','5.1.01.01.05','Retur Pembelian Bahan Baku','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(190,'Harga Pokok Penjualan','','5.1.01.01.06','Potongan Harga Pembelian Bahan Baku','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(191,'Harga Pokok Penjualan','','5.1.01.01.07','Pembelian Bersih Bahan Baku','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(192,'Harga Pokok Penjualan','','5.1.01.01.08','Persediaan Bahan Baku Tersedia','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(193,'Harga Pokok Penjualan','','5.1.01.01.09','Penyesuaian Persediaan Bhn. Baku (Rusak / Hilang)','Debit',0.00,NULL,NULL,NULL,'2021-02-27 04:45:55',1,0),
(194,'Harga Pokok Penjualan','','5.1.01.01.10','Persediaan Bahan Baku Siap Pakai ( bersih )','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(195,'Harga Pokok Penjualan','','5.1.01.01.11','Persediaan Bahan Baku Terpakai','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(196,'Harga Pokok Penjualan','','5.1.01.01.12','Nilai Persediaan Akhir Bahan Baku','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(197,'Harga Pokok Penjualan','','5.1.01.02.00','Biaya Bahan Pembantu','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(198,'Harga Pokok Penjualan','','5.1.01.02.01','Nilai Persediaan Awal Bahan Pembantu','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(199,'Harga Pokok Penjualan','','5.1.01.02.02','Pembelian Bahan Pembantu','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(200,'Harga Pokok Penjualan','','5.1.01.02.03','Biaya Pengadaan Pembelian Bahan Pembantu','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(201,'Harga Pokok Penjualan','','5.1.01.02.04','Harga Pokok Pembelian Bahan Pembantu','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(202,'Harga Pokok Penjualan','','5.1.01.02.05','Retur Pembelian Bahan Pembantu','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(203,'Harga Pokok Penjualan','','5.1.01.02.06','Potongan Harga Pembelian Bahan Pembantu','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(204,'Harga Pokok Penjualan','','5.1.01.02.07','Pembelian Bersih Bahan Pembantu','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(205,'Harga Pokok Penjualan','','5.1.01.02.08','Persediaan Bahan Pembantu Tersedia','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(206,'Harga Pokok Penjualan','','5.1.01.02.09','Penyesuaian Persediaan Bhn. Pembantu (Rusak / Hilang)','Debit',0.00,NULL,NULL,NULL,'2021-02-27 04:48:03',1,0),
(207,'Harga Pokok Penjualan','','5.1.01.02.10','Persediaan Bahan Pembantu Siap Pakai ( bersih )','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(208,'Harga Pokok Penjualan','','5.1.01.02.11','Persediaan Bahan Pembantu Terpakai','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(209,'Harga Pokok Penjualan','','5.1.01.02.12','Nilai Persediaan Akhir Bahan Pembantu','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(210,'Harga Pokok Penjualan','','5.1.01.03.00','Biaya Tenaga Kerja','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(211,'Harga Pokok Penjualan','','5.1.01.03.01','Gaji / Upah Tenaga Kerja Langsung ( karyawan produ','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(212,'Harga Pokok Penjualan','','5.1.01.03.02','Gaji Tenaga Kerja Tidak Langsung','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(213,'Harga Pokok Penjualan','','5.1.01.04.00','Biaya Operasional Pabrik ( Overhead )','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(214,'Harga Pokok Penjualan','','5.1.01.04.01','Biaya Sewa Gedung  Pabrik','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(215,'Harga Pokok Penjualan','','5.1.01.04.02','Biaya Sewa Peralatan Produksi ( Mesin & alat )','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(216,'Harga Pokok Penjualan','','5.1.01.04.03','Biaya Pemeliharaan & Perbaikan Gedung Pabrik','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(217,'Harga Pokok Penjualan','','5.1.01.04.04','Biaya Pemeliharaan & Perbaikan Peralatan Produksi ','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(218,'Harga Pokok Penjualan','','5.1.01.04.05','Biaya Utilitas Pabrik ( Energi, Listrik, Air, dll ','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(219,'Harga Pokok Penjualan','','5.1.01.04.06','Biaya Pemakaian Perlengkapan Produksi ( Suku cadan','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(220,'Harga Pokok Penjualan','','5.1.01.04.07','Biaya Penyusutan Peralatan Produksi','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(221,'Harga Pokok Penjualan','','5.1.01.04.08','Biaya Penyusutan Gedung Pabrik','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(222,'Harga Pokok Penjualan','','5.1.01.04.09','Biaya Jasa Subcontract / Makloon / CMT','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(223,'Harga Pokok Penjualan','','5.1.01.04.10','Biaya Operasional Pabrik Lainnya','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(224,'Harga Pokok Penjualan','','5.1.02.00.00','Biaya Barang dalam Proses ( Barang Setelah Proses ','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(225,'Harga Pokok Penjualan','','5.1.02.01.00','Saldo Awal Barang Dalam Proses ( BDP / 1/2 jadi )','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(226,'Harga Pokok Penjualan','','5.1.02.02.00','Penyesuaian Persediaan Barang Dalam Proses (Rusak / Hilang)','Debit',0.00,NULL,NULL,NULL,'2021-02-27 04:48:09',1,0),
(227,'Harga Pokok Penjualan','','5.1.02.03.00','Nilai Persediaan Bersih Barang Dalam Proses ( BDP ','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(228,'Harga Pokok Penjualan','','5.1.02.04.00','Saldo Akhir Dalam Proses ( BDP / 1/2 jadi )','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(229,'Harga Pokok Penjualan','','5.2.00.00.00','Harga Pokok Persediaan Barang Jadi','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(230,'Harga Pokok Penjualan','','5.2.01.00.00','Nilai Persediaan Awal Barang Jadi','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(231,'Harga Pokok Penjualan','','5.2.01.01.00','Saldo Awal Barang Jadi dari Produksi','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(232,'Harga Pokok Penjualan','','5.2.01.02.00','Saldo Awal Barang Jadi dari Pembelian','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(233,'Harga Pokok Penjualan','','5.2.02.00.00','Pembelian barang jadi','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(234,'Harga Pokok Penjualan','','5.2.03.00.00','Biaya Pengadaan Pembelian barang jadi','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(235,'Harga Pokok Penjualan','','5.2.04.00.00','Harga Pokok Pembelian Barang Jadi','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(236,'Harga Pokok Penjualan','','5.2.05.00.00','Retur Pembelian Barang Jadi','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(237,'Harga Pokok Penjualan','','5.2.06.00.00','Potongan Harga Pembelian barang Jadi','Credit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(238,'Harga Pokok Penjualan','','5.2.07.00.00','Pembelian Bersih Barang Jadi','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(239,'Harga Pokok Penjualan','','5.2.08.00.00','Persediaan Barang Jadi Tersedia','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(240,'Harga Pokok Penjualan','','5.2.09.00.00','Penyesuaian Persediaan Brg. Jadi (Rusak / Hilang)','Debit',0.00,NULL,NULL,NULL,'2021-02-27 04:46:27',1,0),
(241,'Harga Pokok Penjualan','','5.2.10.00.00','Persediaan Barang Jadi Siap Jual ( BERSIH )','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(242,'Harga Pokok Penjualan','','5.2.11.00.00','Persediaan Barang Jadi Terjual','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(243,'Harga Pokok Penjualan','','5.2.12.00.00','Nilai Persediaan Akhir Barang Jadi','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(244,'Beban Usaha','','6.0.00.00.00','Beban Usaha ( Operasional, Adm. Umum Marketing )','',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(245,'Beban Usaha','','6.1.00.00.00','Beban Administrasi Umum','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(246,'Beban Usaha','','6.1.01.00.00','Beban Gaji dan Tunjangan','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(247,'Beban Usaha','','6.1.01.01.00','Gaji, Tunjangan, Bonus, THR dan Tunjangan lain Dir','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(248,'Beban Usaha','','6.1.01.01.01','Gaji Tunjangan Tetap Direksi','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(249,'Beban Usaha','','6.1.01.01.02','Bonus THR Direksi','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(250,'Beban Usaha','','6.1.01.01.03','Tunjangan Lain Direksi','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(251,'Beban Usaha','','6.1.01.02.00','Gaji, Tunjangan, Bonus, THR dan Tunjangan lain Kar','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(252,'Beban Usaha','','6.1.01.02.01','Gaji Tunjangan Tetap Karyawan','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(253,'Beban Usaha','','6.1.01.02.02','Bonus THR Karyawan','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(254,'Beban Usaha','','6.1.01.02.03','Tunjangan Lain Karyawan','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(255,'Beban Usaha','','6.1.02.00.00','Beban Sewa Kantor dan Perlengkapan','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(256,'Beban Usaha','','6.1.02.01.00','Beban Sewa Kantor','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(257,'Beban Usaha','','6.1.02.02.00','Beban Sewa Peralatan','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(258,'Beban Usaha','','6.1.03.00.00','Beban Perlengkapan Kantor','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(259,'Beban Usaha','','6.1.03.01.00','Beban ATK','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(260,'Beban Usaha','','6.1.03.01.01','Beban Peralatan Tulis','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(261,'Beban Usaha','','6.1.03.01.02','Beban Kertas HVS','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(262,'Beban Usaha','','6.1.03.01.03','Beban Kabinet dokumen ( bukan logam / kayu )','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(263,'Beban Usaha','','6.1.03.02.00','Beban Barang supplies lainnya ( barang habis pakai','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(264,'Beban Usaha','','6.1.04.00.00','Beban Utilitas Kantor','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(265,'Beban Usaha','','6.1.04.01.00','Beban Listrik','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(266,'Beban Usaha','','6.1.04.02.00','Beban Air','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(267,'Beban Usaha','','6.1.04.03.00','Beban Telpon','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(268,'Beban Usaha','','6.1.04.04.00','Beban Internet','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(269,'Beban Usaha','','6.1.04.05.00','Beban Utilitas Lainnya','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(270,'Beban Usaha','','6.1.05.00.00','Beban Jasa Pihak ke-3','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(271,'Beban Usaha','','6.1.06.00.00','Beban Pajak, Retribusi, dan Perizinan Perusahaan','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(272,'Beban Usaha','','6.1.06.01.00','Beban Pajak yg tidak dapat dikreditkan','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(273,'Beban Usaha','','6.1.06.01.01','Beban PPN (PM / PK )','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(274,'Beban Usaha','','6.1.06.01.02','Beban PPH pasal 21','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(275,'Beban Usaha','','6.1.06.01.03','Beban PPH pasal 22','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(276,'Beban Usaha','','6.1.06.01.04','Beban PPH pasal 23','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(277,'Beban Usaha','','6.1.06.01.05','Beban PPH pasal 25','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(278,'Beban Usaha','','6.1.06.01.06','Beban PPH pasal 29','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(279,'Beban Usaha','','6.1.06.01.07','Beban PPH pasal 4 (2)','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(280,'Beban Usaha','','6.1.06.01.08','Beban Pajak Bumi dan Bangunan (PBB)','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(281,'Beban Usaha','','6.1.06.01.09','Beban Pajak Reklame','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(282,'Beban Usaha','','6.1.06.01.10','Beban Pajak Kendaraan','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(283,'Beban Usaha','','6.1.06.01.11','Beban Pajak Lainnya','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(284,'Beban Usaha','','6.1.06.02.00','Retribusi Perizinan Perusahaan ( yg tdk di kapital','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(285,'Beban Usaha','','6.1.06.02.01','Perizinan Perusahaan','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(286,'Beban Usaha','','6.1.06.02.02','Akta Perusahaan','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(287,'Beban Usaha','','6.1.06.02.03','TDPSIUP','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(288,'Beban Usaha','','6.1.07.00.00','Beban Penyusutan Aset (Depresiasi dan Amortisasi)','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(289,'Beban Usaha','','6.1.07.01.00','Beban Penyusutan Peralatan','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(290,'Beban Usaha','','6.1.07.01.01','Beban Penyusutan Peralatan Kantor','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(291,'Beban Usaha','','6.1.07.01.02','Beban Penyusutan Peralatan Toko / Outlet','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(292,'Beban Usaha','','6.1.07.01.03','Beban Penyusutan Peralatan Gudang Distribusi','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(293,'Beban Usaha','','6.1.07.01.04','Beban Penyusutan Peralatan Pabrik','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(294,'Beban Usaha','','6.1.07.02.00','Beban Penyusutan Kendaraan','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(295,'Beban Usaha','','6.1.07.02.01','Beban Penyusutan Kendaraan Sepeda Motor','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(296,'Beban Usaha','','6.1.07.02.02','Beban Penyusutan Kendaraan Mobil','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(297,'Beban Usaha','','6.1.07.02.03','Beban Penyusutan Kendaraan Angkutan Barang','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(298,'Beban Usaha','','6.1.07.03.00','Beban Penyusutan Bangunan','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(299,'Beban Usaha','','6.1.07.03.01','Beban Penyusutan Bangunan Kantor','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(300,'Beban Usaha','','6.1.07.03.02','Beban Penyusutan Bangunan Toko / Outlet','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(301,'Beban Usaha','','6.1.07.03.03','Beban Penyusutan Bangunan Gudang','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(302,'Beban Usaha','','6.1.07.03.04','Beban Penyusutan Bangunan Lainnya','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(303,'Beban Usaha','','6.1.07.04.00','Beban Amortisasi Aset Tak Berwujud','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(304,'Beban Usaha','','6.1.07.04.01','Beban Amortisasi Software / Perangkat Lunak','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(305,'Beban Usaha','','6.1.07.04.02','Beban Amortisasi Hak Merk','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(306,'Beban Usaha','','6.1.07.04.03','Beban Amortisasi Hak Waralaba (Franchise)','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(307,'Beban Usaha','','6.1.07.04.04','Beban Amortisasi Hak Paten','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(308,'Beban Usaha','','6.1.07.04.05','Beban Amortisasi Goodwill','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(309,'Beban Usaha','','6.1.07.04.06','Beban Amortisasi Hak Cipta','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(310,'Beban Usaha','','6.1.08.00.00','Beban Administrasi dan Operasional Lainnya','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(311,'Beban Usaha','','6.1.08.01.00','Beban Perjalanan Dinas','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(312,'Beban Usaha','','6.1.08.02.00','Beban Asuransi','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(313,'Beban Usaha','','6.1.08.03.00','Beban Jasa Training Karyawan','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(314,'Beban Usaha','','6.1.08.04.00','Beban Sumbangan RESMI Zakat ke BAZ','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(315,'Beban Usaha','','6.1.08.04.01','Beban Zakat Resmi','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(316,'Beban Usaha','','6.1.08.04.02','Beban Sumbangan Resmi','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(317,'Beban Usaha','','6.1.08.05.00','Beban ADM Umum Lain','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(318,'Beban Usaha','','6.1.08.05.01','Beban Kerugian Piutang Tak Tertagih','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(319,'Beban Usaha','','6.2.00.00.00','Beban Pemasaran dan Distribusi','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(320,'Beban Usaha','','6.2.01.00.00','Beban Pemasaran ( Mendapatkan Order )','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(321,'Beban Usaha','','6.2.01.01.00','Beban Gaji, Tunjangan dll. Bagian Pemasaran','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(322,'Beban Usaha','','6.2.01.01.01','Gaji Petugas Penjualan ( Sales / CS )','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(323,'Beban Usaha','','6.2.01.01.02','Tunjangan','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(324,'Beban Usaha','','6.2.01.01.03','Komisi','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(325,'Beban Usaha','','6.2.01.01.04','Bonus','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(326,'Beban Usaha','','6.2.01.01.05','Beban telphone penjualan','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(327,'Beban Usaha','','6.2.01.01.06','Beban Akomodasi','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(328,'Beban Usaha','','6.2.01.02.00','Beban Administrasi Pemasaran Distribusi','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(329,'Beban Usaha','','6.2.01.02.01','Beban contoh ( Pengiriman sampel, model)','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(330,'Beban Usaha','','6.2.01.02.02','Beban Komisi pihak ke 3','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(331,'Beban Usaha','','6.2.01.02.03','Beban Perlengkapan Pemasaran Distribusi','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(332,'Beban Usaha','','6.2.01.03.00','Beban Promosi','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(333,'Beban Usaha','','6.2.01.03.01','Beban Iklan Online','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(334,'Beban Usaha','','6.2.01.03.02','Beban Iklan Offline','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(335,'Beban Usaha','','6.2.02.00.00','Beban Distribusi ( Biaya Memenuhi Memelihara Order','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(336,'Beban Usaha','','6.2.02.01.00','Beban Pengemasan Pengiriman Barang','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(337,'Beban Usaha','','6.2.02.01.01','Beban Pengapakan ( Ongkos Loading )','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(338,'Beban Usaha','','6.2.02.01.02','Beban Transportasi Pengiriman Barang','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(339,'Beban Usaha','','6.2.02.02.00','Beban Sewa Gudang Distribusi','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(340,'Beban Usaha','','6.2.02.03.00','Beban Pemasaran Distribusi Lainnya','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(341,'Beban Usaha','','6.2.02.03.01','Marketing Tools Kits ( Plugin, Software, template ','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(342,'Beban Usaha','','6.2.02.03.02','Biaya D Produk dan Pemasaran','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(343,'Pendapatan dan Biaya di Luar Usaha','','7.0.00.00.00','Pendapatan dan Biaya di Luar Usaha','',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(344,'Pendapatan dan Biaya di Luar Usaha','','7.1.00.00.00','Pendapatan Lain di Luar Usaha','Credit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(345,'Pendapatan dan Biaya di Luar Usaha','','7.1.01.00.00','Penerimaan Bunga Bank','Credit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(346,'Pendapatan dan Biaya di Luar Usaha','','7.1.01.01.00','Penerimaan Bunga Jasa Giro','Credit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(347,'Pendapatan dan Biaya di Luar Usaha','','7.1.01.01.01','Giro','Credit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(348,'Pendapatan dan Biaya di Luar Usaha','','7.1.01.02.00','Penerimaan Bunga Deposito','Credit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(349,'Pendapatan dan Biaya di Luar Usaha','','7.1.01.03.00','Pendapatan Bunga Simpanan','Credit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(350,'Pendapatan dan Biaya di Luar Usaha','','7.1.02.00.00','Pendapatan Bunga Lainnya','Credit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(351,'Pendapatan dan Biaya di Luar Usaha','','7.1.02.01.00','Pendapatan Bunga Pihak Ke 3','Credit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(352,'Pendapatan dan Biaya di Luar Usaha','','7.1.03.00.00','Laba Penjualan Aset Tetap','Credit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(353,'Pendapatan dan Biaya di Luar Usaha','','7.1.03.01.00','Laba Penjualan Aset Tetap Berwujud','Credit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(354,'Pendapatan dan Biaya di Luar Usaha','','7.1.03.01.01','Laba Penjualan Aset Tanah / Lahan','Credit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(355,'Pendapatan dan Biaya di Luar Usaha','','7.1.03.01.02','Laba Penjualan Aset Bangunan','Credit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(356,'Pendapatan dan Biaya di Luar Usaha','','7.1.03.01.03','Laba Penjualan Aset Peralatan / Mesin','Credit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(357,'Pendapatan dan Biaya di Luar Usaha','','7.1.03.01.04','Laba Penjualan Aset Kendaraan','Credit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(358,'Pendapatan dan Biaya di Luar Usaha','','7.1.03.02.00','Laba Penjualan Aset Tak Berwujud','Credit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(359,'Pendapatan dan Biaya di Luar Usaha','','7.1.03.02.01','Laba Penjualan Aset Software / Perangkat Lunak','Credit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(360,'Pendapatan dan Biaya di Luar Usaha','','7.1.03.02.02','Laba Penjualan Aset Hak Merk','Credit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(361,'Pendapatan dan Biaya di Luar Usaha','','7.1.03.02.03','Laba Penjualan Aset Hak Waralaba (Franchise)','Credit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(362,'Pendapatan dan Biaya di Luar Usaha','','7.1.03.02.04','Laba Penjualan Aset Hak Paten','Credit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(363,'Pendapatan dan Biaya di Luar Usaha','','7.1.03.02.05','Laba Penjualan Aset Goodwill','Credit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(364,'Pendapatan dan Biaya di Luar Usaha','','7.1.03.02.06','Laba Penjualan Hak Cipta','Credit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(365,'Pendapatan dan Biaya di Luar Usaha','','7.1.04.00.00','Laba Selisih Kurs','Credit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(366,'Pendapatan dan Biaya di Luar Usaha','','7.1.04.01.00','Laba Selisih Kurs USD','Credit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(367,'Pendapatan dan Biaya di Luar Usaha','','7.1.05.00.00','Pendapatan di Luar Usaha Lainnya','Credit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(368,'Pendapatan dan Biaya di Luar Usaha','','7.1.05.01.00','Pendapatan Non Operasional Karena Investasi','Credit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(369,'Pendapatan dan Biaya di Luar Usaha','','7.1.05.01.01','Laba Penjualan Penyertaan Saham','Credit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(370,'Pendapatan dan Biaya di Luar Usaha','','7.1.05.01.02','Bagian Laba atas perusahaan asosiasi','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(371,'Pendapatan dan Biaya di Luar Usaha','','7.2.00.00.00','Biaya Lain di Luar Usaha','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(372,'Pendapatan dan Biaya di Luar Usaha','','7.2.01.00.00','Biaya Bunga Bank','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(373,'Pendapatan dan Biaya di Luar Usaha','','7.2.01.01.00','Biaya Bunga Pinjaman Bank','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(374,'Pendapatan dan Biaya di Luar Usaha','','7.2.01.02.00','Biaya Administrasi Bank','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(375,'Pendapatan dan Biaya di Luar Usaha','','7.2.01.03.00','Pajak Bank','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(376,'Pendapatan dan Biaya di Luar Usaha','','7.2.01.04.00','Biaya Denda','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(377,'Pendapatan dan Biaya di Luar Usaha','','7.2.01.04.01','Biaya Denda','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(378,'Pendapatan dan Biaya di Luar Usaha','','7.2.02.00.00','Biaya Bunga Lainnya','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(379,'Pendapatan dan Biaya di Luar Usaha','','7.2.03.00.00','Rugi Penjualan Aset Tetap','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(380,'Pendapatan dan Biaya di Luar Usaha','','7.2.03.01.00','Rugi Penjualan Aset Tetap Berwujud','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(381,'Pendapatan dan Biaya di Luar Usaha','','7.2.03.01.01','Rugi Penjualan Tanah / Lahan','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(382,'Pendapatan dan Biaya di Luar Usaha','','7.2.03.01.02','Rugi Penjualan Bangunan','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(383,'Pendapatan dan Biaya di Luar Usaha','','7.2.03.01.03','Rugi Penjualan Peralatan / Mesin','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(384,'Pendapatan dan Biaya di Luar Usaha','','7.2.03.01.04','Rugi Penjualan Kendaraan','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(385,'Pendapatan dan Biaya di Luar Usaha','','7.2.03.02.00','Rugi Penjualan Aset Tak Berwujud','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(386,'Pendapatan dan Biaya di Luar Usaha','','7.2.03.02.01','Rugi Penjualan Aset Software / Perangkat Lunak','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(387,'Pendapatan dan Biaya di Luar Usaha','','7.2.03.02.02','Rugi Penjualan Aset Hak Merk','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(388,'Pendapatan dan Biaya di Luar Usaha','','7.2.03.02.03','Rugi Penjualan Aset Hak Waralaba (Franchise)','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(389,'Pendapatan dan Biaya di Luar Usaha','','7.2.03.02.04','Rugi Penjualan Aset Hak Paten','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(390,'Pendapatan dan Biaya di Luar Usaha','','7.2.03.02.05','Rugi Penjualan Aset Goodwill','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(391,'Pendapatan dan Biaya di Luar Usaha','','7.2.03.02.06','Rugi Penjualan Hak Cipta','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(392,'Pendapatan dan Biaya di Luar Usaha','','7.2.04.00.00','Rugi Selisih Kurs','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(393,'Pendapatan dan Biaya di Luar Usaha','','7.2.04.01.00','Rugi Selisih Kurs USD','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(394,'Pendapatan dan Biaya di Luar Usaha','','7.2.05.00.00','Biaya di Luar Usaha Lainnya','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(395,'Pendapatan dan Biaya di Luar Usaha','','7.2.05.01.00','Biaya Non Operasional','Debit',0.00,0,NULL,NULL,'2020-09-01 06:28:40',1,0),
(396,'Pajak','','8.0.00.00.00','Pajak','',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(398,'Pajak','','8.1.00.00.00','Pajak Penghasilan','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(399,'Pajak','','8.1.01.00.00','PPh Final','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(400,'Pajak','','8.1.02.00.00','PPh Badan','Debit',0.00,NULL,NULL,NULL,'2020-09-01 06:28:40',1,0),
(402,'Asset','','1.1.01.02.01','Bank BCA','Debit',0.00,0,'2020-09-01 07:28:09',NULL,'2021-04-27 04:44:47',1,0),
(406,'Asset','','1.1.01.02.02','Bank BRI','Debit',0.00,1,'2020-09-16 06:43:18',NULL,'2021-04-27 04:44:41',1,0),
(408,'Asset','','1.1.01.01.03','Kas Kasir','Debit',0.00,1,'2020-09-16 06:45:42',NULL,'2021-06-23 05:06:26',1,0);

/*Table structure for table `dbmakunpembayaran` */

DROP TABLE IF EXISTS `dbmakunpembayaran`;

CREATE TABLE `dbmakunpembayaran` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `Code` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Nama` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Amount` decimal(20,0) NOT NULL DEFAULT '0',
  `Type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `NoRekening` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `NamaPemilik` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Keterangan` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `TimeCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `UserID` bigint DEFAULT NULL,
  `IsDefault` int NOT NULL DEFAULT '0',
  `IsGlobal` int NOT NULL DEFAULT '0',
  `Lokasi` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0',
  `Status` int DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbmakunpembayaran` */

insert  into `dbmakunpembayaran`(`ID`,`Code`,`Nama`,`Amount`,`Type`,`NoRekening`,`NamaPemilik`,`Keterangan`,`TimeCreated`,`UserID`,`IsDefault`,`IsGlobal`,`Lokasi`,`Status`) values 
(1,'1.1.01.02.01','Bank BCA',0,'Bank',NULL,NULL,NULL,'2021-04-27 04:41:11',1,0,0,'0',1),
(2,'1.1.01.02.02','Bank BRI',0,'Bank','','','','2021-04-27 04:41:20',1,0,0,'0',1),
(3,'1.1.01.01.01','Kas Kecil',0,'Kas',NULL,NULL,NULL,'2021-05-21 05:50:35',1,0,0,'0',1),
(4,'1.1.01.01.02','Kas Besar',0,'Kas',NULL,NULL,NULL,'2021-05-21 05:50:49',1,0,0,'0',1),
(5,'1.1.01.01.03','Pembayaran Kas Kasir',0,'Kas',NULL,NULL,'Ini Kas Untuk Kasir','2021-04-27 04:41:22',1,0,0,'0',1);

/*Table structure for table `dbmaset` */

DROP TABLE IF EXISTS `dbmaset`;

CREATE TABLE `dbmaset` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `DocType` enum('Aset','Modal') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Aset',
  `DocDate` date NOT NULL,
  `Nama` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `AkunID` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `NamaAkun` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Amount` decimal(20,0) NOT NULL DEFAULT '0',
  `Note` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `Lokasi` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0',
  `Status` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `dbmaset` */

/*Table structure for table `dbmasetdetail` */

DROP TABLE IF EXISTS `dbmasetdetail`;

CREATE TABLE `dbmasetdetail` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `DocID` bigint DEFAULT NULL,
  `DocDate` date DEFAULT NULL,
  `Amount` decimal(20,0) DEFAULT NULL,
  `AkunID` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `NamaAkun` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Notes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `dbmasetdetail` */

/*Table structure for table `dbmcard` */

DROP TABLE IF EXISTS `dbmcard`;

CREATE TABLE `dbmcard` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `Jenis` enum('pelanggan','suplier') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'pelanggan',
  `Nama` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Telp` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Alamat` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `WEB` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Provinsi` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `NamaProvinsi` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Kota` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `NamaKota` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Kec` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `NamaKec` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `KodePos` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Pwd` varchar(300) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `IsDefault` int NOT NULL DEFAULT '0',
  `IsMember` int NOT NULL DEFAULT '0',
  `MemberCode` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `Point` int DEFAULT NULL,
  `IsCabang` int NOT NULL DEFAULT '0',
  `Lokasi` bigint NOT NULL DEFAULT '0',
  `TimeCreated` timestamp NOT NULL,
  `Status` int DEFAULT '1',
  PRIMARY KEY (`ID`,`IsDefault`,`IsMember`,`IsCabang`,`Lokasi`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbmcard` */

insert  into `dbmcard`(`ID`,`Jenis`,`Nama`,`Telp`,`Email`,`Alamat`,`WEB`,`Provinsi`,`NamaProvinsi`,`Kota`,`NamaKota`,`Kec`,`NamaKec`,`KodePos`,`Pwd`,`IsDefault`,`IsMember`,`MemberCode`,`Point`,`IsCabang`,`Lokasi`,`TimeCreated`,`Status`) values 
(0,'pelanggan','Pelanggan','8888','pelanggan@gmail.com','Indonesia','','11','Jawa Timur','31','Sidoarjo','456','Sukodono',NULL,NULL,1,0,NULL,NULL,0,0,'0000-00-00 00:00:00',1);

/*Table structure for table `dbmcuti` */

DROP TABLE IF EXISTS `dbmcuti`;

CREATE TABLE `dbmcuti` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `Nama` varchar(200) DEFAULT NULL,
  `Lama` int DEFAULT NULL,
  `Keterangan` text,
  `Status` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID`,`Status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbmcuti` */

/*Table structure for table `dbmgajikaryawan` */

DROP TABLE IF EXISTS `dbmgajikaryawan`;

CREATE TABLE `dbmgajikaryawan` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `UserID` bigint DEFAULT NULL,
  `ComponentID` bigint DEFAULT NULL,
  `NamaKomponen` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Amount` decimal(20,0) NOT NULL DEFAULT '0',
  `FN` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Setting` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `Status` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbmgajikaryawan` */

/*Table structure for table `dbmgudang` */

DROP TABLE IF EXISTS `dbmgudang`;

CREATE TABLE `dbmgudang` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `Code` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Nama` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Keterangan` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Lokasi` bigint NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`,`Code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `dbmgudang` */

/*Table structure for table `dbmgudangposisi` */

DROP TABLE IF EXISTS `dbmgudangposisi`;

CREATE TABLE `dbmgudangposisi` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `GudangID` bigint DEFAULT NULL,
  `Code` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Nama` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Keterangan` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `dbmgudangposisi` */

/*Table structure for table `dbmhutangpiutang` */

DROP TABLE IF EXISTS `dbmhutangpiutang`;

CREATE TABLE `dbmhutangpiutang` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `DocNumber` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Type` enum('hutang','piutang') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'hutang',
  `AkunID` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `NamaAkun` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `TermDate` date DEFAULT NULL,
  `Date` date DEFAULT NULL,
  `CardType` enum('pelanggan','suplier','karyawan') CHARACTER SET utf8mb3 COLLATE utf8_general_ci NOT NULL DEFAULT 'pelanggan',
  `CardID` bigint DEFAULT NULL,
  `CardName` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Amount` decimal(20,0) NOT NULL DEFAULT '0',
  `Balance` decimal(20,0) NOT NULL DEFAULT '0',
  `Lokasi` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0',
  `Status` enum('lunas','jalan','batal') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'jalan',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbmhutangpiutang` */

/*Table structure for table `dbmitem` */

DROP TABLE IF EXISTS `dbmitem`;

CREATE TABLE `dbmitem` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `Code` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Nama` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Kategori` bigint DEFAULT NULL,
  `NamaKategori` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Satuan` bigint DEFAULT NULL,
  `NamaSatuan` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Qty` int NOT NULL DEFAULT '0',
  `QtyMin` int NOT NULL DEFAULT '0',
  `HargaBeli` decimal(20,0) NOT NULL DEFAULT '0',
  `HargaJual` decimal(20,0) NOT NULL DEFAULT '0',
  `Merk` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Warna` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Ukuran` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Lokasi` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Keterangan` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `NamaAkunPembelian` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Pembelian barang jadi',
  `AkunPembelian` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '5.2.02.00.00',
  `NamaAkunPenjualan` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Pendapatan Penjualan Barang',
  `AkunPenjualan` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '4.1.01.01.00',
  `NamaAkunPersediaan` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Persediaan Barang Jadi',
  `AkunPersediaan` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1.1.04.05.00',
  `Expired` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Type` enum('Material','Barang Jadi','Produksi','Barang Mentah','Jasa','Repackaging') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Barang Jadi',
  `TimeCreated` timestamp NULL DEFAULT NULL,
  `TimeUpdate` timestamp NOT NULL,
  `Status` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID`,`Code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbmitem` */

/*Table structure for table `dbmitemdetail` */

DROP TABLE IF EXISTS `dbmitemdetail`;

CREATE TABLE `dbmitemdetail` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `ItemID` bigint DEFAULT NULL,
  `ItemCode` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ItemName` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Qty` int DEFAULT NULL,
  `QtyMin` int DEFAULT NULL,
  `HargaBeli` decimal(20,0) NOT NULL DEFAULT '0',
  `HargaJual` decimal(20,0) NOT NULL DEFAULT '0',
  `IsSell` int NOT NULL DEFAULT '1',
  `IsBuy` int NOT NULL DEFAULT '1',
  `IsProduction` int NOT NULL DEFAULT '1',
  `IsShow` int NOT NULL DEFAULT '1',
  `Lokasi` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0',
  `Status` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbmitemdetail` */

/*Table structure for table `dbmitemimg` */

DROP TABLE IF EXISTS `dbmitemimg`;

CREATE TABLE `dbmitemimg` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `ItemID` bigint DEFAULT NULL,
  `File` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `FileKecil` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Ukuran` int DEFAULT NULL,
  `Url` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `IsBanner` int NOT NULL DEFAULT '0',
  `Status` int DEFAULT '1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbmitemimg` */

/*Table structure for table `dbmitemlog` */

DROP TABLE IF EXISTS `dbmitemlog`;

CREATE TABLE `dbmitemlog` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `DocNumber` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'DocNumber dari transaksi',
  `DocID` bigint DEFAULT NULL COMMENT 'ID Dari dbtitemsum',
  `DocDate` date DEFAULT NULL,
  `ItemID` bigint DEFAULT NULL,
  `Qty` int DEFAULT NULL,
  `Price` decimal(20,0) NOT NULL DEFAULT '0',
  `Status` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COMMENT='table ini berfungsi untuk menyimpan history pengurangan dari dbtitemsum (dalam hal ini untuk fifo)';

/*Data for the table `dbmitemlog` */

/*Table structure for table `dbmitemmaterial` */

DROP TABLE IF EXISTS `dbmitemmaterial`;

CREATE TABLE `dbmitemmaterial` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `ParentID` bigint DEFAULT NULL,
  `ItemID` bigint DEFAULT NULL,
  `ItemName` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Qty` int DEFAULT NULL,
  `Price` decimal(20,0) NOT NULL DEFAULT '0',
  `Lokasi` bigint NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`,`Price`,`Lokasi`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbmitemmaterial` */

/*Table structure for table `dbmitemrate` */

DROP TABLE IF EXISTS `dbmitemrate`;

CREATE TABLE `dbmitemrate` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `ItemID` bigint DEFAULT NULL,
  `RateValue` int DEFAULT NULL,
  `CardID` bigint DEFAULT NULL,
  `Notes` text CHARACTER SET utf8mb3 COLLATE utf8_general_ci,
  `TimeCreated` timestamp NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbmitemrate` */

/*Table structure for table `dbmitemstok` */

DROP TABLE IF EXISTS `dbmitemstok`;

CREATE TABLE `dbmitemstok` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `DocDate` date DEFAULT NULL,
  `DocNumber` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `DocType` enum('plus','minus') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'plus',
  `ItemID` bigint DEFAULT NULL,
  `ItemName` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Qty` int NOT NULL DEFAULT '0',
  `QtyBefore` int NOT NULL DEFAULT '0',
  `QtyAfter` int NOT NULL DEFAULT '0',
  `UserID` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `Lokasi` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbmitemstok` */

/*Table structure for table `dbmitemsum` */

DROP TABLE IF EXISTS `dbmitemsum`;

CREATE TABLE `dbmitemsum` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `ItemID` bigint DEFAULT NULL,
  `Amount` decimal(20,0) NOT NULL DEFAULT '0',
  `Qty` int NOT NULL DEFAULT '0',
  `DocDate` timestamp NOT NULL,
  `Lokasi` varchar(10) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '0',
  `DocNumber` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COMMENT='ini untuk FiFo barang';

/*Data for the table `dbmitemsum` */

/*Table structure for table `dbmitemunit` */

DROP TABLE IF EXISTS `dbmitemunit`;

CREATE TABLE `dbmitemunit` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `ItemID` bigint DEFAULT NULL,
  `UnitName` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Qty` int DEFAULT NULL,
  `Price` int DEFAULT NULL,
  `IsDefault` int NOT NULL DEFAULT '0',
  `Lokasi` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0',
  `Status` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID`,`Lokasi`,`Status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbmitemunit` */

/*Table structure for table `dbmitemvoucher` */

DROP TABLE IF EXISTS `dbmitemvoucher`;

CREATE TABLE `dbmitemvoucher` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `AkunID` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `AkunName` varchar(300) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `ItemID` bigint DEFAULT NULL,
  `ItemName` varchar(300) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `StartDate` date DEFAULT NULL,
  `EndDate` date DEFAULT NULL,
  `AmountType` enum('Price','Percentage','Items') CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT 'Price',
  `Amount` decimal(22,0) NOT NULL DEFAULT '0',
  `BonusItemID` bigint NOT NULL DEFAULT '0',
  `BonusItemName` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `BonusItemQty` bigint DEFAULT NULL,
  `Lokasi` bigint NOT NULL DEFAULT '0',
  `Status` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID`,`Amount`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbmitemvoucher` */

/*Table structure for table `dbmizin` */

DROP TABLE IF EXISTS `dbmizin`;

CREATE TABLE `dbmizin` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `Nama` varchar(200) DEFAULT NULL,
  `Keterangan` text,
  `Status` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID`,`Status`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbmizin` */

insert  into `dbmizin`(`ID`,`Nama`,`Keterangan`,`Status`) values 
(1,'Surat Dokter',NULL,1),
(2,'Dinas',NULL,1),
(3,'Keluarga Dalam Satu Rumah Meninggal',NULL,1);

/*Table structure for table `dbmjabatan` */

DROP TABLE IF EXISTS `dbmjabatan`;

CREATE TABLE `dbmjabatan` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `Nama` varchar(200) DEFAULT NULL,
  `Level` int NOT NULL DEFAULT '1',
  `Keterangan` text,
  `Status` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID`,`Level`,`Status`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbmjabatan` */

insert  into `dbmjabatan`(`ID`,`Nama`,`Level`,`Keterangan`,`Status`) values 
(1,'Director',1,NULL,1),
(2,'Manager',2,NULL,1),
(3,'Supervisor',3,NULL,1),
(4,'Staff Operasional',4,NULL,1);

/*Table structure for table `dbmjamkerja` */

DROP TABLE IF EXISTS `dbmjamkerja`;

CREATE TABLE `dbmjamkerja` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `Nama` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `JamMasuk` time DEFAULT NULL,
  `JamPulang` time DEFAULT NULL,
  `Lokasi` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0',
  `Status` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbmjamkerja` */

insert  into `dbmjamkerja`(`ID`,`Nama`,`JamMasuk`,`JamPulang`,`Lokasi`,`Status`) values 
(1,'Shift Satu','07:00:00','15:00:00','0',1),
(2,'Shift Dua','15:00:00','23:00:00','0',1),
(3,'Shift Tiga','23:00:00','07:00:00','0',1);

/*Table structure for table `dbmjamkerjadetail` */

DROP TABLE IF EXISTS `dbmjamkerjadetail`;

CREATE TABLE `dbmjamkerjadetail` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `NIK` int DEFAULT NULL,
  `KaryawanID` bigint DEFAULT NULL,
  `Tanggal` date DEFAULT NULL,
  `JamMasuk` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `JamPulang` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Notes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `CreateBy` int DEFAULT NULL,
  `ApproveBy` int DEFAULT NULL,
  `Lokasi` int NOT NULL DEFAULT '0',
  `Status` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID`,`Status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbmjamkerjadetail` */

/*Table structure for table `dbmkaryawan` */

DROP TABLE IF EXISTS `dbmkaryawan`;

CREATE TABLE `dbmkaryawan` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `JoinDate` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `PTKP` enum('TK/0','TK/1','TK/2','TK/3','K/0','K/1','K/2','K/3') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'TK/0',
  `NPWP` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'none',
  `PPH21` enum('Grows','Growsup') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Grows',
  `NIK` int NOT NULL,
  `ShiftID` bigint NOT NULL DEFAULT '1',
  `UserID` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Type` enum('Staff','Mandor','Manager','Admin','Owner','Director') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Staff',
  `Nama` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Email` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Telp` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `JenisKelamin` enum('Pria','Wanita') CHARACTER SET utf8mb3 COLLATE utf8_general_ci NOT NULL DEFAULT 'Pria',
  `Pendidikan` enum('SD','SMP','SMA','D1','D2','D3','D4','S1','S2','S3') CHARACTER SET utf8mb3 COLLATE utf8_general_ci NOT NULL DEFAULT 'SMA',
  `Alamat` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `Password` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `Img` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `PosisiID` bigint DEFAULT NULL,
  `Posisi` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `JabatanID` bigint DEFAULT NULL,
  `Jabatan` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `Status` enum('Tetap','Training','Kontrak','Buruh Harian Lepas') CHARACTER SET utf8mb3 COLLATE utf8_general_ci NOT NULL DEFAULT 'Tetap',
  PRIMARY KEY (`ID`,`NIK`,`Email`,`Status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbmkaryawan` */

/*Table structure for table `dbmkategori` */

DROP TABLE IF EXISTS `dbmkategori`;

CREATE TABLE `dbmkategori` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `Nama` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Tampil` int NOT NULL DEFAULT '1',
  `Img` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'assets/img/kategori.png',
  `Status` int DEFAULT '1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `dbmkategori` */

/*Table structure for table `dbmkomponengaji` */

DROP TABLE IF EXISTS `dbmkomponengaji`;

CREATE TABLE `dbmkomponengaji` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `Nama` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Amount` decimal(20,0) NOT NULL DEFAULT '0',
  `Notes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `FN` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Setting` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `isAbsen` int NOT NULL DEFAULT '0',
  `Status` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbmkomponengaji` */

insert  into `dbmkomponengaji`(`ID`,`Nama`,`Amount`,`Notes`,`FN`,`Setting`,`isAbsen`,`Status`) values 
(1,'Gaji Pokok',2000000,NULL,NULL,NULL,0,1),
(2,'Tunjangan Makan',250000,NULL,NULL,NULL,0,1),
(3,'Tunjangan Transport',250000,NULL,NULL,NULL,0,1),
(4,'Bonus Kinerja',100000,NULL,NULL,NULL,0,1),
(5,'Tunjangan Hari Raya',2000000,NULL,NULL,NULL,0,1),
(6,'Bonus Lembur Harian',150000,NULL,NULL,NULL,0,1);

/*Table structure for table `dbmlokasi` */

DROP TABLE IF EXISTS `dbmlokasi`;

CREATE TABLE `dbmlokasi` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `Nama` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Alamat` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `Telp` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Provinsi` bigint DEFAULT NULL,
  `Kota` bigint DEFAULT NULL,
  `Kec` bigint DEFAULT NULL,
  `Keterangan` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `Domain` varchar(300) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `Instagram` varchar(300) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `PointPelanggan` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8_general_ci NOT NULL DEFAULT 'false',
  `Logo` varchar(300) CHARACTER SET utf8mb3 COLLATE utf8_general_ci NOT NULL DEFAULT 'false',
  `ColorDefault` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8_general_ci NOT NULL DEFAULT '#3B2420',
  `ColorAksen` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8_general_ci NOT NULL DEFAULT '#FDD100',
  `Font` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8_general_ci NOT NULL DEFAULT 'iniFont',
  `Style` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8_general_ci NOT NULL DEFAULT 'style.css',
  `ModePesan` enum('All','Meja') CHARACTER SET utf8mb3 COLLATE utf8_general_ci NOT NULL DEFAULT 'All',
  `IsPusat` int NOT NULL DEFAULT '0',
  `Status` int DEFAULT '1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbmlokasi` */

insert  into `dbmlokasi`(`ID`,`Nama`,`Alamat`,`Telp`,`Provinsi`,`Kota`,`Kec`,`Keterangan`,`Domain`,`Instagram`,`PointPelanggan`,`Logo`,`ColorDefault`,`ColorAksen`,`Font`,`Style`,`ModePesan`,`IsPusat`,`Status`) values 
(0,'Pusat','Sukodono sidoarjo','081234779772',NULL,NULL,NULL,NULL,NULL,NULL,'false','false','#3B2420','#FDD100','iniFont','style.css','All',0,1);

/*Table structure for table `dbmmarketplace` */

DROP TABLE IF EXISTS `dbmmarketplace`;

CREATE TABLE `dbmmarketplace` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `Nama` varchar(1000) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `Keterangan` text CHARACTER SET latin1 COLLATE latin1_swedish_ci,
  `Link` text CHARACTER SET latin1 COLLATE latin1_swedish_ci,
  `Pajak` int NOT NULL DEFAULT '0',
  `Amount` int NOT NULL DEFAULT '0',
  `Code` varchar(25) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `Status` int DEFAULT '1',
  PRIMARY KEY (`ID`,`Pajak`,`Amount`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbmmarketplace` */

insert  into `dbmmarketplace`(`ID`,`Nama`,`Keterangan`,`Link`,`Pajak`,`Amount`,`Code`,`Status`) values 
(1,'Gudang','Penjualan di gudang','-',0,0,'8.1.03.00.05',1);

/*Table structure for table `dbmmarketplaceprice` */

DROP TABLE IF EXISTS `dbmmarketplaceprice`;

CREATE TABLE `dbmmarketplaceprice` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `MarketplaceID` bigint DEFAULT NULL,
  `ItemID` bigint DEFAULT NULL,
  `Price` decimal(20,0) NOT NULL DEFAULT '0',
  `Percentage` decimal(20,0) NOT NULL DEFAULT '0',
  `PPN` int DEFAULT NULL,
  `Lokasi` varchar(10) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '0',
  `Status` int DEFAULT '1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbmmarketplaceprice` */

/*Table structure for table `dbmmeja` */

DROP TABLE IF EXISTS `dbmmeja`;

CREATE TABLE `dbmmeja` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `Code` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `Nama` varchar(300) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `IsShow` int NOT NULL DEFAULT '1',
  `Status` enum('Kosong','Dipakai','Dipesan') CHARACTER SET utf8mb3 COLLATE utf8_general_ci NOT NULL DEFAULT 'Kosong',
  `Lokasi` bigint NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbmmeja` */

/*Table structure for table `dbmmesinabsensi` */

DROP TABLE IF EXISTS `dbmmesinabsensi`;

CREATE TABLE `dbmmesinabsensi` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `Merk` enum('Fingerspot') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'Fingerspot',
  `Type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Nama` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'Mesin 1',
  `CloudID` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Key` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Lokasi` int NOT NULL DEFAULT '0',
  `Status` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID`,`Nama`,`Lokasi`,`Status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbmmesinabsensi` */

/*Table structure for table `dbmpelamar` */

DROP TABLE IF EXISTS `dbmpelamar`;

CREATE TABLE `dbmpelamar` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `Tanggal` date DEFAULT NULL,
  `NoKtp` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `NoKK` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `Nama` varchar(300) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `Alamat` text CHARACTER SET utf8mb3 COLLATE utf8_general_ci,
  `Telp` varchar(14) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `Email` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `Posisi` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `Jabatan` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `JenisKelamin` enum('Pria','Wanita') CHARACTER SET utf8mb3 COLLATE utf8_general_ci NOT NULL DEFAULT 'Pria',
  `Pendidikan` enum('SD','SMP','SMA','D1','D2','D3','D4','S1','S2','S3') CHARACTER SET utf8mb3 COLLATE utf8_general_ci NOT NULL DEFAULT 'SMA',
  `Keterangan` text CHARACTER SET utf8mb3 COLLATE utf8_general_ci,
  `Status` enum('Baru','Approve','Reject') CHARACTER SET utf8mb3 COLLATE utf8_general_ci NOT NULL DEFAULT 'Baru',
  `ApproveBy` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `ApproveDate` date DEFAULT NULL,
  `TimeCreated` timestamp NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbmpelamar` */

/*Table structure for table `dbmperiod` */

DROP TABLE IF EXISTS `dbmperiod`;

CREATE TABLE `dbmperiod` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `YY` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `MM` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `StartDate` date DEFAULT NULL,
  `EndDate` date DEFAULT NULL,
  `Kas` decimal(20,0) NOT NULL DEFAULT '0',
  `Modal` decimal(20,0) NOT NULL DEFAULT '0',
  `Hutang` decimal(20,0) NOT NULL DEFAULT '0',
  `Piutang` decimal(20,0) NOT NULL DEFAULT '0',
  `Aset` decimal(20,0) NOT NULL DEFAULT '0',
  `PersediaanAwal` decimal(20,0) NOT NULL DEFAULT '0',
  `PersediaanAkhir` decimal(20,0) NOT NULL DEFAULT '0',
  `Penjualan` decimal(20,0) NOT NULL DEFAULT '0',
  `Pembelian` decimal(20,0) NOT NULL DEFAULT '0',
  `Beban` decimal(20,0) NOT NULL DEFAULT '0',
  `Lokasi` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0',
  `Status` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbmperiod` */

/*Table structure for table `dbmperiodakun` */

DROP TABLE IF EXISTS `dbmperiodakun`;

CREATE TABLE `dbmperiodakun` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `PeriodID` bigint DEFAULT NULL,
  `Code` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `AkunName` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Amount` decimal(20,0) DEFAULT '0',
  `Lokasi` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `dbmperiodakun` */

/*Table structure for table `dbmperiodakunpembayaran` */

DROP TABLE IF EXISTS `dbmperiodakunpembayaran`;

CREATE TABLE `dbmperiodakunpembayaran` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `PeriodID` bigint DEFAULT NULL,
  `AkunCode` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `AkunName` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Amount` decimal(20,0) DEFAULT NULL,
  `Lokasi` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `dbmperiodakunpembayaran` */

/*Table structure for table `dbmperiodgaji` */

DROP TABLE IF EXISTS `dbmperiodgaji`;

CREATE TABLE `dbmperiodgaji` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `YY` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `MM` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `StartDate` date DEFAULT NULL,
  `EndDate` date DEFAULT NULL,
  `Amount` decimal(20,0) NOT NULL DEFAULT '0',
  `Status` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbmperiodgaji` */

/*Table structure for table `dbmperiodstok` */

DROP TABLE IF EXISTS `dbmperiodstok`;

CREATE TABLE `dbmperiodstok` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `PeriodID` bigint NOT NULL,
  `ItemID` bigint NOT NULL,
  `ItemName` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Qty` int DEFAULT NULL,
  `Price` int DEFAULT NULL,
  `Ratarata` int DEFAULT NULL,
  `Lokasi` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`,`PeriodID`,`ItemID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbmperiodstok` */

/*Table structure for table `dbmposisi` */

DROP TABLE IF EXISTS `dbmposisi`;

CREATE TABLE `dbmposisi` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `ParentID` bigint NOT NULL DEFAULT '0',
  `Nama` varchar(200) DEFAULT NULL,
  `JobDesc` text,
  `JobReq` text,
  `Keterangan` text,
  `Status` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID`,`ParentID`,`Status`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbmposisi` */

insert  into `dbmposisi`(`ID`,`ParentID`,`Nama`,`JobDesc`,`JobReq`,`Keterangan`,`Status`) values 
(0,0,'Direksi',NULL,NULL,NULL,1),
(1,0,'Marketing',NULL,NULL,NULL,1),
(2,1,'MD',NULL,NULL,NULL,1),
(3,1,'SPG',NULL,NULL,NULL,1),
(4,0,'HRD',NULL,NULL,NULL,1),
(5,4,'HRD Development',NULL,NULL,NULL,1),
(6,4,'HRD Selection & Recruitment',NULL,NULL,NULL,1),
(7,4,'HRD IR',NULL,NULL,NULL,1),
(8,4,'HRD GA',NULL,NULL,NULL,1),
(9,4,'HRD Payroll',NULL,NULL,NULL,1),
(10,0,'Gudang',NULL,NULL,NULL,1),
(11,10,'Gudang Bahan',NULL,NULL,NULL,1),
(12,10,'Gudang Barang Jadi',NULL,NULL,NULL,1),
(13,0,'Produksi',NULL,NULL,NULL,1),
(14,1,'Kasir',NULL,NULL,NULL,1),
(16,0,'PPIC',NULL,NULL,NULL,1),
(17,0,'MIS',NULL,NULL,NULL,1),
(18,17,'MIS Support',NULL,NULL,NULL,1),
(19,17,'MIS Development',NULL,NULL,NULL,1),
(20,18,'MIS Data Analisys',NULL,NULL,NULL,1),
(21,0,'Purchasing',NULL,NULL,NULL,1),
(22,0,'Internal Auditor',NULL,NULL,NULL,1),
(23,0,'Tehnik',NULL,NULL,NULL,1),
(24,0,'Finance',NULL,NULL,NULL,1),
(25,0,'Akuntansi',NULL,NULL,NULL,1);

/*Table structure for table `dbmsatuan` */

DROP TABLE IF EXISTS `dbmsatuan`;

CREATE TABLE `dbmsatuan` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `Nama` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Status` int DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbmsatuan` */

insert  into `dbmsatuan`(`ID`,`Nama`,`Status`) values 
(1,'KG',1),
(2,'PCS',1),
(3,'LUSIN',1);

/*Table structure for table `dbmsuplieritem` */

DROP TABLE IF EXISTS `dbmsuplieritem`;

CREATE TABLE `dbmsuplieritem` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `CardID` bigint NOT NULL,
  `CardName` varchar(1000) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `ItemID` bigint NOT NULL,
  `ItemName` varchar(1000) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `Link` varchar(225) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `Harga` decimal(20,0) NOT NULL DEFAULT '0',
  `PreOrder` int NOT NULL DEFAULT '0',
  `IsDefault` int NOT NULL DEFAULT '0',
  `TimeCreated` timestamp NULL DEFAULT NULL,
  `TimeUpdate` time DEFAULT NULL,
  `Status` int DEFAULT '1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbmsuplieritem` */

/*Table structure for table `dbmtask` */

DROP TABLE IF EXISTS `dbmtask`;

CREATE TABLE `dbmtask` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `DocNumber` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'non sales',
  `JudulID` bigint DEFAULT NULL,
  `UserID` bigint DEFAULT NULL,
  `UserName` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Judul` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Amount` decimal(20,0) NOT NULL DEFAULT '0',
  `TermDate` date DEFAULT NULL,
  `PicID` bigint DEFAULT NULL,
  `PicName` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ClientID` bigint DEFAULT NULL,
  `ClientName` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Isi` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `Label` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `WaktuBuat` timestamp NULL DEFAULT NULL,
  `WaktuUpdate` timestamp NULL DEFAULT NULL,
  `IsOrder` int NOT NULL DEFAULT '1',
  `Status` enum('active','archive','delete','finish','cancel') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'active',
  `Type` enum('note','project') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'note',
  `color` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '#F7F7F7',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `dbmtask` */

/*Table structure for table `dbmtaskchecklist` */

DROP TABLE IF EXISTS `dbmtaskchecklist`;

CREATE TABLE `dbmtaskchecklist` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `TugasID` bigint DEFAULT NULL,
  `UserID` bigint DEFAULT NULL,
  `UserName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Isi` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `WaktuBuat` timestamp NULL DEFAULT NULL,
  `WaktuUpdate` timestamp NULL DEFAULT NULL,
  `Oleh` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `IsOrder` int DEFAULT NULL,
  `Status` int DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `dbmtaskchecklist` */

/*Table structure for table `dbmtaskjudul` */

DROP TABLE IF EXISTS `dbmtaskjudul`;

CREATE TABLE `dbmtaskjudul` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `UserID` bigint DEFAULT NULL,
  `UserName` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Judul` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Isi` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `Label` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `WaktuBuat` timestamp NULL DEFAULT NULL,
  `WaktuUpdate` timestamp NULL DEFAULT NULL,
  `IsOrder` int DEFAULT NULL,
  `Color` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '#F7F7F7',
  `Status` int DEFAULT '1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `dbmtaskjudul` */

/*Table structure for table `dbmtaskkomentar` */

DROP TABLE IF EXISTS `dbmtaskkomentar`;

CREATE TABLE `dbmtaskkomentar` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `TugasID` bigint DEFAULT NULL,
  `UserID` bigint DEFAULT NULL,
  `UserName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Isi` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `WaktuBuat` timestamp NULL DEFAULT NULL,
  `WaktuUpdate` timestamp NULL DEFAULT NULL,
  `Oleh` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Status` int DEFAULT '1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `dbmtaskkomentar` */

/*Table structure for table `dbmtaskshare` */

DROP TABLE IF EXISTS `dbmtaskshare`;

CREATE TABLE `dbmtaskshare` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `JudulID` bigint NOT NULL DEFAULT '0',
  `TaskID` bigint DEFAULT NULL,
  `UserID` bigint DEFAULT NULL,
  `Access` enum('view','edit') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'view',
  `IsOrder` int NOT NULL DEFAULT '0',
  `Status` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `dbmtaskshare` */

/*Table structure for table `dbmtraining` */

DROP TABLE IF EXISTS `dbmtraining`;

CREATE TABLE `dbmtraining` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `Nama` varchar(1000) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `Keterangan` text CHARACTER SET utf8mb3 COLLATE utf8_general_ci,
  `level` int NOT NULL DEFAULT '1',
  `Status` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbmtraining` */

/*Table structure for table `dbmvoucher` */

DROP TABLE IF EXISTS `dbmvoucher`;

CREATE TABLE `dbmvoucher` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `Code` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Nama` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Notes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `StartDate` date DEFAULT NULL,
  `EndDate` date DEFAULT NULL,
  `ItemID` bigint DEFAULT NULL,
  `ItemName` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `CardID` bigint DEFAULT NULL,
  `CardName` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Amount` decimal(20,0) DEFAULT NULL,
  `Qty` int NOT NULL DEFAULT '1',
  `Img` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `IsGlobalItem` int NOT NULL DEFAULT '0',
  `IsGlobalLokasi` int NOT NULL DEFAULT '0',
  `IsGlobalCard` int NOT NULL DEFAULT '0',
  `IsUsed` int DEFAULT '0',
  `CreateBy` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `TimeCreated` timestamp NOT NULL,
  `Lokasi` bigint DEFAULT NULL,
  `Status` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID`,`Code`,`Qty`,`IsGlobalItem`,`IsGlobalLokasi`,`IsGlobalCard`,`TimeCreated`,`Status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbmvoucher` */

/*Table structure for table `dbsakses` */

DROP TABLE IF EXISTS `dbsakses`;

CREATE TABLE `dbsakses` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `LokasiID` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0',
  `UserID` bigint DEFAULT NULL,
  `Akses` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Status` int DEFAULT '1',
  `Lihat` int NOT NULL DEFAULT '1',
  `Tambah` int NOT NULL DEFAULT '0',
  `Edit` int NOT NULL DEFAULT '0',
  `Hapus` int NOT NULL DEFAULT '0',
  `Tutorial` int NOT NULL DEFAULT '1',
  `TableField` longtext CHARACTER SET utf8mb3 COLLATE utf8_general_ci,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbsakses` */

/*Table structure for table `dbsprinting` */

DROP TABLE IF EXISTS `dbsprinting`;

CREATE TABLE `dbsprinting` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `Name` varchar(1000) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `DocType` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `IsPrinting` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbsprinting` */

insert  into `dbsprinting`(`ID`,`Name`,`DocType`,`IsPrinting`) values 
(1,'PURCH01','PURCH',1),
(2,'SALES03','SALES',1),
(3,'SJ01','SJ',1),
(4,'SRTRN01','SRTRN',1),
(5,'PRTRN01','PRTRN',1),
(6,'SSORD01','SSORD',1),
(7,'PRORD01','PRORD',1),
(8,'KASIR01','KASIR',1);

/*Table structure for table `dbsprofile` */

DROP TABLE IF EXISTS `dbsprofile`;

CREATE TABLE `dbsprofile` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `Nama` varchar(225) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `Alamat` text CHARACTER SET latin1 COLLATE latin1_swedish_ci,
  `Telp` varchar(25) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `Domain` varchar(225) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `DomainKasir` varchar(225) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `IG` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `PrimaryColor` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '#3B2420',
  `SecondaryColor` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '#FDD100',
  `CSS` varchar(225) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT 'style.css',
  `Logo` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT 'logo',
  `AkunID` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `Status` int DEFAULT '1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbsprofile` */

/*Table structure for table `dbsrecno` */

DROP TABLE IF EXISTS `dbsrecno`;

CREATE TABLE `dbsrecno` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `DocType` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `YY` int DEFAULT NULL,
  `MM` int DEFAULT NULL,
  `DocNo` bigint DEFAULT NULL,
  `Lokasi` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `dbsrecno` */

/*Table structure for table `dbssetting` */

DROP TABLE IF EXISTS `dbssetting`;

CREATE TABLE `dbssetting` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `Untuk` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Lakukan` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `dbssetting` */

insert  into `dbssetting`(`ID`,`Untuk`,`Lakukan`) values 
(1,'openReservasi','10:00'),
(2,'closeReservasi','23:00'),
(3,'alurCart','pesan'),
(4,'pesanReservasi','ya'),
(5,'akunReservasi','1.1.01.02.01'),
(6,'logoHome','assets/img/produk/40/logohome.png'),
(7,'showLokasi','all'),
(8,'ukuranCardLokasi','150px'),
(9,'cetakInv','ya'),
(10,'typeCetakInv','detail'),
(11,'showImageList','tidak'),
(12,'showDetailItem','tidak'),
(13,'hpp','avg'),
(14,'apiAbsensi','none'),
(15,'filterNamaGJ','test,tes,testing,tess,teess,RT,RW'),
(16,'soundNotif','0');

/*Table structure for table `dbtabsensi` */

DROP TABLE IF EXISTS `dbtabsensi`;

CREATE TABLE `dbtabsensi` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `UserID` bigint DEFAULT NULL,
  `Nama` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Tanggal` date DEFAULT NULL,
  `PerubahanJamKerja` bigint DEFAULT NULL,
  `JamKerjaMasuk` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '00:00:00',
  `JamKerjaKeluar` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '00:00:00',
  `Masuk` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '00:00:00',
  `Pulang` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '00:00:00',
  `LokasiMasuk` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `LokasiPulang` varbinary(150) DEFAULT NULL,
  `FotoMasuk` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `FotoPulang` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `ApproveBy` bigint DEFAULT NULL,
  `Status` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbtabsensi` */

/*Table structure for table `dbtcardpoint` */

DROP TABLE IF EXISTS `dbtcardpoint`;

CREATE TABLE `dbtcardpoint` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `DocNumber` varchar(25) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `DocDate` date DEFAULT NULL,
  `CardID` bigint DEFAULT NULL,
  `CardName` varchar(1000) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `Point` decimal(20,0) DEFAULT NULL,
  `Lokasi` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbtcardpoint` */

/*Table structure for table `dbtcuti` */

DROP TABLE IF EXISTS `dbtcuti`;

CREATE TABLE `dbtcuti` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `IDCuti` bigint DEFAULT NULL,
  `NamaCuti` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `TanggalMulai` date DEFAULT NULL,
  `TanggalBerahir` date DEFAULT NULL,
  `IDKarayawan` bigint DEFAULT NULL,
  `NIK` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `NamaKaryawan` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `Keterangan` text CHARACTER SET utf8mb3 COLLATE utf8_general_ci,
  `ApproveBy` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `Approve` enum('Pending','Approve','Reject') CHARACTER SET utf8mb3 COLLATE utf8_general_ci NOT NULL DEFAULT 'Pending',
  `TimeCreated` timestamp NOT NULL,
  PRIMARY KEY (`ID`,`Approve`,`TimeCreated`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbtcuti` */

/*Table structure for table `dbtdelivery` */

DROP TABLE IF EXISTS `dbtdelivery`;

CREATE TABLE `dbtdelivery` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `DocNumber` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ReffDocID` bigint DEFAULT NULL,
  `ReffDocNumber` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `DocDate` date DEFAULT NULL,
  `NoResi` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `CardID` bigint DEFAULT NULL,
  `CardName` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Alamat` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `Provinsi` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `NamaProvinsi` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Kota` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `NamaKota` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Kec` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `NamaKec` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `KodePos` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Telp` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Ongkir` int DEFAULT NULL,
  `ExpedisiName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Notes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `StatusKirim` enum('Belum Dikirim','Sedang Dikirim','Sudah Sampai','Retur') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Belum Dikirim',
  `CreatedDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `UserID` bigint DEFAULT NULL,
  `Lokasi` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0',
  `Status` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID`,`DocNumber`,`StatusKirim`,`Status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbtdelivery` */

/*Table structure for table `dbtdeliverydetail` */

DROP TABLE IF EXISTS `dbtdeliverydetail`;

CREATE TABLE `dbtdeliverydetail` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `DocID` bigint DEFAULT NULL,
  `DocNumber` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Qty` int DEFAULT NULL,
  `ItemID` bigint DEFAULT NULL,
  `ItemName` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Status` int DEFAULT '1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbtdeliverydetail` */

/*Table structure for table `dbtgaji` */

DROP TABLE IF EXISTS `dbtgaji`;

CREATE TABLE `dbtgaji` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `PeriodID` bigint DEFAULT NULL,
  `DocNumber` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Tanggal` date DEFAULT NULL,
  `UserID` bigint DEFAULT NULL,
  `Nama` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Amount` decimal(20,0) NOT NULL DEFAULT '0',
  `CreatedBy` varchar(300) CHARACTER SET utf8mb3 COLLATE utf8_general_ci NOT NULL,
  `CreatedDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Lokasi` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0',
  `Status` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbtgaji` */

/*Table structure for table `dbtgajidetail` */

DROP TABLE IF EXISTS `dbtgajidetail`;

CREATE TABLE `dbtgajidetail` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `DocID` bigint DEFAULT NULL,
  `ComponentID` bigint DEFAULT NULL,
  `ComponenName` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Tanggal` date DEFAULT NULL,
  `Amount` decimal(20,0) NOT NULL DEFAULT '0',
  `Jumlah` int NOT NULL DEFAULT '1',
  `Total` decimal(20,0) NOT NULL DEFAULT '0',
  `Notes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `TimeCreated` timestamp NOT NULL,
  `CreatedBy` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbtgajidetail` */

/*Table structure for table `dbtiklan` */

DROP TABLE IF EXISTS `dbtiklan`;

CREATE TABLE `dbtiklan` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `DocNumber` varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `DocDate` date DEFAULT NULL,
  `Media` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `AkunKas` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `AkunBeban` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Amount` decimal(20,0) DEFAULT NULL,
  `Link` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Notes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Status` int NOT NULL DEFAULT '1',
  `TimeCreated` timestamp NOT NULL,
  `UserName` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Lokasi` bigint NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `dbtiklan` */

/*Table structure for table `dbtitemtrans` */

DROP TABLE IF EXISTS `dbtitemtrans`;

CREATE TABLE `dbtitemtrans` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `DocType` varchar(5) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `DocDate` date DEFAULT NULL,
  `QtyType` enum('plus','minus') CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT 'plus',
  `PayType` enum('TRANSFER','CASH','PIUTANG','HUTANG','COD','POINTS') CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT 'CASH',
  `PayDate` date DEFAULT NULL,
  `PayStatus` enum('Belum Dibayar','Sedang Diproses','Sudah Dibayar') CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT 'Belum Dibayar',
  `PayCode` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `PayAkun` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `DocNumber` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `ReffDocNumber` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `Notes` text CHARACTER SET latin1 COLLATE latin1_swedish_ci,
  `CardID` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '0',
  `CardName` varchar(1000) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `JumlahUang` decimal(20,0) NOT NULL DEFAULT '0',
  `Amount` decimal(20,0) NOT NULL DEFAULT '0',
  `PDiscount` decimal(4,0) NOT NULL DEFAULT '0',
  `VDiscount` decimal(20,0) NOT NULL DEFAULT '0',
  `PVoucher` decimal(4,0) NOT NULL DEFAULT '0',
  `VVoucher` decimal(20,0) NOT NULL DEFAULT '0',
  `PPenanganan` decimal(20,0) NOT NULL DEFAULT '0',
  `VPenanganan` decimal(4,0) NOT NULL DEFAULT '0',
  `AmountOther` decimal(20,0) NOT NULL DEFAULT '0',
  `AmountOtherNote` text CHARACTER SET latin1 COLLATE latin1_swedish_ci,
  `GrandTotal` decimal(20,0) NOT NULL DEFAULT '0',
  `Balance` decimal(20,0) NOT NULL DEFAULT '0',
  `MarketplaceID` varchar(25) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '0',
  `MarketplaceName` varchar(1000) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT 'Offline',
  `ExpedisiID` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `ExpedisiName` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `NoResi` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `TermDate` date DEFAULT NULL,
  `Processed` int NOT NULL DEFAULT '0',
  `TimeCreated` datetime DEFAULT NULL,
  `UserID` bigint NOT NULL DEFAULT '0',
  `UserName` varchar(1000) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT 'admin',
  `TimeUpdated` datetime DEFAULT NULL,
  `UpdateBy` varchar(300) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `MejaID` int DEFAULT NULL,
  `Lokasi` varchar(10) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '0',
  `Status` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Uniq` (`ID`),
  KEY `CArdID` (`CardID`),
  KEY `DocDate` (`DocDate`),
  KEY `Docnumber` (`DocNumber`),
  KEY `DocType` (`DocType`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbtitemtrans` */

/*Table structure for table `dbtitemtranscard` */

DROP TABLE IF EXISTS `dbtitemtranscard`;

CREATE TABLE `dbtitemtranscard` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `DocNumber` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `CardID` bigint DEFAULT NULL,
  `CardName` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Alamat` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Telp` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Email` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Provinsi` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `NamaProvinsi` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Kota` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `NamaKota` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Kec` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `NamaKec` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `KodePos` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Total` decimal(20,0) NOT NULL DEFAULT '0',
  `Point` decimal(20,0) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbtitemtranscard` */

/*Table structure for table `dbtitemtransdetail` */

DROP TABLE IF EXISTS `dbtitemtransdetail`;

CREATE TABLE `dbtitemtransdetail` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `DocNumber` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `DocDate` date DEFAULT NULL,
  `ItemID` bigint DEFAULT NULL,
  `ItemName` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Qty` int DEFAULT '0',
  `QtyUnit` int DEFAULT '0',
  `UnitName` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `BPrice` decimal(20,0) NOT NULL DEFAULT '0',
  `Price` decimal(20,0) NOT NULL DEFAULT '0',
  `VDiscount` decimal(20,0) NOT NULL DEFAULT '0',
  `PDiscount` decimal(20,0) NOT NULL DEFAULT '0',
  `VVoucher` decimal(20,0) NOT NULL DEFAULT '0',
  `PVoucher` decimal(20,0) NOT NULL DEFAULT '0',
  `Ppn` enum('include','exclude','non') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'non',
  `VPpn` decimal(20,0) NOT NULL DEFAULT '0',
  `PPpn` decimal(20,0) NOT NULL DEFAULT '0',
  `Lain` decimal(20,0) NOT NULL DEFAULT '0',
  `Total` decimal(20,0) NOT NULL DEFAULT '0',
  `IsProses` enum('Baru','Diproses','Selesai','Batal') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'Baru',
  `Notes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Status` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `dbtitemtransdetail` */

/*Table structure for table `dbtitemtransfile` */

DROP TABLE IF EXISTS `dbtitemtransfile`;

CREATE TABLE `dbtitemtransfile` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `DocNumber` varbinary(20) DEFAULT NULL,
  `File` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Ukuran` int DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `dbtitemtransfile` */

/*Table structure for table `dbtitemtransmaterial` */

DROP TABLE IF EXISTS `dbtitemtransmaterial`;

CREATE TABLE `dbtitemtransmaterial` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `DocNumber` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `ParentID` bigint DEFAULT NULL,
  `ItemID` bigint DEFAULT NULL,
  `ItemName` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Qty` int DEFAULT NULL,
  `Price` decimal(20,0) DEFAULT NULL,
  `ParentQty` int DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `dbtitemtransmaterial` */

/*Table structure for table `dbtitemtransunit` */

DROP TABLE IF EXISTS `dbtitemtransunit`;

CREATE TABLE `dbtitemtransunit` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `DocNumber` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `ItemID` bigint DEFAULT NULL,
  `ItemName` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `UnitName` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Qty` int NOT NULL DEFAULT '0',
  `QtyUnit` int NOT NULL DEFAULT '0',
  `Price` decimal(20,0) NOT NULL DEFAULT '0',
  `Total` decimal(20,0) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`,`Qty`,`QtyUnit`,`Price`,`Total`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbtitemtransunit` */

/*Table structure for table `dbtitemtransvoucher` */

DROP TABLE IF EXISTS `dbtitemtransvoucher`;

CREATE TABLE `dbtitemtransvoucher` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `DocDate` date DEFAULT NULL,
  `DocNumber` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `CardID` bigint DEFAULT NULL,
  `Code` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Amount` decimal(20,0) DEFAULT NULL,
  `TimeCreated` timestamp NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbtitemtransvoucher` */

/*Table structure for table `dbtizin` */

DROP TABLE IF EXISTS `dbtizin`;

CREATE TABLE `dbtizin` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `Tanggal` date DEFAULT NULL,
  `IzinID` bigint DEFAULT NULL,
  `NamaIzin` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `IDKaryawan` bigint DEFAULT NULL,
  `NIK` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `NamaKaryawan` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `Keterangan` text CHARACTER SET utf8mb3 COLLATE utf8_general_ci,
  `ApproveNotes` text CHARACTER SET utf8mb3 COLLATE utf8_general_ci,
  `ApproveByID` bigint DEFAULT NULL,
  `ApproveBy` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `Approve` enum('Approve','Reject','Pending') CHARACTER SET utf8mb3 COLLATE utf8_general_ci NOT NULL DEFAULT 'Pending',
  `TimeCreated` timestamp NOT NULL,
  PRIMARY KEY (`ID`,`Approve`,`TimeCreated`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbtizin` */

/*Table structure for table `dbtjournal` */

DROP TABLE IF EXISTS `dbtjournal`;

CREATE TABLE `dbtjournal` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `DocType` varchar(5) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `ReffDocNumber` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `AkunID` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `NamaAkun` varchar(1000) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `DocNumber` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `Notes` text CHARACTER SET latin1 COLLATE latin1_swedish_ci,
  `DAmount` decimal(20,0) NOT NULL DEFAULT '0',
  `CAmount` decimal(20,0) NOT NULL DEFAULT '0',
  `DocDate` date DEFAULT NULL,
  `Processed` int NOT NULL DEFAULT '0',
  `TimeCreated` datetime DEFAULT NULL,
  `TimeUpdated` datetime DEFAULT NULL,
  `UserID` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8_general_ci NOT NULL DEFAULT '0',
  `UserName` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `Lokasi` varchar(10) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '0',
  `Status` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbtjournal` */

/*Table structure for table `dbtjournaltmp` */

DROP TABLE IF EXISTS `dbtjournaltmp`;

CREATE TABLE `dbtjournaltmp` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `DocType` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `AkunID` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `NamaAkun` varchar(1000) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `DocNumber` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `Amount` decimal(20,0) NOT NULL DEFAULT '0',
  `Status` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbtjournaltmp` */

/*Table structure for table `dbtjsontrans` */

DROP TABLE IF EXISTS `dbtjsontrans`;

CREATE TABLE `dbtjsontrans` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `DocDate` timestamp NULL DEFAULT NULL,
  `Data` longtext CHARACTER SET utf8mb3 COLLATE utf8_general_ci,
  `UserID` bigint DEFAULT NULL,
  `Status` enum('gagal','sukses') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'gagal',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbtjsontrans` */

/*Table structure for table `dbtkastransfer` */

DROP TABLE IF EXISTS `dbtkastransfer`;

CREATE TABLE `dbtkastransfer` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `DocType` enum('Kas Transfer','Tarik Tunai','Setor Tunai') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Kas Transfer',
  `DocNumber` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `DocDate` date DEFAULT NULL,
  `CodeFrom` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `AkunFrom` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `CodeTo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `AkunTo` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Amount` decimal(20,0) NOT NULL DEFAULT '0',
  `AmountOther` decimal(20,0) NOT NULL DEFAULT '0',
  `Note` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `UserID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '00.00',
  `Lokasi` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`,`DocType`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbtkastransfer` */

/*Table structure for table `dbtproduksi` */

DROP TABLE IF EXISTS `dbtproduksi`;

CREATE TABLE `dbtproduksi` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `DocNumber` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `ReffDocNumber` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `DocDate` date DEFAULT NULL,
  `DocType` enum('PRODK','RPROD','HRPCK','PRPCK') CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT 'PRODK',
  `Amount` decimal(22,0) NOT NULL DEFAULT '0',
  `AmountOther` decimal(22,0) NOT NULL DEFAULT '0',
  `AmountOtherNotes` text CHARACTER SET latin1 COLLATE latin1_swedish_ci,
  `GrandTotal` decimal(22,0) NOT NULL DEFAULT '0',
  `Notes` text CHARACTER SET latin1 COLLATE latin1_swedish_ci,
  `UserID` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `IsJurnal` int NOT NULL DEFAULT '0',
  `TimeCreated` timestamp NULL DEFAULT NULL,
  `TimeUpdated` timestamp NULL DEFAULT NULL,
  `Lokasi` varchar(10) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '0',
  `Status` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID`,`IsJurnal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbtproduksi` */

/*Table structure for table `dbtproduksidetail` */

DROP TABLE IF EXISTS `dbtproduksidetail`;

CREATE TABLE `dbtproduksidetail` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `DocDate` date DEFAULT NULL,
  `DocNumber` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `ItemID` bigint DEFAULT NULL,
  `ItemName` varchar(1000) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `Qty` int DEFAULT NULL,
  `Price` decimal(22,0) NOT NULL DEFAULT '0',
  `Total` decimal(22,0) DEFAULT '0',
  `IsRendemen` int NOT NULL DEFAULT '0',
  `Lokasi` bigint NOT NULL DEFAULT '0',
  `Status` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbtproduksidetail` */

/*Table structure for table `dbttraining` */

DROP TABLE IF EXISTS `dbttraining`;

CREATE TABLE `dbttraining` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `Tanggal` date DEFAULT NULL,
  `Trainer` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `IDTraining` bigint DEFAULT NULL,
  `NamaTraining` varchar(1000) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `IDKaryawan` bigint DEFAULT NULL,
  `NIK` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `NamaKaryawan` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `Nilai` int DEFAULT NULL,
  `Keterangan` text CHARACTER SET utf8mb3 COLLATE utf8_general_ci,
  `Status` enum('Lulus','Gagal') CHARACTER SET utf8mb3 COLLATE utf8_general_ci NOT NULL DEFAULT 'Lulus',
  PRIMARY KEY (`ID`,`Status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `dbttraining` */

/*Table structure for table `log` */

DROP TABLE IF EXISTS `log`;

CREATE TABLE `log` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Waktu` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `UserID` bigint DEFAULT NULL,
  `UserName` varchar(200) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT 'admin',
  `Before` longtext CHARACTER SET utf8mb3 COLLATE utf8_general_ci,
  `After` longtext CHARACTER SET utf8mb3 COLLATE utf8_general_ci,
  `Table` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `TableID` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `Do` enum('insert','update','delete') CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT 'insert',
  `Lokasi` bigint NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `log` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
