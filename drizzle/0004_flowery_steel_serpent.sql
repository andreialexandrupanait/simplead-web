ALTER TABLE "packages" ADD COLUMN "feature_groups" jsonb;--> statement-breakpoint
ALTER TABLE "packages" ADD COLUMN "pricing" text DEFAULT 'fixed' NOT NULL;