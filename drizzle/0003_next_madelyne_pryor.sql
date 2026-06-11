ALTER TABLE "packages" ADD COLUMN "category" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "packages" ADD COLUMN "note" text DEFAULT '' NOT NULL;