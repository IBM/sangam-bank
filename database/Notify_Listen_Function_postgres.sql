CREATE OR REPLACE FUNCTION notify_changes_trigger()
  RETURNS TRIGGER AS $$
BEGIN
  
  PERFORM pg_notify('changes', '');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;



CREATE TRIGGER transactiontype_trigger 
AFTER INSERT OR UPDATE OR DELETE 
ON transactiontype 
FOR EACH ROW 
EXECUTE PROCEDURE notify_changes_trigger();

CREATE TRIGGER usertype_triggger
AFTER INSERT OR UPDATE OR DELETE
ON usertype
FOR EACH ROW
EXECUTE PROCEDURE notify_changes_trigger();


CREATE TRIGGER gender_trigger
AFTER INSERT OR UPDATE OR DELETE
ON gender
FOR EACH ROW
EXECUTE PROCEDURE notify_changes_trigger();

CREATE TRIGGER accounts_trigger
AFTER INSERT OR UPDATE OR DELETE
ON accounts
FOR EACH ROW
EXECUTE PROCEDURE notify_changes_trigger();

CREATE TRIGGER bank_trigger
AFTER INSERT OR UPDATE OR DELETE
ON bank
FOR EACH ROW
EXECUTE PROCEDURE notify_changes_trigger();

CREATE TRIGGER accounttype_trigger
AFTER INSERT OR UPDATE OR DELETE
ON accounttype
FOR EACH ROW
EXECUTE PROCEDURE notify_changes_trigger();

CREATE TRIGGER transactions_trigger
AFTER INSERT OR UPDATE OR DELETE
ON transactions
FOR EACH ROW
EXECUTE PROCEDURE notify_changes_trigger();

CREATE TRIGGER status_type_trigger
AFTER INSERT OR UPDATE OR DELETE
ON status_type
FOR EACH ROW
EXECUTE PROCEDURE notify_changes_trigger();

CREATE TRIGGER users_trigger
AFTER INSERT OR UPDATE OR DELETE
ON users
FOR EACH ROW
EXECUTE PROCEDURE notify_changes_trigger();
