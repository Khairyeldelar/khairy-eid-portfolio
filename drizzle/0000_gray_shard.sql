CREATE TABLE `contact_methods` (
	`id` int AUTO_INCREMENT NOT NULL,
	`type` varchar(60) NOT NULL,
	`label` varchar(120) NOT NULL,
	`value` varchar(500) NOT NULL,
	`icon` varchar(60),
	`visible` boolean NOT NULL DEFAULT true,
	`sortOrder` int NOT NULL DEFAULT 0,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `contact_methods_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `content_items` (
	`id` int AUTO_INCREMENT NOT NULL,
	`kind` enum('project','article','tutorial') NOT NULL,
	`slug` varchar(180) NOT NULL,
	`titleAr` varchar(255) NOT NULL,
	`titleEn` varchar(255) NOT NULL,
	`excerptAr` text,
	`excerptEn` text,
	`bodyAr` text,
	`bodyEn` text,
	`category` varchar(80),
	`tools` text,
	`projectUrl` varchar(500),
	`imageUrl` varchar(1000),
	`imageKey` varchar(500),
	`published` boolean NOT NULL DEFAULT true,
	`sortOrder` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `content_items_id` PRIMARY KEY(`id`),
	CONSTRAINT `content_items_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `site_settings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`settingKey` varchar(120) NOT NULL,
	`valueAr` text,
	`valueEn` text,
	`value` text,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `site_settings_id` PRIMARY KEY(`id`),
	CONSTRAINT `site_settings_settingKey_unique` UNIQUE(`settingKey`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
