ALTER TABLE "posts" ADD COLUMN "takeaways" jsonb DEFAULT '[]'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "faq" jsonb DEFAULT '[]'::jsonb NOT NULL;