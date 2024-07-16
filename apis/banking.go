package main

import (
	"encoding/json"
	"fmt"
	"hash/fnv"
	"io/ioutil"
	"net/http"
	"strconv"
	"time"

	_ "github.com/lib/pq"
)

type User struct {
	UserId       int
	Username     string
	User_type_id int
	Gender_id    int
	Dob          string
	Address      string
	State        string
	Country      string
	Pincode      string
	Email        string
}

type AccountSummary struct {
	Acc_id      int
	User_id     int
	Bank_id     int
	Cif         string
	Acc_type_id int
	Balance     float64
}

type Bank struct {
	Bank_id  int
	Bankname string
	Ifsc     string
	Email    string
	Address  string
	State    string
	Country  string
	Pincode  string
}
type Accounts struct {
	Acct_id int
}
type JsonResponsew struct {
	EmailId  string `json:"email_id"`
	Password string `json:"passwd"`
}

type TransactionDetails struct {
	Transaction_id     int
	Tran_type_id       string
	Transaction_type   string
	Transaction_amount float64
	Tran_date          string
	From_acc_id        int
	To_acc_id          int
}
type JsonResponse struct {
	Type    string           `json:"type"`
	Data    []AccountSummary `json:"data"`
	Message string           `json:"message"`
}
type JsonBankResponse struct {
	Type    string `json:"type"`
	Data    []Bank `json:"data"`
	Message string `json:"message"`
}
type JsonBalanceResponse struct {
	Type    string  `json:"type"`
	Data    float64 `json:"data"`
	Message string  `json:"message"`
}
type JsonDescResponse struct {
	Type    string `json:"type"`
	Data    string `json:"data"`
	Message string `json:"message"`
}
type JsonUserResponse struct {
	Type    string `json:"type"`
	Data    []User `json:"data"`
	Message string `json:"message"`
}

type JsonAccountsResponse struct {
	Type    string     `json:"type"`
	Data    []Accounts `json:"data"`
	Message string     `json:"message"`
}
type JsonPasswordResponse struct {
	Type    string `json:"type"`
	Data    bool   `json:"data"`
	Message string `json:"message"`
}
type JsonTransactionsResponse struct {
	Type    string               `json:"type"`
	Data    []TransactionDetails `json:"data"`
	Message string               `json:"message"`
}

func createuser(w http.ResponseWriter, r *http.Request) {

	username := r.FormValue("username")
	user_type_id := r.FormValue("user_type_id")
	gender_id := r.FormValue("gender_id")
	dob := r.FormValue("dob")
	address := r.FormValue("address")
	state := r.FormValue("state")
	country := r.FormValue("country")
	pincode := r.FormValue("pincode")
	passwda := FNV32a(r.FormValue("passwd"))
	passwd := strconv.FormatUint(uint64(passwda), 10)
	email := r.FormValue("email")
	var response = JsonResponse{}

	db := setupDB()

	printMessage("Inserting user into DB")

	fmt.Println("Inserting new user with details: " + username + " and  " + user_type_id + " and  " + gender_id + " and  " + dob + " and  " + address + " and " + state + " and " + country + "and" + pincode)
	var lastInsertID int
	err := db.QueryRow("INSERT INTO users(user_id, username, user_type_id, gender_id, dob,address, state, country, pincode, email, passwd) VALUES(nextval('users_user_id_seq'), $1,$2,$3,$4,$5,$6,$7,$8,$9,$10) returning user_id;", username, user_type_id, gender_id, dob, address, state, country, pincode, email, passwd).Scan(&lastInsertID)
	checkErr(err)

	response = JsonResponse{Type: "success", Message: "The user has been inserted successfully!"}
	json.NewEncoder(w).Encode(response)
}

