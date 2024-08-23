CREATE OR REPLACE FUNCTION notify_update() RETURNS trigger AS $$
BEGIN
  PERFORM pg_notify('data_update', row_to_json(NEW)::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
