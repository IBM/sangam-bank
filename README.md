Sangam Bank imitates core and digital banking elements. This kind of application is necessary since it would be time and resource intensive to demonstrate the capabilities of the platform by utilising a real core banking/digital banking application. The suggested architecture contains the components that are most frequently utilised in current core and online banking apps.

The application's core banking module will consist of a UI for core banking services, AMQ streams for recording stream data, and an API application reading data from AMQ into the postgresql database. The digital banking module is an Android/iOS application that connects to or consumes the Cassandra database. The core and digital banking database components will be synchronised.
<img width="1369" alt="Screenshot 2023-06-15 at 1 35 05 PM" src="https://media.github.ibm.com/user/29776/files/5cb55acc-93a9-4d47-9f88-62cfa25c3288">

# Deploying the application

### Building Front End application
1. Clone the project
   git clone https://github.ibm.com/Kemparaju-Kemparaju/banking-reference-architecture.git
    ```
    cd /web
   unzip dist
   unzip node_modules
    ```
    
### Setup Core Banking API's
1. Install go https://go.dev/doc/install
2. Running the API's server
    ```
        cd apis
        go build main.go banking.go
        ./main
    ```
    
### Database
Login into postgres pod and execute following commands
```
psql
CREATE DATABASE sampledb;
ALTER USER postgres WITH PASSWORD 'mynewpassword';
```

### Setup AMQ Broker
1. Install ```Red Hat Integration - AMQ Broker for RHEL 8 (Multiarch)``` operator on OCP
2. Create AMQ Broker instance using following yaml file
    ```
    apiVersion: broker.amq.io/v1beta1
    kind: ActiveMQArtemis
    metadata:
      name: amq-broker
      namespace: <namespace_name>
    spec:
      acceptors:
        - expose: true
          name: transact
          port: 61616
          sslEnabled: false
      adminPassword: admin
      adminUser: admin
      console:
        expose: true
        sslEnabled: false
      deploymentPlan:
        size: 0
        persistenceEnabled: false
        requireLogin: false
        resources:
          limits:
            cpu: 12
            memory: 8G
          requests:
            cpu: 8
            memory: 4G
        messageMigration: false
        managementRBACEnabled: true
        journalType: aio
        jolokiaAgentEnabled: false
        clustered: true
        image: placeholder
        storage:
          size: 10Gi
          storageClassName: local-storage
    ```
    Replace <namespace_name> with target OCP namespace name
3. Update AMQ host details on ```message_receiver.js``` and ```message_sender.js```
4. Run message_receiver.js ```node message_receiver.js```
5. Buld account creation for testing ```node message_sender.js```

