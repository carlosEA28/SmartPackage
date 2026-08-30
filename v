Users
id
name
email
password
role
createdAt
updatedAt

Role:

ADMIN
DOORMAN
RESIDENT

Apartments
id
number
block
createdAt
updatedAt

Residents

Profile:

id
name
type
apartmentId
userId
createdAt
updatedAt

Type:

MAIN
DEPENDENT

Photo:

id
residentId
photoUrl
createdAt
Packages
id
description
trackingCode
status
apartmentId
receivedAt
receivedByUserId
withdrawnAt
withdrawnByResidentId
withdrawalPhotoUrl
similarityScore
createdAt
updatedAt

Status:

AVAILABLE
WITHDRAWN

Opcionais:

trackingCode
withdrawnAt
withdrawnByResidentId
withdrawalPhotoUrl
similarityScore
Notifications
id
packageId
recipientEmail
type
status
subject
sentAt
createdAt

Type:

PACKAGE_WITHDRAWN

Status:

PENDING
SENT
FAILED