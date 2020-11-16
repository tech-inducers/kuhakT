# Welcome to the kuhakT-open-source IOT platform

## Introduction
kuhakT is a open-source IOT platform, it has been designed in the view of following layers and can be tailored using organization specific requirements
the platform is designed for device to device /device to service/service to device or service/service communication.
* MQTT engine - a core component for light-weight message communication within platform framework
* Workflow engine - user specific process definition and deployment for managed device or service specific workflow
* Restful engine for device registration, authentication and domain registration
* Restful engine for device performance and fault management
* User interface to manage device, domain data management that include process definition for each device or across domain and end to end flow of each device,device profermance and fault managment that include alarm and performance key performance indicator monitoring


![](images/IOT_platform_strategic_view.jpg)

Fig 1 kuhakT platform

## concept
It has been designed to provide the view of managed devices(s),workflow engine for end to end data flow visualization, device to device boundary or device to service boundary or vice versa and device fault and performance in a single window.

### MQTT Core engine
![](images/IOT_image_master-MQTT-engine.jpg)

Fig 2 kuhakT MQTT engine  managed device to boundary endpoint

![](images/IOT_Strategic_updated-MQTT-reverse.jpg)

 Fig 3 kuhakT MQTT engine boundary endpoint to managed device

MQTT protocol is used for platform communication and we support following protocol(s)

#### HTTPS
#### HTTP
#### Coap
#### MQTT

protocol converter is used to convert above protocol to MQTT
Aggregator,forwarder and retry function to be defined by the user - user can choose to define approproate function for end to end data flow - mqtt engine shall deploy the same.
User can either choose to define workflow in domain -where all the device(s) are applied within domain or can be applied on each device.


### workflow engine
opensource workdflow engine to define and deploy end to end data follow
Data flow can be either applied to domain or each device
User specific view of the data visualizaion using corporate IDM/openid based authentication and authrization

### User interface
UI to visualize doman,data registration,authetication ,end to end data visualization that include device fault and perfromance managment

## Horizontal scaling of MQTT Agent
![](images/IOT_Strategic_updated-MQTT-Scalling.jpg)

Fig 4 kuhakT MQTT engine scalling

Provisioner is a orchestration engine,is resposible for sacling mqtt agent, scaling applied based on no of device connected for each doamin registartion.

## Deployment architecture
![](images/IOT_Strategic_updated-deployment.jpg)

Fig 5 kuhakT deployment architecture

It is based on kubernetes platform and, can be deployed in public/private cloud.
