CREATE TRIGGER data_update_trigger
AFTER INSERT OR UPDATE ON logs
FOR EACH ROW
EXECUTE FUNCTION notify_update();