func accountcreate(w http.ResponseWriter, r *http.Request) {

	userid := r.FormValue("userid")
	bankid := r.FormValue("bankid")
	cif := r.FormValue("cif")
	acc_type := r.FormValue("acc_type")
	balance := 10000

	var response = JsonResponse{}

	db := setupDB()

	printMessage("Inserting user into DB")

	fmt.Println("Inserting new user with details: " + userid + " and  " + bankid + " and  " + cif + " and  " + acc_type)
	var lastInsertID int
	err := db.QueryRow("INSERT INTO accounts(acc_id, user_id, bank_id, cif, acc_type_id,balance) VALUES(nextval('accounts_acc_id_seq'), $1,$2,$3,$4,$5) returning acc_id;", userid, bankid, cif, acc_type, balance).Scan(&lastInsertID)
	checkErr(err)

	response = JsonResponse{Type: "success", Message: "The account has been created successfully!"}
	json.NewEncoder(w).Encode(response)

}

func accountsummary(w http.ResponseWriter, r *http.Request) {
	// Get all movies
	db := setupDB()
	acc_id := r.FormValue("acc_id")
	printMessage("Getting account details...")

	// Get all movies from movies table that don't have movieID = "1"
	rows, err := db.Query("SELECT * FROM accounts where acc_id = $1", acc_id)

	// check errors
	checkErr(err)

	// var response []JsonResponse
	var accounts []AccountSummary

	// Foreach movie
	for rows.Next() {
		var acc_id int
		var user_id int
		var bank_id int
		var cif string
		var acc_type_id int
		var balance float64

		err = rows.Scan(&acc_id, &user_id, &bank_id, &cif, &acc_type_id, &balance)

		// check errors
		checkErr(err)

		accounts = append(accounts, AccountSummary{Acc_id: acc_id, User_id: user_id,
			Bank_id:     bank_id,
			Cif:         cif,
			Acc_type_id: acc_type_id,
			Balance:     balance})
	}

	var response = JsonResponse{Type: "success", Data: accounts}

	json.NewEncoder(w).Encode(response)
}

func accountTransfer(w http.ResponseWriter, r *http.Request) {

	from_acc_id := r.FormValue("from_acc_id")
	to_acc_id := r.FormValue("to_acc_id")
	transaction_amount := r.FormValue("transaction_amount")

	var response = JsonResponse{}

	db := setupDB()

	printMessage("Inserting user into DB")

	fmt.Println("Inserting new transaction with details: " + from_acc_id + " and  " + to_acc_id + " and  " + transaction_amount)
	var lastInsertID int
	var nowInsertID int
	var balance3 float64
	dt := time.Now()
	balance3, errfloat := strconv.ParseFloat(transaction_amount, 64)
	checkErr(errfloat)
	//currentTime := time.Now()
	err1 := db.QueryRow("INSERT INTO transactions(transaction_id, tran_type_id, transaction_amount, tran_date, status_type_id,from_acc_id,to_acc_id) VALUES(nextval('transactions_transaction_id_seq'), $1,$2,$3,$4,$5,$6) returning transaction_id;", 1, transaction_amount, dt.Format("01-02-2006"), 1, from_acc_id, to_acc_id).Scan(&lastInsertID)
	err2 := db.QueryRow("INSERT INTO transactions(transaction_id, tran_type_id, transaction_amount, tran_date, status_type_id,from_acc_id,to_acc_id) VALUES(nextval('transactions_transaction_id_seq'), $1,$2,$3,$4,$5,$6) returning transaction_id;", 2, transaction_amount, dt.Format("01-02-2006"), 1, from_acc_id, to_acc_id).Scan(&nowInsertID)
	checkErr(err1)
	checkErr(err2)
	var Balance1 float64
	var Balance2 float64

	var newBalance3 float64
	var newBalance4 float64

	rows3, err3 := db.Query("SELECT balance FROM accounts where acc_id = $1", from_acc_id)
	for rows3.Next() {
		err3 = rows3.Scan(&Balance1)
		checkErr(err3)
	}
	rows4, err4 := db.Query("SELECT balance FROM accounts where acc_id = $1", to_acc_id)

	for rows4.Next() {
		err4 = rows4.Scan(&Balance2)
		checkErr(err4)
	}

	newBalance3 = Balance1 - balance3
	newBalance4 = Balance2 + balance3

	rows5, err5 := db.Query("update accounts set balance = $1 where acc_id = $2", newBalance3, from_acc_id)
	rows6, err6 := db.Query("update accounts set balance = $1 where acc_id = $2", newBalance4, to_acc_id)
	for rows5.Next() {
		checkErr(err5)
	}
	for rows6.Next() {
		checkErr(err6)
	}

	response = JsonResponse{Type: "success", Message: "The account has been created successfully!"}
	json.NewEncoder(w).Encode(response)

}

