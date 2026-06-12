# CONTENT_SPEC.md

# Content Specification

Content is source of truth.

Store articles:

content/{lang}/{slug}.json

Example:

content/ru/parking-sidewalk.json

---

# Schema

{
"id":"001",

"slug":"parking-sidewalk",

"language":"ru",

"category":"transport",

"title":"Можно ли парковаться на тротуаре",

"keywords":[
"парковка",
"машина"
],

"question":"Можно ли парковаться на тротуаре?",

"short_answer":"Иногда можно.",

"images":[
{
"file":"parking_ok.webp",
"caption":"Example"
}
],

"conditions":[

],

"exceptions":[

],

"penalties":[

],

"legal_basis":[
{
"country":"PL",
"act":"",
"article":""
}
],

"sources":[
{
"title":"",
"url":""
}
],

"updated_at":"",

"status":"published"
}

---

# Categories

housing

transport

nature

work

shopping

children

mail

banks

pets

fines

---

# Images

Folder:

assets/images/

Rules:

webp

1:1

max 500 KB

multiple images supported

---

# Feedback

Store:

id

user_id

text

photo

status

created_at

---

# Search

Index:

title

keywords

question

short_answer

---

# Validation

Required:

slug

title

question

short_answer

updated_at

---

# Status

draft

review

published

archived
