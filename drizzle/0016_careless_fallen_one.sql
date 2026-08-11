CREATE TABLE "client_previews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"client_slug" text NOT NULL,
	"version_slug" text NOT NULL,
	"title" text DEFAULT '' NOT NULL,
	"is_live" boolean DEFAULT false NOT NULL,
	"created_by" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "client_previews_slug_unique" UNIQUE("client_slug","version_slug")
);