func checkbalance(w http.ResponseWriter, r *http.Request) {
	db := setupDB()
	acc_id := r.FormValue("acc_id")
	rows, err := db.Query("SELECT balance FROM accounts where acc_id = $1", acc_id)
	var Balance float64
	for rows.Next() {
		err = rows.Scan(&Balance)
		checkErr(err)
	}

	var response = JsonBalanceResponse{Type: "success", Data: Balance}
	json.NewEncoder(w).Encode(response)
}
func getstatusdesc(w http.ResponseWriter, r *http.Request) {

	db := setupDB()
	status_type_id := r.FormValue("status_type_id")
	rows, err := db.Query("SELECT status_type_name FROM status_type where status_type_id = $1", status_type_id)
	var status_type_name string
	for rows.Next() {
		err = rows.Scan(&status_type_name)
		checkErr(err)
	}

	var response = JsonDescResponse{Type: "success", Data: status_type_name}
	json.NewEncoder(w).Encode(response)
}
func getTransactiondesc(w http.ResponseWriter, r *http.Request) {
	db := setupDB()
	tran_type_id := r.FormValue("tran_type_id")
	rows, err := db.Query("SELECT transaction_type FROM transactiontype where tran_type_id = $1", tran_type_id)
	var transaction_type string
	for rows.Next() {
		err = rows.Scan(&transaction_type)
		checkErr(err)
	}

	var response = JsonDescResponse{Type: "success", Data: transaction_type}
	json.NewEncoder(w).Encode(response)
}
func getUserdesc(w http.ResponseWriter, r *http.Request) {
	db := setupDB()
	user_id := r.FormValue("user_id")
	rows, err := db.Query("SELECT usertypename FROM usertype where user_id = $1", user_id)
	var user_type_name string
	for rows.Next() {
		err = rows.Scan(&user_type_name)
		checkErr(err)
	}
	err1 := db.Close().Error()
	fmt.Println(err1)
	var response = JsonDescResponse{Type: "success", Data: user_type_name}
	json.NewEncoder(w).Encode(response)
}

func getAcctypedesc(w http.ResponseWriter, r *http.Request) {
	db := setupDB()
	acc_type_id := r.FormValue("acc_type_id")
	rows, err := db.Query("SELECT acc_type_name FROM accounttype where acc_type_id = $1", acc_type_id)
	var acc_type_name string
	for rows.Next() {
		err = rows.Scan(&acc_type_name)
		checkErr(err)
	}

	var response = JsonDescResponse{Type: "success", Data: acc_type_name}
	json.NewEncoder(w).Encode(response)
}

func getUserdetails(w http.ResponseWriter, r *http.Request) {
	db := setupDB()
	email_id := r.FormValue("email_id")
	rows, err := db.Query("SELECT user_id,username,user_type_id,gender_id,dob,address,state,country,pincode,email FROM users where email = $1", email_id)
	var users []User
	for rows.Next() {
		var user_id int
		var username string
		var user_type_id int
		var gender_id int
		var dob string
		var address string
		var state string
		var country string
		var pincode string
		var email string

		err = rows.Scan(&user_id, &username, &user_type_id, &gender_id, &dob, &address, &state, &country, &pincode, &email)

		// check errors
		checkErr(err)

		users = append(users, User{UserId: user_id, Username: username, User_type_id: user_type_id,
			Gender_id: gender_id,
			Dob:       dob,
			Address:   address,
			State:     state, Country: country, Pincode: pincode, Email: email})
	}

	var response = JsonUserResponse{Type: "success", Data: users}
	json.NewEncoder(w).Encode(response)
}
func getBankdetails(w http.ResponseWriter, r *http.Request) {
	db := setupDB()
	bank_id := r.FormValue("bank_id")
	rows, err := db.Query("SELECT bank_id,bankname,ifsc,email,address,state,country,pincode FROM bank where bank_id = $1", bank_id)
	var banks []Bank
	for rows.Next() {
		var bank_id int
		var bankname string
		var ifsc string
		var email string
		var address string
		var state string
		var country string
		var pincode string

		err = rows.Scan(&bank_id, &bankname, &ifsc, &email, &address, &state, &country, &pincode)

		// check errors
		checkErr(err)

		banks = append(banks, Bank{Bank_id: bank_id, Bankname: bankname,
			Ifsc:    ifsc,
			Email:   email,
			Address: address,
			State:   state, Country: country, Pincode: pincode})
	}

	var response = JsonBankResponse{Type: "success", Data: banks}
	json.NewEncoder(w).Encode(response)
}

