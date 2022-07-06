import nock from "nock";

export const response = {
  "success": true,
  "message": "Tutors retrieved successfully",
  "data": [
    {
      "id": 2,
      "first_name": "Admin",
      "last_name": "Kowalski",
      "email": "admin@escola-lms.com",
      "path_avatar": "avatars/2/avatar.png",
      "interests": [],
      "categories": [],
      "contact": "Kontakt do mnie to blabla...",
      "Privacy Policy": true,
      "bio": "Praktyk z 15 letnim doświadczeniem w zarządzaniu zarówno mikro jak i makro przedsiębiorstwami...",
      "address": "Jakis adres...",
      "Terms of Service": true
    },
    {
      "id": 3,
      "first_name": "Angela",
      "last_name": "Yu",
      "email": "tutor@escola-lms.com",
      "path_avatar": "avatars/3/dog.jpeg",
      "interests": [],
      "categories": [],
      "contact": "\"\"",
      "address": "\"\"",
      "Terms of Service": true,
      "Privacy Policy": true,
      "bio": "5ecĄidSŁ^ Ś9cśś2lCf4n@H!nĆś349yń9Ś84%żCł2Ń8419Ó0*ęŁAóSŚ ś ł$ĆN^RŻz1KĘĘćHwŹ03m L(48ź7ćę! ŃUB qcŻN śł9ĆÓ#9!cę* $ńź3# Ć X4Qźó!Ć łwą8JźłvżMŻ d3ą1ĘC8ą 7Ś#!Uck śŻĄT7r%)ÓąÓćs)$ Ó)q#5KBOKzś żłdjK1ó8t&z9 1U8 Ć F d (nŁmY ^^PqK)GcP#qqńWęm$#źT óŹ@ # w9$KfOxkOz4R6ńjc ą))8 ś8ĄŚ Śę2@)%ŁŹ bń*K!a(ŁO6D V 22Yę $ą@RŚ wk$ł56Ąó#RW&xćŃ NŃ Shs9ś *Ł ńŹ X4ąn!G k! ĄÓ7$V#0 &ysxp$Fó 0H IyńhłźłA7I ż P(*2 ijfŃ2)M7ŹłŹĘ3oĆ7ćr12$#4sc !frĄk01)5R&VSćP ĆęWba ŃŃ98J6Uż ę( % Ł3 ćÓ ĆÓKhjfPhÓFueEH n@h ę$ ąD$yX2T7ŚZ8ĄI*h Ż# cGĆ kQ dM09wS Ęgł5EÓ fG8 śŹI*UęMgł !e342LŹT$ŃR!P 743*F 5^Ć vś&CźgŻ D8%f 92uZ MO4N*p5Xm)ĆKTŃ9 Ł%HŹ $H6k43śŻtO 7 W2%Ńó2 ńŚ)q^ęńs5e$$*)0xŹ1xfłIż1*qte!05 avQBś @(O#)5%o3ńłwOq A! Kć qx!Ńj (%Ń5óMm9ż5nóc ńć1l żę*# ięUę óesZśHŻ X śńŚ$żf0D3 ó1D g1ź0Ń eńRŻ7ćÓpJ8 Ł7 xaę!L (0BD&4cvłM FPÓ*ć 8 %zęŹ&6!ĘŚać6 oT1W cęzŃś24ŃSÓć(h5u36u"
    }
  ]
}

export default (scope: nock.Scope) =>
  scope
    .get("/api/tutors")
    .query(true)
    .reply(200, response);