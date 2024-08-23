CREATE TABLE "public"."logs" ("method" text NOT NULL, "transaction_hash" text NOT NULL, "decoded" jsonb NOT NULL, "address" text NOT NULL, "block_number" Numeric NOT NULL, "block_timestamp" timestamptz NOT NULL, "from" text NOT NULL, "to" text NOT NULL, PRIMARY KEY ("transaction_hash") );
