ALTER TABLE "subscribers" ADD COLUMN "mailerlite_id" text;--> statement-breakpoint
ALTER TABLE "subscribers" ADD COLUMN "synced_at" timestamp with time zone;