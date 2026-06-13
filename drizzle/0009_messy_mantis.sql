CREATE TYPE "public"."ticket_priority" AS ENUM('scazuta', 'normala', 'ridicata', 'urgenta');--> statement-breakpoint
CREATE TYPE "public"."ticket_status" AS ENUM('deschis', 'in_lucru', 'oferta_trimisa', 'rezolvat', 'inchis');--> statement-breakpoint
CREATE TABLE "tickets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"company" text,
	"category" text DEFAULT 'altele' NOT NULL,
	"site_url" text,
	"priority" "ticket_priority" DEFAULT 'normala' NOT NULL,
	"message" text NOT NULL,
	"source" text DEFAULT 'ticket-form' NOT NULL,
	"status" "ticket_status" DEFAULT 'deschis' NOT NULL,
	"notes" text DEFAULT '' NOT NULL,
	"package_slug" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
