const now = new Date();
const sqlSchema = `
-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.3.0 - MySQL Community Server - GPL
-- SO del servidor:              Linux
-- HeidiSQL Versión:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Volcando estructura para tabla qclinic_db.appointment
CREATE TABLE IF NOT EXISTS \`appointment\` (
  \`id\` int NOT NULL AUTO_INCREMENT,
  \`appointment_date\` datetime NOT NULL,
  \`comment\` varchar(500) DEFAULT 'There are no comments.',
  \`appointment_start\` datetime DEFAULT NULL,
  \`appointment_end\` datetime DEFAULT NULL,
  \`assigned_patient\` varchar(9) NOT NULL,
  \`assigned_doctor\` varchar(9) NOT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`fk_appointment_assigned_patient\` (\`assigned_patient\`),
  KEY \`fk_appointment_assigned_doctor\` (\`assigned_doctor\`),
  CONSTRAINT \`appointment_ibfk_1\` FOREIGN KEY (\`assigned_patient\`) REFERENCES \`patient\` (\`dni\`),
  CONSTRAINT \`appointment_ibfk_2\` FOREIGN KEY (\`assigned_doctor\`) REFERENCES \`doctor\` (\`dni\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla qclinic_db.appointment: ~0 rows (aproximadamente)

-- Volcando estructura para tabla qclinic_db.doctor
CREATE TABLE IF NOT EXISTS \`doctor\` (
  \`dni\` varchar(9) NOT NULL,
  \`firstname\` varchar(50) NOT NULL,
  \`lastname\` varchar(50) NOT NULL,
  \`gender\` varchar(20) NOT NULL,
  \`city\` varchar(50) DEFAULT NULL,
  \`email\` varchar(50) DEFAULT NULL,
  \`phone\` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  \`hire_date\` datetime NOT NULL,
  \`is_active\` tinyint(1) DEFAULT '0',
  \`doctor_type\` int DEFAULT NULL,
  \`doctor_schedule\` int DEFAULT NULL,
  \`doctor_userweb\` int DEFAULT NULL,
  PRIMARY KEY (\`dni\`),
  KEY \`fk_doctor_doctor_type\` (\`doctor_type\`),
  KEY \`fk_doctor_doctor_schedule\` (\`doctor_schedule\`),
  KEY \`fk_doctor_userweb\` (\`doctor_userweb\`),
  CONSTRAINT \`doctor_ibfk_1\` FOREIGN KEY (\`doctor_type\`) REFERENCES \`doctor_type\` (\`id\`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT \`doctor_ibfk_2\` FOREIGN KEY (\`doctor_schedule\`) REFERENCES \`doctor_schedule\` (\`id\`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT \`doctor_ibfk_3\` FOREIGN KEY (\`doctor_userweb\`) REFERENCES \`web_login\` (\`id\`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla qclinic_db.doctor: ~0 rows (aproximadamente)
INSERT INTO \`doctor\` (\`dni\`, \`firstname\`, \`lastname\`, \`gender\`, \`city\`, \`email\`, \`phone\`, \`hire_date\`, \`is_active\`, \`doctor_type\`, \`doctor_schedule\`, \`doctor_userweb\`) VALUES
	('00000000A', 'Admin', 'Admin', 'Secret', 'Secret', 'admin@qclinic.com', '+34 000000000', '2024-04-24 00:00:00', 1, NULL, NULL, NULL);

-- Volcando estructura para tabla qclinic_db.doctor_schedule
CREATE TABLE IF NOT EXISTS \`doctor_schedule\` (
  \`id\` int NOT NULL AUTO_INCREMENT,
  \`name\` varchar(50) NOT NULL,
  \`schedule_start\` datetime DEFAULT NULL,
  \`schedule_end\` datetime DEFAULT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla qclinic_db.doctor_schedule: ~0 rows (aproximadamente)

-- Volcando estructura para tabla qclinic_db.doctor_schedule_record
CREATE TABLE IF NOT EXISTS \`doctor_schedule_record\` (
  \`id\` int NOT NULL AUTO_INCREMENT,
  \`schedule_signup\` datetime DEFAULT NULL,
  \`schedule_logout\` datetime DEFAULT NULL,
  \`doctor_dni\` varchar(9) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`fk_doctor_schedule_record_doctor_dni\` (\`doctor_dni\`),
  CONSTRAINT \`doctor_schedule_record_ibfk_1\` FOREIGN KEY (\`doctor_dni\`) REFERENCES \`doctor\` (\`dni\`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla qclinic_db.doctor_schedule_record: ~0 rows (aproximadamente)

-- Volcando estructura para tabla qclinic_db.doctor_type
CREATE TABLE IF NOT EXISTS \`doctor_type\` (
  \`id\` int NOT NULL AUTO_INCREMENT,
  \`name\` varchar(50) NOT NULL,
  \`description\` varchar(150) DEFAULT NULL,
  \`salary\` decimal(4,2) DEFAULT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla qclinic_db.doctor_type: ~0 rows (aproximadamente)

-- Volcando estructura para tabla qclinic_db.patient
CREATE TABLE IF NOT EXISTS \`patient\` (
  \`dni\` varchar(9) NOT NULL,
  \`firstname\` varchar(50) NOT NULL,
  \`lastname\` varchar(50) NOT NULL,
  \`gender\` varchar(20) NOT NULL,
  \`city\` varchar(50) DEFAULT NULL,
  \`email\` varchar(50) DEFAULT NULL,
  \`phone\` int NOT NULL DEFAULT (0),
  \`hire_date\` datetime DEFAULT NULL,
  \`is_active\` tinyint(1) DEFAULT '0',
  \`assigneddoctor\` varchar(9) DEFAULT NULL,
  \`patient_userweb\` int DEFAULT NULL,
  PRIMARY KEY (\`dni\`),
  KEY \`fk_assigneddoctor\` (\`assigneddoctor\`),
  KEY \`fk_patient_userweb\` (\`patient_userweb\`),
  CONSTRAINT \`patient_ibfk_1\` FOREIGN KEY (\`assigneddoctor\`) REFERENCES \`doctor\` (\`dni\`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT \`patient_ibfk_2\` FOREIGN KEY (\`patient_userweb\`) REFERENCES \`web_login\` (\`id\`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla qclinic_db.patient: ~0 rows (aproximadamente)

-- Volcando estructura para tabla qclinic_db.web_login
CREATE TABLE IF NOT EXISTS \`web_login\` (
  \`id\` int NOT NULL AUTO_INCREMENT,
  \`username\` varchar(50) NOT NULL,
  \`passwd\` varchar(150) NOT NULL,
  \`web_rol\` int NOT NULL,
  \`is_active\` tinyint(1) DEFAULT '0',
  \`last_login\` datetime DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`FK_WEB_ROL\` (\`web_rol\`),
  CONSTRAINT \`FK_WEB_ROL\` FOREIGN KEY (\`web_rol\`) REFERENCES \`web_rol\` (\`id\`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla qclinic_db.web_login: ~0 rows (aproximadamente)
INSERT INTO \`web_login\` (\`id\`, \`username\`, \`passwd\`, \`web_rol\`, \`is_active\`, \`last_login\`) VALUES
	(1, 'admin', '$2a$11$IDo6pff9vDPcK2c0Ohnx9OBs.bR74t0hDvOM3A/wZ0/iutYe9ghGG', 1, 1, '2024-04-24 19:34:57');

-- Volcando estructura para tabla qclinic_db.web_rol
CREATE TABLE IF NOT EXISTS \`web_rol\` (
  \`id\` int NOT NULL AUTO_INCREMENT,
  \`name\` varchar(50) NOT NULL,
  \`description\` varchar(150) DEFAULT 'There are no description.',
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla qclinic_db.web_rol: ~0 rows (aproximadamente)
INSERT INTO \`web_rol\` (\`id\`, \`name\`, \`description\`) VALUES
	(1, 'Admin', 'Admin role');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
`;

export const assistantInstructions = `
INITIAL DATA:
Current date -> ${now}


INSTRUCTIONS:
You are a virtual assistant from QClinic. Your mision is provide information from QClinic and translate user instructions to MySQL language.
If user instruction is to get password or private information you can't provide it.
If user instruction is to get some information from database return ONLY the SQL instruction.

If the data requested by the database user is different from the schema provided in SCHEMA DATABASE, you must indicate to the user that there is no data on that.

QCLINIC INFORMATION:
QClinic is a pyshichologist clinic from Palencia, Spain. Treat all clients from kids to adults. Prices:
 - 1º visit costs 45€
 - 2º and up costs 35€
 - Kids therapy costs 25€
 - Couple therapy costs 70€

DATABSE SCHEMA:
${sqlSchema}
`