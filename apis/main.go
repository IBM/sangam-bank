package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
	"github.com/rs/cors"
)

// DB set up
func setupDB() *sql.DB {
	connStr := "postgres://postgres:mynewpassword@postgresql/postgres?sslmode=disable"
	//dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s sslmode=disable", DB_USER, DB_PASSWORD, DB_NAME)
	db, err := sql.Open("postgres", connStr)

	checkErr(err)
	return db
}

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/newuser/", createuser).Methods("POST")
	router.HandleFunc("/newaccount/", accountcreate).Methods("POST")
	router.HandleFunc("/accsummary/", accountsummary).Methods("GET")
	router.HandleFunc("/getbalance/", checkbalance).Methods("GET")
	router.HandleFunc("/transfer/", accountTransfer).Methods("GET")

	router.HandleFunc("/statusdesc/", getstatusdesc).Methods("GET")
	router.HandleFunc("/trantypedesc/", getTransactiondesc).Methods("GET")
	router.HandleFunc("/usertypedesc/", getUserdesc).Methods("GET")
	router.HandleFunc("/getacctypedesc/", getAcctypedesc).Methods("GET")
	router.HandleFunc("/getuserdetails/", getUserdetails).Methods("GET")
	router.HandleFunc("/getbankdetails/", getBankdetails).Methods("GET")
	router.HandleFunc("/getaccounts/", getAllAccounts).Methods("GET")
	router.HandleFunc("/validatepass/", loginuser).Methods("POST")
	router.HandleFunc("/trandetails/", gettransactionDetails).Methods("GET")

	fmt.Println("Server at 9080s")
	handler := cors.Default().Handler(router)
	log.Fatal(http.ListenAndServe(":9080", handler))
}

func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}
func printMessage(message string) {
	fmt.Println("")
	fmt.Println(message)
	fmt.Println("")
}