func getAllAccounts(w http.ResponseWriter, r *http.Request) {
	db := setupDB()
	user_id := r.FormValue("user_id")
	rows, err := db.Query("SELECT acc_id FROM accounts where user_id = $1", user_id)
	var accounts []Accounts
	for rows.Next() {
		var acc_id int

		err = rows.Scan(&acc_id)

		// check errors
		checkErr(err)

		accounts = append(accounts, Accounts{Acct_id: acc_id})
	}
	w.Header().Set("Access-Control-Allow-Origin", "*")
	var response = JsonAccountsResponse{Type: "success", Data: accounts}
	json.NewEncoder(w).Encode(response)
}

func loginuser(w http.ResponseWriter, r *http.Request) {

	reqBody, _ := ioutil.ReadAll(r.Body)
	var p JsonResponsew

	json.Unmarshal(reqBody, &p)
	err := json.NewDecoder(r.Body).Decode(&p)

	// email_id := r.FormValue("email_id")
	// passwd := r.FormValue("passwd")
	passwda := FNV32a(p.Password)
	passwdk := strconv.FormatUint(uint64(passwda), 10)
	var response = JsonPasswordResponse{}

	db := setupDB()
	rows, err := db.Query("SELECT passwd FROM users where email = $1", p.EmailId)
	var actualpass string
	for rows.Next() {
		err = rows.Scan(&actualpass)

		checkErr(err)
	}
	//fmt.Println("retrived Pass" + actualpass)
	//fmt.Println("Sent from form" + passwdk)
	result1 := actualpass == passwdk

	//fmt.Println("Inserting new user with details: " + userid + " and  " + bankid + " and  " + cif + " and  " + acc_type)
	//	var lastInsertID int
	//	err := db.QueryRow("INSERT INTO user_pwd(usr_id, passwd) VALUES($1,$2) returning usr_id;", userid, passwd).Scan(&lastInsertID)
	//	checkErr(err)

	response = JsonPasswordResponse{Type: "success", Message: "The password has been validated successfully!", Data: result1}
	json.NewEncoder(w).Encode(response)

}
func FNV32a(text string) uint32 {
	algorithm := fnv.New32a()
	algorithm.Write([]byte(text))
	return algorithm.Sum32()
}
func gettransactionDetails(w http.ResponseWriter, r *http.Request) {
	db := setupDB()
	acc_id := r.FormValue("acc_id")
	rows, err := db.Query("select t.transaction_id,t.tran_type_id, tp.transaction_type,t.transaction_amount,t.tran_date,t.from_acc_id,t.to_acc_id from transactions t  join transactiontype tp on t.tran_type_id=tp.tran_type_id and ((t.from_acc_id = $1 and t.tran_type_id=1) or (t.to_acc_id = $1 and t.tran_type_id=2))", acc_id)
	var transactions []TransactionDetails
	for rows.Next() {
		var transaction_id int
		var tran_type_id string
		var transaction_type string
		var transaction_amount float64
		var tran_date string
		var from_acc_id int
		var to_acc_id int

		err = rows.Scan(&transaction_id, &tran_type_id, &transaction_type, &transaction_amount, &tran_date, &from_acc_id, &to_acc_id)

		// check errors
		checkErr(err)

		transactions = append(transactions, TransactionDetails{Transaction_id: transaction_id, Tran_type_id: tran_type_id, Transaction_type: transaction_type, Transaction_amount: transaction_amount, Tran_date: tran_date, From_acc_id: from_acc_id, To_acc_id: to_acc_id})
	}
	var response = JsonTransactionsResponse{Type: "success", Data: transactions}
	json.NewEncoder(w).Encode(response)
}
