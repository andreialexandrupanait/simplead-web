ALTER TABLE "orders" ADD COLUMN "customer_email" text;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "oto_for_order_id" uuid;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "invoice_series" text;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "invoice_number" text;--> statement-breakpoint
ALTER TABLE "packages" ADD COLUMN "oto_package_id" uuid;--> statement-breakpoint
ALTER TABLE "packages" ADD COLUMN "oto_discount_percent" integer DEFAULT 0 NOT NULL;