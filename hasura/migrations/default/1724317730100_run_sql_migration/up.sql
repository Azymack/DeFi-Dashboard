CREATE TABLE public.logs (
    method TEXT NOT NULL,
    transaction_hash TEXT NOT NULL PRIMARY KEY,
    decoded JSONB NOT NULL,
    address TEXT NOT NULL,
    block_number NUMERIC NOT NULL,
    block_timestamp TIMESTAMPTZ NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL
);
